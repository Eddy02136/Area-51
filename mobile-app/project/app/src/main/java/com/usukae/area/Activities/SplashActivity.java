package com.usukae.area.Activities;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.AnimationUtils;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.airbnb.lottie.LottieAnimationView;
import com.usukae.area.Classes.Managers.AccountManager;
import com.usukae.area.Classes.Utils.SharedPreferencesManager;
import com.usukae.area.R;

@SuppressLint("CustomSplashScreen")
public class SplashActivity extends AppCompatActivity {
    private AccountManager accountManager;
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
    }

    private void createClasses() {
        accountManager = new AccountManager();
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
        SharedPreferencesManager preferences = new SharedPreferencesManager(getApplicationContext());
        String token = preferences.getString("auth_token");
        if (token.isEmpty()) {
            open(false);
            return;
        }
        accountManager.checkToken(getApplicationContext(), token, (success, code) -> {
            open(success);
            if (code == 401) {
                preferences.setString("auth_token", "");
            }
        });
    }

    private void open(boolean isLogged) {
        new Handler().postDelayed(() -> {
            startActivity(new Intent(SplashActivity.this, isLogged ? MainActivity.class : AuthActivity.class));
            finish();
        }, 1000);
    }
}
