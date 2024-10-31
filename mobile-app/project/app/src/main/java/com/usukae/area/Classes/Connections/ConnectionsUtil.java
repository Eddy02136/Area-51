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

        connectionsList.add(new Connection("Spotify", R.drawable.ic_spotify, sharedPreferencesManager.getStringList("spotify_data"), context.getString(R.string.spotify_description)));
        connectionsList.add(new Connection("Discord", R.drawable.ic_discord, sharedPreferencesManager.getStringList("discord_data"), context.getString(R.string.discord_description)));
        connectionsList.add(new Connection("Youtube", R.drawable.youtube, sharedPreferencesManager.getStringList("youtube_data"), context.getString(R.string.youtube_description)));
        connectionsList.add(new Connection("GitHub", R.drawable.github, sharedPreferencesManager.getStringList("github_data"), context.getString(R.string.github_description)));
        connectionsList.add(new Connection("Twitch", R.drawable.twitch, sharedPreferencesManager.getStringList("twitch_data"), context.getString(R.string.twitch_description)));

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

    public List<String> getConnectionByName(Context context, String connectionName) {
        SharedPreferencesManager sharedPreferencesManager = new SharedPreferencesManager(context);

        switch (connectionName) {
            case "Spotify":
                return sharedPreferencesManager.getStringList("spotify_data");
            case "Discord":
                return sharedPreferencesManager.getStringList("discord_data");
            case "GitHub":
                return sharedPreferencesManager.getStringList("github_data");
            case "YouTube":
                return sharedPreferencesManager.getStringList("youtube_data");
            case "Twitch":
                return sharedPreferencesManager.getStringList("twitch_data");
            default:
                return new ArrayList<>();
        }
    }

    public String getConnectionIdByName(String connectionName) {
        switch (connectionName) {
            case "Spotify":
                return "spotify_data";
            case "Discord":
                return "discord_data";
            case "GitHub":
                return "github_data";
            case "YouTube":
                return "youtube_data";
            case "Twitch":
                return "twitch_data";
            default:
                return null;
        }
    }
}

