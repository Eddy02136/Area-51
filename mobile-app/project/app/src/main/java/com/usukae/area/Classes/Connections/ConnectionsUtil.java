package com.usukae.area.Classes.Connections;

import android.content.Context;

import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.R;

import java.util.ArrayList;
import java.util.List;

public class ConnectionsUtil {

    public List<Connection> getConnections(Context context) {
        List<Connection> connectionsList = new ArrayList<>();
        SharedPreferencesManager sharedPreferencesManager = new SharedPreferencesManager(context);

        connectionsList.add(new Connection("Spotify", R.drawable.ic_spotify, sharedPreferencesManager.getStringList("spotify_data")));
        connectionsList.add(new Connection("Discord", R.drawable.ic_discord, sharedPreferencesManager.getStringList("discord_data")));

        return connectionsList;
    }

    public List<Connection> getStateConnections(Context context, String state) {
        List<Connection> allConnections = getConnections(context);
        List<Connection> validConnections = new ArrayList<>();

        for (Connection connection : allConnections) {
            List<String> data = connection.getData();
            if (data != null && !data.isEmpty() && state.equals(data.get(0))) {
                validConnections.add(connection);
            }
        }

        return validConnections;
    }
}

