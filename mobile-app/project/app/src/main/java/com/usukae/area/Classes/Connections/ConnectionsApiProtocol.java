package com.usukae.area.Classes.Connections;

import android.content.Context;

import androidx.annotation.NonNull;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.ActionReaction.ActionReactionCallback;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ConnectionsApiProtocol {

    private final ApiService apiService;

    public ConnectionsApiProtocol(Context context) {
        apiService = ApiClient.getClient(context).create(ApiService.class);
    }

    public void getAuthUrlForService(Context context, String serviceUrl, ConnectionCallback callback) {
        Call<ActionReactionCallback> call = apiService.getAuthUrl(serviceUrl, "Bearer " + getAuthToken(context));
        call.enqueue(new Callback<ActionReactionCallback>() {
            @Override
            public void onResponse(@NonNull Call<ActionReactionCallback> call, @NonNull Response<ActionReactionCallback> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResult(true, response.code(), response.body().getUrl());
                } else {
                    callback.onResult(false, response.code(), null);
                }
            }

            @Override
            public void onFailure(@NonNull Call<ActionReactionCallback> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage());
            }
        });
    }

    public void getCheckConnectionService(Context context, String serviceUrl, ConnectionCallback callback) {
        Call<Void> call = apiService.getCheckConnection(serviceUrl, "Bearer " + getAuthToken(context));
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                callback.onResult(response.code() == 200, response.code(), null);
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage());
            }
        });
    }

    public void logoutSpotify(Context context, ConnectionCallback callback) {
        Call<Void> call = apiService.logoutSpotify("Bearer " + getAuthToken(context));
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

    public void logoutGithub(Context context, ConnectionCallback callback) {
        Call<Void> call = apiService.logoutGithub("Bearer " + getAuthToken(context));
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

    public void logoutYoutube(Context context, ConnectionCallback callback) {
        Call<Void> call = apiService.logoutYoutube("Bearer " + getAuthToken(context));
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

    public void logoutTwitch(Context context, ConnectionCallback callback) {
        Call<Void> call = apiService.logoutTwitch("Bearer " + getAuthToken(context));
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

    public void logoutDiscord(Context context, ConnectionCallback callback) {
        Call<Void> call = apiService.logoutDiscord("Bearer " + getAuthToken(context));
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

    public void discordConnected(Context context, ConnectionCallback callback) {
        getCheckConnectionService(context, "/discord/check-connection", callback);
    }

    public void spotifyUrl(Context context, ConnectionCallback callback) {
        getAuthUrlForService(context, "/spotify/auth-url", callback);
    }

    public void spotifyConnected(Context context, ConnectionCallback callback) {
        getCheckConnectionService(context, "/spotify/check-connection", callback);
    }

    public void twitchUrl(Context context, ConnectionCallback callback) {
        getAuthUrlForService(context, "/twitch/auth-url", callback);
    }

    public void twitchConnected(Context context, ConnectionCallback callback) {
        getCheckConnectionService(context, "/twitch/check-connection", callback);
    }

    public void githubUrl(Context context, ConnectionCallback callback) {
        getAuthUrlForService(context, "/github/auth-url", callback);
    }

    public void githubConnected(Context context, ConnectionCallback callback) {
        getCheckConnectionService(context, "/github/check-connection", callback);
    }

    public void youtubeUrl(Context context, ConnectionCallback callback) {
        getAuthUrlForService(context, "/youtube/auth-url", callback);
    }

    public void youtubeConnected(Context context, ConnectionCallback callback) {
        getCheckConnectionService(context, "/youtube/check-connection", callback);
    }

    private String getAuthToken(Context context) {
        return new SharedPreferencesManager(context).getToken();
    }

    public interface ConnectionCallback {
        void onResult(boolean success, int code, String data);
    }
}