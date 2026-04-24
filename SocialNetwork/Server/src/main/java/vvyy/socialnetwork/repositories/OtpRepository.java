package vvyy.socialnetwork.repositories;

import vvyy.socialnetwork.domain.entities.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OtpRepository extends JpaRepository<OtpVerification, String> {
    // Find the latest OTP for an email, ordered by created_at DESC to get the most recent
    @Query("SELECT o FROM OtpVerification o WHERE o.email = :email ORDER BY o.createdAt DESC")
    List<OtpVerification> findByEmail(@Param("email") String email);
    
    // Find the latest OTP matching both email and OTP value, ordered by created_at DESC
    @Query("SELECT o FROM OtpVerification o WHERE o.email = :email AND o.otp = :otp ORDER BY o.createdAt DESC")
    List<OtpVerification> findByEmailAndOtp(@Param("email") String email, @Param("otp") String otp);
}
