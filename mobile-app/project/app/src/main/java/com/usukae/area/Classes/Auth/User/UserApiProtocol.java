package com.usukae.area.Classes.Auth.User;

import android.content.Context;

import androidx.annotation.NonNull;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserApiProtocol {

    private final ApiService apiService;

    public UserApiProtocol(Context context) {
        apiService = ApiClient.getClient(context).create(ApiService.class);
    }

    public void getInfos(String token, UserCallback callback) {
        Call<UserResponse> call = apiService.getUserInfo("Bearer " + token);
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(@NonNull Call<UserResponse> call, @NonNull Response<UserResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    UserResponse user = response.body();
                    callback.onResult(user, true, response.code());
                } else {
                    callback.onResult(null, false, response.code());
                }
            }

            @Override
            public void onFailure(@NonNull Call<UserResponse> call, @NonNull Throwable t) {
                callback.onResult(null, false, 404);
            }
        });
    }

    public void updateUser(String token, UserResponse user, UserCallback callback) {
        Call<Void> call = apiService.updateUser("Bearer " + token, user);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                callback.onResult(null, response.isSuccessful(), response.code());
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onResult(null, false, 404);
            }
        });
    }

    public interface UserCallback {
        void onResult(UserResponse user, boolean success, int code);
    }
}