package com.usukae.area.Classes.Api;

import com.usukae.area.Classes.Api.Register.CreateUserDto;
import com.usukae.area.Classes.Api.Login.LoginRequest;
import com.usukae.area.Classes.Api.Login.LoginResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {

    @POST("/users/register")
    Call<Void> registerUser(@Body CreateUserDto user);

    @POST("/users/login")
    Call<LoginResponse> loginUser(@Body LoginRequest request);
}
