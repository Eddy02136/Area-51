package com.usukae.area.Classes.Areas;

import java.util.Map;

public class Area {
    private final String id;
    private final String action;
    private final String reaction;
    private final String name;
    private final String description;
    private final Map<String, String> parameters;

    public Area(String id, String action, String reaction, String name, String description, Map<String, String> parameters) {
        this.id = id;
        this.action = action;
        this.reaction = reaction;
        this.name = name;
        this.description = description;
        this.parameters = parameters;
    }

    public String getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public String getReaction() {
        return reaction;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Map<String, String> getParameters() {
        return parameters;
    }
}
