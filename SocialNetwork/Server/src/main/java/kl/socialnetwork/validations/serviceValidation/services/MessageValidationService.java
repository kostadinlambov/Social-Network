package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;

public interface MessageValidationService {
    boolean isValid(MessageCreateBindingModel messageCreateBindingModel);
}
