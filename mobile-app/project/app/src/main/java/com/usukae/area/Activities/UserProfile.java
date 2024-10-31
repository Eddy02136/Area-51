package com.usukae.area.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.usukae.area.Classes.Auth.User.UserApiProtocol;
import com.usukae.area.Classes.Auth.User.UserResponse;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Utils.ErrorUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

public class UserProfile extends AppCompatActivity {

    private EditText firstNameEditText, lastNameEditText, emailEditText;
    private CardView saveButton;
    private ImageView backButton, logoutButton;
    private SharedPreferencesManager sharedPreferencesManager;
    private boolean isDataChanged = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_profile);

        sharedPreferencesManager = new SharedPreferencesManager(this);

        bindViews();
        loadUserInfo();
        addTextWatchers();

        saveButton.setOnClickListener(v -> saveUserInfo());
        backButton.setOnClickListener(v -> finish());
        logoutButton.setOnClickListener(v -> logout());
    }

    private void bindViews() {
        firstNameEditText = findViewById(R.id.firstName);
        lastNameEditText = findViewById(R.id.lastName);
        emailEditText = findViewById(R.id.email);
        saveButton = findViewById(R.id.save);
        logoutButton = findViewById(R.id.logoutButton);
        backButton = findViewById(R.id.backButton);
    }

    private void loadUserInfo() {
        String firstName = sharedPreferencesManager.getFirstName();
        String lastName = sharedPreferencesManager.getLastName();
        String email = sharedPreferencesManager.getEmail();

        firstNameEditText.setText(firstName);
        lastNameEditText.setText(lastName);
        emailEditText.setText(email);

        saveButton.setVisibility(View.GONE);
    }

    private void addTextWatchers() {
        firstNameEditText.addTextChangedListener(new SimpleTextWatcher() {
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkForChanges();
            }
        });

        lastNameEditText.addTextChangedListener(new SimpleTextWatcher() {
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkForChanges();
            }
        });

        emailEditText.addTextChangedListener(new SimpleTextWatcher() {
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkForChanges();
            }
        });
    }

    private void checkForChanges() {
        String firstName = firstNameEditText.getText().toString();
        String lastName = lastNameEditText.getText().toString();
        String email = emailEditText.getText().toString();

        boolean hasChanged = !firstName.equals(sharedPreferencesManager.getFirstName()) ||
                !lastName.equals(sharedPreferencesManager.getLastName()) ||
                !email.equals(sharedPreferencesManager.getEmail());

        if (hasChanged) {
            saveButton.setVisibility(View.VISIBLE);
            isDataChanged = true;
        } else {
            saveButton.setVisibility(View.GONE);
            isDataChanged = false;
        }
    }

    private void saveUserInfo() {
        if (isDataChanged) {
            String firstName = firstNameEditText.getText().toString();
            String lastName = lastNameEditText.getText().toString();
            String email = emailEditText.getText().toString();

            UserApiProtocol userApiProtocol = new UserApiProtocol(getApplicationContext());
            UserResponse updatedUser = new UserResponse(firstName, lastName, email);
            userApiProtocol.updateUser(new SharedPreferencesManager(getApplicationContext()).getToken(), updatedUser, (user, success, code) -> {
                if (success) {
                    sharedPreferencesManager.saveUserInfo(firstName, lastName, email);
                    saveButton.setVisibility(View.GONE);
                    isDataChanged = false;
                    new PrettyAlert(UserProfile.this).success(getString(R.string.informations_updated), 3000);
                } else {
                    new PrettyAlert(UserProfile.this).error(getString(new ErrorUtil().updateUserInfoError(code)), 3000);
                }
            });
        }
    }

    private void logout() {
        sharedPreferencesManager.clearUserInfo();
        sharedPreferencesManager.resetToken();
        new PrettyAlert(this).success(getString(R.string.success_logout), 3000);
        startActivity(new Intent(getApplicationContext(), AuthActivity.class));
    }

    private abstract static class SimpleTextWatcher implements TextWatcher {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        }

        @Override
        public void afterTextChanged(Editable s) {
        }
    }
}