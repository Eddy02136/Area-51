package com.usukae.area.Classes.Connections;

import android.content.Context;

import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Utils.ToolboxUtil;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class ConnectionChecker {

    private final ConnectionsApiProtocol connectionsApiProtocol;
    private final SharedPreferencesManager sharedPreferencesManager;

    public ConnectionChecker(Context context) {
        this.connectionsApiProtocol = new ConnectionsApiProtocol(context);
        this.sharedPreferencesManager = new SharedPreferencesManager(context);
    }

    public void checkConnections(Context context, ConnectionLoadCallback callback) {
        ToolboxUtil toolboxUtil = new ToolboxUtil();
        AtomicInteger completedChecks = new AtomicInteger(0);
        int totalChecks = 5;

        Runnable checkCompletion = () -> {
            if (completedChecks.incrementAndGet() == totalChecks) {
                callback.onAllConnectionsLoaded();
            }
        };

        connectionsApiProtocol.discordConnected(context, (success, code, data) -> {
            if (success) initializeConnection("discord_data", code == 200, toolboxUtil);
            else removeCon("discord_data");
            checkCompletion.run();
        });

        connectionsApiProtocol.spotifyConnected(context, (success, code, data) -> {
            if (success) initializeConnection("spotify_data", code == 200, toolboxUtil);
            else removeCon("spotify_data");
            checkCompletion.run();
        });

        connectionsApiProtocol.youtubeConnected(context, (success, code, data) -> {
            if (success) initializeConnection("youtube_data", code == 200, toolboxUtil);
            else removeCon("youtube_data");
            checkCompletion.run();
        });

        connectionsApiProtocol.twitchConnected(context, (success, code, data) -> {
            if (success) initializeConnection("twitch_data", code == 200, toolboxUtil);
            else removeCon("twitch_data");
            checkCompletion.run();
        });

        connectionsApiProtocol.githubConnected(context, (success, code, data) -> {
            if (success) initializeConnection("github_data", code == 200, toolboxUtil);
            else removeCon("github_data");
            checkCompletion.run();
        });
    }

    private void initializeConnection(String key, boolean isConnected, ToolboxUtil toolboxUtil) {
        List<String> storedData = sharedPreferencesManager.getStringList(key);
        String date = (storedData != null && storedData.size() > 1) ? storedData.get(1) : toolboxUtil.getFormattedDate();

        if (storedData == null || storedData.isEmpty()) {
            sharedPreferencesManager.setStringList(key, String.valueOf(isConnected), date);
        }
    }

    private void removeCon(String key) {
        sharedPreferencesManager.remove(key);
    }

    public interface ConnectionLoadCallback {
        void onAllConnectionsLoaded();
    }
}
