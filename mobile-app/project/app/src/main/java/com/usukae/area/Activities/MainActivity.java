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
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Classes.ActionReaction.ActionReactionAdapter;
import com.usukae.area.Classes.ActionReaction.ActionReactionApiProtocol;
import com.usukae.area.Classes.Actions.AddActionAdapter;
import com.usukae.area.Classes.Api.ApiBaseUrlUtil;
import com.usukae.area.Classes.Connections.AddConnectionAdapter;
import com.usukae.area.Classes.Connections.ConnectionChecker;
import com.usukae.area.Classes.Connections.ConnectionsUtil;
import com.usukae.area.Classes.Connections.DashboardConnectionAdapter;
import com.usukae.area.Classes.Managers.SharedPreferencesManager;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

public class MainActivity extends AppCompatActivity implements AddConnectionAdapter.ConnectionAddedCallback {

    private DialogUtil dialogUtil;
    private ConnectionsUtil connectionsUtil;
    private ConnectionChecker connectionChecker;
    private SharedPreferencesManager sharedPreferencesManager;

    private Dialog addAreaDialog, addConnectionDialog, urlDialog;
    private ImageView profilePicture, link;
    private CardView addArea, addConnection, updateUrlButton;
    private EditText editTextLink;
    private TextView reset, userName, activesAreasValue, totalExecutionsValue;
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
        checkConnections();
        onBackPressedCallback();
    }

    private void createClasses() {
        dialogUtil = new DialogUtil();
        connectionsUtil = new ConnectionsUtil();
        connectionChecker = new ConnectionChecker(this);
        sharedPreferencesManager = new SharedPreferencesManager(this);
    }

    private void createDialogs() {
        addAreaDialog = dialogUtil.createBottomDialog(this, R.layout.modal_add_area);
        addConnectionDialog = dialogUtil.createBottomDialog(this, R.layout.modal_add_connection);
        urlDialog = dialogUtil.createBottomDialog(this, R.layout.modal_base_api_url);
    }

    private void bindViews() {
        activesAreasValue = findViewById(R.id.dashboardActiveValue);
        totalExecutionsValue = findViewById(R.id.dashboardExecutionsValue);
        addArea = findViewById(R.id.noAreasButton);
        addConnection = findViewById(R.id.addConnectionButton);
        userName = findViewById(R.id.userName);
        link = findViewById(R.id.urlButton);
        profilePicture = findViewById(R.id.profileButton);
        dashboardConnectionsRecyclerView = findViewById(R.id.connectionsList);
        dashboardAreasRecyclerView = findViewById(R.id.areasList);
    }

    private void bindDialogViews() {
        areasRecyclerView = addAreaDialog.findViewById(R.id.areasRecyclerView);
        connectionsRecyclerView = addConnectionDialog.findViewById(R.id.connectionsRecyclerView);
        editTextLink = urlDialog.findViewById(R.id.password);
        editTextLink.setText(ApiBaseUrlUtil.getBaseUrl(getApplicationContext()));
        updateUrlButton = urlDialog.findViewById(R.id.update);
        reset = urlDialog.findViewById(R.id.reset);
    }

    @Override
    public void onConnectionAdded() {
        initConnectionsList();
    }

    private void assignButtons() {
        addArea.setOnClickListener(v -> addAreaDialog.show());
        addConnection.setOnClickListener(v -> {
            AddConnectionAdapter addConnectionAdapter = new AddConnectionAdapter(this, connectionsUtil.getConnections(getApplicationContext()), this);
            connectionsRecyclerView.setLayoutManager(new LinearLayoutManager(this));
            connectionsRecyclerView.setAdapter(addConnectionAdapter);
            addConnectionDialog.show();
        });
        profilePicture.setOnClickListener(v -> startActivity(new Intent(getApplicationContext(), UserProfile.class)));
        link.setOnClickListener(v -> urlDialog.show());
        reset.setOnClickListener(v -> {
            editTextLink.setText(ApiBaseUrlUtil.getDefault());
        });
        updateUrlButton.setOnClickListener(v -> {
            new PrettyAlert(this).success(getString(R.string.base_url_changing), 1000);
            ApiBaseUrlUtil.setBaseUrl(getApplicationContext(), editTextLink.getText().toString().trim());
            new SharedPreferencesManager(getApplicationContext()).clearAllExceptApiBaseUrl();
            urlDialog.dismiss();
            new Handler().postDelayed(() -> {
                new PrettyAlert(this).success(getString(R.string.base_url_changed), 500);
            }, 1500);
            new Handler().postDelayed(() -> {
                Intent intent = getIntent();
                finish();
                startActivity(intent);
            }, 2500);
        });
    }

    private void initDashboard() {
        userName.setText(sharedPreferencesManager.getFirstName());
        activesAreasValue.setText(String.valueOf(0));
        totalExecutionsValue.setText(String.valueOf(0));
    }

    private void initActionsList() {
        ActionReactionApiProtocol apiProtocol = new ActionReactionApiProtocol(getApplicationContext());
        apiProtocol.getAllActions(getApplicationContext(), (success, code, data, list, actionsList, reactionsList) -> {
            if (success && actionsList != null) {
                AddActionAdapter addActionAdapter = new AddActionAdapter(this, actionsList, addAreaDialog);
                areasRecyclerView.setLayoutManager(new LinearLayoutManager(this));
                areasRecyclerView.setAdapter(addActionAdapter);
            }
        });
    }

    private void initConnectionsList() {
        DashboardConnectionAdapter dashboardConnectionAdapter = new DashboardConnectionAdapter(this, connectionsUtil.getStateConnections(getApplicationContext(), "true"));
        dashboardConnectionsRecyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        dashboardConnectionsRecyclerView.setAdapter(dashboardConnectionAdapter);
    }

    private void loadAreas() {
        ActionReactionApiProtocol apiProtocol = new ActionReactionApiProtocol(getApplicationContext());
        apiProtocol.getAllActionReactions(this, (success, code, data, actionReactions, a, r) -> {
            if (success) {
                ActionReactionAdapter actionReactionAdapter = new ActionReactionAdapter(this, actionReactions);
                dashboardAreasRecyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
                dashboardAreasRecyclerView.setAdapter(actionReactionAdapter);
                activesAreasValue.setText(String.valueOf(actionReactions.size()));
            }
        });
    }

    private void checkConnections() {
        connectionChecker.checkConnections(getApplicationContext(), () -> {
            initDashboard();
            initActionsList();
            initConnectionsList();
            loadAreas();
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