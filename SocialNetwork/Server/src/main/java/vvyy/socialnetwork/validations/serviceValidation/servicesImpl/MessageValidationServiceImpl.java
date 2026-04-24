package vvyy.socialnetwork.validations.serviceValidation.servicesImpl;

import vvyy.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import vvyy.socialnetwork.validations.serviceValidation.services.MessageValidationService;
import org.springframework.stereotype.Component;

@Component
public class MessageValidationServiceImpl implements MessageValidationService {

    @Override
    public boolean isValid(MessageCreateBindingModel messageCreateBindingModel) {
        return messageCreateBindingModel != null;
    }
}
