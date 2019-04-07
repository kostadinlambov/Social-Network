package kl.socialnetwork.validations.serviceValidation.servicesImpl;

import kl.socialnetwork.validations.serviceValidation.services.CloudinaryValidationService;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Component
public class CloudinaryValidationServiceImpl implements CloudinaryValidationService {
    @Override
    public boolean isValid(Map uploadMap) {
        return uploadMap != null && hasPublicId(uploadMap) && hasUrl(uploadMap);
    }

    @Override
    public boolean isValid(MultipartFile file, String uuid) {
        return file != null && uuid != null;
    }

    @Override
    public boolean isValid(String public_id) {
            return public_id != null;
    }


    private boolean hasPublicId(Map uploadMap) {
        return uploadMap.get("public_id") != null;
    }

    private boolean hasUrl(Map uploadMap) {
        return uploadMap.get("url") != null;
    }
}
