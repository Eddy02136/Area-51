package com.usukae.area.Activities;

import android.app.Dialog;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.R;

public class MainActivity extends AppCompatActivity {

    private DialogUtil dialogUtil;
    private Dialog addAreaDialog;
    private ImageView profilePicture;
    private CardView activesAreas, totalExecutions, addArea;
    private TextView userName, activesAreasValue, totalExecutionsValue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();
    }

    private void init() {
        createClasses();
        createDialogs();
        bindViews();
    }

    private void createClasses() {
        dialogUtil = new DialogUtil();
    }

    private void createDialogs() {
        addAreaDialog = dialogUtil.createAddAreaDialog(this);
    }

    private void bindViews() {
        activesAreas = findViewById(R.id.dashboardCardActive);
        activesAreasValue = findViewById(R.id.dashboardActiveValue);
        totalExecutions = findViewById(R.id.dashboardCardExecutions);
        totalExecutionsValue = findViewById(R.id.dashboardExecutionsValue);
        addArea = findViewById(R.id.noAreasButton);
        userName = findViewById(R.id.userName);
        assignButtons();
        setValues();
    }

    private void assignButtons() {
        activesAreas.setOnClickListener(v -> {
        });
        totalExecutions.setOnClickListener(v -> {
        });
        addArea.setOnClickListener(v -> addAreaDialog.show());
    }

    private void setValues() {
        userName.setText("NULL");
        activesAreasValue.setText("" + getActiveAreas());
        totalExecutionsValue.setText("" + getTotalExecutions());
    }

    private int getActiveAreas() {
        return 0;
    }

    private int getTotalExecutions() {
        return 0;
    }
}
