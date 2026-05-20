/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * TeamService.java
 * Business logic layer for the Hockey Team microservice.
 * All methods return reactive types (Mono or Flux) for non-blocking I/O.
 */
package com.engracia.hockey.team;

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
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    // Return all teams; emit empty flux if none exist
    public Flux<Team> getAll() {
        return teamRepository.findAll().switchIfEmpty(Flux.empty());
    }

    // Return a single team by its ID
    public Mono<Team> getById(final int id) {
        return teamRepository.findById(id);
    }

    // Return all teams belonging to a conference
    public Flux<Team> getByConference(final String conference) {
        return teamRepository.findByConference(conference).switchIfEmpty(Flux.empty());
    }

    // Save a new team to MongoDB
    public Mono<Team> save(final Team team) {
        return teamRepository.save(team);
    }

    // Update an existing team record
    public Mono<Team> update(final int id, final Team team) {
        return teamRepository.save(team);
    }

    // Delete a team by ID; returns the deleted team or empty if not found
    public Mono<Team> delete(final int id) {
        final Mono<Team> dbTeam = getById(id);
        if (Objects.isNull(dbTeam)) {
            return Mono.empty();
        }
        return getById(id)
            .switchIfEmpty(Mono.empty())
            .filter(Objects::nonNull)
            .flatMap(teamToDelete ->
                teamRepository.delete(teamToDelete).then(Mono.just(teamToDelete))
            );
    }
}
