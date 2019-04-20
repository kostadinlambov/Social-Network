package kl.socialnetwork.web.websocket;

import java.time.LocalDateTime;

public class WebSocketMessage {
    private WebSocketEventName webSocketEventName;
    private String userId;
    private String username;
    private boolean isOnline;
    private LocalDateTime time;

    public WebSocketMessage() {
    }

    public WebSocketMessage(WebSocketEventName webSocketEventName, String userId, String username, boolean isOnline) {
        this.webSocketEventName = webSocketEventName;
        this.userId = userId;
        this.username = username;
        this.isOnline = isOnline;
        this.time = LocalDateTime.now();
    }

    public WebSocketEventName getWebSocketEventName() {
        return this.webSocketEventName;
    }

    public void setWebSocketEventName(WebSocketEventName webSocketEventName) {
        this.webSocketEventName = webSocketEventName;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isOnline() {
        return this.isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
