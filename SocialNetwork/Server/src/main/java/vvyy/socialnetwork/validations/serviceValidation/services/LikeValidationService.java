package vvyy.socialnetwork.validations.serviceValidation.services;

import vvyy.socialnetwork.domain.entities.Like;

public interface LikeValidationService {
    boolean isValid(Like like);
}
