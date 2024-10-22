package com.usukae.area.Classes.Areas;

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

public class AreaAdapter extends RecyclerView.Adapter<AreaAdapter.AreaViewHolder> {

    private final Context context;
    private final List<Area> areas;

    private ActionUtil actionUtil;
    private ReactionUtil reactionUtil;

    public AreaAdapter(Context context, List<Area> areas) {
        this.context = context;
        this.areas = areas;
    }

    @NonNull
    @Override
    public AreaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.area_item_dashboard, parent, false);
        return new AreaViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AreaViewHolder holder, int position) {
        Area area = areas.get(position);

        createClasses();
        setValues(holder, area);
    }

    private void createClasses() {
        actionUtil = new ActionUtil();
        reactionUtil = new ReactionUtil();
    }

    private void setValues(AreaViewHolder holder, Area area) {
        holder.areaTitle.setText(area.getName());
        holder.actionIcon.setImageResource(actionUtil.getActionIcon(area.getId()));
        holder.reactionIcon.setImageResource(reactionUtil.getReactionIcon(area.getId()));
    }

    @Override
    public int getItemCount() {
        return areas.size();
    }

    public static class AreaViewHolder extends RecyclerView.ViewHolder {
        private final TextView areaTitle;
        private final ImageView actionIcon;
        private final ImageView reactionIcon;

        public AreaViewHolder(@NonNull View itemView) {
            super(itemView);
            areaTitle = itemView.findViewById(R.id.areaTitle);
            actionIcon = itemView.findViewById(R.id.areaBehindPicture);
            reactionIcon = itemView.findViewById(R.id.areaAbovePicture);
        }
    }
}