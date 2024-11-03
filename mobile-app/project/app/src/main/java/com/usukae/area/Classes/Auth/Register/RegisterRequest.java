package com.usukae.area.Classes.Auth.Register;

import com.usukae.area.Classes.Auth.User.UserRequest;

public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    public RegisterRequest(UserRequest user) {
        this.firstname = user.getFirstName();
        this.lastname = user.getLastName();
        this.email = user.getEmail();
        this.password = user.getPassword();
    }
}
