package com.usukae.area.Classes.Connections;

import android.content.Context;

import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Utils.ToolboxUtil;

public class ConnectionChecker {

    private final ConnectionsApiProtocol connectionsApiProtocol;
    private final SharedPreferencesManager sharedPreferencesManager;

    public ConnectionChecker(Context context) {
        this.connectionsApiProtocol = new ConnectionsApiProtocol(context);
        this.sharedPreferencesManager = new SharedPreferencesManager(context);
    }

    public void checkConnections(Context context) {
        ToolboxUtil toolboxUtil = new ToolboxUtil();

        connectionsApiProtocol.discordConnected(context, (success, code, data) -> {
            if (success && (sharedPreferencesManager.getStringList("discord_data") == null || !sharedPreferencesManager.getStringList("discord_data").get(1).equals("true")))
                sharedPreferencesManager.setStringList("discord_data", String.valueOf(code == 200), toolboxUtil.getFormattedDate());
        });

        connectionsApiProtocol.spotifyConnected(context, (success, code, data) -> {
            if (success && (sharedPreferencesManager.getStringList("spotify_data") == null || !sharedPreferencesManager.getStringList("discord_data").get(1).equals("true")))
                sharedPreferencesManager.setStringList("spotify_data", String.valueOf(code == 200), toolboxUtil.getFormattedDate());
        });

        connectionsApiProtocol.youtubeConnected(context, (success, code, data) -> {
            if (success && (sharedPreferencesManager.getStringList("youtube_data") == null || !sharedPreferencesManager.getStringList("discord_data").get(1).equals("true")))
                sharedPreferencesManager.setStringList("youtube_data", String.valueOf(code == 200), toolboxUtil.getFormattedDate());
        });

        connectionsApiProtocol.twitchConnected(context, (success, code, data) -> {
            if (success && (sharedPreferencesManager.getStringList("twitch_data") == null || !sharedPreferencesManager.getStringList("discord_data").get(1).equals("true")))
                sharedPreferencesManager.setStringList("twitch_data", String.valueOf(code == 200), toolboxUtil.getFormattedDate());
        });

        connectionsApiProtocol.githubConnected(context, (success, code, data) -> {
            if (success && (sharedPreferencesManager.getStringList("github_data") == null || !sharedPreferencesManager.getStringList("discord_data").get(1).equals("true")))
                sharedPreferencesManager.setStringList("github_data", String.valueOf(code == 200), toolboxUtil.getFormattedDate());
        });
    }
}