package vvyy.socialnetwork.builder;

import vvyy.socialnetwork.domain.entities.Message;
import vvyy.socialnetwork.domain.entities.User;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

/**
 * Builder Pattern Implementation for Message Objects
 * Module: MESSAGING SYSTEM
 * 
 * Responsibility: Construct Message objects with optional fields
 * 
 * SOLID Principles Applied:
 * - SRP: Only builds messages, no other responsibilities
 * - ISP: Provides specific interface for message building
 * - OCP: New message configurations don't modify this class
 * 
 * Usage:
 *   Message msg = messageBuilder
 *       .fromUser(sender)
 *       .toUser(receiver)
 *       .withContent("Hi!")
 *       .asText()
 *       .build();
 */
@Component
public class MessageBuilder {
    
    private String id;
    private String content;
    private User fromUser;
    private User toUser;
    private LocalDateTime time = LocalDateTime.now();
    private int status = 0; // 0 = unread, 1 = read
    private String messageType = "TEXT"; // TEXT, SYSTEM, NOTIFICATION
    private int priority = 0; // 0 = normal, 1 = high, -1 = low
    
    public MessageBuilder withId(String id) {
        this.id = id;
        return this;
    }
    
    public MessageBuilder withContent(String content) {
        this.content = content;
        return this;
    }
    
    public MessageBuilder fromUser(User fromUser) {
        this.fromUser = fromUser;
        return this;
    }
    
    public MessageBuilder toUser(User toUser) {
        this.toUser = toUser;
        return this;
    }
    
    public MessageBuilder withTime(LocalDateTime time) {
        this.time = time;
        return this;
    }
    
    public MessageBuilder read() {
        this.status = 1; // read
        return this;
    }
    
    public MessageBuilder unread() {
        this.status = 0; // unread
        return this;
    }
    
    public MessageBuilder asText() {
        this.messageType = "TEXT";
        return this;
    }
    
    public MessageBuilder asSystem() {
        this.messageType = "SYSTEM";
        this.fromUser = null;
        return this;
    }
    
    public MessageBuilder asNotification() {
        this.messageType = "NOTIFICATION";
        this.fromUser = null;
        return this;
    }
    
    public MessageBuilder highPriority() {
        this.priority = 1;
        return this;
    }
    
    public MessageBuilder lowPriority() {
        this.priority = -1;
        return this;
    }
    
    /**
     * Build the Message object
     * SOLID: SRP - only assembles the object
     */
    public Message build() {
        Message message = new Message();
        message.setId(id);
        message.setContent(content);
        message.setFromUser(fromUser);
        message.setToUser(toUser);
        message.setTime(time);
        message.setStatus(status);
        return message;
    }
    
    /**
     * Reset builder for reuse
     * SOLID: SRP - manages builder state
     */
    public MessageBuilder reset() {
        this.id = null;
        this.content = null;
        this.fromUser = null;
        this.toUser = null;
        this.time = LocalDateTime.now();
        this.status = 0;
        this.messageType = "TEXT";
        this.priority = 0;
        return this;
    }
}
