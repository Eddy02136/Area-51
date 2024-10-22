package com.usukae.area.Classes.Reactions;

import java.util.Map;

public class Reaction {
    private final String id;
    private final String name;
    private final String description;
    private Map<String, String> parameters;

    public Reaction(String id, String name, String description, Map<String, String> parameters) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.parameters = parameters;
    }

    public String getId() {
        return id;
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

    public void setParameters(Map<String, String> parameters) {
        this.parameters = parameters;
    }
}