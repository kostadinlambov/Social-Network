package kl.socialnetwork.config;

import io.jsonwebtoken.Jwts;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.services.UserService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.web.websocket.JWTAuthenticationToken;
import kl.socialnetwork.validations.serviceValidation.services.UserValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.Optional;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.UNAUTHORIZED_SERVER_ERROR_MESSAGE;

@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class ApplicationWebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    private final UserService userService;
    private final UserValidationService userValidation;

    @Autowired
    public ApplicationWebSocketConfiguration(UserService userService, UserValidationService userValidation) {
        this.userService = userService;
        this.userValidation = userValidation;
    }

    /**
     * Register Stomp endpoints: the url to open the WebSocket connection.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register the "/socket" endpoint, enabling the SockJS protocol.
        // SockJS is used (both client and server side) to allow alternative
        // messaging options if WebSocket is not available.
        registry.addEndpoint("/socket")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
//    // Enable a simple memory-based message broker to send messages to the
//    // client on destinations prefixed with "/app".
//    // Simple message broker handles subscription requests from clients, stores
//    // them in memory, and broadcasts messages to connected clients with
//    // matching destinations.
        registry.setApplicationDestinationPrefixes("/app")
                .setUserDestinationPrefix("/user")
                .enableSimpleBroker("/chat", "/topic", "/queue");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    Optional.ofNullable(accessor.getNativeHeader("Authorization")).ifPresent(ah -> {
                        String bearerToken = ah.get(0).replace("Bearer ", "");
                        JWTAuthenticationToken token = getJWTAuthenticationToken(bearerToken);
                        accessor.setUser(token);
                    });
                }
                return message;
            }
        });
    }

    private JWTAuthenticationToken getJWTAuthenticationToken(String token) {
        if (token != null) {
            String username = Jwts.parser()
                    .setSigningKey("Secret".getBytes())
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody()
                    .getSubject();

            if (username != null) {
                UserDetails userData = this.userService
                        .loadUserByUsername(username);

                if (!userValidation.isValid(userData)) {
                    throw new CustomException(UNAUTHORIZED_SERVER_ERROR_MESSAGE);
                }

                JWTAuthenticationToken jwtAuthenticationToken =
                        new JWTAuthenticationToken(userData.getAuthorities(), token, (User) userData);

                jwtAuthenticationToken.setAuthenticated(true);

                return jwtAuthenticationToken;
            }
        }

        return null;
    }
}
