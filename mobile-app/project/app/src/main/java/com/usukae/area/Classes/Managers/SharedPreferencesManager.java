package com.usukae.area.Classes.Managers;

import android.content.Context;
import android.content.SharedPreferences;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SharedPreferencesManager {

    private static final String PREF_NAME = "AreaPreferences";
    private static final String KEY_FIRST_NAME = "first_name";
    private static final String KEY_LAST_NAME = "last_name";
    private static final String KEY_EMAIL = "email";
    private static final String KEY_TOKEN = "auth_token";

    private final SharedPreferences sharedPreferences;
    private final SharedPreferences.Editor editor;
    private final Gson gson;

    public SharedPreferencesManager(Context context) {
        sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();
        gson = new Gson();
    }

    public Map<String, ?> getAll() {
        return sharedPreferences.getAll();
    }

    public void clearAllExceptApiBaseUrl() {
        String apiBaseUrl = sharedPreferences.getString("api_base_url", null);
        sharedPreferences.edit().clear().apply();
        sharedPreferences.edit().putString("api_base_url", apiBaseUrl).apply();
    }

    public void setStringList(String key, String... values) {
        List<String> stringList = new ArrayList<>();
        Collections.addAll(stringList, values);
        String json = gson.toJson(stringList);
        editor.putString(key, json);
        editor.apply();
    }

    public List<String> getStringList(String key) {
        String json = sharedPreferences.getString(key, null);
        if (json != null) {
            Type type = new TypeToken<List<String>>() {
            }.getType();
            return gson.fromJson(json, type);
        }
        return new ArrayList<>();
    }

    public void setStringMap(String key, Map<String, String> map) {
        String json = gson.toJson(map);
        editor.putString(key, json);
        editor.apply();
    }

    public Map<String, String> getStringMap(String key) {
        String json = sharedPreferences.getString(key, null);
        if (json == null) {
            return new HashMap<>();
        }
        Type type = new TypeToken<Map<String, String>>() {
        }.getType();
        return gson.fromJson(json, type);
    }

    public void setString(String key, String value) {
        editor.putString(key, value);
        editor.apply();
    }

    public String getString(String key) {
        return sharedPreferences.getString(key, "");
    }

    public void setInt(String key, int value) {
        editor.putInt(key, value);
        editor.apply();
    }

    public int getInt(String key) {
        return sharedPreferences.getInt(key, 0);
    }

    public void setLong(String key, long value) {
        editor.putLong(key, value);
        editor.apply();
    }

    public long getLong(String key) {
        return sharedPreferences.getLong(key, 0L);
    }

    public void setBoolean(String key, boolean value) {
        editor.putBoolean(key, value);
        editor.apply();
    }

    public boolean getBoolean(String key) {
        return sharedPreferences.getBoolean(key, false);
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

    public void saveUserInfo(String firstName, String lastName, String email) {
        editor.putString(KEY_FIRST_NAME, firstName);
        editor.putString(KEY_LAST_NAME, lastName);
        editor.putString(KEY_EMAIL, email);
        editor.apply();
    }

    public String getFirstName() {
        return sharedPreferences.getString(KEY_FIRST_NAME, "");
    }

    public String getLastName() {
        return sharedPreferences.getString(KEY_LAST_NAME, "");
    }

    public String getEmail() {
        return sharedPreferences.getString(KEY_EMAIL, "");
    }

    public void clearUserInfo() {
        editor.clear();
        editor.apply();
    }

    public String getToken() {
        return sharedPreferences.getString(KEY_TOKEN, "");
    }

    public void setToken(String token) {
        setString(KEY_TOKEN, token);
    }

    public void resetToken() {
        setString(KEY_TOKEN, "");
    }
}
