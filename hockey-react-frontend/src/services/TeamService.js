/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * TeamService.js
 * Service layer for making HTTP calls to the HockeyTeamService REST API.
 * Base URL targets the Spring Boot service running on port 8081.
 */

const TEAM_API_URL = 'http://localhost:8081/team';

const TeamService = {

    // GET all teams
    getAllTeams() {
        return fetch(TEAM_API_URL)
            .then(response => response.json());
    },

    // GET a single team by ID
    getTeamById(id) {
        return fetch(`${TEAM_API_URL}/${id}`)
            .then(response => response.json());
    },

    // GET teams by conference
    getTeamsByConference(conference) {
        return fetch(`${TEAM_API_URL}/conference/${conference}`)
            .then(response => response.json());
    },

    // POST a new team (requires Basic Auth)
    addTeam(team) {
        const credentials = btoa('admin:hockey123');
        return fetch(TEAM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            },
            body: JSON.stringify(team)
        }).then(response => response.json());
    },

    // PUT to update an existing team (requires Basic Auth)
    updateTeam(id, team) {
        const credentials = btoa('admin:hockey123');
        return fetch(`${TEAM_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            },
            body: JSON.stringify(team)
        }).then(response => response.json());
    },

    // DELETE a team by ID (requires Basic Auth)
    deleteTeam(id) {
        const credentials = btoa('admin:hockey123');
        return fetch(`${TEAM_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        }).then(response => response.json());
    }
};

export default TeamService;
