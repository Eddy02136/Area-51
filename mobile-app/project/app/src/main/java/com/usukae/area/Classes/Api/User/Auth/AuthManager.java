package com.usukae.area.Classes.Api.User.Auth;

import android.content.Context;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.Api.User.Login.LoginRequest;
import com.usukae.area.Classes.Api.User.Login.LoginResponse;
import com.usukae.area.Classes.Api.User.Register.RegisterRequest;
import com.usukae.area.Classes.Api.User.Register.RegisterResponse;
import com.usukae.area.Classes.Managers.AccountManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthManager {

    private final ApiService apiService;

    public AuthManager() {
        apiService = ApiClient.getClient().create(ApiService.class);
    }

    public void registerUser(Context context, RegisterRequest registerRequest, AccountManager.AuthCallback callback) {
        Call<RegisterResponse> call = apiService.registerUser(registerRequest);
        call.enqueue(new Callback<RegisterResponse>() {
            @Override
            public void onResponse(Call<RegisterResponse> call, Response<RegisterResponse> response) {
                if (response.isSuccessful()) {
                    String token = response.body().getToken();
                    callback.onResult(true);
                } else {
                    callback.onResult(false);
                }
            }

            @Override
            public void onFailure(Call<RegisterResponse> call, Throwable t) {
                callback.onResult(false);
            }
        });
    }

    public void loginUser(Context context, LoginRequest loginRequest, AccountManager.AuthCallback callback) {
        Call<LoginResponse> call = apiService.loginUser(loginRequest);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    String token = response.body().getToken();
                    callback.onResult(true);
                } else {
                    callback.onResult(false);
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                callback.onResult(false);
            }
        });
    }
}
