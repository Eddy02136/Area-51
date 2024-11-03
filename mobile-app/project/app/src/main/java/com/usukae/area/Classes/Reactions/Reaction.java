package com.usukae.area.Classes.Reactions;

import java.util.Map;

public class Reaction {
    private final String service;
    private final String name;
    private final String description;
    private Map<String, String> parameters;

    public Reaction(String service, String description, String name, Map<String, String> parameters) {
        this.service = service;
        this.name = name;
        this.description = description;
        this.parameters = parameters;
    }

    public String getService() {
        return service;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public Map<String, String> getParameters() {
        return parameters;
    }

    public void setParameters(Map<String, String> parameters) {
        this.parameters = parameters;
    }
}