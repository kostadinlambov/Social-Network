//package kl.socialnetwork.web.websocketTests;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.messaging.converter.StringMessageConverter;
//import org.springframework.messaging.simp.stomp.*;
//import org.springframework.web.socket.client.standard.StandardWebSocketClient;
//import org.springframework.web.socket.messaging.WebSocketStompClient;
//
//import java.lang.invoke.MethodHandles;
//import java.lang.reflect.Type;
//import java.util.function.Consumer;
//
//
//public class WsTestUtils {
//    private static Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
//
//    WebSocketStompClient createWebSocketClient() {
//        WebSocketStompClient stompClient = new WebSocketStompClient(new StandardWebSocketClient());
//        stompClient.setMessageConverter(new StringMessageConverter());
//        return stompClient;
//    }
//
//    static class MyStompSessionHandler extends StompSessionHandlerAdapter {
//        @Override
//        public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
//            log.info("Stomp client is connected");
//            super.afterConnected(session, connectedHeaders);
//        }
//
//        @Override
//        public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
//            log.info("Exception: " + exception);
//            super.handleException(session, command, headers, payload, exception);
//        }
//    }
//
//    public static class MyStompFrameHandler implements StompFrameHandler {
//
//        private final Consumer<String> frameHandler;
//
//        public MyStompFrameHandler(Consumer<String> frameHandler) {
//            this.frameHandler = frameHandler;
//        }
//
//        @Override
//        public Type getPayloadType(StompHeaders headers) {
//            return String.class;
//        }
//
//        @Override
//        public void handleFrame(StompHeaders headers, Object payload) {
//            log.info("received message: {} with headers: {}", payload, headers);
//            frameHandler.accept(payload.toString());
//        }
//    }
//}