package com.usukae.area.Classes.ActionReaction;

import java.util.Map;

public class ActionReaction {
    private String _id;
    private String actionType;
    private String action_api;
    private String reactionType;
    private String reaction_api;
    private Map<String, String> parameters;
    private String schedule;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getAction_api() {
        return action_api;
    }

    public void setAction_api(String action_api) {
        this.action_api = action_api;
    }

    public String getReactionType() {
        return reactionType;
    }

    public void setReactionType(String reactionType) {
        this.reactionType = reactionType;
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