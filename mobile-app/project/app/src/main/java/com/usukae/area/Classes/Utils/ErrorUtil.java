package com.usukae.area.Classes.Utils;

import com.usukae.area.R;

public class ErrorUtil {
    public int getAuthError(int code) {
        switch (code) {
            case 401:
                return R.string.invalid_email_or_password;
            case 404:
                return R.string.server_unreachable;
            case 500:
                return R.string.internal_server_error;
            default:
                return R.string.login_failed;
        }
    }

    public int getRegisterError(int code) {
        switch (code) {
            case 400:
                return R.string.required_field_empty;
            case 401:
                return R.string.invalid_password;
            case 404:
                return R.string.server_unreachable;
            case 500:
                return R.string.internal_server_error;
            default:
                return R.string.registration_failed;
        }
    }

    public int getAuthUrlError(int code) {
        switch (code) {
            case 401:
                return R.string.jwt_problem;
            case 404:
                return R.string.server_unreachable;
            case 500:
                return R.string.internal_server_error;
            default:
                return R.string.login_failed;
        }
    }
}
