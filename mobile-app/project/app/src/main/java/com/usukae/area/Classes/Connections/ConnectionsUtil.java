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

        connectionsList.add(new Connection("Spotify", R.drawable.ic_spotify, sharedPreferencesManager.getBoolean("spotify_connected")));
        connectionsList.add(new Connection("Discord", R.drawable.ic_discord, sharedPreferencesManager.getBoolean("discord_connected")));

        return connectionsList;
    }
}

