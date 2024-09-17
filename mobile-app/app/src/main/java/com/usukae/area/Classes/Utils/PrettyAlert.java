package com.usukae.area.Classes.Utils;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Handler;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.cardview.widget.CardView;

import com.usukae.area.R;

public class PrettyAlert {

    private final Activity activity;
    private final View alertView;
    private final CardView alertCardView;
    private final TextView alertTextView;
    private final ImageView alertIcon;
    private AlertDialog dialog;
    private final Handler handler;
    private final Runnable hideRunnable;

    @SuppressLint("InflateParams")
    public PrettyAlert(Activity activity) {
        this.activity = activity;

        LayoutInflater inflater = activity.getLayoutInflater();
        alertView = inflater.inflate(R.layout.layout_pretty_alert, null);

        alertCardView = alertView.findViewById(R.id.alertCardView);
        alertTextView = alertView.findViewById(R.id.alertTextView);
        alertIcon = alertView.findViewById(R.id.alertIcon);

        handler = new Handler();
        hideRunnable = this::dismissDialog;
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
        showDialog();
        handler.removeCallbacks(hideRunnable);
        handler.postDelayed(hideRunnable, duration);
    }

    private void showDialog() {
        if (dialog == null || !dialog.isShowing()) {
            AlertDialog.Builder builder = new AlertDialog.Builder(activity);
            builder.setView(alertView);
            dialog = builder.create();

            if (dialog.getWindow() != null) {
                dialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
                dialog.getWindow().getAttributes().windowAnimations = R.style.DialogAnimation;
                dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

                WindowManager.LayoutParams params = dialog.getWindow().getAttributes();
                params.gravity = Gravity.CENTER;
                dialog.getWindow().setAttributes(params);
            }

            alertView.setVisibility(View.VISIBLE);
            dialog.show();

            Animation slideUp = AnimationUtils.loadAnimation(activity, R.anim.dialog_exit_slide);
            alertView.startAnimation(slideUp);
        }
    }

    public void dismissDialog() {
        if (dialog != null && dialog.isShowing()) {
            Animation slideDown = AnimationUtils.loadAnimation(activity, R.anim.dialog_enter_slide);
            alertView.startAnimation(slideDown);
            alertView.postDelayed(() -> dialog.dismiss(), slideDown.getDuration());
        }
    }
}