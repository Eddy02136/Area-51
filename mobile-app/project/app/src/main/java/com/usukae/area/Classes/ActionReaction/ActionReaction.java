package com.usukae.area.Classes.ActionReaction;

import java.util.Map;

public class ActionReaction {
    private final String _id;
    private final String actionName;
    private final String actionApi;
    private final String reactionName;
    private final String reactionApi;
    private final Map<String, String> parameters;
    private final String schedule;

    public ActionReaction(String id, String actionName, String actionApi, String reactionName, String reactionApi, Map<String, String> parameters, String schedule) {
        this._id = id;
        this.actionName = actionName;
        this.actionApi = actionApi;
        this.reactionName = reactionName;
        this.reactionApi = reactionApi;
        this.parameters = parameters;
        this.schedule = schedule;
    }

    public String get_id() {
        return _id;
    }

    public String getActionName() {
        return actionName;
    }

    public String getActionApi() {
        return actionApi;
    }

    public String getReactionName() {
        return reactionName;
    }

    public String getReactionApi() {
        return reactionApi;
    }

    public Map<String, String> getParameters() {
        return parameters;
    }

    public String getSchedule() {
        return schedule;
    }
}