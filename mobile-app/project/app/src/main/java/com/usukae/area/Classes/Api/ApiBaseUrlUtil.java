package com.usukae.area.Classes.Api;

import android.content.Context;
import android.content.SharedPreferences;

public class ApiBaseUrlUtil {
    private static final String SHARED_PREFS_NAME = "AppPrefs";
    private static final String BASE_URL_KEY = "api_base_url";
    private static final String DEFAULT_BASE_URL = "http://localhost:3000/api/";

    public static String getBaseUrl(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE);
        return prefs.getString(BASE_URL_KEY, DEFAULT_BASE_URL);
    }

    public static void setBaseUrl(Context context, String newBaseUrl) {
        SharedPreferences prefs = context.getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(BASE_URL_KEY, newBaseUrl).apply();
    }

    public static String getDefault() {
        return DEFAULT_BASE_URL;
    }
}