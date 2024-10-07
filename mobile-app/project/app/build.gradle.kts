val MONGO_URI: String by project
val API_KEY_NASA: String by project
val JWT_KEY: String by project
val SPOTIFY_CLIENT_ID: String by project
val SPOTIFY_CLIENT_SECRET: String by project
val SPOTIFY_REDIRECT_URI: String by project
val SPOTIFY_SCOPES: String by project
val DISCORD_CLIENT_ID: String by project
val DISCORD_CLIENT_SECRET: String by project
val DISCORD_REDIRECT_URI: String by project
val API_BASE_URL: String by project

plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.usukae.area"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.usukae.area"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        buildConfigField("String", "MONGO_URI", "\"$MONGO_URI\"")
        buildConfigField("String", "API_KEY_NASA", "\"$API_KEY_NASA\"")
        buildConfigField("String", "JWT_KEY", "\"$JWT_KEY\"")
        buildConfigField("String", "SPOTIFY_CLIENT_ID", "\"$SPOTIFY_CLIENT_ID\"")
        buildConfigField("String", "SPOTIFY_CLIENT_SECRET", "\"$SPOTIFY_CLIENT_SECRET\"")
        buildConfigField("String", "SPOTIFY_REDIRECT_URI", "\"$SPOTIFY_REDIRECT_URI\"")
        buildConfigField("String", "SPOTIFY_SCOPES", "\"$SPOTIFY_SCOPES\"")
        buildConfigField("String", "DISCORD_CLIENT_ID", "\"$DISCORD_CLIENT_ID\"")
        buildConfigField("String", "DISCORD_CLIENT_SECRET", "\"$DISCORD_CLIENT_SECRET\"")
        buildConfigField("String", "DISCORD_REDIRECT_URI", "\"$DISCORD_REDIRECT_URI\"")
        buildConfigField("String", "API_BASE_URL", "\"$API_BASE_URL\"")
    }

    buildFeatures {
        buildConfig = true
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)
    implementation(libs.lottie)
    implementation(libs.retrofit)
    implementation(libs.gsonConverter)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}