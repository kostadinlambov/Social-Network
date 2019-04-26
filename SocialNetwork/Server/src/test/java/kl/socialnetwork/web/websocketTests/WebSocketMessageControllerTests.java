//package kl.socialnetwork.web.websocketTests;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import kl.socialnetwork.domain.entities.Relationship;
//import kl.socialnetwork.domain.entities.User;
//import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
//import kl.socialnetwork.domain.models.serviceModels.MessageServiceModel;
//import kl.socialnetwork.services.MessageService;
//import kl.socialnetwork.services.RelationshipService;
//import kl.socialnetwork.servicesImpl.MessageServiceImpl;
//import kl.socialnetwork.testUtils.MessagesUtils;
//import kl.socialnetwork.testUtils.RelationshipsUtils;
//import kl.socialnetwork.testUtils.UsersUtils;
//import kl.socialnetwork.web.controllers.MessageController;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.support.StaticApplicationContext;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.SubscribableChannel;
//import org.springframework.messaging.converter.MappingJackson2MessageConverter;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.messaging.simp.annotation.support.SimpAnnotationMethodMessageHandler;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.MessageBuilder;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.test.util.JsonPathExpectationsHelper;
//
//import java.nio.charset.Charset;
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.List;
//
//import static org.junit.Assert.assertEquals;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//
//@RunWith(SpringJUnit4ClassRunner.class)
////@ContextConfiguration
////@WebAppConfiguration
//@SpringBootTest
//public class WebSocketMessageControllerTests {
////    @Autowired
////    private SimpMessagingTemplate simpMessagingTemplate;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    private RelationshipService relationshipService;
//
//    @MockBean
//    private MessageService mockMessageService;
//
//    private TestMessageChannel clientOutboundChannel;
//
//    private TestAnnotationMethodHandler annotationMethodHandler;
//
//    @Before
//    public void setup() {
//        MessageController messageController = new MessageController(new SimpMessagingTemplate(new TestMessageChannel()), mockMessageService, relationshipService,  modelMapper, objectMapper);
//
//        this.clientOutboundChannel = new TestMessageChannel();
//
//        this.annotationMethodHandler = new TestAnnotationMethodHandler(
//                new TestMessageChannel(), clientOutboundChannel, new SimpMessagingTemplate(new TestMessageChannel()));
//
//        this.annotationMethodHandler.registerHandler(messageController);
//        this.annotationMethodHandler.setDestinationPrefixes(Arrays.asList("/app"));
//        this.annotationMethodHandler.setMessageConverter(new MappingJackson2MessageConverter());
//        this.annotationMethodHandler.setApplicationContext(new StaticApplicationContext());
//        this.annotationMethodHandler.afterPropertiesSet();
//    }
//
//
//    @Test
//    public void getPositions() throws Exception {
//        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();
//        List<User> users = UsersUtils.getUsers(2);
//        User firstUser = users.get(0);
//        User secondUser = users.get(1);
//        Relationship relationship = RelationshipsUtils.createRelationship(firstUser, secondUser, 1, firstUser);
//        MessageServiceModel messageServiceModel = MessagesUtils.getMessageServiceModels(1, firstUser, secondUser, relationship).get(0);
//
//        when(mockMessageService.createMessage(any(),any() ))
//                .thenReturn(messageServiceModel);
//
//        byte[] payload = new ObjectMapper().writeValueAsBytes(messageCreateBindingModel);
//
//        StompHeaderAccessor headers = StompHeaderAccessor.create(StompCommand.SUBSCRIBE);
//        headers.setSubscriptionId("0");
//        headers.setDestination("/app/message");
//        headers.setSessionId("0");
//        headers.setUser(new TestPrincipal("pesho"));
//        headers.setSessionAttributes(new HashMap<>());
//        Message<byte[]> message = MessageBuilder.withPayload(payload).setHeaders(headers).build();
//
//        this.annotationMethodHandler.handleMessage(message);
//
//        int size = this.clientOutboundChannel.getMessages().size();
//
//        assertEquals(1, this.clientOutboundChannel.getMessages().size());
//        Message<?> reply = this.clientOutboundChannel.getMessages().get(0);
////
////        StompHeaderAccessor replyHeaders = StompHeaderAccessor.wrap(reply);
////        assertEquals("0", replyHeaders.getSessionId());
////        assertEquals("0", replyHeaders.getSubscriptionId());
////        assertEquals("/app/message", replyHeaders.getDestination());
////
////        String json = new String((byte[]) reply.getPayload(), Charset.forName("UTF-8"));
////        new JsonPathExpectationsHelper("$[0].company").assertValue(json, "Citrix Systems, Inc.");
////        new JsonPathExpectationsHelper("$[1].company").assertValue(json, "Dell Inc.");
////        new JsonPathExpectationsHelper("$[2].company").assertValue(json, "Microsoft");
////        new JsonPathExpectationsHelper("$[3].company").assertValue(json, "Oracle");
//    }
//
////    @Test
////    public void executeTrade() throws Exception {
////
////        Trade trade = new Trade();
////        trade.setAction(Trade.TradeAction.Buy);
////        trade.setTicker("DELL");
////        trade.setShares(25);
////
////        byte[] payload = new ObjectMapper().writeValueAsBytes(trade);
////
////        StompHeaderAccessor headers = StompHeaderAccessor.create(StompCommand.SEND);
////        headers.setDestination("/app/trade");
////        headers.setSessionId("0");
////        headers.setUser(new TestPrincipal("fabrice"));
////        headers.setSessionAttributes(new HashMap<>());
////        Message<byte[]> message = MessageBuilder.withPayload(payload).setHeaders(headers).build();
////
////        this.annotationMethodHandler.handleMessage(message);
////
////        assertEquals(1, this.tradeService.getTrades().size());
////        Trade actual = this.tradeService.getTrades().get(0);
////
////        assertEquals(Trade.TradeAction.Buy, actual.getAction());
////        assertEquals("DELL", actual.getTicker());
////        assertEquals(25, actual.getShares());
////        assertEquals("fabrice", actual.getUsername());
////    }
//
//
//    /**
//     * An extension of SimpAnnotationMethodMessageHandler that exposes a (public)
//     * method for manually registering a controller, rather than having it
//     * auto-discovered in the Spring ApplicationContext.
//     */
//    private static class TestAnnotationMethodHandler extends SimpAnnotationMethodMessageHandler {
//
//        public TestAnnotationMethodHandler(SubscribableChannel inChannel, MessageChannel outChannel,
//                                           SimpMessageSendingOperations brokerTemplate) {
//
//            super(inChannel, outChannel, brokerTemplate);
//        }
//
//        public void registerHandler(Object handler) {
//            super.detectHandlerMethods(handler);
//        }
//    }
//
//}
//
