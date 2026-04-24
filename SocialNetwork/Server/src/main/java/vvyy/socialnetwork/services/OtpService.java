package vvyy.socialnetwork.services;

public interface OtpService {
    /**
     * Generate and send OTP to user email
     */
    boolean sendOtpToEmail(String email) throws Exception;

    /**
     * Verify OTP for user
     */
    boolean verifyOtp(String email, String otp) throws Exception;

    /**
     * Validate if email is OTP verified
     */
    boolean isEmailVerified(String email);
}
