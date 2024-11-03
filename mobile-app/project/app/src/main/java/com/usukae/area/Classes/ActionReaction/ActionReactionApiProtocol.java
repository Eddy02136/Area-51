package com.usukae.area.Classes.ActionReaction;

import android.content.Context;

import androidx.annotation.NonNull;

import com.usukae.area.Classes.Actions.Action;
import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Reactions.Reaction;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ActionReactionApiProtocol {

    private final ApiService apiService;

    public ActionReactionApiProtocol(Context context) {
        apiService = ApiClient.getClient(context).create(ApiService.class);
    }

    public void addActionReaction(Context context, ActionReactionRequest request, ActionReactionCallback callback) {
        String token = "Bearer " + getAuthToken(context);
        Call<Void> call = apiService.addActionReaction(token, request);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                callback.onResult(response.isSuccessful(), response.code(), null, null, null, null);
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage(), null, null, null);
            }
        });
    }

    public void getAllActionReactions(Context context, ActionReactionCallback callback) {
        String token = "Bearer " + getAuthToken(context);
        Call<List<ActionReaction>> call = apiService.getAllActionReactions(token);

        call.enqueue(new Callback<List<ActionReaction>>() {
            @Override
            public void onResponse(@NonNull Call<List<ActionReaction>> call, @NonNull Response<List<ActionReaction>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResult(true, response.code(), null, response.body(), null, null);
                } else {
                    callback.onResult(false, response.code(), null, null, null, null);
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<ActionReaction>> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage(), null, null, null);
            }
        });
    }

    public void getActionReactionById(Context context, String id, ActionReactionCallback callback) {
        String token = "Bearer " + getAuthToken(context);
        Call<ActionReaction> call = apiService.getActionReactionById(token, id);

        call.enqueue(new Callback<ActionReaction>() {
            @Override
            public void onResponse(@NonNull Call<ActionReaction> call, @NonNull Response<ActionReaction> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResult(true, response.code(), null, List.of(response.body()), null, null);
                } else {
                    callback.onResult(false, response.code(), null, null, null, null);
                }
            }

            @Override
            public void onFailure(@NonNull Call<ActionReaction> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage(), null, null, null);
            }
        });
    }

    public void updateActionReaction(Context context, String id, ActionReactionRequest request, ActionReactionCallback callback) {
        String token = "Bearer " + getAuthToken(context);
        Call<Void> call = apiService.updateActionReaction(token, id, request);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                callback.onResult(response.isSuccessful(), response.code(), null, null, null, null);
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage(), null, null, null);
            }
        });
    }

    public void deleteActionReaction(Context context, String id, ActionReactionCallback callback) {
        String token = "Bearer " + getAuthToken(context);
        Call<Void> call = apiService.deleteActionReaction(token, id);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                callback.onResult(response.isSuccessful(), response.code(), null, null, null, null);
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage(), null, null, null);
            }
        });
    }

    public void getAllActions(Context context, ActionReactionCallback callback) {
        String token = "Bearer " + getAuthToken(context);
        Call<List<Action>> call = apiService.getAllActions(token);

        call.enqueue(new Callback<List<Action>>() {
            @Override
            public void onResponse(@NonNull Call<List<Action>> call, @NonNull Response<List<Action>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResult(true, response.code(), null, null, response.body(), null);
                } else {
                    callback.onResult(false, response.code(), null, null, null, null);
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<Action>> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage(), null, null, null);
            }
        });
    }

    public void getAllReactions(Context context, ActionReactionCallback callback) {
        String token = "Bearer " + getAuthToken(context);
        Call<List<Reaction>> call = apiService.getAllReactions(token);

        call.enqueue(new Callback<List<Reaction>>() {
            @Override
            public void onResponse(@NonNull Call<List<Reaction>> call, @NonNull Response<List<Reaction>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onResult(true, response.code(), null, null, null, response.body());
                } else {
                    callback.onResult(false, response.code(), null, null, null, null);
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<Reaction>> call, @NonNull Throwable t) {
                callback.onResult(false, 404, t.getMessage(), null, null, null);
            }
        });
    }

    private String getAuthToken(Context context) {
        return new SharedPreferencesManager(context).getToken();
    }

    public interface ActionReactionCallback {
        void onResult(boolean success, int code, String data, List<ActionReaction> list, List<Action> actions, List<Reaction> reactions);
    }
}
