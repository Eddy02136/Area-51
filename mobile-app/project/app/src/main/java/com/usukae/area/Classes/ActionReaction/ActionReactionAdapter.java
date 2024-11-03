package com.usukae.area.Classes.ActionReaction;

import static com.usukae.area.Classes.Utils.TextUtil.formatCamelCase;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Classes.Actions.ActionUtil;
import com.usukae.area.Classes.Reactions.ReactionUtil;
import com.usukae.area.R;

import java.util.List;

public class ActionReactionAdapter extends RecyclerView.Adapter<ActionReactionAdapter.ActionReactionViewHolder> {

    private final Context context;
    private final List<ActionReaction> actionReactions;

    public ActionReactionAdapter(Context context, List<ActionReaction> actionReactions) {
        this.context = context;
        this.actionReactions = actionReactions;
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
