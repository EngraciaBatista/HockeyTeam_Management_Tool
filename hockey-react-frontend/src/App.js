/*
 * Centennial College - Winter 2026
 * Student: Engracia Batista
 * Student Number: 301394018
 *
 * App.js
 * Root component of the Hockey Manager React application.
 * Renders navigation tabs to switch between the Teams and Players views.
 */
import React, { Component } from 'react';
import './App.css';
import TeamList from './components/TeamList';
import PlayerList from './components/PlayerList';
import AddTeam from './components/AddTeam';
import AddPlayer from './components/AddPlayer';

class App extends Component {

  constructor(props) {
    super(props);
    // Track which tab is currently active
    this.state = {
      activeTab: 'teams'
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Hockey Manager</h1>
          <p className="subtitle">Centennial College - COMP303 Assignment 4</p>
          <p className="subtitle">Student: Engracia Batista | 301394018</p>
        </header>

        {/* Navigation tabs */}
        <nav className="tab-nav">
          <button
            className={activeTab === 'teams' ? 'tab active' : 'tab'}
            onClick={() => this.handleTabChange('teams')}
          >
            View Teams
          </button>
          <button
            className={activeTab === 'players' ? 'tab active' : 'tab'}
            onClick={() => this.handleTabChange('players')}
          >
            View Players
          </button>
          <button
            className={activeTab === 'addTeam' ? 'tab active' : 'tab'}
            onClick={() => this.handleTabChange('addTeam')}
          >
            Add Team
          </button>
          <button
            className={activeTab === 'addPlayer' ? 'tab active' : 'tab'}
            onClick={() => this.handleTabChange('addPlayer')}
          >
            Add Player
          </button>
        </nav>

        {/* Render the appropriate component based on active tab */}
        <main className="content">
          {activeTab === 'teams' && <TeamList />}
          {activeTab === 'players' && <PlayerList />}
          {activeTab === 'addTeam' && <AddTeam />}
          {activeTab === 'addPlayer' && <AddPlayer />}
        </main>
      </div>
    );
  }
}

export default App;
