package com.usukae.area.Activities;

import android.app.Dialog;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Classes.Areas.AreaAdapter;
import com.usukae.area.Classes.Areas.AreasUtil;
import com.usukae.area.Classes.Connections.ConnectionChecker;
import com.usukae.area.Classes.Connections.ConnectionsAdapter;
import com.usukae.area.Classes.Connections.ConnectionsUtil;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.R;

public class MainActivity extends AppCompatActivity {

    private DialogUtil dialogUtil;
    private ConnectionsUtil connectionsUtil;
    private AreasUtil areasUtil;
    private ConnectionChecker connectionChecker;

    private Dialog addAreaDialog, addConnectionDialog;
    private ImageView profilePicture;
    private CardView activesAreas, totalExecutions, addArea, addConnection;
    private TextView userName, activesAreasValue, totalExecutionsValue;
    private RecyclerView connectionsRecyclerView, areasRecyclerView;


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
        bindDialogViews();

        assignButtons();

        initDashboard();
        initAreasList();
        initConnectionsList();

        checkConnections();
    }

    private void createClasses() {
        dialogUtil = new DialogUtil();
        connectionsUtil = new ConnectionsUtil();
        areasUtil = new AreasUtil();
        connectionChecker = new ConnectionChecker(this);
    }

    private void createDialogs() {
        addAreaDialog = dialogUtil.createAddAreaDialog(this);
        addConnectionDialog = dialogUtil.createAddConnectionDialog(this);
    }

    private void bindViews() {
        activesAreas = findViewById(R.id.dashboardCardActive);
        activesAreasValue = findViewById(R.id.dashboardActiveValue);
        totalExecutions = findViewById(R.id.dashboardCardExecutions);
        totalExecutionsValue = findViewById(R.id.dashboardExecutionsValue);
        addArea = findViewById(R.id.noAreasButton);
        addConnection = findViewById(R.id.addConnectionButton);
        userName = findViewById(R.id.userName);
        profilePicture = findViewById(R.id.profileButton);
    }

    private void bindDialogViews() {
        connectionsRecyclerView = addConnectionDialog.findViewById(R.id.connectionsRecyclerView);
        areasRecyclerView = addAreaDialog.findViewById(R.id.areasRecyclerView);
    }

    private void assignButtons() {
        activesAreas.setOnClickListener(v -> {
        });
        totalExecutions.setOnClickListener(v -> {
        });
        addArea.setOnClickListener(v -> addAreaDialog.show());
        addConnection.setOnClickListener(v -> addConnectionDialog.show());
        profilePicture.setOnClickListener(v -> Toast.makeText(this, "@TODO", Toast.LENGTH_SHORT).show());
    }

    private void initDashboard() {
        userName.setText(getString(R.string.benjamin));
        activesAreasValue.setText(String.valueOf(0));
        totalExecutionsValue.setText(String.valueOf(0));
    }

    private void initAreasList() {
        AreaAdapter areaAdapter = new AreaAdapter(this, areasUtil.getAreas());
        areasRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        areasRecyclerView.setAdapter(areaAdapter);
    }

    private void initConnectionsList() {
        ConnectionsAdapter connectionsAdapter = new ConnectionsAdapter(this, connectionsUtil.getConnections(getApplicationContext()));
        connectionsRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        connectionsRecyclerView.setAdapter(connectionsAdapter);
    }

    private void checkConnections() {
        connectionChecker.checkConnections(getApplicationContext());
    }
}
