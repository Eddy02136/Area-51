package com.usukae.area.Classes.Api;

import com.usukae.area.Classes.Api.User.Login.LoginRequest;
import com.usukae.area.Classes.Api.User.Login.LoginResponse;
import com.usukae.area.Classes.Api.User.Register.RegisterRequest;
import com.usukae.area.Classes.Api.User.Register.RegisterResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {

    @POST("/users/register")
    Call<RegisterResponse> registerUser(@Body RegisterRequest user);

    @POST("/users/login")
    Call<LoginResponse> loginUser(@Body LoginRequest request);

    @POST("/users/logout")
    Call<Void> logoutUser(@Body Void request);

    @POST("/users/check_token")
    Call<Void> checkTokenUser(@Body Void request);
}
