package com.usukae.area.Classes.Actions;

import com.usukae.area.R;

public class ActionUtil {
    public int getActionIcon(String id) {
        switch (id.toLowerCase()) {
            case "nasa":
                return R.drawable.ic_nasa;
            case "youtube":
                return R.drawable.ic_yt;
            case "twitch":
                return R.drawable.ic_twitch;
            case "github":
                return R.drawable.ic_git;
            case "discord":
                return R.drawable.ic_color_discord;
            case "spotify":
                return R.drawable.ic_color_spotify;
            default:
                return R.drawable.ic_color_default;
        }
    }
}
