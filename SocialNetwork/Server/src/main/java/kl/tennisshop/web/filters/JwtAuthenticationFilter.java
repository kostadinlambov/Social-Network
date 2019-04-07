package kl.tennisshop.web.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import kl.tennisshop.domain.entities.User;
import kl.tennisshop.domain.models.bindingModels.user.UserLoginBindingModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final ObjectMapper mapper;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, ObjectMapper mapper) {
        this.authenticationManager = authenticationManager;
        this.mapper = mapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            UserLoginBindingModel loginBindingModel = new ObjectMapper()
                    .readValue(request.getInputStream(), UserLoginBindingModel.class);

            return this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginBindingModel.getUsername(),
                            loginBindingModel.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException ignored) {
            return null;
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = ((User) authResult.getPrincipal());
        String authority = user.getAuthorities()
                .stream()
                .findFirst()
                .orElse(null)
                .getAuthority();
        String id = user.getId();

        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + 12000000))
                .claim("role", authority)
                .claim("id", id)
                .signWith(SignatureAlgorithm.HS256, "Secret".getBytes())
                .compact();

        String tokenJson = this.mapper.writeValueAsString("token " + token);

//        response.getWriter()
//                .append("Authorization: Bearer " + token);
                response.getWriter()
                .append(tokenJson);



        System.out.println(response);


        response.addHeader("Authorization", "Bearer " + token);
    }
}
