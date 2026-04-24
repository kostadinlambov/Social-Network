package vvyy.socialnetwork.services;

public interface EmailService {
    /**
     * Send email with OTP
     */
    boolean sendOtpEmail(String toEmail, String otp, String userName) throws Exception;
}
