package com.usukae.area.Classes.ActionReaction;

import java.util.Map;

public class ActionReactionRequest {
    private final String areaName;
    private final String actionName;
    private final String actionApi;
    private final String reactionName;
    private final String reactionApi;
    private final Map<String, String> parameters;

    public ActionReactionRequest(String areaName, String actionName, String actionApi, String reactionName, String reactionApi, Map<String, String> parameters) {
        this.areaName = areaName;
        this.actionName = actionName;
        this.actionApi = actionApi;
        this.reactionName = reactionName;
        this.reactionApi = reactionApi;
        this.parameters = parameters;
    }

    public String getAreaName() {
        return areaName;
    }

    public String getAction() {
        return actionName;
    }

    public String getAction_api() {
        return actionApi;
    }

    public String getReaction() {
        return reactionName;
    }

    public String getReaction_api() {
        return reactionApi;
    }


    public Map<String, String> getParameters() {
        return parameters;
    }
}
