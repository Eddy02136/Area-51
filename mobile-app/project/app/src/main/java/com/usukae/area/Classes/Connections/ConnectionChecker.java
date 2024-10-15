package com.usukae.area.Classes.Connections;

import android.content.Context;

import com.usukae.area.Classes.Managers.SharedPreferencesManager;

public class ConnectionChecker {

    private final ConnectionsApiProtocol connectionsApiProtocol;
    private final SharedPreferencesManager preferencesManager;

    public ConnectionChecker(Context context) {
        this.connectionsApiProtocol = new ConnectionsApiProtocol();
        this.preferencesManager = new SharedPreferencesManager(context);
    }

    public void checkConnections(Context context) {
        connectionsApiProtocol.discordConnected(context, (success, code, data) -> {
            preferencesManager.setBoolean("discord_connected", success);
        });

        connectionsApiProtocol.spotifyConnected(context, (success, code, data) -> {
            preferencesManager.setBoolean("spotify_connected", success);
        });
    }
}