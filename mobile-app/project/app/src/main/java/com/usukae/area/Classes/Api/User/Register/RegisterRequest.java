package com.usukae.area.Classes.Api.User.Register;

public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    public RegisterRequest(String firstname, String lastname, String email, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}
