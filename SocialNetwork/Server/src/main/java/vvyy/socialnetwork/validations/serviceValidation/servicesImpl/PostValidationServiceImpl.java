package vvyy.socialnetwork.validations.serviceValidation.servicesImpl;

import vvyy.socialnetwork.domain.entities.Post;
import vvyy.socialnetwork.domain.models.bindingModels.post.PostCreateBindingModel;
import vvyy.socialnetwork.validations.serviceValidation.services.PostValidationService;
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
