package com.usukae.area.Classes.Areas;

import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.usukae.area.Classes.Connections.AddConnectionAdapter;
import com.usukae.area.Classes.Utils.DialogUtil;
import com.usukae.area.R;

import java.util.List;

public class AddAreaAdapter extends RecyclerView.Adapter<AddAreaAdapter.AreaViewHolder> {

    private final Context context;
    private final List<Area> areas;

    private AreasUtil areasUtil;
    private DialogUtil dialogUtil;
    private Dialog newAreaDialog;

    public AddAreaAdapter(Context context, List<Area> areas) {
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
        createDialogs();
        holder.bind(area, areasUtil);
    }

    private void createClasses() {
        areasUtil = new AreasUtil();
        dialogUtil = new DialogUtil();
    }

    private void createDialogs() {
        newAreaDialog = dialogUtil.createBottomDialog(context, R.layout.modal_new_area);
    }

    private void bindButtons(AddConnectionAdapter.ConnectionViewHolder holder, Area area) {
        holder.itemView.setOnClickListener(v -> newAreaDialog.show());
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
