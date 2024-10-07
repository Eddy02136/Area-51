package com.usukae.area.Classes.Api.Auth;

import android.content.Context;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.Api.Auth.Login.LoginRequest;
import com.usukae.area.Classes.Api.Auth.Login.LoginResponse;
import com.usukae.area.Classes.Api.Auth.Register.RegisterRequest;
import com.usukae.area.Classes.Api.Auth.Register.RegisterResponse;
import com.usukae.area.Classes.Managers.AccountManager;
import com.usukae.area.Classes.Utils.SharedPreferencesManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthManager {

    private final ApiService apiService;

    public AuthManager() {
        apiService = ApiClient.getClient().create(ApiService.class);
    }

    public void registerUser(Context context, RegisterRequest registerRequest, AccountManager.AuthCallback authCallback) {
        Call<RegisterResponse> call = apiService.registerUser(registerRequest);
        call.enqueue(new Callback<RegisterResponse>() {
            @Override
            public void onResponse(Call<RegisterResponse> call, Response<RegisterResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    SharedPreferencesManager preferences = new SharedPreferencesManager(context);
                    preferences.setString("auth_token", response.body().getToken());
                    authCallback.onResult(true, response.code());
                } else {
                    authCallback.onResult(false, response.code());
                }
            }

            @Override
            public void onFailure(Call<RegisterResponse> call, Throwable t) {
                authCallback.onResult(false, 401);
            }
        });
    }

    public void loginUser(Context context, LoginRequest loginRequest, AccountManager.AuthCallback authCallback) {
        Call<LoginResponse> call = apiService.loginUser(loginRequest);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    SharedPreferencesManager preferences = new SharedPreferencesManager(context);
                    preferences.setString("auth_token", response.body().getToken());
                    authCallback.onResult(true, response.code());
                } else {
                    authCallback.onResult(false, response.code());
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                authCallback.onResult(false, 401);
            }
        });
    }

    public void checkToken(Context context, String token, AccountManager.AuthCallback authCallback) {
        Call<Void> call = apiService.checkTokenUser("Bearer " + token);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                authCallback.onResult(response.isSuccessful(), response.code());
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                authCallback.onResult(false, 401);
            }
        });
    }
}
