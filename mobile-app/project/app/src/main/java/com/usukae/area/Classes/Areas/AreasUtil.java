package com.usukae.area.Classes.Areas;

import com.usukae.area.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AreasUtil {
    public List<Area> getAreas() {
        List<Area> areasList = new ArrayList<>();

        Map<String, String> issMusicParams = new HashMap<>();
        issMusicParams.put("city", "Paris");
        issMusicParams.put("music", "Space Oddity");

        Area issMusicArea = new Area(
                "iss_get_pos",
                "spotify_play_music",
                "ISS Music",
                "Lance une musique Spotify choisie lorsque l'ISS passe au dessus d'une ville définie.",
                issMusicParams
        );

        Map<String, String> twitterWhatsAppParams = new HashMap<>();
        twitterWhatsAppParams.put("userId", "@elonmusk");
        twitterWhatsAppParams.put("group", "Tech Enthusiasts");

        Area twitterWhatsAppArea = new Area(
                "twitter_get_id",
                "whatsapp_post_message",
                "Twitter WhatsApp",
                "Envoi le tweet d'un utilisateur spécifique sur un groupe WhatsApp.",
                twitterWhatsAppParams
        );

        Map<String, String> weatherParams = new HashMap<>();
        weatherParams.put("city", "New York");
        weatherParams.put("notificationTime", "08:00 AM");

        Area weatherNotificationArea = new Area(
                "weather_get_forecast",
                "send_notification",
                "Weather Alert",
                "Envoie une notification météo quotidienne à une heure définie pour une ville spécifique.",
                weatherParams
        );

        Map<String, String> emailReminderParams = new HashMap<>();
        emailReminderParams.put("email", "user@example.com");
        emailReminderParams.put("reminderTime", "09:00 AM");

        Area emailReminderArea = new Area(
                "calendar_get_event",
                "email_send_reminder",
                "Daily Email Reminder",
                "Envoie un email de rappel quotidien pour les événements du calendrier.",
                emailReminderParams
        );

        areasList.add(issMusicArea);
        areasList.add(twitterWhatsAppArea);
        areasList.add(weatherNotificationArea);
        areasList.add(emailReminderArea);

        return areasList;
    }

    public int getAreaIcon(String name) {
        switch (name.toLowerCase().trim()) {
            case "spotify":
                return R.drawable.ic_color_spotify;
            case "iss":
                return R.drawable.ic_color_iss;
            case "discord":
                return R.drawable.ic_color_discord;
            case "weather":
                return R.drawable.ic_color_weather;
            default:
                return R.drawable.ic_color_default;
        }
    }
}
