/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * HockeyEurekaServerApplication.java
 * Main entry point for the Netflix Eureka Discovery Server.
 * All hockey microservices register with this server.
 */
package com.engracia.hockey.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

// Marks this application as a Eureka discovery server
@EnableEurekaServer
@SpringBootApplication
public class HockeyEurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(HockeyEurekaServerApplication.class, args);
        System.out.println("Hockey Eureka Server started on port 8761");
    }
}
