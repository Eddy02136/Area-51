package com.usukae.area.Classes.Actions;

import com.usukae.area.R;

public class ActionUtil {
    public int getActionIcon(String id) {
        switch (id.toLowerCase()) {
            case "iss_get_pos":
                return R.drawable.ic_color_iss;
            default:
                return R.drawable.ic_color_default;
        }
    }
}
