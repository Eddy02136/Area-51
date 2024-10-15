package com.usukae.area.Classes.Api;

import com.usukae.area.Classes.Areas.AreasAuthUrlResponse;
import com.usukae.area.Classes.Auth.Login.LoginRequest;
import com.usukae.area.Classes.Auth.Login.LoginResponse;
import com.usukae.area.Classes.Auth.Register.RegisterRequest;
import com.usukae.area.Classes.Auth.Register.RegisterResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Url;

public interface ApiService {

    @POST("/users/register")
    Call<RegisterResponse> registerUser(@Body RegisterRequest registerRequest);

    @POST("/users/login")
    Call<LoginResponse> loginUser(@Body LoginRequest loginRequest);

    @POST("/users/logout")
    Call<Void> logoutUser(@Body Void request);

    @GET("/users/checkToken")
    Call<Void> checkTokenUser(@Header("Authorization") String token);

    @GET
    Call<AreasAuthUrlResponse> getAuthUrl(@Url String url, @Header("Authorization") String token);

    @GET
    Call<Void> getCheckConnection(@Url String url, @Header("Authorization") String token);
}
