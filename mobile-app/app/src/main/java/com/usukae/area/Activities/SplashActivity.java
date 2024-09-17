package com.usukae.area.Activities;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.AnimationUtils;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.airbnb.lottie.LottieAnimationView;
import com.usukae.area.Activities.Account.AuthActivity;
import com.usukae.area.R;

@SuppressLint("CustomSplashScreen")
public class SplashActivity extends AppCompatActivity {
    private TextView titleText, subtitleText;
    private LottieAnimationView loading;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_splash);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        bindView();
        animateView();
        navigate();
        loginProtocol();
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

    private void loginProtocol() {
        setStatus(getString(R.string.loading_account_informations));
    }

    private void navigate() {
        new Handler().postDelayed(() -> {
            startActivity(new Intent(SplashActivity.this, AuthActivity.class));
            finish();
        }, 3000);
    }

    private void setStatus(String newStatus) {
        subtitleText.setText(newStatus);
    }
}
