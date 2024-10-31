package com.usukae.area.Classes.Auth;

import android.content.Context;

import androidx.annotation.NonNull;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.Auth.Login.LoginRequest;
import com.usukae.area.Classes.Auth.Login.LoginResponse;
import com.usukae.area.Classes.Auth.Register.RegisterRequest;
import com.usukae.area.Classes.Auth.Register.RegisterResponse;
import com.usukae.area.Classes.Auth.User.UserRequest;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthApiProtocol {

    private final ApiService apiService;

    public AuthApiProtocol(Context context) {
        apiService = ApiClient.getClient(context).create(ApiService.class);
    }

    public void register(Context context, UserRequest user, AuthCallback callback) {
        RegisterRequest registerRequest = new RegisterRequest(user);
        Call<RegisterResponse> call = apiService.registerUser(registerRequest);
        call.enqueue(new Callback<RegisterResponse>() {
            @Override
            public void onResponse(@NonNull Call<RegisterResponse> call, @NonNull Response<RegisterResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    new SharedPreferencesManager(context).setToken(response.body().getToken());
                    callback.onResult(true, response.code());
                } else {
                    callback.onResult(false, response.code());
                }
            }

            @Override
            public void onFailure(@NonNull Call<RegisterResponse> call, @NonNull Throwable t) {
                callback.onResult(false, 404);
            }
        });
    }

    public void login(Context context, String email, String password, AuthCallback callback) {
        LoginRequest loginRequest = new LoginRequest(email, password);
        Call<LoginResponse> call = apiService.loginUser(loginRequest);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(@NonNull Call<LoginResponse> call, @NonNull Response<LoginResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    new SharedPreferencesManager(context).setToken(response.body().getToken());
                    callback.onResult(true, response.code());
                } else {
                    callback.onResult(false, response.code());
                }
            }

            @Override
            public void onFailure(@NonNull Call<LoginResponse> call, @NonNull Throwable t) {
                callback.onResult(false, 404);
            }
        });
    }

    public void checkToken(String token, AuthCallback callback) {
        Call<Void> call = apiService.checkTokenUser("Bearer " + token);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                callback.onResult(response.isSuccessful(), response.code());
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onResult(false, 404);
            }
        });
    }

    public interface AuthCallback {
        void onResult(boolean success, int code);
    }
}