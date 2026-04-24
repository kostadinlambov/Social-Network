package vvyy.socialnetwork.builder;

import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

/**
 * Builder Pattern Implementation for Logger/Audit Trail Objects
 * Module: ADMIN & LOGGING
 * 
 * Responsibility: Construct audit trail entries with configurable severity and operation types
 * 
 * SOLID Principles Applied:
 * - SRP: Only builds audit trail entries, no logging performed here
 * - ISP: Provides specific interface for audit trail building
 * - OCP: New audit types don't modify this class
 * - DIP: Depends on abstraction for logging (Spring Logger pattern)
 * 
 * Usage:
 *   String auditLog = loggerBuilder
 *       .POST()
 *       .CREATE()
 *       .info()
 *       .withUser("admin")
 *       .withAction("User created")
 *       .build();
 */
@Component
public class LoggerBuilder {
    
    private String httpMethod = "UNKNOWN"; // GET, POST, PUT, DELETE
    private String databaseOperation = "READ"; // CREATE, READ, UPDATE, DELETE
    private String severity = "INFO"; // INFO, WARNING, ERROR
    private String userId;
    private String action;
    private String resourceType;
    private String resourceId;
    private LocalDateTime timestamp = LocalDateTime.now();
    private String details;
    
    /**
     * HTTP Methods
     * SOLID: ISP - specific methods for each operation type
     */
    public LoggerBuilder GET() {
        this.httpMethod = "GET";
        return this;
    }
    
    public LoggerBuilder POST() {
        this.httpMethod = "POST";
        return this;
    }
    
    public LoggerBuilder PUT() {
        this.httpMethod = "PUT";
        return this;
    }
    
    public LoggerBuilder DELETE() {
        this.httpMethod = "DELETE";
        return this;
    }
    
    /**
     * Database Operations
     * SOLID: ISP - specific methods for database action types
     */
    public LoggerBuilder CREATE() {
        this.databaseOperation = "CREATE";
        return this;
    }
    
    public LoggerBuilder READ() {
        this.databaseOperation = "READ";
        return this;
    }
    
    public LoggerBuilder UPDATE() {
        this.databaseOperation = "UPDATE";
        return this;
    }
    
    public LoggerBuilder DELETE_ACTION() {
        this.databaseOperation = "DELETE";
        return this;
    }
    
    /**
     * Severity Levels
     * SOLID: ISP - specific convenience methods for severity
     */
    public LoggerBuilder info() {
        this.severity = "INFO";
        return this;
    }
    
    public LoggerBuilder warning() {
        this.severity = "WARNING";
        return this;
    }
    
    public LoggerBuilder error() {
        this.severity = "ERROR";
        return this;
    }
    
    /**
     * Audit Details
     * SOLID: SRP - only stores audit information
     */
    public LoggerBuilder withUser(String userId) {
        this.userId = userId;
        return this;
    }
    
    public LoggerBuilder withAction(String action) {
        this.action = action;
        return this;
    }
    
    public LoggerBuilder withResource(String resourceType, String resourceId) {
        this.resourceType = resourceType;
        this.resourceId = resourceId;
        return this;
    }
    
    public LoggerBuilder withDetails(String details) {
        this.details = details;
        return this;
    }
    
    public LoggerBuilder withTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
        return this;
    }
    
    /**
     * Build the audit log entry as a formatted string
     * SOLID: SRP - only assembles the log entry
     * 
     * Format: [TIMESTAMP] [SEVERITY] [HTTP_METHOD] [DB_OP] User:[userId] 
     *         Resource:[resourceType/resourceId] Action:[action]
     */
    public String build() {
        StringBuilder logEntry = new StringBuilder();
        logEntry.append("[").append(timestamp).append("] ");
        logEntry.append("[").append(severity).append("] ");
        logEntry.append("[").append(httpMethod).append("-").append(databaseOperation).append("] ");
        
        if (userId != null) {
            logEntry.append("User:[").append(userId).append("] ");
        }
        
        if (resourceType != null && resourceId != null) {
            logEntry.append("Resource:[").append(resourceType).append("/").append(resourceId).append("] ");
        }
        
        if (action != null) {
            logEntry.append("Action:[").append(action).append("] ");
        }
        
        if (details != null) {
            logEntry.append("Details:[").append(details).append("]");
        }
        
        return logEntry.toString();
    }
    
    /**
     * Build and return audit trail entry as map for JSON/storage
     * Alternative to string format for structured logging
     * SOLID: SRP - only assembles data
     */
    public AuditEntry buildEntry() {
        return new AuditEntry(
            timestamp,
            severity,
            httpMethod,
            databaseOperation,
            userId,
            action,
            resourceType,
            resourceId,
            details
        );
    }
    
    /**
     * Reset builder for reuse
     * SOLID: SRP - manages builder state
     */
    public LoggerBuilder reset() {
        this.httpMethod = "UNKNOWN";
        this.databaseOperation = "READ";
        this.severity = "INFO";
        this.userId = null;
        this.action = null;
        this.resourceType = null;
        this.resourceId = null;
        this.timestamp = LocalDateTime.now();
        this.details = null;
        return this;
    }
    
    /**
     * Nested class for structured audit entries
     * SOLID: SRP - represents audit trail data
     */
    public static class AuditEntry {
        private LocalDateTime timestamp;
        private String severity;
        private String httpMethod;
        private String databaseOperation;
        private String userId;
        private String action;
        private String resourceType;
        private String resourceId;
        private String details;
        
        public AuditEntry(LocalDateTime timestamp, String severity, String httpMethod,
                         String databaseOperation, String userId, String action,
                         String resourceType, String resourceId, String details) {
            this.timestamp = timestamp;
            this.severity = severity;
            this.httpMethod = httpMethod;
            this.databaseOperation = databaseOperation;
            this.userId = userId;
            this.action = action;
            this.resourceType = resourceType;
            this.resourceId = resourceId;
            this.details = details;
        }
        
        // Getters
        public LocalDateTime getTimestamp() { return timestamp; }
        public String getSeverity() { return severity; }
        public String getHttpMethod() { return httpMethod; }
        public String getDatabaseOperation() { return databaseOperation; }
        public String getUserId() { return userId; }
        public String getAction() { return action; }
        public String getResourceType() { return resourceType; }
        public String getResourceId() { return resourceId; }
        public String getDetails() { return details; }
    }
}
