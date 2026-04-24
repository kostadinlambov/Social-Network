package vvyy.socialnetwork.factory;

import vvyy.socialnetwork.domain.entities.Message;
import vvyy.socialnetwork.domain.entities.User;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

/**
 * Factory Pattern Implementation for Message Creation
 * Module: MESSAGING SYSTEM
 * 
 * Responsibility: Create different types of Message entities
 * 
 * SOLID Principles Applied:
 * - SRP: Only creates messages, no other responsibilities
 * - OCP: New message types don't modify existing methods
 * - DIP: Abstracts message creation logic
 * 
 * Usage:
 *   Message msg = messageFactory.createTextMessage(from, to, "Hello!");
 *   Message sysMsg = messageFactory.createSystemMessage(user, "welcome");
 */
@Component
public class MessageFactory {
    
    /**
     * Create a regular text message
     * SOLID: OCP - base message type
     */
    public Message createTextMessage(User fromUser, User toUser, String content) {
        Message message = new Message();
        message.setFromUser(fromUser);
        message.setToUser(toUser);
        message.setContent(content);
        message.setTime(LocalDateTime.now());
        message.setStatus(0); // 0 = unread
        return message;
    }
    
    /**
     * Create a system message (from system, not from user)
     * SOLID: OCP - different message type
     */
    public Message createSystemMessage(User recipient, String systemContent) {
        Message message = new Message();
        message.setFromUser(null); // System message (no sender)
        message.setToUser(recipient);
        message.setContent("[SYSTEM]: " + systemContent);
        message.setTime(LocalDateTime.now());
        message.setStatus(0); // unread
        return message;
    }
    
    /**
     * Create a notification message
     * SOLID: OCP - another message variation
     */
    public Message createNotificationMessage(User recipient, String notification) {
        Message message = new Message();
        message.setFromUser(null);
        message.setToUser(recipient);
        message.setContent("[NOTIFICATION]: " + notification);
        message.setTime(LocalDateTime.now());
        message.setStatus(0);
        return message;
    }
    
    /**
     * Create an alert message (urgent)
     * SOLID: OCP - extensible for different message types
     */
    public Message createAlertMessage(User recipient, String alert) {
        Message message = new Message();
        message.setFromUser(null);
        message.setToUser(recipient);
        message.setContent("[ALERT]: " + alert);
        message.setTime(LocalDateTime.now());
        message.setStatus(0);
        return message;
    }
}
