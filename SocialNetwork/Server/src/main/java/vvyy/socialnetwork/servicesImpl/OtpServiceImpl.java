package vvyy.socialnetwork.servicesImpl;

import vvyy.socialnetwork.domain.entities.OtpVerification;
import vvyy.socialnetwork.repositories.OtpRepository;
import vvyy.socialnetwork.services.EmailService;
import vvyy.socialnetwork.services.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpServiceImpl implements OtpService {
    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private static final int OTP_LENGTH = 6;
    private static final int OTP_EXPIRY_MINUTES = 10;

    @Autowired
    public OtpServiceImpl(OtpRepository otpRepository, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    @Override
    public boolean sendOtpToEmail(String email) throws Exception {
        // Generate OTP
        String otp = generateOtp();

        // Create OTP entity
        OtpVerification otpVerification = new OtpVerification(
                email,
                otp,
                LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES)
        );

        // Save to database
        otpRepository.save(otpVerification);

        // Send email
        String userName = email.split("@")[0];
        return emailService.sendOtpEmail(email, otp, userName);
    }

    @Override
    public boolean verifyOtp(String email, String otp) throws Exception {
        java.util.List<OtpVerification> otpRecords = otpRepository.findByEmailAndOtp(email, otp);

        if (otpRecords.isEmpty()) {
            throw new Exception("Invalid OTP");
        }

        // Get the first (most recent) OTP record
        OtpVerification verification = otpRecords.get(0);

        // Check if OTP is expired
        if (LocalDateTime.now().isAfter(verification.getExpiresAt())) {
            throw new Exception("OTP has expired");
        }

        // Mark as verified
        verification.setVerified(true);
        otpRepository.save(verification);

        return true;
    }

    @Override
    public boolean isEmailVerified(String email) {
        java.util.List<OtpVerification> otpRecords = otpRepository.findByEmail(email);

        if (otpRecords.isEmpty()) {
            return false;
        }

        // Get the first (most recent) OTP record
        OtpVerification verification = otpRecords.get(0);

        // Check if verified and not expired
        return verification.isVerified() && LocalDateTime.now().isBefore(verification.getExpiresAt());
    }

    private String generateOtp() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }

        return otp.toString();
    }
}
