package vvyy.socialnetwork.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import vvyy.socialnetwork.services.OtpService;
import vvyy.socialnetwork.utils.responseHandler.exceptions.CustomException;
import vvyy.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping(value = "/otp")
public class OtpController {
    private final OtpService otpService;
    private final ObjectMapper objectMapper;

    @Autowired
    public OtpController(OtpService otpService, ObjectMapper objectMapper) {
        this.otpService = otpService;
        this.objectMapper = objectMapper;
    }

    /**
     * Send OTP to user's email
     */
    @PostMapping(value = "/send", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> sendOtp(@RequestBody Map<String, String> body) throws Exception {
        String email = body.get("email");

        if (email == null || email.isEmpty()) {
            throw new CustomException("Email is required");
        }

        try {
            boolean sent = this.otpService.sendOtpToEmail(email);

            if (sent) {
                SuccessResponse response = new SuccessResponse(
                        LocalDateTime.now(),
                        "OTP sent successfully to " + email,
                        "",
                        true
                );
                return new ResponseEntity<>(this.objectMapper.writeValueAsString(response), HttpStatus.OK);
            }

            throw new CustomException("Failed to send OTP");
        } catch (Exception e) {
            throw new CustomException("Error sending OTP: " + e.getMessage());
        }
    }

    /**
     * Verify OTP
     */
    @PostMapping(value = "/verify", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> verifyOtp(@RequestBody Map<String, String> body) throws Exception {
        String email = body.get("email");
        String otp = body.get("otp");

        if (email == null || email.isEmpty()) {
            throw new CustomException("Email is required");
        }

        if (otp == null || otp.isEmpty()) {
            throw new CustomException("OTP is required");
        }

        try {
            boolean verified = this.otpService.verifyOtp(email, otp);

            if (verified) {
                SuccessResponse response = new SuccessResponse(
                        LocalDateTime.now(),
                        "Email verified successfully",
                        "",
                        true
                );
                return new ResponseEntity<>(this.objectMapper.writeValueAsString(response), HttpStatus.OK);
            }

            throw new CustomException("OTP verification failed");
        } catch (Exception e) {
            throw new CustomException("Invalid OTP: " + e.getMessage());
        }
    }

    /**
     * Check if email is verified
     */
    @GetMapping(value = "/check/{email}")
    public ResponseEntity<Object> checkEmailVerification(@PathVariable String email) throws Exception {
        try {
            boolean isVerified = this.otpService.isEmailVerified(email);

            Map<String, Object> response = Map.of(
                    "email", email,
                    "isVerified", isVerified,
                    "timestamp", LocalDateTime.now()
            );

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            throw new CustomException("Error checking email verification: " + e.getMessage());
        }
    }
}
