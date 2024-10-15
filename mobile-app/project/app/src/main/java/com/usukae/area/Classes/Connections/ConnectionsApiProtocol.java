package com.usukae.area.Classes.Connections;

import android.content.Context;

import androidx.annotation.NonNull;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.Areas.AreasAuthUrlResponse;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ConnectionsApiProtocol {

    private final ApiService apiService;

    public ConnectionsApiProtocol() {
        apiService = ApiClient.getClient().create(ApiService.class);
    }

    public void getAuthUrlForService(Context context, String serviceUrl, ConnectionCallback callback) {
        Call<AreasAuthUrlResponse> call = apiService.getAuthUrl(serviceUrl, "Bearer " + getAuthToken(context));
        call.enqueue(new Callback<AreasAuthUrlResponse>() {
            @Override
            public void onResponse(@NonNull Call<AreasAuthUrlResponse> call, @NonNull Response<AreasAuthUrlResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResult(true, response.code(), response.body().getUrl());
                } else {
                    callback.onResult(false, response.code(), null);
                }
            }

            @Override
            public void onFailure(@NonNull Call<AreasAuthUrlResponse> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage());
            }
        });
    }

    public void getCheckConnectionService(Context context, String serviceUrl, ConnectionCallback callback) {
        Call<Void> call = apiService.getCheckConnection(serviceUrl, "Bearer " + getAuthToken(context));
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                callback.onResult(response.isSuccessful(), response.code(), null);
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage());
            }
        });
    }

    public void discordUrl(Context context, ConnectionCallback callback) {
        getAuthUrlForService(context, "/discord/auth-url", callback);
    }

    public void spotifyUrl(Context context, ConnectionCallback callback) {
        getAuthUrlForService(context, "/spotify/auth-url", callback);
    }

    public void discordConnected(Context context, ConnectionCallback callback) {
        getCheckConnectionService(context, "/discord/check-connection", callback);
    }

    public void spotifyConnected(Context context, ConnectionCallback callback) {
        getCheckConnectionService(context, "/spotify/check-connection", callback);
    }

    private String getAuthToken(Context context) {
        SharedPreferencesManager preferences = new SharedPreferencesManager(context);
        return preferences.getString("auth_token");
    }

    public interface ConnectionCallback {
        void onResult(boolean success, int code, String data);
    }
}