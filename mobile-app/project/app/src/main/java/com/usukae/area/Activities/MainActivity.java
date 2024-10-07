package com.usukae.area.Activities;

import android.app.Dialog;
import android.os.Bundle;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.R;

public class MainActivity extends AppCompatActivity {

    private DialogUtil dialogUtil;
    private Dialog addAreaDialog;
    private ImageView profilePicture;
    private CardView activesAreas, totalExecutions, addArea;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        createClasses();
        createDialogs();
        bindViews();
        assignButtons();
    }

    private void createClasses() {
        dialogUtil = new DialogUtil();
    }

    private void createDialogs() {
        addAreaDialog = dialogUtil.createAddAreaDialog(this);
    }

    private void bindViews() {
        activesAreas = findViewById(R.id.dashboardCardActive);
        totalExecutions = findViewById(R.id.dashboardCardExecutions);
        addArea = findViewById(R.id.noAreasButton);
    }

    private void assignButtons() {
        activesAreas.setOnClickListener(v -> {

        });
        totalExecutions.setOnClickListener(v -> {

        });
        addArea.setOnClickListener(v -> addAreaDialog.show());
    }
}
