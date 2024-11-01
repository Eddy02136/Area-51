package com.usukae.area.Classes.Reactions;

import java.util.Map;

public class Reaction {
    private final String service;
    private final String name;
    private Map<String, String> parameters;

    public Reaction(String service, String name, Map<String, String> parameters) {
        this.service = service;
        this.name = name;
        this.parameters = parameters;
    }

    public String getService() {
        return service;
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