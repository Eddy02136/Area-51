package com.usukae.area.Classes.Actions;

import java.util.Map;

public class Action {
    private final String id;
    private final String name;
    private final String description;
    private Map<String, String> parameters;

    public Action(String id, String name, String description, Map<String, String> parameters) {
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