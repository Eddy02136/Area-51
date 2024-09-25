package com.usukae.area.Classes.Managers;

import com.usukae.area.Classes.Models.User;

public class AccountManager {

    public void register(User user, AuthCallback callback) {
        callback.onResult(true);
    }

    public void login(String email, String password, AuthCallback callback) {
        callback.onResult(true);
    }

    public interface AuthCallback {
        void onResult(boolean success);
    }
}
