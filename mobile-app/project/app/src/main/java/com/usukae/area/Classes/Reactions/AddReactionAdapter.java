package com.usukae.area.Classes.Reactions;

import android.app.Activity;
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
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Classes.ActionReaction.ActionReactionApiProtocol;
import com.usukae.area.Classes.ActionReaction.ActionReactionRequest;
import com.usukae.area.Classes.Actions.Action;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AddReactionAdapter extends RecyclerView.Adapter<AddReactionAdapter.ReactionViewHolder> {

    private final Context context;
    private final List<Reaction> reactions;
    private final Action selectedAction;
    private final Dialog reactionDialog;
    private final ActionReactionApiProtocol apiProtocol;

    private ReactionUtil reactionUtil;
    private DialogUtil dialogUtil;
    private Dialog newReactionDialog;

    private List<EditText> inputFields;
    private LinearLayout inputContainer;

    public AddReactionAdapter(Context context, List<Reaction> reactions, Action selectedAction, Dialog reactionDialog) {
        this.context = context;
        this.reactions = reactions;
        this.selectedAction = selectedAction;
        this.reactionDialog = reactionDialog;
        this.apiProtocol = new ActionReactionApiProtocol(context.getApplicationContext());
        createClasses();
    }

    @NonNull
    @Override
    public ReactionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.area_item, parent, false);
        return new ReactionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ReactionViewHolder holder, int position) {
        Reaction reaction = reactions.get(position);
        holder.itemView.setOnClickListener(v -> {
            createDialog(reaction);
            newReactionDialog.show();
        });
        holder.bind(reaction, reactionUtil);
    }

    private void createDialog(Reaction reaction) {
        createDialogs();
        initializeInputContainer(reaction);
        Map<String, String> params = reaction.getParameters();
        createInputFields(params);
        setupValidateButton(params, reaction);
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

    private void createClasses() {
        reactionUtil = new ReactionUtil();
        dialogUtil = new DialogUtil();
    }

    private void createDialogs() {
        newReactionDialog = dialogUtil.createBottomDialog(context, R.layout.modal_new_area);
    }

    private void initializeInputContainer(Reaction reaction) {
        inputContainer = newReactionDialog.findViewById(R.id.inputContainer);
        inputContainer.removeAllViews();

        TextView dialogTitle = newReactionDialog.findViewById(R.id.title);
        dialogTitle.setText(formatCamelCase(reaction.getName()));

        TextView dialogSubtitle = newReactionDialog.findViewById(R.id.subtitle);
        dialogSubtitle.setText(reaction.getDescription());

        inputFields = new ArrayList<>();
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

    private void setupValidateButton(Map<String, String> params, Reaction reaction) {
        newReactionDialog.findViewById(R.id.validateButton).setOnClickListener(v -> {
            reaction.setParameters(collectInputValues(params));
            newReactionDialog.dismiss();
            reactionDialog.dismiss();
            saveArea(selectedAction, reaction);
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

    private void saveArea(Action action, Reaction reaction) {
        Map<String, String> parameters = reaction.getParameters();
        ActionReactionRequest request = new ActionReactionRequest(
                action.getService(),
                action.getName(),
                reaction.getService(),
                reaction.getName(),
                parameters,
                ""
        );

        apiProtocol.addActionReaction(context, request, (success, code, data, list, a, r) -> {
            if (success) {
                new PrettyAlert((Activity) context).success(context.getString(R.string.action_reaction_saved), 3000);
                newReactionDialog.dismiss();
            } else {
                new PrettyAlert((Activity) context).error(context.getString(R.string.error_saving_action_reaction) + code, 3000);
            }
        });
    }

    @Override
    public int getItemCount() {
        return reactions.size();
    }

    public static class ReactionViewHolder extends RecyclerView.ViewHolder {
        private final TextView titleTextView;
        private final TextView descriptionTextView;
        private final ImageView pictureImageView;

        public ReactionViewHolder(@NonNull View itemView) {
            super(itemView);
            titleTextView = itemView.findViewById(R.id.areaTitle);
            descriptionTextView = itemView.findViewById(R.id.areaDescription);
            pictureImageView = itemView.findViewById(R.id.areaPicture);
        }

        public void bind(Reaction reaction, ReactionUtil reactionUtil) {
            titleTextView.setText(formatCamelCase(reaction.getService() + " - " + reaction.getName()));
            descriptionTextView.setText(reaction.getDescription());
            pictureImageView.setImageResource(reactionUtil.getReactionIcon(reaction.getService()));
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