package kl.tennisshop.services;

import kl.tennisshop.domain.entities.Order;
import kl.tennisshop.domain.models.bindingModels.order.OrderEditBindingModel;
import kl.tennisshop.domain.models.serviceModels.OrderServiceModel;

import javax.transaction.Transactional;
import java.util.Set;

@Transactional
public interface OrderService {

    @Transactional
    boolean orderRacket(String userId , String racketId , Integer quantity);

    boolean createOrder(OrderServiceModel orderServiceModel);

    Set<OrderServiceModel> getAllByUserId(String userId);

    Order persistOrder(Order order);

    boolean checkout(String id);

    boolean remove(String id);

    boolean updateQuantity(OrderEditBindingModel orderEditBindingModel);

    Order findOrderByRacketIdAndUserId(String racketId, String userId);
}
