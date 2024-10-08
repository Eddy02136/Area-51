package com.usukae.area.Classes.Utils;

import android.content.Context;
import android.content.SharedPreferences;

public class SharedPreferencesManager {

    private static final String PREF_NAME = "AreaPreferences";
    private final SharedPreferences sharedPreferences;
    private final SharedPreferences.Editor editor;

    public SharedPreferencesManager(Context context) {
        sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();
    }

    public void setString(String key, String value) {
        editor.putString(key, value);
        editor.apply();
    }

    public String getString(String key) {
        return sharedPreferences.getString(key, "");
    }

    public void remove(String key) {
        editor.remove(key);
        editor.apply();
    }

    public boolean contains(String key) {
        return sharedPreferences.contains(key);
    }

    public void clear() {
        editor.clear();
        editor.apply();
    }
}
