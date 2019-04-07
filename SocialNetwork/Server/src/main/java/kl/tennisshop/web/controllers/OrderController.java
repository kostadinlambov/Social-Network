package kl.tennisshop.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.tennisshop.domain.models.bindingModels.order.OrderEditBindingModel;
import kl.tennisshop.domain.models.bindingModels.order.OrderRacketBindingModel;
import kl.tennisshop.domain.models.viewModels.order.OrderViewModel;
import kl.tennisshop.services.OrderService;
import kl.tennisshop.utils.constants.ResponseMessageConstants;
import kl.tennisshop.utils.responseHandler.exceptions.CustomException;
import kl.tennisshop.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static kl.tennisshop.utils.constants.ResponseMessageConstants.*;


@RestController
@RequestMapping(value = "/orders")
public class OrderController {
    private final OrderService orderService;
    private  final ObjectMapper objectMapper;
    private  final ModelMapper modelMapper;

    @Autowired
    public OrderController(OrderService orderService, ObjectMapper objectMapper, ModelMapper modelMapper) {
        this.orderService = orderService;
        this.objectMapper = objectMapper;
        this.modelMapper = modelMapper;
    }

    @PostMapping(value = "/order", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity orderRacket(@RequestBody @Valid OrderRacketBindingModel orderRacketBindingModel) throws JsonProcessingException {

        String userId = orderRacketBindingModel.getUserId();
        String racketId = orderRacketBindingModel.getRacketId();
        Integer quantity = orderRacketBindingModel.getQuantity();
        boolean result = this.orderService.orderRacket(userId, racketId, quantity);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_ADDED_TO_CART_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }


    @GetMapping(value = "/all/{id}", produces = "application/json")
    public @ResponseBody List<OrderViewModel> allRackets(@PathVariable String id) {
        List<OrderViewModel> orders = this.orderService
                .getAllByUserId(id)
                .stream()
                .map(x -> this.modelMapper.map(x, OrderViewModel.class))
                .collect(Collectors.toList());
        return orders;
    }


    @PostMapping(value = "/checkout")
    public ResponseEntity checkout(@RequestParam(name = "id") String id) throws JsonProcessingException {
        boolean resultOfCheckout = this.orderService.checkout(id);

        if (resultOfCheckout) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_CHECKOUT_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(FAILURE_CHECKOUT_MESSAGE);
    }

    @PostMapping(value = "/remove")
    public ResponseEntity remove(@RequestParam(name = "id") String id) throws JsonProcessingException {
        boolean resultOfRemoving = this.orderService.remove(id);

        if (resultOfRemoving) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_REMOVE_ORDER_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(FAILURE_CHECKOUT_MESSAGE);
    }

    @PutMapping(value = "/edit")
    public ResponseEntity remove(@RequestBody @Valid OrderEditBindingModel orderEditBindingModel)throws JsonProcessingException {
        boolean result = this.orderService.updateQuantity(orderEditBindingModel);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_ORDER_UPDATE_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(FAILURE_ORDER_EDIT_MESSAGE);
    }
}
