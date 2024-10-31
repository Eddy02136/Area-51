package com.usukae.area.Classes.Connections;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.Classes.Utils.ErrorUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

import java.util.List;

public class DashboardConnectionAdapter extends RecyclerView.Adapter<DashboardConnectionAdapter.ConnectionViewHolder> {

    private final List<Connection> connections;
    private final Context context;

    public DashboardConnectionAdapter(Context context, List<Connection> connections) {
        this.context = context;
        this.connections = connections;
    }

    @NonNull
    @Override
    public ConnectionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.connection_item_dashboard, parent, false);
        return new ConnectionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ConnectionViewHolder holder, int position) {
        Connection connection = connections.get(position);
        holder.bind(connection);
        DialogUtil dialogUtil = new DialogUtil();
        Dialog dialog = dialogUtil.createBottomDialog(context, R.layout.modal_edit_connection);
        ConnectionsUtil connectionsUtil = new ConnectionsUtil();
        holder.itemView.setOnClickListener(v -> createDialog(connectionsUtil, dialog, connection, position));
    }

    private void createDialog(ConnectionsUtil connectionsUtil, Dialog dialog, Connection connection, int position) {
        TextView title = dialog.findViewById(R.id.title);
        TextView subtitle = dialog.findViewById(R.id.subtitle);
        TextView time = dialog.findViewById(R.id.time);
        TextView health = dialog.findViewById(R.id.health);
        CardView deleteButton = dialog.findViewById(R.id.deleteButton);

        List<String> infos = connectionsUtil.getConnectionByName(context, connection.getName());
        if (infos.isEmpty()) {
            return;
        }

        title.setText(connection.getName());
        if (infos.size() > 1) {
            time.setText(infos.get(1));
        }
        if (infos.size() > 2) {
            subtitle.setText(infos.get(2));
        }
        health.setText(context.getString(R.string.connected));

        deleteButton.setOnClickListener(v -> handleLogout(connectionsUtil, connection.getName(), dialog, position));
        dialog.show();
    }

    private void handleLogout(ConnectionsUtil connectionsUtil, String serviceName, Dialog dialog, int position) {
        ConnectionsApiProtocol connectionsApiProtocol = new ConnectionsApiProtocol(context);
        switch (serviceName.toLowerCase()) {
            case "spotify":
                connectionsApiProtocol.logoutSpotify(context, (success, code, data) -> processLogoutResponse(connectionsUtil, success, code, dialog, serviceName, position));
                break;
            case "discord":
                connectionsApiProtocol.logoutDiscord(context, (success, code, data) -> processLogoutResponse(connectionsUtil, success, code, dialog, serviceName, position));
                break;
            case "twitch":
                connectionsApiProtocol.logoutTwitch(context, (success, code, data) -> processLogoutResponse(connectionsUtil, success, code, dialog, serviceName, position));
                break;
            case "github":
                connectionsApiProtocol.logoutGithub(context, (success, code, data) -> processLogoutResponse(connectionsUtil, success, code, dialog, serviceName, position));
                break;
            case "youtube":
                connectionsApiProtocol.logoutYoutube(context, (success, code, data) -> processLogoutResponse(connectionsUtil, success, code, dialog, serviceName, position));
                break;
            default:
                new PrettyAlert((Activity) context).error((context).getString(R.string.unknown_service), 3000);
                dialog.dismiss();
                break;
        }
    }

    private void processLogoutResponse(ConnectionsUtil connectionsUtil, boolean success, int code, Dialog dialog, String name, int position) {
        if (success) {
            new SharedPreferencesManager(context).remove(connectionsUtil.getConnectionIdByName(name));
            connections.remove(position);
            notifyItemRemoved(position);
            new PrettyAlert((Activity) context).success(context.getString(R.string.logged_out), 3000);
            dialog.dismiss();
        } else {
            new PrettyAlert((Activity) context).error(context.getString(new ErrorUtil().getLogoutError(code)), 3000);
        }
    }

    @Override
    public int getItemCount() {
        return connections.size();
    }

    public static class ConnectionViewHolder extends RecyclerView.ViewHolder {
        private final TextView connectionName;
        private final ImageView connectionIcon;

        public ConnectionViewHolder(@NonNull View itemView) {
            super(itemView);
            connectionName = itemView.findViewById(R.id.connectionName);
            connectionIcon = itemView.findViewById(R.id.connectionIcon);
        }

        public void bind(Connection connection) {
            connectionName.setText(connection.getName());
            connectionIcon.setImageResource(connection.getDrawable());
        }
    }
}