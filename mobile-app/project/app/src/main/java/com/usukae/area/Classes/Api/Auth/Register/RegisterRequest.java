package com.usukae.area.Classes.Api.Auth.Register;

import com.usukae.area.Classes.Models.User;

public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    public RegisterRequest(User user) {
        this.firstname = user.getFirstName();
        this.lastname = user.getLastName();
        this.email = user.getEmail();
        this.password = user.getPassword();
    }
}
