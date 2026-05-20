/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * PlayerService.js
 * Service layer for making HTTP calls to the HockeyPlayerService REST API.
 * Base URL targets the Spring Boot service running on port 8082.
 */

const PLAYER_API_URL = 'http://localhost:8082/player';

const PlayerService = {

    // GET all players
    getAllPlayers() {
        return fetch(PLAYER_API_URL)
            .then(response => response.json());
    },

    // GET a single player by ID
    getPlayerById(id) {
        return fetch(`${PLAYER_API_URL}/${id}`)
            .then(response => response.json());
    },

    // GET all players on a specific team
    getPlayersByTeam(teamId) {
        return fetch(`${PLAYER_API_URL}/team/${teamId}`)
            .then(response => response.json());
    },

    // GET all players at a position
    getPlayersByPosition(position) {
        return fetch(`${PLAYER_API_URL}/position/${position}`)
            .then(response => response.json());
    },

    // POST a new player
    addPlayer(player) {
        return fetch(PLAYER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        }).then(response => response.json());
    },

    // PUT to update an existing player
    updatePlayer(id, player) {
        return fetch(`${PLAYER_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        }).then(response => response.json());
    },

    // DELETE a player by ID
    deletePlayer(id) {
        return fetch(`${PLAYER_API_URL}/${id}`, {
            method: 'DELETE'
        }).then(response => response.json());
    }
};

export default PlayerService;
