/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * SecurityConfig.java
 * Spring Security configuration for the Hockey Team Service.
 * Uses reactive WebFlux security with HTTP Basic authentication.
 * Public endpoints (GET) are accessible without login.
 * Write operations (POST, PUT, DELETE) require authentication.
 */
package com.engracia.hockey.team;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

// Enables Spring Security for reactive (WebFlux) applications
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    /* Define the security filter chain:
     * - GET requests to /team/** are public (anyone can view teams)
     * - All other requests (POST, PUT, DELETE) require authentication
     * - HTTP Basic authentication is used
     */
    @Bean
    public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeExchange(exchanges -> exchanges
                .pathMatchers(HttpMethod.GET, "/team/**").permitAll()
                .anyExchange().authenticated()
            )
            .httpBasic(httpBasic -> {});
        return http.build();
    }

    // In-memory user for demo purposes
    @Bean
    public MapReactiveUserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails admin = User.builder()
            .username("admin")
            .password(encoder.encode("hockey123"))
            .roles("ADMIN")
            .build();
        return new MapReactiveUserDetailsService(admin);
    }

    // BCrypt password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
