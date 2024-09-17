package com.usukae.area.Classes.Utils;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.cardview.widget.CardView;

import com.usukae.area.R;

public class PrettyAlert {

    private final Activity activity;
    private final View alertView;
    private final CardView alertCardView;
    private final TextView alertTextView;
    private final ImageView alertIcon;

    @SuppressLint("InflateParams")
    public PrettyAlert(Activity activity) {
        this.activity = activity;

        LayoutInflater inflater = activity.getLayoutInflater();
        alertView = inflater.inflate(R.layout.layout_pretty_alert, null);

        alertCardView = alertView.findViewById(R.id.alertCardView);
        alertTextView = alertView.findViewById(R.id.alertTextView);
        alertIcon = alertView.findViewById(R.id.alertIcon);

        activity.addContentView(alertView, new CardView.LayoutParams(
                CardView.LayoutParams.MATCH_PARENT,
                CardView.LayoutParams.WRAP_CONTENT));

        alertView.setVisibility(View.GONE);
    }

    public void success(String message, int duration) {
        showAlert(message, duration, R.drawable.check_circle, R.color.success);
    }

    public void error(String message, int duration) {
        showAlert(message, duration, R.drawable.circle_xmark, R.color.error);
    }

    private void showAlert(String message, int duration, int iconRes, int bgColorRes) {
        alertTextView.setText(message);
        alertIcon.setImageResource(iconRes);
        alertCardView.setCardBackgroundColor(activity.getResources().getColor(bgColorRes));

        Animation slideUp = AnimationUtils.loadAnimation(activity, R.anim.dialog_exit_slide);
        alertView.setVisibility(View.VISIBLE);
        alertView.startAnimation(slideUp);

        new Handler().postDelayed(() -> {
            Animation slideDown = AnimationUtils.loadAnimation(activity, R.anim.dialog_enter_slide);
            alertView.startAnimation(slideDown);
            alertView.setVisibility(View.GONE);
        }, duration);
    }
}