package kl.socialnetwork.validations.serviceValidation.servicesImpl;

import kl.socialnetwork.validations.serviceValidation.services.CloudinaryValidationService;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CloudinaryValidationServiceImpl implements CloudinaryValidationService {
    @Override
    public boolean isValid(Map uploadMap) {
        return uploadMap != null  && hasPublicId(uploadMap) && hasUrl(uploadMap) ;
    }

    private boolean hasPublicId(Map uploadMap){
        return uploadMap.get("public_id") != null;
    }

    private boolean hasUrl(Map uploadMap){
        return uploadMap.get("public_id") != null;
    }
}
