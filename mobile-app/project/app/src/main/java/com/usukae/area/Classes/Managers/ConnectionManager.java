package com.usukae.area.Classes.Managers;

import android.content.Context;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.Api.Connections.AuthUrlResponse;
import com.usukae.area.Classes.Utils.SharedPreferencesManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ConnectionManager {

    private final ApiService apiService;

    public ConnectionManager() {
        apiService = ApiClient.getClient().create(ApiService.class);
    }

    public void discordUrl(Context context, ConnectionCallback callback) {
        String token = getAuthToken(context);
        Call<AuthUrlResponse> call = apiService.getDiscordAuthUrl("Bearer " + token);
        call.enqueue(new Callback<AuthUrlResponse>() {
            @Override
            public void onResponse(Call<AuthUrlResponse> call, Response<AuthUrlResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResult(true, response.code(), response.body().getUrl());
                } else {
                    callback.onResult(false, response.code(), null);
                }
            }

            @Override
            public void onFailure(Call<AuthUrlResponse> call, Throwable t) {
                callback.onResult(false, 401, t.getMessage());
            }
        });
    }

    public void spotifyUrl(Context context, ConnectionCallback callback) {
        String token = getAuthToken(context);
        Call<AuthUrlResponse> call = apiService.getSpotifyAuthUrl("Bearer " + token);
        call.enqueue(new Callback<AuthUrlResponse>() {
            @Override
            public void onResponse(Call<AuthUrlResponse> call, Response<AuthUrlResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResult(true, response.code(), response.body().getUrl());
                } else {
                    callback.onResult(false, response.code(), null);
                }
            }

            @Override
            public void onFailure(Call<AuthUrlResponse> call, Throwable t) {
                callback.onResult(false, 401, t.getMessage());
            }
        });
    }

    private String getAuthToken(Context context) {
        SharedPreferencesManager preferences = new SharedPreferencesManager(context);
        return preferences.getString("auth_token");
    }

    public interface ConnectionCallback {
        void onResult(boolean success, int code, String data);
    }
}
