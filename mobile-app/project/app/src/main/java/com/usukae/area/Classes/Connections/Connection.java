package com.usukae.area.Classes.Connections;

import java.util.List;

public class Connection {
    private final String name;
    private final int drawable;
    private final List<String> data;

    public Connection(String name, int drawable, List<String> data) {
        this.name = name;
        this.drawable = drawable;
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public int getDrawable() {
        return drawable;
    }

    public List<String> getData() {
        return data;
    }
}
