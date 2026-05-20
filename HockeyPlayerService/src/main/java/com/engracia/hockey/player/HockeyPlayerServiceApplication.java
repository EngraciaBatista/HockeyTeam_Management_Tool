/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * HockeyPlayerServiceApplication.java
 * Main entry point for the Hockey Player microservice.
 * Registers with Eureka and exposes REST endpoints via WebFlux.
 */
package com.engracia.hockey.player;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

// Enables Eureka service registration
@EnableDiscoveryClient
@SpringBootApplication
public class HockeyPlayerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(HockeyPlayerServiceApplication.class, args);
        System.out.println("Hockey Player Service started on port 8082");
    }
}
