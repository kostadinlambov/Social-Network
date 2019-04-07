package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.Like;

public interface LikeValidationService {
    boolean isValid(Like like);
}
