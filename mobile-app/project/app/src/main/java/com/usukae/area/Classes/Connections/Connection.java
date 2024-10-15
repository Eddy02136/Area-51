package com.usukae.area.Classes.Connections;

public class Connection {
    private final String name;
    private final int drawable;
    private final boolean logged;

    public Connection(String name, int drawable, boolean logged) {
        this.name = name;
        this.drawable = drawable;
        this.logged = logged;
    }

    public String getName() {
        return name;
    }

    public int getDrawable() {
        return drawable;
    }

    public boolean getLogged() { return logged; }
}
