package kl.tennisshop.servicesImpl;

import kl.tennisshop.domain.entities.Payment;
import kl.tennisshop.repositories.PaymentRepository;
import kl.tennisshop.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    private PaymentRepository paymentRepository;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Payment persistPayment(Payment payment) {
        return this.paymentRepository.save(payment);
    }
}
