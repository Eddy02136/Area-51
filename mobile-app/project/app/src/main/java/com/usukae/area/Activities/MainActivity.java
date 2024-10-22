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

import com.usukae.area.Classes.Actions.ActionUtil;
import com.usukae.area.Classes.Actions.AddActionAdapter;
import com.usukae.area.Classes.Areas.Area;
import com.usukae.area.Classes.Areas.AreaAdapter;
import com.usukae.area.Classes.Areas.AreaUtil;
import com.usukae.area.Classes.Connections.AddConnectionAdapter;
import com.usukae.area.Classes.Connections.ConnectionChecker;
import com.usukae.area.Classes.Connections.ConnectionsUtil;
import com.usukae.area.Classes.Connections.DashboardConnectionAdapter;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.R;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    private DialogUtil dialogUtil;
    private ConnectionsUtil connectionsUtil;
    private ActionUtil actionUtil;
    private ConnectionChecker connectionChecker;

    private Dialog addAreaDialog, addConnectionDialog;
    private ImageView profilePicture;
    private CardView activesAreas, totalExecutions, addArea, addConnection;
    private TextView userName, activesAreasValue, totalExecutionsValue;
    private RecyclerView dashboardConnectionsRecyclerView, connectionsRecyclerView, dashboardAreasRecyclerView, areasRecyclerView;


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
        initActionsList();
        initConnectionsList();

        //loadAreas();
        checkConnections();
    }

    private void createClasses() {
        dialogUtil = new DialogUtil();
        connectionsUtil = new ConnectionsUtil();
        actionUtil = new ActionUtil();
        connectionChecker = new ConnectionChecker(this);
    }

    private void createDialogs() {
        addAreaDialog = dialogUtil.createBottomDialog(this, R.layout.modal_add_area);
        addConnectionDialog = dialogUtil.createBottomDialog(this, R.layout.modal_add_connection);
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
        dashboardConnectionsRecyclerView = findViewById(R.id.connectionsList);
        dashboardAreasRecyclerView = findViewById(R.id.areasList);
    }

    private void bindDialogViews() {
        areasRecyclerView = addAreaDialog.findViewById(R.id.areasRecyclerView);
        connectionsRecyclerView = addConnectionDialog.findViewById(R.id.connectionsRecyclerView);
    }

    private void assignButtons() {
        activesAreas.setOnClickListener(v -> Toast.makeText(this, "Actives Areas clicked", Toast.LENGTH_SHORT).show());
        totalExecutions.setOnClickListener(v -> Toast.makeText(this, "Total Executions clicked", Toast.LENGTH_SHORT).show());
        addArea.setOnClickListener(v -> addAreaDialog.show());
        addConnection.setOnClickListener(v -> addConnectionDialog.show());
        profilePicture.setOnClickListener(v -> Toast.makeText(this, "Profile clicked", Toast.LENGTH_SHORT).show());
    }

    private void initDashboard() {
        userName.setText(getString(R.string.benjamin));
        activesAreasValue.setText(String.valueOf(0));
        totalExecutionsValue.setText(String.valueOf(0));
    }

    private void initActionsList() {
        AddActionAdapter addActionAdapter = new AddActionAdapter(this, actionUtil.getActions());
        areasRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        areasRecyclerView.setAdapter(addActionAdapter);
    }

    private void initConnectionsList() {
        AddConnectionAdapter addConnectionAdapter = new AddConnectionAdapter(this, connectionsUtil.getConnections(getApplicationContext()));
        connectionsRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        connectionsRecyclerView.setAdapter(addConnectionAdapter);

        DashboardConnectionAdapter dashboardConnectionAdapter = new DashboardConnectionAdapter(this, connectionsUtil.getStateConnections(getApplicationContext(), "true"));
        dashboardConnectionsRecyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        dashboardConnectionsRecyclerView.setAdapter(dashboardConnectionAdapter);
    }

    private void loadAreas() {
        List<Area> areas = AreaUtil.getAllAreas(getApplicationContext());
        AreaAdapter areaAdapter = new AreaAdapter(this, areas);
        dashboardAreasRecyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        dashboardAreasRecyclerView.setAdapter(areaAdapter);
        activesAreasValue.setText(String.valueOf(areas.size()));
    }

    private void checkConnections() {
        connectionChecker.checkConnections(getApplicationContext());
    }
}