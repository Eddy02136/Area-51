package com.usukae.area.Classes.Managers;

import android.content.Context;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.Api.Auth.Login.LoginRequest;
import com.usukae.area.Classes.Api.Auth.Login.LoginResponse;
import com.usukae.area.Classes.Api.Auth.Register.RegisterRequest;
import com.usukae.area.Classes.Api.Auth.Register.RegisterResponse;
import com.usukae.area.Classes.Models.User;
import com.usukae.area.Classes.Utils.SharedPreferencesManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AccountManager {

    private final ApiService apiService;

    public AccountManager() {
        apiService = ApiClient.getClient().create(ApiService.class);
    }

    public void register(Context context, User user, AuthCallback callback) {
        RegisterRequest registerRequest = new RegisterRequest(user);
        Call<RegisterResponse> call = apiService.registerUser(registerRequest);
        call.enqueue(new Callback<RegisterResponse>() {
            @Override
            public void onResponse(Call<RegisterResponse> call, Response<RegisterResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    new SharedPreferencesManager(context).setString("auth_token", response.body().getToken());
                    callback.onResult(true, response.code());
                } else {
                    callback.onResult(false, response.code());
                }
            }

            @Override
            public void onFailure(Call<RegisterResponse> call, Throwable t) {
                callback.onResult(false, 401);
            }
        });
    }

    public void login(Context context, String email, String password, AuthCallback callback) {
        LoginRequest loginRequest = new LoginRequest(email, password);
        Call<LoginResponse> call = apiService.loginUser(loginRequest);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    new SharedPreferencesManager(context).setString("auth_token", response.body().getToken());
                    callback.onResult(true, response.code());
                } else {
                    callback.onResult(false, response.code());
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                callback.onResult(false, 401);
            }
        });
    }

    public void checkToken(Context context, String token, AuthCallback callback) {
        Call<Void> call = apiService.checkTokenUser("Bearer " + token);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                callback.onResult(response.isSuccessful(), response.code());
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                callback.onResult(false, 401);
            }
        });
    }

    public interface AuthCallback {
        void onResult(boolean success, int code);
    }
}