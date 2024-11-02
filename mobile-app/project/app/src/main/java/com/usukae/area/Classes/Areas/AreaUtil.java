package com.usukae.area.Classes.Areas;

import android.content.Context;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AreaUtil {
    public static List<Area> getAllAreas(Context context) {
        List<Area> areas = new ArrayList<>();
        SharedPreferencesManager sharedPreferencesManager = new SharedPreferencesManager(context);
        Map<String, ?> allEntries = sharedPreferencesManager.getAll();
        for (Map.Entry<String, ?> entry : allEntries.entrySet()) {
            String json = (String) entry.getValue();
            Type type = new TypeToken<Area>() {
            }.getType();
            Gson gson = new Gson();
            Area area = gson.fromJson(json, type);
            areas.add(area);
        }
        return areas;
    }
}
