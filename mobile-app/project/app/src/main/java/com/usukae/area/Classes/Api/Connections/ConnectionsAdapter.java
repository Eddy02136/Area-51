package com.usukae.area.Classes.Api.Connections;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Activities.WebViewActivity;
import com.usukae.area.Classes.Managers.ConnectionManager;
import com.usukae.area.Classes.Utils.ErrorUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

import java.util.List;

public class ConnectionsAdapter extends RecyclerView.Adapter<ConnectionsAdapter.ConnectionViewHolder> {

    private final List<Connection> connections;
    private final Context context;
    private PrettyAlert prettyAlert;
    private ErrorUtil errorUtil;

    public ConnectionsAdapter(Context context, List<Connection> connections) {
        this.context = context;
        this.connections = connections;
    }

    @NonNull
    @Override
    public ConnectionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_connection, parent, false);
        return new ConnectionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ConnectionViewHolder holder, int position) {
        Connection connection = connections.get(position);
        holder.bind(connection);
        createClasses();
        bindButtons(holder, connection);
    }

    private void createClasses() {
        prettyAlert = new PrettyAlert((Activity) context);
        errorUtil = new ErrorUtil();
    }

    private void bindButtons(ConnectionViewHolder holder, Connection connection) {
        holder.itemView.setOnClickListener(v -> checkConnectionType(connection));
    }

    private void checkConnectionType(Connection connection) {
        String serviceName = connection.getName().toLowerCase();
        ConnectionManager connectionManager = new ConnectionManager();

        if ("discord".equalsIgnoreCase(serviceName)) {
            connectionManager.discordUrl(context, this::checkSuccess);
        } else if ("spotify".equalsIgnoreCase(serviceName)) {
            connectionManager.spotifyUrl(context, this::checkSuccess);
        }
    }

    private void checkSuccess(boolean success, int code, String url) {
        if (success) {
            context.startActivity(new Intent(context, WebViewActivity.class).putExtra("auth_url", url));
        } else {
            prettyAlert.error(context.getString(errorUtil.getAuthUrlError(code)), 3000);
        }
    }

    @Override
    public int getItemCount() {
        return connections.size();
    }

    class ConnectionViewHolder extends RecyclerView.ViewHolder {
        private final TextView connectionName;
        private final ImageView connectionIcon;

        public ConnectionViewHolder(@NonNull View itemView) {
            super(itemView);
            connectionName = itemView.findViewById(R.id.connectionName);
            connectionIcon = itemView.findViewById(R.id.connectionIcon);
        }

        public void bind(Connection connection) {
            connectionName.setText(connection.getName());
            connectionIcon.setImageResource(connection.getIconDrawableId());
        }
    }
}
