package vvyy.socialnetwork.servicesImpl;

import vvyy.socialnetwork.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public boolean sendOtpEmail(String toEmail, String otp, String userName) throws Exception {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("your-email@gmail.com");  // Configure in application.properties
            message.setTo(toEmail);
            message.setSubject("PES Social Network - Email Verification OTP");
            message.setText("Hello " + userName + ",\n\n" +
                    "Welcome to PES Social Network!\n\n" +
                    "Your One-Time Password (OTP) for email verification is:\n\n" +
                    "🔐 OTP: " + otp + "\n\n" +
                    "This OTP will expire in 10 minutes.\n\n" +
                    "If you did not request this, please ignore this email.\n\n" +
                    "Best regards,\n" +
                    "PES Social Network Team");

            mailSender.send(message);
            return true;
        } catch (Exception e) {
            throw new Exception("Failed to send OTP email: " + e.getMessage());
        }
    }
}
