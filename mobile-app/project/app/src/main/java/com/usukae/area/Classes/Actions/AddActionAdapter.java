package com.usukae.area.Classes.Actions;

import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Classes.ActionReaction.ActionReactionApiProtocol;
import com.usukae.area.Classes.Reactions.AddReactionAdapter;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AddActionAdapter extends RecyclerView.Adapter<AddActionAdapter.ActionViewHolder> {

    private final Context context;
    private final List<Action> actions;

    private ActionUtil actionUtil;
    private DialogUtil dialogUtil;
    private Dialog newActionDialog;
    private final Dialog mainDialog;

    private List<EditText> inputFields;
    private LinearLayout inputContainer;

    public AddActionAdapter(Context context, List<Action> actions, Dialog mainDialog) {
        this.context = context;
        this.actions = actions;
        this.mainDialog = mainDialog;
        createClasses();
    }

    private void createClasses() {
        actionUtil = new ActionUtil();
        dialogUtil = new DialogUtil();
    }

    @NonNull
    @Override
    public ActionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.area_item, parent, false);
        return new ActionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ActionViewHolder holder, int position) {
        Action action = actions.get(position);
        holder.itemView.setOnClickListener(v -> {
            createDialog(action);
            newActionDialog.show();
        });
        holder.bind(action, actionUtil);
    }

    private void createDialog(Action action) {
        createDialogs();
        initializeInputContainer(action);
        Map<String, String> params = action.getParameters();
        createInputFields(params);
        setupValidateButton(params, action);
    }

    private void createDialogs() {
        newActionDialog = dialogUtil.createBottomDialog(context, R.layout.modal_new_area);
    }

    public String formatCamelCase(String input) {
        String result = input.replaceAll("(?<!^)([A-Z])", " $1");
        String[] words = result.split(" ");
        StringBuilder formattedString = new StringBuilder();
        for (String word : words) {
            formattedString.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1)).append(" ");
        }
        return formattedString.toString().trim();
    }

    private void initializeInputContainer(Action action) {
        TextView dialogTitle = newActionDialog.findViewById(R.id.title);
        TextView dialogSubtitle = newActionDialog.findViewById(R.id.subtitle);
        inputContainer = newActionDialog.findViewById(R.id.inputContainer);
        inputFields = new ArrayList<>();
        inputContainer.removeAllViews();
        dialogTitle.setText(formatCamelCase(action.getName()));
        dialogSubtitle.setText(action.getDescription());
    }

    private void createInputFields(Map<String, String> params) {
        for (Map.Entry<String, String> entry : params.entrySet()) {
            View inputFieldView = LayoutInflater.from(context).inflate(R.layout.input_field_layout, inputContainer, false);
            EditText editText = inputFieldView.findViewById(R.id.editTextInput);
            String key = entry.getKey();
            String capitalizedKey = key.substring(0, 1).toUpperCase() + key.substring(1);

            editText.setHint(formatCamelCase(capitalizedKey));
            inputContainer.addView(inputFieldView);
            inputFields.add(editText);
        }
    }

    private void setupValidateButton(Map<String, String> params, Action action) {
        newActionDialog.findViewById(R.id.validateButton).setOnClickListener(v -> {
            action.setParameters(collectInputValues(params));
            newActionDialog.dismiss();
            proceedToReactionSelection(action);
        });
    }

    private Map<String, String> collectInputValues(Map<String, String> params) {
        Map<String, String> inputValues = new HashMap<>();
        int i = 0;
        for (Map.Entry<String, String> entry : params.entrySet()) {
            inputValues.put(entry.getKey(), inputFields.get(i).getText().toString());
            i++;
        }
        return inputValues;
    }

    private void proceedToReactionSelection(Action action) {
        Dialog reactionDialog = dialogUtil.createBottomDialog(context, R.layout.modal_add_reaction);
        RecyclerView reactionsRecyclerView = reactionDialog.findViewById(R.id.areasRecyclerView);

        new ActionReactionApiProtocol(context).getAllReactions(context, (success, code, data, list, a, r) -> {
            if (success && r != null) {
                AddReactionAdapter addReactionAdapter = new AddReactionAdapter(context, r, action, reactionDialog, newActionDialog, mainDialog);
                reactionsRecyclerView.setLayoutManager(new LinearLayoutManager(context));
                reactionsRecyclerView.setAdapter(addReactionAdapter);
                reactionDialog.show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return actions.size();
    }

    public static class ActionViewHolder extends RecyclerView.ViewHolder {
        private final TextView titleTextView;
        private final TextView descriptionTextView;
        private final ImageView pictureImageView;

        public ActionViewHolder(@NonNull View itemView) {
            super(itemView);
            titleTextView = itemView.findViewById(R.id.areaTitle);
            descriptionTextView = itemView.findViewById(R.id.areaDescription);
            pictureImageView = itemView.findViewById(R.id.areaPicture);
        }

        public void bind(Action action, ActionUtil actionUtil) {
            titleTextView.setText(formatCamelCase(action.getService() + " - " + action.getName()));
            descriptionTextView.setText(action.getDescription());
            pictureImageView.setImageResource(actionUtil.getActionIcon(action.getService()));
        }

        public String formatCamelCase(String input) {
            String result = input.replaceAll("(?<!^)([A-Z])", " $1");
            String[] words = result.split(" ");
            StringBuilder formattedString = new StringBuilder();
            for (String word : words) {
                formattedString.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1)).append(" ");
            }
            return formattedString.toString().trim();
        }
    }
}
