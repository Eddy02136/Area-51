package com.usukae.area.Classes.Managers;

import android.content.Context;

import com.usukae.area.Classes.Api.Auth.AuthManager;
import com.usukae.area.Classes.Api.Login.LoginRequest;
import com.usukae.area.Classes.Api.Register.CreateUserDto;
import com.usukae.area.Classes.Models.User;

public class AccountManager {

    private final AuthManager authManager;

    public AccountManager() {
        this.authManager = new AuthManager();
    }

    public void register(Context context, User user, AuthCallback callback) {
        CreateUserDto userDto = new CreateUserDto(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
        authManager.registerUser(context, userDto, callback);
    }

    public void login(Context context, String email, String password, AuthCallback callback) {
        LoginRequest loginRequest = new LoginRequest(email, password);
        authManager.loginUser(context, loginRequest, callback);
    }

    public interface AuthCallback {
        void onResult(boolean success);
    }
}