/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * AddPlayer.js
 * Form component for adding a new hockey player.
 * Sends a POST request to the Player Service via PlayerService.addPlayer().
 */
import React, { Component } from 'react';
import PlayerService from '../services/PlayerService';

class AddPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerId: '',
            playerName: '',
            position: 'C',
            teamId: '',
            jerseyNumber: '',
            goals: '',
            assists: '',
            message: '',
            isError: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { playerId, playerName, position, teamId, jerseyNumber, goals, assists } = this.state;

        const player = {
            playerId: parseInt(playerId),
            playerName,
            position,
            teamId: parseInt(teamId),
            jerseyNumber: parseInt(jerseyNumber),
            goals: parseInt(goals),
            assists: parseInt(assists)
        };

        PlayerService.addPlayer(player)
            .then(data => {
                this.setState({
                    message: `Player "${data.playerName}" added successfully!`,
                    isError: false,
                    playerId: '', playerName: '', position: 'C',
                    teamId: '', jerseyNumber: '', goals: '', assists: ''
                });
            })
            .catch(() => {
                this.setState({
                    message: 'Error adding player. Check that the Player Service is running.',
                    isError: true
                });
            });
    }

    render() {
        const { playerId, playerName, position, teamId, jerseyNumber, goals, assists, message, isError } = this.state;

        return (
            <div>
                <h2>Add a New Player</h2>
                <form onSubmit={this.handleSubmit} style={{ maxWidth: '450px' }}>

                    <div className="form-group">
                        <label>Player ID</label>
                        <input type="number" name="playerId" value={playerId} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Player Name</label>
                        <input type="text" name="playerName" value={playerName} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Position</label>
                        <select name="position" value={position} onChange={this.handleChange}>
                            <option value="C">C - Center</option>
                            <option value="LW">LW - Left Wing</option>
                            <option value="RW">RW - Right Wing</option>
                            <option value="D">D - Defense</option>
                            <option value="G">G - Goalie</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Team ID</label>
                        <input type="number" name="teamId" value={teamId} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Jersey Number</label>
                        <input type="number" name="jerseyNumber" value={jerseyNumber} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Goals</label>
                        <input type="number" name="goals" value={goals} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Assists</label>
                        <input type="number" name="assists" value={assists} onChange={this.handleChange} required />
                    </div>

                    <button type="submit" className="btn-submit">Add Player</button>
                </form>

                {message && (
                    <p className={isError ? 'error-msg' : 'success-msg'}>{message}</p>
                )}
            </div>
        );
    }
}

export default AddPlayer;
