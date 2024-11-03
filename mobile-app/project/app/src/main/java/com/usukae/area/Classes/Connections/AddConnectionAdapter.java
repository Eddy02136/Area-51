package com.usukae.area.Classes.Connections;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Activities.WebViewActivity;
import com.usukae.area.Classes.Utils.ErrorUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

import java.util.List;
import java.util.Objects;

public class AddConnectionAdapter extends RecyclerView.Adapter<AddConnectionAdapter.ConnectionViewHolder> {

    private final List<Connection> connections;
    private final Context context;

    private PrettyAlert prettyAlert;
    private ErrorUtil errorUtil;

    public AddConnectionAdapter(Context context, List<Connection> connections) {
        this.context = context;
        this.connections = connections;
    }

    @NonNull
    @Override
    public ConnectionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.connection_item, parent, false);
        return new ConnectionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ConnectionViewHolder holder, int position) {
        Connection connection = connections.get(position);
        createClasses();
        bindButtons(holder, connection);
        holder.bind(connection, context);
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
        ConnectionsApiProtocol connectionsApiProtocol = new ConnectionsApiProtocol(context);

        switch (serviceName.toLowerCase()) {
            case "discord":
                connectionsApiProtocol.discordUrl(context, this::checkSuccess);
                break;
            case "spotify":
                connectionsApiProtocol.spotifyUrl(context, this::checkSuccess);
                break;
            case "twitch":
                connectionsApiProtocol.twitchUrl(context, this::checkSuccess);
                break;
            case "github":
                connectionsApiProtocol.githubUrl(context, this::checkSuccess);
                break;
            case "youtube":
                connectionsApiProtocol.youtubeUrl(context, this::checkSuccess);
                break;
            default:
                break;
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

    public static class ConnectionViewHolder extends RecyclerView.ViewHolder {
        private final TextView connectionName;
        private final ImageView connectionIcon, connectionLoggedIcon;
        private final CardView connectionMainCard;

        public ConnectionViewHolder(@NonNull View itemView) {
            super(itemView);
            connectionName = itemView.findViewById(R.id.connectionName);
            connectionIcon = itemView.findViewById(R.id.connectionIcon);
            connectionMainCard = itemView.findViewById(R.id.connectionMainCard);
            connectionLoggedIcon = itemView.findViewById(R.id.connectionLoggedIcon);
        }

        public void bind(Connection connection, Context context) {
            connectionName.setText(connection.getName());
            connectionIcon.setImageResource(connection.getDrawable());
            if (connection.getData() != null && !connection.getData().isEmpty() && Objects.equals(connection.getData().get(0), "true")) {
                connectionLoggedIcon.setVisibility(View.VISIBLE);
                connectionMainCard.setEnabled(false);
                connectionMainCard.setClickable(false);
                connectionMainCard.setCardBackgroundColor(ContextCompat.getColor(context, R.color.success));
            }
        }
    }
}
