package com.usukae.area.Classes.ActionReaction;

import java.util.Map;

public class ActionReactionRequest {
    private String actionName;
    private String actionApi;
    private String reactionName;
    private String reactionApi;
    private Map<String, String> parameters;
    private String schedule;

    public ActionReactionRequest(String actionName, String actionApi, String reactionName, String reactionApi, Map<String, String> parameters, String schedule) {
        this.actionName = actionName;
        this.actionApi = actionApi;
        this.reactionName = reactionName;
        this.reactionApi = reactionApi;
        this.parameters = parameters;
        this.schedule = schedule;
    }

    public String getAction() {
        return actionName;
    }

    public void setAction(String actionName) {
        this.actionName = actionName;
    }

    public String getAction_api() {
        return actionApi;
    }

    public void setAction_api(String actionApi) {
        this.actionApi = actionApi;
    }

    public String getReaction() {
        return reactionName;
    }

    public void setReaction(String reactionName) {
        this.reactionName = reactionName;
    }

    public String getReaction_api() {
        return reactionApi;
    }

    public void setReaction_api(String reactionApi) {
        this.reactionApi = reactionApi;
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