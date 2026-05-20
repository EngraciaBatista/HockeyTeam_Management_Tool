/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * AddTeam.js
 * Form component for adding a new hockey team.
 * Sends a POST request to the Team Service via TeamService.addTeam().
 * Requires admin credentials (configured in TeamService.js).
 */
import React, { Component } from 'react';
import TeamService from '../services/TeamService';

class AddTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamId: '',
            teamName: '',
            city: '',
            conference: 'Eastern',
            wins: '',
            losses: '',
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
        const { teamId, teamName, city, conference, wins, losses } = this.state;

        const team = {
            teamId: parseInt(teamId),
            teamName,
            city,
            conference,
            wins: parseInt(wins),
            losses: parseInt(losses)
        };

        TeamService.addTeam(team)
            .then(data => {
                this.setState({
                    message: `Team "${data.teamName}" added successfully!`,
                    isError: false,
                    teamId: '', teamName: '', city: '',
                    conference: 'Eastern', wins: '', losses: ''
                });
            })
            .catch(() => {
                this.setState({
                    message: 'Error adding team. Check that the Team Service is running and your credentials are correct.',
                    isError: true
                });
            });
    }

    render() {
        const { teamId, teamName, city, conference, wins, losses, message, isError } = this.state;

        return (
            <div>
                <h2>Add a New Team</h2>
                <form onSubmit={this.handleSubmit} style={{ maxWidth: '450px' }}>

                    <div className="form-group">
                        <label>Team ID</label>
                        <input type="number" name="teamId" value={teamId} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Team Name</label>
                        <input type="text" name="teamName" value={teamName} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input type="text" name="city" value={city} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Conference</label>
                        <select name="conference" value={conference} onChange={this.handleChange}>
                            <option value="Eastern">Eastern</option>
                            <option value="Western">Western</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Wins</label>
                        <input type="number" name="wins" value={wins} onChange={this.handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Losses</label>
                        <input type="number" name="losses" value={losses} onChange={this.handleChange} required />
                    </div>

                    <button type="submit" className="btn-submit">Add Team</button>
                </form>

                {message && (
                    <p className={isError ? 'error-msg' : 'success-msg'}>{message}</p>
                )}
            </div>
        );
    }
}

export default AddTeam;
