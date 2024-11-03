package com.usukae.area.Classes.Reactions;

import com.usukae.area.R;

public class ReactionUtil {
    public int getReactionIcon(String id) {
        switch (id.toLowerCase()) {
            case "spotify":
                return R.drawable.ic_color_spotify;
            default:
                return R.drawable.ic_color_default;
        }
    }
}
