package kl.socialnetwork.validations.serviceValidation.servicesImpl;

import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import kl.socialnetwork.validations.serviceValidation.services.MessageValidationService;
import org.springframework.stereotype.Component;

@Component
public class MessageValidationServiceImpl implements MessageValidationService {

    @Override
    public boolean isValid(MessageCreateBindingModel messageCreateBindingModel) {
        return messageCreateBindingModel != null;
    }
}
