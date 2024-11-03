package com.usukae.area.Classes.Connections;

import java.util.List;

public class Connection {
    private final String name;
    private final int drawable;
    private final List<String> data;
    private final String desc;

    public Connection(String name, int drawable, List<String> data, String desc) {
        this.name = name;
        this.drawable = drawable;
        this.data = data;
        this.desc = desc;
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

    public String getDesc() {
        return desc;
    }
}
