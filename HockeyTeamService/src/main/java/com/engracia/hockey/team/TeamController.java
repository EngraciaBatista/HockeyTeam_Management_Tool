/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * TeamController.java
 * REST controller exposing CRUD endpoints for Hockey Teams.
 * Uses Spring WebFlux (Mono/Flux) for reactive, non-blocking responses.
 * CORS is enabled to allow the React frontend on port 3000 to connect.
 */
package com.engracia.hockey.team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/team")
@AllArgsConstructor
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class TeamController {

    @Autowired
    private TeamService teamService;

    // GET /team - return all teams
    @GetMapping
    public Flux<Team> getAll() {
        System.out.println("Fetching all teams");
        return teamService.getAll();
    }

    // GET /team/{id} - return a single team by ID
    @GetMapping("/{id}")
    public Mono<Team> getById(@PathVariable("id") final int id) {
        System.out.println("Fetching team with ID: " + id);
        return teamService.getById(id);
    }

    // GET /team/conference/{conf} - return teams by conference name
    @GetMapping("/conference/{conf}")
    public Flux<Team> getByConference(@PathVariable("conf") final String conference) {
        System.out.println("Fetching teams in conference: " + conference);
        return teamService.getByConference(conference);
    }

    // POST /team - add a new team
    @PostMapping
    public Mono<Team> save(@RequestBody final Team team) {
        System.out.println("Adding team: " + team.getTeamName() + " from " + team.getCity());
        return teamService.save(team);
    }

    // PUT /team/{id} - update an existing team
    @PutMapping("/{id}")
    public Mono<Team> update(@PathVariable("id") final int id, @RequestBody final Team team) {
        System.out.println("Updating team with ID: " + id);
        return teamService.update(id, team);
    }

    // DELETE /team/{id} - delete a team
    @DeleteMapping("/{id}")
    public Mono<Team> delete(@PathVariable("id") final int id) {
        System.out.println("Deleting team with ID: " + id);
        return teamService.delete(id);
    }
}
