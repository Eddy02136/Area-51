package com.usukae.area.Activities.Account;

import android.app.Dialog;
import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

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
        EdgeToEdge.enable(this);
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

        if (!textUtil.isValidEmail(email)) {
            prettyAlert.error("Invalid Email Address", 3000);
            return;
        }
        if (!textUtil.isValidPassword(password)) {
            prettyAlert.error("Invalid Password", 3000);
            return;
        }

        accountManager.login(email, password, success -> {
            if (success) {
                prettyAlert.success("Login Success", 3000);
                loginDialog.dismiss();
            } else {
                prettyAlert.error("Login Failed", 3000);
            }
        });
    }

    private void validateRegister() {
        String firstName = textUtil.sanitize(registerDialog.findViewById(R.id.firstName));
        String lastName = textUtil.sanitize(registerDialog.findViewById(R.id.lastName));
        String email = textUtil.sanitize(registerDialog.findViewById(R.id.email));
        String password = textUtil.sanitize(registerDialog.findViewById(R.id.password));
        String passwordConfirm = textUtil.sanitize(registerDialog.findViewById(R.id.passwordConfirm));

        if (!textUtil.isValidEmail(email)) {
            prettyAlert.error("Invalid Email Address", 3000);
            return;
        }
        if (!textUtil.isValidPassword(password)) {
            prettyAlert.error("Password must be between 5 and 25 characters", 3000);
            return;
        }
        if (!password.equals(passwordConfirm)) {
            prettyAlert.error("Passwords do not match", 3000);
            return;
        }
        accountManager.register(new User(firstName, lastName, email, password), success -> {
            if (success) {
                prettyAlert.success("Registration Success", 3000);
                registerDialog.dismiss();
            } else {
                prettyAlert.error("Registration Failed", 3000);
            }
        });
    }
}