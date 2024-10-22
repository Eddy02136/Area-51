package com.usukae.area.Classes.Areas;

import com.usukae.area.Classes.Actions.Action;
import com.usukae.area.Classes.Reactions.Reaction;

public class Area {
    private final String id;
    private final Action action;
    private final Reaction reaction;
    private final String name;
    private final String description;

    public Area(String id, Action action, Reaction reaction, String name, String description) {
        this.id = id;
        this.action = action;
        this.reaction = reaction;
        this.name = name;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public Action getAction() {
        return action;
    }

    public Reaction getReaction() {
        return reaction;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
