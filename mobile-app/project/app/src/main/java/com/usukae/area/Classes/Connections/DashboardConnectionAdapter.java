package com.usukae.area.Classes.Connections;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

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
        bindButtons(holder, connection);
        holder.bind(connection, context);
    }

    private void bindButtons(ConnectionViewHolder holder, Connection connection) {
        holder.itemView.setOnClickListener(v -> Toast.makeText(context, "@TODO", Toast.LENGTH_SHORT).show());
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

        public void bind(Connection connection, Context context) {
            connectionName.setText(connection.getName());
            connectionIcon.setImageResource(connection.getDrawable());
        }
    }
}
