package kl.tennisshop.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import kl.tennisshop.services.UserService;
import kl.tennisshop.web.filters.JwtAuthenticationFilter;
import kl.tennisshop.web.filters.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
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

    @Autowired
    public ApplicationSecurityConfiguration(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder, ObjectMapper mapper) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.mapper = mapper;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers(
                        "/users/register",
                        "/rackets/all",
                        "/orders/order",
                        "/orders/all",
                        "/orders/checkout",
                        "/orders/remove",
                        "/orders/edit",
                        "/rackets/test",
                        "/users/update",
                        "/**"
                        ).permitAll()
                .antMatchers(
                        "/rackets/details",
                        "/rackets/create",
                        "/rackets/edit",
                        "/rackets/categories",
                        "/users/all",
                        "/users/promote",
                        "/users/demote",
                        "/users/details",
                        "/users/details/username",
                        "/users/editDetails",
                        "categories/all",
                        "categories/allDeleted",
                        "categories/create",
                        "categories/edit",
                        "categories/restore",
                        "categories/delete",
                        "logs/all",
                        "logs/findByUserName",
                        "logs/clear",
                        "logs/clearByName"
                ).hasAnyAuthority("ADMIN", "ROOT")
                .antMatchers(  "/rackets/delete", "/users/delete", "categories/delete").hasAuthority("ROOT")
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), this.mapper))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), this.userService))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
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
