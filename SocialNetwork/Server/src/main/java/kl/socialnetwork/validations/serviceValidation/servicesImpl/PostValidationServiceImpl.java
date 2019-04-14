package kl.socialnetwork.validations.serviceValidation.servicesImpl;

import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.models.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.validations.serviceValidation.services.PostValidationService;
import org.springframework.stereotype.Component;

@Component
public class PostValidationServiceImpl implements PostValidationService {
    @Override
    public boolean isValid(Post post) {
        return post != null;
    }

    @Override
    public boolean isValid(PostCreateBindingModel postCreateBindingModel) {
        return postCreateBindingModel != null;
    }
}
