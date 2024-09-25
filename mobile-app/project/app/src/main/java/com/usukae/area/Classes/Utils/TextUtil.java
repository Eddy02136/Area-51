package com.usukae.area.Classes.Utils;

import android.util.Patterns;
import android.widget.EditText;

public class TextUtil {

    public String sanitize(EditText editText) {
        return editText.getText().toString().trim();
    }

    public boolean isValidEmail(String email) {
        return Patterns.EMAIL_ADDRESS.matcher(email).matches();
    }

    public boolean isValidPassword(String password) {
        return password.length() >= 5 && password.length() <= 25;
    }
}
