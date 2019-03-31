package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.Picture;

public interface PictureValidationService {
    boolean isValid(Picture picture);
}
