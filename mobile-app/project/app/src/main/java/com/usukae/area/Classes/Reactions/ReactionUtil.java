package com.usukae.area.Classes.Reactions;

import com.usukae.area.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReactionUtil {
    public List<Reaction> getReactions() {
        List<Reaction> reactionsList = new ArrayList<>();

        Map<String, String> spotifyParams = new HashMap<>();
        spotifyParams.put("music", "");

        Reaction spotifyReaction = new Reaction(
                "spotify_play_music",
                "Spotify Play Music",
                "Joue une musique sur Spotify.",
                spotifyParams
        );

        reactionsList.add(spotifyReaction);

        return reactionsList;
    }


    public int getReactionIcon(String id) {
        switch (id.toLowerCase()) {
            case "spotify_play_music":
                return R.drawable.ic_color_spotify;
            default:
                return R.drawable.ic_color_default;
        }
    }
}
