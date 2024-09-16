package com.usukae.area;

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

@SuppressLint("CustomSplashScreen")
public class SplashActivity extends AppCompatActivity {
    private TextView titleText, subtitleText;
    private LottieAnimationView loadingLottie;

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
        loadingLottie = findViewById(R.id.loadingLottie);
    }

    private void animateView() {
        titleText.startAnimation(AnimationUtils.loadAnimation(this, R.anim.slide_from_left));
        subtitleText.startAnimation(AnimationUtils.loadAnimation(this, R.anim.slide_from_right));
        loadingLottie.startAnimation(AnimationUtils.loadAnimation(this, R.anim.slide_from_bottom));
    }

    private void loginProtocol() {
        setStatus(getString(R.string.loading_account_informations));
    }

    private void navigate() {
        new Handler().postDelayed(() -> {
            startActivity(new Intent(SplashActivity.this, AuthActivity.class));
            finish();
        }, 30000);
    }

    private void setStatus(String newStatus) {
        subtitleText.setText(newStatus);
    }
}
