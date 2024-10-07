package com.usukae.area.Classes.Api.Auth;

import android.content.Context;
import android.widget.Toast;

import com.usukae.area.Classes.Api.ApiClient;
import com.usukae.area.Classes.Api.ApiService;
import com.usukae.area.Classes.Api.Login.LoginRequest;
import com.usukae.area.Classes.Api.Login.LoginResponse;
import com.usukae.area.Classes.Api.Register.CreateUserDto;
import com.usukae.area.Classes.Managers.AccountManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthManager {

    private final ApiService apiService;

    public AuthManager() {
        apiService = ApiClient.getClient().create(ApiService.class);
    }

    public void registerUser(Context context, CreateUserDto userDto, AccountManager.AuthCallback callback) {
        Call<Void> call = apiService.registerUser(userDto);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    callback.onResult(true);
                } else {
                    callback.onResult(false);
                }
                Toast.makeText(context, ""+response.message(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                callback.onResult(false);
                Toast.makeText(context, ""+t.getMessage(), Toast.LENGTH_SHORT).show();
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
