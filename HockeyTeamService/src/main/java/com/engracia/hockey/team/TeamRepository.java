/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * TeamRepository.java
 * Reactive MongoDB repository interface for Team documents.
 * Extends ReactiveMongoRepository to provide CRUD operations reactively.
 */
package com.engracia.hockey.team;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;

@Repository
public interface TeamRepository extends ReactiveMongoRepository<Team, Integer> {

    // Find all teams in a given conference (Eastern or Western)
    Flux<Team> findByConference(String conference);
}
