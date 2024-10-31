package com.usukae.area.Classes.ActionReaction;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

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
        private final TextView title;

        public ActionReactionViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.areaTitle);
        }

        public void bind(ActionReaction actionReaction) {
            title.setText(actionReaction.getActionType() + " & " + actionReaction.getReactionType());
        }
    }
}
