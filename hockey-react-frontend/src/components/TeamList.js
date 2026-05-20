/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * TeamList.js
 * Component that fetches and displays all hockey teams from the Team Service.
 * Data is loaded from the REST API when the component mounts.
 */
import React, { Component } from 'react';
import TeamService from '../services/TeamService';

class TeamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            loading: true,
            error: null,
            filterConference: ''
        };
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
        this.loadAll = this.loadAll.bind(this);
    }

    componentDidMount() {
        this.loadAll();
    }

    loadAll() {
        TeamService.getAllTeams()
            .then(data => {
                this.setState({ teams: data, loading: false, error: null });
            })
            .catch(err => {
                this.setState({ error: 'Could not connect to Team Service. Make sure it is running on port 8081.', loading: false });
            });
    }

    handleConferenceChange(e) {
        this.setState({ filterConference: e.target.value });
    }

    handleFilterSubmit(e) {
        e.preventDefault();
        const { filterConference } = this.state;
        if (!filterConference) {
            this.loadAll();
            return;
        }
        this.setState({ loading: true });
        TeamService.getTeamsByConference(filterConference)
            .then(data => {
                this.setState({ teams: data, loading: false, error: null });
            })
            .catch(() => {
                this.setState({ error: 'Error filtering teams.', loading: false });
            });
    }

    render() {
        const { teams, loading, error, filterConference } = this.state;

        return (
            <div>
                <h2>Hockey Teams</h2>

                {/* Filter by conference */}
                <form onSubmit={this.handleFilterSubmit} style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select value={filterConference} onChange={this.handleConferenceChange}>
                        <option value="">All Conferences</option>
                        <option value="Eastern">Eastern</option>
                        <option value="Western">Western</option>
                    </select>
                    <button type="submit" className="btn-submit" style={{ padding: '6px 16px', marginTop: 0 }}>Filter</button>
                    <button type="button" className="btn-submit" style={{ padding: '6px 16px', marginTop: 0, backgroundColor: '#666' }} onClick={this.loadAll}>Clear</button>
                </form>

                {loading && <p className="loading">Loading teams...</p>}
                {error && <p className="error-msg">{error}</p>}

                {!loading && !error && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Team Name</th>
                                <th>City</th>
                                <th>Conference</th>
                                <th>Wins</th>
                                <th>Losses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.length === 0 ? (
                                <tr><td colSpan="6">No teams found.</td></tr>
                            ) : (
                                teams.map(team => (
                                    <tr key={team.teamId}>
                                        <td>{team.teamId}</td>
                                        <td>{team.teamName}</td>
                                        <td>{team.city}</td>
                                        <td>{team.conference}</td>
                                        <td>{team.wins}</td>
                                        <td>{team.losses}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default TeamList;
