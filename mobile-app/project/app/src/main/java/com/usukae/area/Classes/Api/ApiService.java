package com.usukae.area.Classes.Api;

import com.usukae.area.Classes.ActionReaction.ActionReaction;
import com.usukae.area.Classes.ActionReaction.ActionReactionCallback;
import com.usukae.area.Classes.ActionReaction.ActionReactionRequest;
import com.usukae.area.Classes.Actions.Action;
import com.usukae.area.Classes.Auth.Login.LoginRequest;
import com.usukae.area.Classes.Auth.Login.LoginResponse;
import com.usukae.area.Classes.Auth.Register.RegisterRequest;
import com.usukae.area.Classes.Auth.Register.RegisterResponse;
import com.usukae.area.Classes.Auth.User.UserResponse;
import com.usukae.area.Classes.Reactions.Reaction;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
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
    Call<ActionReactionCallback> getAuthUrl(@Url String url, @Header("Authorization") String token);

    @GET
    Call<Void> getCheckConnection(@Url String url, @Header("Authorization") String token);

    @GET("/users/infos")
    Call<UserResponse> getUserInfo(@Header("Authorization") String token);

    @PUT("/users/update")
    Call<Void> updateUser(@Header("Authorization") String token, @Body UserResponse user);

    @DELETE("/spotify/logout")
    Call<Void> logoutSpotify(@Header("Authorization") String token);

    @DELETE("/discord/logout")
    Call<Void> logoutDiscord(@Header("Authorization") String token);

    @DELETE("/twitch/logout")
    Call<Void> logoutTwitch(@Header("Authorization") String token);

    @DELETE("/youtube/logout")
    Call<Void> logoutYoutube(@Header("Authorization") String token);

    @DELETE("/github/logout")
    Call<Void> logoutGithub(@Header("Authorization") String token);

    @POST("/manage/add-action-reaction")
    Call<Void> addActionReaction(@Header("Authorization") String token, @Body ActionReactionRequest actionReactionRequest);

    @GET("/manage/get-action-reaction")
    Call<List<ActionReaction>> getAllActionReactions(@Header("Authorization") String token);

    @GET("/manage/get-action-reaction/{id}")
    Call<ActionReaction> getActionReactionById(@Header("Authorization") String token, @Path("id") String id);

    @PUT("/manage/update-action-reaction/{id}")
    Call<Void> updateActionReaction(@Header("Authorization") String token, @Path("id") String id, @Body ActionReactionRequest request);

    @DELETE("/manage/delete-action-reaction/{id}")
    Call<Void> deleteActionReaction(@Header("Authorization") String token, @Path("id") String id);

    @GET("/manage/getAllAction")
    Call<List<Action>> getAllActions(@Header("Authorization") String token);

    @GET("/manage/getAllReaction")
    Call<List<Reaction>> getAllReactions(@Header("Authorization") String token);
}
