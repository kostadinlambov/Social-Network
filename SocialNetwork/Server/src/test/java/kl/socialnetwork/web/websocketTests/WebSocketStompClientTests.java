//package kl.socialnetwork.web.websocketTests;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.mockito.ArgumentCaptor;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.simp.stomp.*;
//import org.springframework.messaging.support.MessageHeaderAccessor;
//import org.springframework.messaging.tcp.TcpConnection;
//import org.springframework.scheduling.TaskScheduler;
//import org.springframework.util.concurrent.SettableListenableFuture;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketHandler;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.client.WebSocketClient;
//import org.springframework.web.socket.messaging.WebSocketStompClient;
//
//import java.net.URI;
//import java.nio.charset.StandardCharsets;
//
//
//import static org.junit.Assert.assertEquals;
//import static org.junit.Assert.assertNotNull;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//public class WebSocketStompClientTests {
//    @Mock
//    private TaskScheduler taskScheduler;
//
//    @Mock
//    private ConnectionHandlingStompSession stompSession;
//
//    @Mock
//    private WebSocketSession webSocketSession;
//
//
//    private TestWebSocketStompClient stompClient;
//
//    private ArgumentCaptor<WebSocketHandler> webSocketHandlerCaptor;
//
//    private SettableListenableFuture<WebSocketSession> handshakeFuture;
//
//
//    @Before
//    public void setUp() throws Exception {
//        MockitoAnnotations.initMocks(this);
//
//        WebSocketClient webSocketClient = mock(WebSocketClient.class);
//        this.stompClient = new TestWebSocketStompClient(webSocketClient);
//        this.stompClient.setTaskScheduler(this.taskScheduler);
//        this.stompClient.setStompSession(this.stompSession);
//
//        this.webSocketHandlerCaptor = ArgumentCaptor.forClass(WebSocketHandler.class);
//        this.handshakeFuture = new SettableListenableFuture<>();
//        when(webSocketClient.doHandshake(this.webSocketHandlerCaptor.capture(), any(), any(URI.class)))
//                .thenReturn(this.handshakeFuture);
//    }
//
//    @Test
//    public void webSocketHandshakeFailure() throws Exception {
//        connect();
//
//        IllegalStateException handshakeFailure = new IllegalStateException("simulated exception");
//        this.handshakeFuture.setException(handshakeFailure);
//
//        verify(this.stompSession).afterConnectFailure(same(handshakeFailure));
//    }
//
//    @Test
//    public void webSocketConnectionEstablished() throws Exception {
//        connect().afterConnectionEstablished(this.webSocketSession);
//        verify(this.stompSession).afterConnected(notNull());
//    }
//
//    @Test
//    @SuppressWarnings({"unchecked", "rawtypes"})
//    public void handleWebSocketMessage() throws Exception {
//        String text = "SEND\na:alpha\n\nMessage payload\0";
//        connect().handleMessage(this.webSocketSession, new TextMessage(text));
//
//        ArgumentCaptor<Message> captor = ArgumentCaptor.forClass(Message.class);
//        verify(this.stompSession).handleMessage(captor.capture());
//        Message<byte[]> message = captor.getValue();
//        assertNotNull(message);
//
//        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//        StompHeaders headers = StompHeaders.readOnlyStompHeaders(accessor.toNativeHeaderMap());
//        assertEquals(StompCommand.SEND, accessor.getCommand());
//        assertEquals("alpha", headers.getFirst("a"));
//        assertEquals("Message payload", new String(message.getPayload(), StandardCharsets.UTF_8));
//    }
//
//
//    private WebSocketHandler connect() {
//        this.stompClient.connect("/socket", mock(StompSessionHandler.class));
//
//        verify(this.stompSession).getSessionFuture();
//        verifyNoMoreInteractions(this.stompSession);
//
//        WebSocketHandler webSocketHandler = this.webSocketHandlerCaptor.getValue();
//        assertNotNull(webSocketHandler);
//        return webSocketHandler;
//    }
//
//    @SuppressWarnings("unchecked")
//    private TcpConnection<byte[]> getTcpConnection() throws Exception {
//        WebSocketHandler webSocketHandler = connect();
//        webSocketHandler.afterConnectionEstablished(this.webSocketSession);
//        return (TcpConnection<byte[]>) webSocketHandler;
//    }
//
//    private static class TestWebSocketStompClient extends WebSocketStompClient {
//
//        private ConnectionHandlingStompSession stompSession;
//
//        public TestWebSocketStompClient(WebSocketClient webSocketClient) {
//            super(webSocketClient);
//        }
//
//        public void setStompSession(ConnectionHandlingStompSession stompSession) {
//            this.stompSession = stompSession;
//        }
//
//        @Override
//        protected ConnectionHandlingStompSession createSession(StompHeaders headers, StompSessionHandler handler) {
//            return this.stompSession;
//        }
//    }
//
//}
//
