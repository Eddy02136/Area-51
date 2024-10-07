package com.usukae.area.Classes.Api.Register;

public class CreateUserDto {
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    public CreateUserDto(String firstname, String lastname, String email, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}