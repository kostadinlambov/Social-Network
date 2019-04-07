package kl.tennisshop.services;

import kl.tennisshop.domain.entities.Payment;

public interface PaymentService {
    Payment persistPayment(Payment payment);
}
