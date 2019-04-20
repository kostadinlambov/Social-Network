package kl.socialnetwork.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.services.LoggerService;
import kl.socialnetwork.services.UserService;
import kl.socialnetwork.web.filters.JwtAuthenticationFilter;
import kl.socialnetwork.web.filters.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfiguration
        extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ObjectMapper mapper;
    private final LoggerService loggerService;

    @Autowired
    public ApplicationSecurityConfiguration(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder, ObjectMapper mapper, LoggerService loggerService) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.mapper = mapper;
        this.loggerService = loggerService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/users/register",
//                        "/**",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()
                .antMatchers(
                        "/users/details/*",
                        "/users/update/*",
                        "/relationship/friends/*",
                        "/relationship/findFriends/*",
                        "/relationship/addFriend",
                        "/relationship/removeFriend",
                        "/relationship/acceptFriend",
                        "/relationship/cancelRequest",
                        "/relationship/search",
                        "/pictures/all/*",
                        "/pictures/add",
                        "/pictures/remove",
                        "/post/create",
                        "/post/remove",
                        "/like/add",
                        "/comment/create",
                        "/comment/remove",
                        "/post/all/*",
                        "/message/create",
                        "/message/all/*",
                        "/message/friend",
                        "/socket/**"
                ).hasAnyAuthority("ADMIN", "ROOT", "USER")
                .antMatchers(
                        "/users/promote",
                        "/users/demote",
                        "/users/all/*",
                        "/users/details/username",
                        "/logs/all",
                        "/logs/findByUserName/*"
                ).hasAnyAuthority("ADMIN", "ROOT")
                .antMatchers(
                        "/users/delete/*",
                        "/logs/clear",
                        "/logs/clearByName/*"
                ).hasAuthority("ROOT")
                .requestMatchers(EndpointRequest.toAnyEndpoint()).hasAnyAuthority("ADMIN", "ROOT", "USER")
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), this.mapper, this.loggerService, userService))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), this.userService))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/socket/**");
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**"
                , config);
        return source;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(this.userService)
                .passwordEncoder(this.bCryptPasswordEncoder);
    }
}
