package com.usukae.area.Classes.Areas;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.R;

import java.util.List;

public class AreaAdapter extends RecyclerView.Adapter<AreaAdapter.AreaViewHolder> {

    private final Context context;
    private final List<Area> areas;

    private AreasUtil areasUtil;

    public AreaAdapter(Context context, List<Area> areas) {
        this.context = context;
        this.areas = areas;
    }

    @NonNull
    @Override
    public AreaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.area_item, parent, false);
        return new AreaViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AreaViewHolder holder, int position) {
        Area area = areas.get(position);
        createClasses();
        holder.bind(area, areasUtil);
    }

    private void createClasses() {
        areasUtil = new AreasUtil();
    }

    @Override
    public int getItemCount() {
        return areas.size();
    }

    public static class AreaViewHolder extends RecyclerView.ViewHolder {
        private final TextView titleTextView;
        private final TextView descriptionTextView;
        private final ImageView pictureBehindImageView, pictureAboveImageView;

        public AreaViewHolder(@NonNull View itemView) {
            super(itemView);
            titleTextView = itemView.findViewById(R.id.areaTitle);
            descriptionTextView = itemView.findViewById(R.id.areaDescription);
            pictureBehindImageView = itemView.findViewById(R.id.areaBehindPicture);
            pictureAboveImageView = itemView.findViewById(R.id.areaAbovePicture);
        }

        public void bind(Area area, AreasUtil areasUtil) {
            titleTextView.setText(area.getName());
            descriptionTextView.setText(area.getDescription());
            pictureBehindImageView.setImageResource(areasUtil.getAreaIcon(area.getReaction()));
            pictureAboveImageView.setImageResource(areasUtil.getAreaIcon(area.getAction()));
        }
    }
}
