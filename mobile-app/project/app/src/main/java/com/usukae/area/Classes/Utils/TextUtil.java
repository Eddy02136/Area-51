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

    static public String formatCamelCase(String input) {
        String result = input.replaceAll("(?<!^)([A-Z])", " $1");
        String[] words = result.split(" ");
        StringBuilder formattedString = new StringBuilder();
        for (String word : words) {
            formattedString.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1)).append(" ");
        }
        return formattedString.toString().trim();
    }
}
