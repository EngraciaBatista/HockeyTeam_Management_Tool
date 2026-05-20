/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * PlayerList.js
 * Component that fetches and displays all hockey players from the Player Service.
 * Supports filtering by team ID or position.
 */
import React, { Component } from 'react';
import PlayerService from '../services/PlayerService';

class PlayerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            loading: true,
            error: null,
            filterType: '',
            filterValue: ''
        };
        this.handleFilterTypeChange = this.handleFilterTypeChange.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
        this.loadAll = this.loadAll.bind(this);
    }

    componentDidMount() {
        this.loadAll();
    }

    loadAll() {
        PlayerService.getAllPlayers()
            .then(data => {
                this.setState({ players: data, loading: false, error: null });
            })
            .catch(() => {
                this.setState({ error: 'Could not connect to Player Service. Make sure it is running on port 8082.', loading: false });
            });
    }

    handleFilterTypeChange(e) {
        this.setState({ filterType: e.target.value, filterValue: '' });
    }

    handleFilterValueChange(e) {
        this.setState({ filterValue: e.target.value });
    }

    handleFilterSubmit(e) {
        e.preventDefault();
        const { filterType, filterValue } = this.state;
        if (!filterType || !filterValue) {
            this.loadAll();
            return;
        }
        this.setState({ loading: true });

        let promise;
        if (filterType === 'team') {
            promise = PlayerService.getPlayersByTeam(parseInt(filterValue));
        } else {
            promise = PlayerService.getPlayersByPosition(filterValue);
        }

        promise
            .then(data => {
                this.setState({ players: data, loading: false, error: null });
            })
            .catch(() => {
                this.setState({ error: 'Error filtering players.', loading: false });
            });
    }

    render() {
        const { players, loading, error, filterType, filterValue } = this.state;

        return (
            <div>
                <h2>Hockey Players</h2>

                {/* Filter controls */}
                <form onSubmit={this.handleFilterSubmit} style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <select value={filterType} onChange={this.handleFilterTypeChange}>
                        <option value="">Filter by...</option>
                        <option value="team">Team ID</option>
                        <option value="position">Position</option>
                    </select>

                    {filterType === 'team' && (
                        <input
                            type="number"
                            placeholder="Enter Team ID"
                            value={filterValue}
                            onChange={this.handleFilterValueChange}
                            style={{ padding: '6px', borderRadius: '5px', border: '1px solid #cdd9e8' }}
                        />
                    )}
                    {filterType === 'position' && (
                        <select value={filterValue} onChange={this.handleFilterValueChange}>
                            <option value="">Select position</option>
                            <option value="C">C - Center</option>
                            <option value="LW">LW - Left Wing</option>
                            <option value="RW">RW - Right Wing</option>
                            <option value="D">D - Defense</option>
                            <option value="G">G - Goalie</option>
                        </select>
                    )}

                    <button type="submit" className="btn-submit" style={{ padding: '6px 16px', marginTop: 0 }}>Filter</button>
                    <button type="button" className="btn-submit" style={{ padding: '6px 16px', marginTop: 0, backgroundColor: '#666' }} onClick={this.loadAll}>Clear</button>
                </form>

                {loading && <p className="loading">Loading players...</p>}
                {error && <p className="error-msg">{error}</p>}

                {!loading && !error && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Team ID</th>
                                <th>Jersey #</th>
                                <th>Goals</th>
                                <th>Assists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.length === 0 ? (
                                <tr><td colSpan="7">No players found.</td></tr>
                            ) : (
                                players.map(player => (
                                    <tr key={player.playerId}>
                                        <td>{player.playerId}</td>
                                        <td>{player.playerName}</td>
                                        <td>{player.position}</td>
                                        <td>{player.teamId}</td>
                                        <td>{player.jerseyNumber}</td>
                                        <td>{player.goals}</td>
                                        <td>{player.assists}</td>
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

export default PlayerList;
