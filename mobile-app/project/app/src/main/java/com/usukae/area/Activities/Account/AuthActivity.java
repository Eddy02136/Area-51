package com.usukae.area.Activities.Account;

import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.usukae.area.Activities.MainActivity;
import com.usukae.area.Classes.Managers.AccountManager;
import com.usukae.area.Classes.Models.User;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.Classes.Utils.TextUtil;
import com.usukae.area.R;

public class AuthActivity extends AppCompatActivity {

    private AccountManager accountManager;
    private TextUtil textUtil;
    private DialogUtil dialogUtil;
    private PrettyAlert prettyAlert;

    private CardView loginEmailButton, loginGoogleButton, loginDialogButton, registerDialogButton;
    private TextView registerButton;
    private Dialog registerDialog, loginDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);

        createClasses();
        createDialogs();
        bindViews();
        assignButtons();
    }

    private void createClasses() {
        accountManager = new AccountManager();
        textUtil = new TextUtil();
        dialogUtil = new DialogUtil();
        prettyAlert = new PrettyAlert(this);
    }

    private void createDialogs() {
        registerDialog = dialogUtil.createRegisterDialog(this);
        loginDialog = dialogUtil.createLoginDialog(this);
    }

    private void bindViews() {
        loginEmailButton = findViewById(R.id.loginEmail);
        loginGoogleButton = findViewById(R.id.loginGoogle);
        registerButton = findViewById(R.id.register);
        loginDialogButton = loginDialog.findViewById(R.id.login);
        registerDialogButton = registerDialog.findViewById(R.id.register);
    }

    private void assignButtons() {
        loginEmailButton.setOnClickListener(v -> loginDialog.show());
        loginGoogleButton.setOnClickListener(v -> {
        });
        registerButton.setOnClickListener(v -> registerDialog.show());
        loginDialogButton.setOnClickListener(v -> validateLogin());
        registerDialogButton.setOnClickListener(v -> validateRegister());
    }

    private void validateLogin() {
        String email = textUtil.sanitize(loginDialog.findViewById(R.id.email));
        String password = textUtil.sanitize(loginDialog.findViewById(R.id.password));

        if (invalidateLogin(email, password)) {
            return;
        }
        accountManager.login(this, email, password, (success, code) -> {
            if (success) {
                prettyAlert.success(getString(R.string.login_success), 3000);
                loginDialog.dismiss();
                startActivity(new Intent(getApplicationContext(), MainActivity.class));
                finish();
            } else {
                prettyAlert.error(getString(R.string.login_failed), 3000);
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
        accountManager.register(this, new User(firstName, lastName, email, password), (success, code) -> {
            if (success) {
                prettyAlert.success(getString(R.string.registration_success), 3000);
                registerDialog.dismiss();
                startActivity(new Intent(getApplicationContext(), MainActivity.class));
                finish();
            } else {
                prettyAlert.error(getString(R.string.registration_failed), 3000);
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
}
