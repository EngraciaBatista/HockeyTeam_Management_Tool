/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * PlayerController.java
 * REST controller exposing CRUD endpoints for Hockey Players.
 * Uses Spring WebFlux (Mono/Flux) for reactive, non-blocking responses.
 * CORS is enabled to allow the React frontend on port 3000 to connect.
 */
package com.engracia.hockey.player;

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
@RequestMapping("/player")
@AllArgsConstructor
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // GET /player - return all players
    @GetMapping
    public Flux<Player> getAll() {
        System.out.println("Fetching all players");
        return playerService.getAll();
    }

    // GET /player/{id} - return a single player by ID
    @GetMapping("/{id}")
    public Mono<Player> getById(@PathVariable("id") final int id) {
        System.out.println("Fetching player with ID: " + id);
        return playerService.getById(id);
    }

    // GET /player/team/{teamId} - return all players on a team
    @GetMapping("/team/{teamId}")
    public Flux<Player> getByTeamId(@PathVariable("teamId") final int teamId) {
        System.out.println("Fetching players for team ID: " + teamId);
        return playerService.getByTeamId(teamId);
    }

    // GET /player/position/{pos} - return all players at a position
    @GetMapping("/position/{pos}")
    public Flux<Player> getByPosition(@PathVariable("pos") final String position) {
        System.out.println("Fetching players at position: " + position);
        return playerService.getByPosition(position);
    }

    // POST /player - add a new player
    @PostMapping
    public Mono<Player> save(@RequestBody final Player player) {
        System.out.println("Adding player: " + player.getPlayerName() + " (#" + player.getJerseyNumber() + ")");
        return playerService.save(player);
    }

    // PUT /player/{id} - update an existing player
    @PutMapping("/{id}")
    public Mono<Player> update(@PathVariable("id") final int id, @RequestBody final Player player) {
        System.out.println("Updating player with ID: " + id);
        return playerService.update(id, player);
    }

    // DELETE /player/{id} - delete a player
    @DeleteMapping("/{id}")
    public Mono<Player> delete(@PathVariable("id") final int id) {
        System.out.println("Deleting player with ID: " + id);
        return playerService.delete(id);
    }
}
