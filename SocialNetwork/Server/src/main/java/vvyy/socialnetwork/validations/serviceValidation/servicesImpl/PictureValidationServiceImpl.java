package vvyy.socialnetwork.validations.serviceValidation.servicesImpl;

import vvyy.socialnetwork.domain.entities.Picture;
import vvyy.socialnetwork.validations.serviceValidation.services.PictureValidationService;
import org.springframework.stereotype.Component;

@Component
public class PictureValidationServiceImpl implements PictureValidationService {
    @Override
    public boolean isValid(Picture picture) {
        return picture != null;
    }
}
