package com.usukae.area.Classes.ActionReaction;

import java.util.Map;

public class ActionReactionRequest {
    private String action;
    private String action_api;
    private String reaction;
    private String reaction_api;
    private Map<String, String> parameters;
    private String schedule;

    public ActionReactionRequest(String action, String action_api, String reaction, String reaction_api, Map<String, String> parameters, String schedule) {
        this.action = action;
        this.action_api = action_api;
        this.reaction = reaction;
        this.reaction_api = reaction_api;
        this.parameters = parameters;
        this.schedule = schedule;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getAction_api() {
        return action_api;
    }

    public void setAction_api(String action_api) {
        this.action_api = action_api;
    }

    public String getReaction() {
        return reaction;
    }

    public void setReaction(String reaction) {
        this.reaction = reaction;
    }

    public String getReaction_api() {
        return reaction_api;
    }

    public void setReaction_api(String reaction_api) {
        this.reaction_api = reaction_api;
    }

    public Map<String, String> getParameters() {
        return parameters;
    }

    public void setParameters(Map<String, String> parameters) {
        this.parameters = parameters;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }
}