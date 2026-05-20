/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * PlayerRepository.java
 * Reactive MongoDB repository interface for Player documents.
 * Extends ReactiveMongoRepository to provide CRUD operations reactively.
 */
package com.engracia.hockey.player;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;

@Repository
public interface PlayerRepository extends ReactiveMongoRepository<Player, Integer> {

    // Find all players that belong to a specific team
    Flux<Player> findByTeamId(int teamId);

    // Find all players by position (e.g., all goalies)
    Flux<Player> findByPosition(String position);
}
