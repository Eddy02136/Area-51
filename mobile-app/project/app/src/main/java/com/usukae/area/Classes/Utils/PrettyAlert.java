package com.usukae.area.Classes.Utils;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Handler;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.core.content.ContextCompat;

import com.usukae.area.R;

public class PrettyAlert {

    private final Activity activity;

    @SuppressLint("InflateParams")
    public PrettyAlert(Activity activity) {
        this.activity = activity;
    }

    private Dialog createDialog(long time) {
        Dialog dialog = new Dialog(activity);
        dialog.setContentView(R.layout.layout_pretty_alert);
        if (dialog.getWindow() != null) {
            dialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
            dialog.getWindow().getAttributes().windowAnimations = R.style.DialogAnimation;
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
        dialog.create();
        new Handler().postDelayed(dialog::dismiss, time);
        return dialog;
    }

    public void success(String message, long time) {
        Dialog dialog = createDialog(time);

        ImageView imageView = dialog.findViewById(R.id.alertIcon);
        imageView.setImageResource(R.drawable.ic_check_circle);
        imageView.setColorFilter(ContextCompat.getColor(activity, R.color.success));

        TextView textView = dialog.findViewById(R.id.alertTextView);
        textView.setText(message);
        textView.setTextColor(ContextCompat.getColor(activity, R.color.success));

        dialog.show();
    }

    public void error(String message, long time) {
        Dialog dialog = createDialog(time);

        ImageView imageView = dialog.findViewById(R.id.alertIcon);
        imageView.setImageResource(R.drawable.ic_xmark);
        imageView.setColorFilter(ContextCompat.getColor(activity, R.color.error));

        TextView textView = dialog.findViewById(R.id.alertTextView);
        textView.setText(message);
        textView.setTextColor(ContextCompat.getColor(activity, R.color.error));

        dialog.show();
    }
}