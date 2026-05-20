/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * PlayerService.java
 * Business logic layer for the Hockey Player microservice.
 * All methods return reactive types (Mono or Flux) for non-blocking I/O.
 */
package com.engracia.hockey.player;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Transactional
@AllArgsConstructor
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    // Return all players; emit empty flux if none exist
    public Flux<Player> getAll() {
        return playerRepository.findAll().switchIfEmpty(Flux.empty());
    }

    // Return a single player by their ID
    public Mono<Player> getById(final int id) {
        return playerRepository.findById(id);
    }

    // Return all players on a specific team
    public Flux<Player> getByTeamId(final int teamId) {
        return playerRepository.findByTeamId(teamId).switchIfEmpty(Flux.empty());
    }

    // Return all players at a given position
    public Flux<Player> getByPosition(final String position) {
        return playerRepository.findByPosition(position).switchIfEmpty(Flux.empty());
    }

    // Save a new player to MongoDB
    public Mono<Player> save(final Player player) {
        return playerRepository.save(player);
    }

    // Update an existing player record
    public Mono<Player> update(final int id, final Player player) {
        return playerRepository.save(player);
    }

    // Delete a player by ID; returns the deleted player or empty if not found
    public Mono<Player> delete(final int id) {
        final Mono<Player> dbPlayer = getById(id);
        if (Objects.isNull(dbPlayer)) {
            return Mono.empty();
        }
        return getById(id)
            .switchIfEmpty(Mono.empty())
            .filter(Objects::nonNull)
            .flatMap(playerToDelete ->
                playerRepository.delete(playerToDelete).then(Mono.just(playerToDelete))
            );
    }
}
