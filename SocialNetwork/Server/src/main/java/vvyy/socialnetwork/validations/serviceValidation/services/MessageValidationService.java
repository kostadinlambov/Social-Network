package vvyy.socialnetwork.validations.serviceValidation.services;

import vvyy.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;

public interface MessageValidationService {
    boolean isValid(MessageCreateBindingModel messageCreateBindingModel);
}
