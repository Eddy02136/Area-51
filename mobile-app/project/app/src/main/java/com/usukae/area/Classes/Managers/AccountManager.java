package com.usukae.area.Classes.Managers;

import android.content.Context;

import com.usukae.area.Classes.Api.Auth.AuthManager;
import com.usukae.area.Classes.Api.Auth.Login.LoginRequest;
import com.usukae.area.Classes.Api.Auth.Register.RegisterRequest;
import com.usukae.area.Classes.Models.User;

public class AccountManager {

    private final AuthManager authManager;

    public AccountManager() {
        this.authManager = new AuthManager();
    }

    public void register(Context context, User user, AuthCallback callback) {
        RegisterRequest registerRequest = new RegisterRequest(user);
        authManager.registerUser(context, registerRequest, callback);
    }

    public void login(Context context, String email, String password, AuthCallback callback) {
        LoginRequest loginRequest = new LoginRequest(email, password);
        authManager.loginUser(context, loginRequest, callback);
    }

    public void checkToken(Context context, String token, AuthCallback callback) {
        authManager.checkToken(context, token, callback);
    }

    public interface AuthCallback {
        void onResult(boolean success, int code);
    }
}