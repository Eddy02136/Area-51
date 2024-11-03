package com.usukae.area.Activities;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.AnimationUtils;
import android.widget.TextView;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;

import com.airbnb.lottie.LottieAnimationView;
import com.usukae.area.Classes.Auth.AuthApiProtocol;
import com.usukae.area.Classes.Auth.User.UserApiProtocol;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Utils.ErrorUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

@SuppressLint("CustomSplashScreen")
public class SplashActivity extends AppCompatActivity {

    private AuthApiProtocol authApiProtocol;

    private TextView titleText, subtitleText;
    private LottieAnimationView loading;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        createClasses();
        bindView();
        animateView();
        checkToken();
        onBackPressedCallback();
    }

    private void createClasses() {
        authApiProtocol = new AuthApiProtocol(getApplicationContext());
    }

    private void bindView() {
        titleText = findViewById(R.id.title);
        subtitleText = findViewById(R.id.subtitle);
        loading = findViewById(R.id.loading);
    }

    private void animateView() {
        titleText.startAnimation(AnimationUtils.loadAnimation(this, R.anim.slide_from_left));
        subtitleText.startAnimation(AnimationUtils.loadAnimation(this, R.anim.slide_from_right));
        loading.startAnimation(AnimationUtils.loadAnimation(this, R.anim.slide_from_bottom));
    }

    private void checkToken() {
        SharedPreferencesManager sharedPreferencesManager = new SharedPreferencesManager(getApplicationContext());
        String token = sharedPreferencesManager.getToken();
        if (token.isEmpty()) {
            open(false);
            return;
        }
        authApiProtocol.checkToken(token, (success, code) -> {
            setToken(code, sharedPreferencesManager);
            loadUser(token, sharedPreferencesManager);
        });
    }

    private void open(boolean isLogged) {
        new Handler().postDelayed(() -> {
            startActivity(new Intent(getApplicationContext(), isLogged ? MainActivity.class : AuthActivity.class));
        }, 1000);
    }

    private void setToken(int code, SharedPreferencesManager sharedPreferencesManager) {
        if (code == 401) {
            sharedPreferencesManager.resetToken();
        }
    }

    private void loadUser(String token, SharedPreferencesManager sharedPreferencesManager) {
        UserApiProtocol userApiProtocol = new UserApiProtocol(getApplicationContext());
        userApiProtocol.getInfos(token, (user, success, code) -> {
            if (success && user != null) {
                sharedPreferencesManager.saveUserInfo(
                        user.getFirstname(),
                        user.getLastname(),
                        user.getEmail()
                );
            } else {
                new PrettyAlert(this).error(getString(new ErrorUtil().getUserInfoError(code)), 3000);
            }
            open(success);
        });
    }

    private void onBackPressedCallback() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
                @Override
                public void handleOnBackPressed() {
                }
            });
        }
    }

    @SuppressLint("MissingSuperCall")
    @Override
    public void onBackPressed() {
    }
}
