package com.usukae.area.Activities;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.usukae.area.Classes.Api.ApiBaseUrlUtil;
import com.usukae.area.Classes.Auth.AuthApiProtocol;
import com.usukae.area.Classes.Auth.User.UserApiProtocol;
import com.usukae.area.Classes.Auth.User.UserRequest;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.Classes.Utils.ErrorUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.Classes.Utils.TextUtil;
import com.usukae.area.R;

public class AuthActivity extends AppCompatActivity {

    private AuthApiProtocol authApiProtocol;
    private PrettyAlert prettyAlert;
    private ErrorUtil errorUtil;
    private DialogUtil dialogUtil;
    private TextUtil textUtil;

    private ImageView link;
    private EditText editTextLink;
    private Dialog registerDialog, loginDialog, urlDialog;
    private CardView updateUrlButton, loginEmailButton, loginGoogleButton, loginDialogButton, registerDialogButton;
    private TextView reset, registerButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);

        init();
    }

    private void init() {
        createClasses();
        createDialogs();
        bindViews();
        onBackPressedCallback();
    }

    private void createClasses() {
        authApiProtocol = new AuthApiProtocol(getApplicationContext());
        textUtil = new TextUtil();
        dialogUtil = new DialogUtil();
        prettyAlert = new PrettyAlert(this);
        errorUtil = new ErrorUtil();
    }

    private void createDialogs() {
        registerDialog = dialogUtil.createBottomDialog(this, R.layout.modal_email_register);
        loginDialog = dialogUtil.createBottomDialog(this, R.layout.modal_email_login);
        urlDialog = dialogUtil.createBottomDialog(this, R.layout.modal_base_api_url);
        manageDismiss();
    }

    private void manageDismiss() {
        registerDialog.setOnDismissListener(dialogInterface -> {
            EditText editText = registerDialog.findViewById(R.id.firstName);
            editText.setText("");
            editText = registerDialog.findViewById(R.id.lastName);
            editText.setText("");
            editText = registerDialog.findViewById(R.id.email);
            editText.setText("");
            editText = registerDialog.findViewById(R.id.password);
            editText.setText("");
            editText = registerDialog.findViewById(R.id.passwordConfirm);
            editText.setText("");
        });

        loginDialog.setOnDismissListener(dialogInterface -> {
            EditText emailField = loginDialog.findViewById(R.id.email);
            emailField.setText("");
            EditText passwordField = loginDialog.findViewById(R.id.password);
            passwordField.setText("");
        });
    }

    private void bindViews() {
        loginEmailButton = findViewById(R.id.loginEmail);
        loginGoogleButton = findViewById(R.id.loginGoogle);
        registerButton = findViewById(R.id.register);
        loginDialogButton = loginDialog.findViewById(R.id.login);
        registerDialogButton = registerDialog.findViewById(R.id.register);
        link = findViewById(R.id.urlButton);
        editTextLink = urlDialog.findViewById(R.id.password);
        editTextLink.setText(ApiBaseUrlUtil.getBaseUrl(getApplicationContext()));
        reset = urlDialog.findViewById(R.id.reset);
        updateUrlButton = urlDialog.findViewById(R.id.update);
        assignButtons();
    }

    private void assignButtons() {
        loginEmailButton.setOnClickListener(v -> loginDialog.show());
        loginGoogleButton.setOnClickListener(v -> {
        });
        registerButton.setOnClickListener(v -> registerDialog.show());
        loginDialogButton.setOnClickListener(v -> validateLogin());
        registerDialogButton.setOnClickListener(v -> validateRegister());
        link.setOnClickListener(v -> urlDialog.show());
        reset.setOnClickListener(v -> {
            editTextLink.setText(ApiBaseUrlUtil.getDefault());
        });
        updateUrlButton.setOnClickListener(v -> {
            new PrettyAlert(this).success(getString(R.string.base_url_changing), 2000);
            ApiBaseUrlUtil.setBaseUrl(getApplicationContext(), editTextLink.getText().toString().trim());
            new SharedPreferencesManager(getApplicationContext()).clearAllExceptApiBaseUrl();
            urlDialog.dismiss();
            new Handler().postDelayed(() -> {
                new PrettyAlert(this).success(getString(R.string.base_url_changed), 2000);
            }, 2000);
            new Handler().postDelayed(() -> {
                Intent intent = getIntent();
                finish();
                startActivity(intent);
            }, 4000);
        });
    }

    private void validateLogin() {
        String email = textUtil.sanitize(loginDialog.findViewById(R.id.email));
        String password = textUtil.sanitize(loginDialog.findViewById(R.id.password));

        if (invalidateLogin(email, password)) {
            return;
        }
        authApiProtocol.login(this, email, password, (success, code) -> {
            if (success) {
                loadUser(true);
            } else {
                prettyAlert.error(getString(errorUtil.getAuthError(code)), 3000);
            }
        });
    }

    private boolean invalidateLogin(String email, String password) {
        if (!textUtil.isValidEmail(email)) {
            prettyAlert.error(getString(R.string.invalid_email_address), 3000);
            return true;
        }
        if (!textUtil.isValidPassword(password)) {
            prettyAlert.error(getString(R.string.invalid_password), 3000);
            return true;
        }
        return false;
    }

    private void validateRegister() {
        String firstName = textUtil.sanitize(registerDialog.findViewById(R.id.firstName));
        String lastName = textUtil.sanitize(registerDialog.findViewById(R.id.lastName));
        String email = textUtil.sanitize(registerDialog.findViewById(R.id.email));
        String password = textUtil.sanitize(registerDialog.findViewById(R.id.password));
        String passwordConfirm = textUtil.sanitize(registerDialog.findViewById(R.id.passwordConfirm));

        if (invalidateRegister(email, password, passwordConfirm)) {
            return;
        }
        authApiProtocol.register(this, new UserRequest(firstName, lastName, email, password), (success, code) -> {
            if (success) {
                loadUser(false);
            } else {
                prettyAlert.error(getString(errorUtil.getRegisterError(code)), 3000);
            }
        });
    }

    private boolean invalidateRegister(String email, String password, String passwordConfirm) {
        if (!textUtil.isValidEmail(email)) {
            prettyAlert.error(getString(R.string.invalid_email_address), 3000);
            return true;
        }
        if (!textUtil.isValidPassword(password)) {
            prettyAlert.error(getString(R.string.password_length_error), 3000);
            return true;
        }
        if (!password.equals(passwordConfirm)) {
            prettyAlert.error(getString(R.string.passwords_do_not_match), 3000);
            return true;
        }
        return false;
    }

    private void loadUser(boolean isLogin) {
        SharedPreferencesManager sharedPreferencesManager = new SharedPreferencesManager(this);
        UserApiProtocol userApiProtocol = new UserApiProtocol(getApplicationContext());
        userApiProtocol.getInfos(sharedPreferencesManager.getToken(), (user, success, code) -> {
            if (success && user != null) {
                sharedPreferencesManager.saveUserInfo(
                        user.getFirstname(),
                        user.getLastname(),
                        user.getEmail()
                );
                prettyAlert.success(getString(isLogin ? R.string.login_success : R.string.registration_success), 3000);
                startActivity(new Intent(getApplicationContext(), MainActivity.class));
            } else {
                prettyAlert.error(getString(errorUtil.getUserInfoError(code)), 3000);
            }
        });
    }

    private void onBackPressedCallback() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
                @Override
                public void handleOnBackPressed() {
                }
            });
        }
    }

    @SuppressLint("MissingSuperCall")
    @Override
    public void onBackPressed() {
    }
}
