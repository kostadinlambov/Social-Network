package vvyy.socialnetwork.validations.serviceValidation.services;

import vvyy.socialnetwork.domain.entities.Relationship;

public interface RelationshipValidationService {
    boolean isValid(Relationship relationship);
}
