package com.usukae.area.Classes.Connections;

import android.content.Context;

import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Utils.ToolboxUtil;

public class ConnectionChecker {

    private final ConnectionsApiProtocol connectionsApiProtocol;
    private final SharedPreferencesManager preferencesManager;

    public ConnectionChecker(Context context) {
        this.connectionsApiProtocol = new ConnectionsApiProtocol();
        this.preferencesManager = new SharedPreferencesManager(context);
    }

    private String boolToString(boolean value) {
        return value ? "true" : "false";
    }

    public void checkConnections(Context context) {
        ToolboxUtil toolboxUtil = new ToolboxUtil();

        connectionsApiProtocol.discordConnected(context, (success, code, data) -> {
            preferencesManager.setStringList("discord_data", boolToString(success), toolboxUtil.getFormattedDate());
        });

        connectionsApiProtocol.spotifyConnected(context, (success, code, data) -> {
            preferencesManager.setStringList("spotify_data", boolToString(success), toolboxUtil.getFormattedDate());
        });
    }
}