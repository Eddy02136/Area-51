package com.usukae.area.Classes.Utils;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.WindowManager;

import com.usukae.area.R;

public class DialogUtil {

    public Dialog createRegisterDialog(Context context) {
        Dialog dialog = new Dialog(context);
        dialog.setContentView(R.layout.modal_email_register);
        if (dialog.getWindow() != null) {
            dialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
            dialog.getWindow().getAttributes().windowAnimations = R.style.DialogAnimation;
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
        dialog.create();
        return dialog;
    }

    public Dialog createLoginDialog(Context context) {
        Dialog dialog = new Dialog(context);
        dialog.setContentView(R.layout.modal_email_login);
        if (dialog.getWindow() != null) {
            dialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
            dialog.getWindow().getAttributes().windowAnimations = R.style.DialogAnimation;
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
        dialog.create();
        return dialog;
    }
}