package com.usukae.area.Classes.ActionReaction;

import static com.usukae.area.Classes.Utils.TextUtil.formatCamelCase;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.usukae.area.Classes.Actions.ActionUtil;
import com.usukae.area.Classes.Reactions.ReactionUtil;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ActionReactionAdapter extends RecyclerView.Adapter<ActionReactionAdapter.ActionReactionViewHolder> {

    private final Context context;
    private final List<ActionReaction> actionReactions;
    private final DialogUtil dialogUtil;

    private final OnAreaChangeListener onAreaChangeListener;

    public interface OnAreaChangeListener {
        void onAreaChanged();
    }

    public ActionReactionAdapter(Context context, List<ActionReaction> actionReactions, OnAreaChangeListener onAreaChangeListener) {
        this.context = context;
        this.actionReactions = actionReactions;
        this.dialogUtil = new DialogUtil();
        this.onAreaChangeListener = onAreaChangeListener;
    }

    @NonNull
    @Override
    public ActionReactionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.area_item_dashboard, parent, false);
        return new ActionReactionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ActionReactionViewHolder holder, int position) {
        ActionReaction actionReaction = actionReactions.get(position);
        holder.bind(actionReaction);

        holder.itemView.setOnClickListener(v -> openBottomSheetDialog(actionReaction, position));
    }

    private void openBottomSheetDialog(ActionReaction actionReaction, int position) {
        Dialog bottomSheetDialog = dialogUtil.createBottomDialog(context, R.layout.modal_edit_area);

        ImageView actionImage = bottomSheetDialog.findViewById(R.id.actionImage);
        TextView actionTitle = bottomSheetDialog.findViewById(R.id.actionTitle);
        TextView actionSubtitle = bottomSheetDialog.findViewById(R.id.actionSubtitle);
        ImageView reactionImage = bottomSheetDialog.findViewById(R.id.reactionImage);
        TextView reactionTitle = bottomSheetDialog.findViewById(R.id.reactionTitle);
        TextView reactionSubtitle = bottomSheetDialog.findViewById(R.id.reactionSubtitle);
        LinearLayout inputContainer = bottomSheetDialog.findViewById(R.id.inputContainer);

        CardView updateButton = bottomSheetDialog.findViewById(R.id.validateButton);
        updateButton.setOnClickListener(v -> updateActionReaction(actionReaction, bottomSheetDialog, inputContainer));

        CardView deleteButton = bottomSheetDialog.findViewById(R.id.deleteButton);
        deleteButton.setOnClickListener(v -> deleteActionReaction(actionReaction, bottomSheetDialog, position));

        ActionUtil actionUtil = new ActionUtil();
        ReactionUtil reactionUtil = new ReactionUtil();

        actionTitle.setText(formatCamelCase(actionReaction.getActionName()));
        actionSubtitle.setText(actionReaction.getActionApi());
        reactionTitle.setText(formatCamelCase(actionReaction.getReactionName()));
        reactionSubtitle.setText(actionReaction.getReactionApi());

        actionImage.setImageResource(actionUtil.getActionIcon(actionReaction.getActionApi()));
        reactionImage.setImageResource(reactionUtil.getReactionIcon(actionReaction.getReactionApi()));

        createDynamicInputs(actionReaction, inputContainer);

        bottomSheetDialog.show();
    }

    private void createDynamicInputs(ActionReaction actionReaction, LinearLayout inputContainer) {
        inputContainer.removeAllViews();

        Map<String, String> parameters = actionReaction.getParameters() != null ? actionReaction.getParameters() : new HashMap<>();

        for (Map.Entry<String, String> param : parameters.entrySet()) {
            View inputFieldView = LayoutInflater.from(context).inflate(R.layout.input_field_layout, inputContainer, false);
            EditText input = inputFieldView.findViewById(R.id.editTextInput);

            input.setHint(formatCamelCase(param.getKey()));
            input.setText(param.getValue());

            inputContainer.addView(inputFieldView);
        }
    }

    private void updateActionReaction(ActionReaction actionReaction, Dialog dialog, LinearLayout inputContainer) {
        Map<String, String> updatedParameters = new HashMap<>();

        for (int i = 0; i < inputContainer.getChildCount(); i++) {
            View view = inputContainer.getChildAt(i);
            EditText editText = view.findViewById(R.id.editTextInput);
            String key = editText.getHint().toString();
            String camelCaseKey = convertToCamelCase(key);
            String value = editText.getText().toString();
            updatedParameters.put(camelCaseKey, value);
        }

        ActionReactionRequestUp request = new ActionReactionRequestUp(
                "Name",
                actionReaction.getActionName(),
                actionReaction.getActionApi(),
                actionReaction.getReactionName(),
                actionReaction.getReactionApi(),
                updatedParameters
        );

        ActionReactionApiProtocol apiProtocol = new ActionReactionApiProtocol(context);
        apiProtocol.updateActionReaction(context, actionReaction.get_id(), request, (success, code, data, list, actions, reactions) -> {
            PrettyAlert alert = new PrettyAlert((Activity) context);
            if (success) {
                alert.success(context.getString(R.string.update_success), 3000);
                onAreaChangeListener.onAreaChanged();
                dialog.dismiss();
            } else {
                alert.error(context.getString(R.string.update_failed), 3000);
            }
        });
    }

    private String convertToCamelCase(String str) {
        String[] parts = str.split(" ");
        StringBuilder camelCaseString = new StringBuilder(parts[0].toLowerCase());
        for (int i = 1; i < parts.length; i++) {
            camelCaseString.append(parts[i].substring(0, 1).toUpperCase())
                    .append(parts[i].substring(1).toLowerCase());
        }
        return camelCaseString.toString();
    }

    private void deleteActionReaction(ActionReaction actionReaction, Dialog dialog, int position) {
        ActionReactionApiProtocol apiProtocol = new ActionReactionApiProtocol(context);
        apiProtocol.deleteActionReaction(context, actionReaction.get_id(), (success, code, data, list, actions, reactions) -> {
            PrettyAlert alert = new PrettyAlert((Activity) context);
            if (success) {
                alert.success(context.getString(R.string.delete_success), 3000);
                actionReactions.remove(actionReaction);
                notifyItemRemoved(position);
                dialog.dismiss();
                onAreaChangeListener.onAreaChanged();
            } else {
                alert.error(context.getString(R.string.delete_failed), 3000);
            }
        });
    }

    @Override
    public int getItemCount() {
        return actionReactions.size();
    }

    public static class ActionReactionViewHolder extends RecyclerView.ViewHolder {
        private final ImageView actionImage, reactionImage;
        private final TextView actionTitle, actionSubtitle, reactionTitle, reactionSubtitle;

        public ActionReactionViewHolder(@NonNull View itemView) {
            super(itemView);
            actionImage = itemView.findViewById(R.id.actionImage);
            actionTitle = itemView.findViewById(R.id.actionTitle);
            actionSubtitle = itemView.findViewById(R.id.actionSubtitle);
            reactionImage = itemView.findViewById(R.id.reactionImage);
            reactionTitle = itemView.findViewById(R.id.reactionTitle);
            reactionSubtitle = itemView.findViewById(R.id.reactionSubtitle);
        }

        public void bind(ActionReaction actionReaction) {
            ActionUtil actionUtil = new ActionUtil();
            ReactionUtil reactionUtil = new ReactionUtil();

            actionTitle.setText(formatCamelCase(actionReaction.getActionName()));
            actionSubtitle.setText(actionReaction.getActionApi());
            reactionTitle.setText(formatCamelCase(actionReaction.getReactionName()));
            reactionSubtitle.setText(actionReaction.getReactionApi());

            actionImage.setImageResource(actionUtil.getActionIcon(actionReaction.getActionApi()));
            reactionImage.setImageResource(reactionUtil.getReactionIcon(actionReaction.getReactionApi()));
        }
    }
}
