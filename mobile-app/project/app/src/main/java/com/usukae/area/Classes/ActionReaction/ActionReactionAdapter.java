package com.usukae.area.Classes.ActionReaction;

import static com.usukae.area.Classes.Utils.TextUtil.formatCamelCase;

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
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

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

    public ActionReactionAdapter(Context context, List<ActionReaction> actionReactions) {
        this.context = context;
        this.actionReactions = actionReactions;
        this.dialogUtil = new DialogUtil();
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

        holder.itemView.setOnClickListener(v -> openBottomSheetDialog(actionReaction));
    }

    private void openBottomSheetDialog(ActionReaction actionReaction) {
        Dialog bottomSheetDialog = dialogUtil.createBottomDialog(context, R.layout.modal_edit_area);
        ImageView actionImage = bottomSheetDialog.findViewById(R.id.actionImage);
        TextView actionTitle = bottomSheetDialog.findViewById(R.id.actionTitle);
        TextView actionSubtitle = bottomSheetDialog.findViewById(R.id.actionSubtitle);
        ImageView reactionImage = bottomSheetDialog.findViewById(R.id.reactionImage);
        TextView reactionTitle = bottomSheetDialog.findViewById(R.id.reactionTitle);
        TextView reactionSubtitle = bottomSheetDialog.findViewById(R.id.reactionSubtitle);
        CardView updateButton = bottomSheetDialog.findViewById(R.id.validateButton);
        updateButton.setOnClickListener(v -> updateActionReaction(actionReaction, bottomSheetDialog));
        CardView deleteButton = bottomSheetDialog.findViewById(R.id.deleteButton);
        deleteButton.setOnClickListener(v -> deleteActionReaction(actionReaction, bottomSheetDialog));

        ActionUtil actionUtil = new ActionUtil();
        ReactionUtil reactionUtil = new ReactionUtil();

        actionTitle.setText(formatCamelCase(actionReaction.getActionName()));
        actionSubtitle.setText(actionReaction.getActionApi());
        reactionTitle.setText(formatCamelCase(actionReaction.getReactionName()));
        reactionSubtitle.setText(actionReaction.getReactionApi());

        LinearLayout inputContainer = bottomSheetDialog.findViewById(R.id.inputContainer);
        Map<String, EditText> inputFields = createDynamicInputs(actionReaction, inputContainer);

        actionImage.setImageResource(actionUtil.getActionIcon(actionReaction.getActionApi()));
        reactionImage.setImageResource(reactionUtil.getReactionIcon(actionReaction.getReactionApi()));

        bottomSheetDialog.show();
    }

    private Map<String, EditText> createDynamicInputs(ActionReaction actionReaction, LinearLayout inputContainer) {
        Map<String, EditText> inputFields = new HashMap<>();
        inputContainer.removeAllViews();

        for (Map.Entry<String, String> param : actionReaction.getParameters().entrySet()) {
            View inputFieldView = LayoutInflater.from(context).inflate(R.layout.input_field_layout, inputContainer, false);
            EditText input = inputFieldView.findViewById(R.id.editTextInput);

            input.setHint(formatCamelCase(param.getKey()));
            input.setText(param.getValue());
            inputFields.put(param.getKey(), input);

            inputContainer.addView(inputFieldView);
        }

        return inputFields;
    }

    private void updateActionReaction(ActionReaction actionReaction, Dialog dialog) {
        ActionReactionApiProtocol apiProtocol = new ActionReactionApiProtocol(context);
        ActionReactionRequest request = new ActionReactionRequest(
                "Name",
                actionReaction.getActionApi(),
                actionReaction.getActionName(),
                actionReaction.getReactionApi(),
                actionReaction.getReactionName(),
                actionReaction.getParameters(),
                ""
        );
        apiProtocol.updateActionReaction(context, actionReaction.get_id(), request, (success, code, data, list, actions, reactions) -> {
            PrettyAlert alert = new PrettyAlert((Activity) context);
            if (success) {
                alert.success(context.getString(R.string.update_success), 3000);
                dialog.dismiss();
            } else {
                alert.error(context.getString(R.string.update_failed), 3000);
            }
        });
    }

    private void deleteActionReaction(ActionReaction actionReaction, Dialog dialog) {
        ActionReactionApiProtocol apiProtocol = new ActionReactionApiProtocol(context);
        apiProtocol.deleteActionReaction(context, actionReaction.get_id(), (success, code, data, list, actions, reactions) -> {
            PrettyAlert alert = new PrettyAlert((Activity) context);
            if (success) {
                alert.success(context.getString(R.string.delete_success), 3000);

                dialog.dismiss();
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