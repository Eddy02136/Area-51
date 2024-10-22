package com.usukae.area.Classes.Api.Connections;

public class Connection {
    private String name;
    private int iconDrawableId;

    public Connection(String name, int iconDrawableId) {
        this.name = name;
        this.iconDrawableId = iconDrawableId;
    }

    public String getName() {
        return name;
    }

    public int getIconDrawableId() {
        return iconDrawableId;
    }
}
