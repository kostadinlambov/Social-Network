package kl.tennisshop.servicesImpl;

import kl.tennisshop.domain.entities.Feedback;
import kl.tennisshop.repositories.FeedbackRepository;
import kl.tennisshop.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public void persistFeedback(Feedback feedback) {
        this.feedbackRepository.save(feedback);
    }
}
