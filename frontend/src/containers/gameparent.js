import React, { Component } from 'react';
import Apiclient from '../components/client/apiclient';
import Layout from '../components/layout/layout';
import ScoreXtractor from '../components/charts/scorexctractor';

export default class GameParent extends Component {
    state = {
        activeGame: null,
        activeGameId: null
    }

    createGameHandler = () => {
        Apiclient.createGame().then(gameId => {
            sessionStorage.setItem('gameId', gameId);
            this.setState({ activeGame: null, activeGameId: gameId });
        });
    }

    createRoundHandler = () => {
        Apiclient.addRoundToGame().then((game) => {
            this.setState({ activeGame: game });
        });
    }

    roundCompleteMarker = () => {
        Apiclient.markRoundComplete().then((game) => {
            this.setState({ activeGame: game });
        });
    }

    gameCompleteMarker = () => {
        Apiclient.markGameComplete().then((game) => {
            this.setState({ activeGame: game });
        });
    }

    joinGameHandler = (gameId, playerName) => {
        Apiclient.joinGame(gameId, playerName).then((data) => {
            console.log("Game Joined: "+ data.gameId)
            console.log("Player Created: "+ data.playerId);
            sessionStorage.setItem("playerProfile", JSON.stringify(data));
            this.setState({'activeGameId' : data.gameId});          
        });
    }

    recordPlayerScoreHandler = (score) => {
        Apiclient.recordScore(score).then((data) => {
            let mapData = ScoreXtractor.getTotalsHeatMap(data);
            let lineMapData = ScoreXtractor.getDataForLineMap(data);
            console.log(lineMapData);
            this.setState({ activeGame : data });
            console.log(mapData);
        });
    }

    render() {
        return <Layout
            createGameHandler={this.createGameHandler}
            roundCompleteMarker={this.roundCompleteMarker}
            createRoundHandler={this.createRoundHandler}
            gameCompleteMarker={this.gameCompleteMarker}
            recordPlayerScoreHandler={this.recordPlayerScoreHandler}
            currentGame={this.state}
        />
    }







}