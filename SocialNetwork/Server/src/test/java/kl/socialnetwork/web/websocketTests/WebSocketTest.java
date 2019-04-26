//package kl.socialnetwork.web.websocketTests;
//
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mock;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.messaging.simp.stomp.*;
//import org.springframework.scheduling.TaskScheduler;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.client.standard.StandardWebSocketClient;
//import org.springframework.web.socket.messaging.WebSocketStompClient;
//import org.springframework.web.socket.sockjs.client.SockJsClient;
//import org.springframework.web.socket.sockjs.client.WebSocketTransport;
//
//import java.lang.reflect.Type;
//import java.util.concurrent.BlockingQueue;
//import java.util.concurrent.LinkedBlockingDeque;
//
//import static java.util.Arrays.asList;
//import static java.util.concurrent.TimeUnit.SECONDS;
//import static org.mockito.Mockito.mock;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration
//@WebAppConfiguration
//@SpringBootTest
//public class WebSocketTest {
//    static final String WEBSOCKET_URI = "ws://localhost:8080/socket";
//    static final String WEBSOCKET_TOPIC = "/topic";
//
//    BlockingQueue<String> blockingQueue;
//    WebSocketStompClient stompClient;
//
//    @Mock
//    private TaskScheduler taskScheduler;
//
//    @Mock
//    private ConnectionHandlingStompSession stompSession;
//
//    @Mock
//    private WebSocketSession webSocketSession;
//
//    @Before
//    public void setup() {
//        blockingQueue = new LinkedBlockingDeque<>();
//        stompClient = new WebSocketStompClient(new SockJsClient(
//                asList(new WebSocketTransport(new StandardWebSocketClient()))));
//    }
//
//    @Test
//    public void shouldReceiveAMessageFromTheServer() throws Exception {
//        StompSession session = stompClient
//                .connect("/socket", new StompSessionHandlerAdapter() {
//                })
//                .get(1, SECONDS);
////        session.subscribe(WEBSOCKET_TOPIC, new DefaultStompFrameHandler());
//
//        this.stompClient.connect("/socket", mock(StompSessionHandler.class));
//
//        String message = "MESSAGE TEST";
//        session.send(WEBSOCKET_TOPIC, message.getBytes());
//
//        Assert.assertEquals(message, blockingQueue.poll(1, SECONDS));
//    }
//
//    class DefaultStompFrameHandler implements StompFrameHandler {
//        @Override
//        public Type getPayloadType(StompHeaders stompHeaders) {
//            return byte[].class;
//        }
//
//        @Override
//        public void handleFrame(StompHeaders stompHeaders, Object o) {
//            blockingQueue.offer(new String((byte[]) o));
//        }
//    }
//}