package kl.socialnetwork.validations.serviceValidation.services;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface CloudinaryValidationService {
    boolean isValid(Map uploadMap);

    boolean isValid(MultipartFile file, String uuid);

    boolean isValid(String public_id);
}
