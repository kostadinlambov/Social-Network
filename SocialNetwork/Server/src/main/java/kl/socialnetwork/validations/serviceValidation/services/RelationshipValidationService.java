package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.Relationship;

public interface RelationshipValidationService {
    boolean isValid(Relationship relationship);
}
