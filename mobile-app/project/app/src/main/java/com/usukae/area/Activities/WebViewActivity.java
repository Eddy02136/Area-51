package com.usukae.area.Activities;

import android.annotation.SuppressLint;
import android.net.http.SslError;
import android.os.Bundle;
import android.os.Handler;
import android.webkit.CookieManager;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

import com.usukae.area.Classes.Utils.PrettyAlert;
import com.usukae.area.R;

public class WebViewActivity extends AppCompatActivity {

    private static final String REDIRECT_URL = "localhost:3001";

    private PrettyAlert prettyAlert;

    private Handler handler;
    private Runnable runnable;

    private WebView webView;

    public interface WebViewCallback {
        void onWebViewRedirectSuccess();
    }

    private WebViewCallback webViewCallback;

    public void setWebViewCallback(WebViewCallback callback) {
        this.webViewCallback = callback;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);

        initClasses();
        initWebView();
        authorizeCookies();
        loadAuthUrl();
        startUrlChecking();
    }

    private void initClasses() {
        prettyAlert = new PrettyAlert(this);
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void initWebView() {
        webView = findViewById(R.id.webview);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new CustomWebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setUserAgentString("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3");
    }

    private void authorizeCookies() {
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);
    }

    private void loadAuthUrl() {
        String authUrl = getIntent().getStringExtra("auth_url");
        if (authUrl != null) {
            webView.loadUrl(authUrl);
        } else {
            prettyAlert.error(getString(R.string.invalid_url), 3000);
            finish();
        }
    }

    private void startUrlChecking() {
        handler = new Handler();
        runnable = new Runnable() {
            @Override
            public void run() {
                if (webView.getUrl() != null && webView.getUrl().contains(REDIRECT_URL)) {
                    if (webViewCallback != null) {
                        webViewCallback.onWebViewRedirectSuccess();
                    }
                    finish();
                } else {
                    handler.postDelayed(this, 100);
                }
            }
        };
        handler.postDelayed(runnable, 100);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (handler != null && runnable != null) {
            handler.removeCallbacks(runnable);
        }
    }

    private class CustomWebViewClient extends WebViewClient {
        @SuppressLint("WebViewClientOnReceivedSslError")
        @Override
        public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
            handler.proceed();
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            String url = request.getUrl().toString();
            if (url.contains(REDIRECT_URL)) {
                finish();
                return true;
            }
            return false;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            if (url.contains(REDIRECT_URL)) {
                finish();
            }
        }
    }

    public interface AuthCallback {
        void onAuthSuccess();
    }
}
