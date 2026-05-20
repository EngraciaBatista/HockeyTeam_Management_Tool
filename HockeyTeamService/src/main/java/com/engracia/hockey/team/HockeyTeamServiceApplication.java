/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * HockeyTeamServiceApplication.java
 * Main entry point for the Hockey Team microservice.
 * Registers with Eureka and exposes REST endpoints via WebFlux.
 */
package com.engracia.hockey.team;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

// Enables Eureka service registration
@EnableDiscoveryClient
@SpringBootApplication
public class HockeyTeamServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(HockeyTeamServiceApplication.class, args);
        System.out.println("Hockey Team Service started on port 8081");
    }
}
