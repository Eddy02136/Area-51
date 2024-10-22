package com.usukae.area.Classes.Actions;

import com.usukae.area.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ActionUtil {
    public List<Action> getActions() {
        List<Action> actionsList = new ArrayList<>();

        Map<String, String> issParams = new HashMap<>();
        issParams.put("city", "");

        Action issAction = new Action(
                "iss_get_pos",
                "ISS Position",
                "Obtient la position actuelle de l'ISS.",
                issParams
        );

        actionsList.add(issAction);

        return actionsList;
    }

    public int getActionIcon(String id) {
        switch (id.toLowerCase()) {
            case "iss_get_pos":
                return R.drawable.ic_color_iss;
            default:
                return R.drawable.ic_color_default;
        }
    }
}
