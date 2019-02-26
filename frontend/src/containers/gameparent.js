import React, { Component } from 'react';
import Apiclient from '../components/client/apiclient';
import Layout from '../components/layout/layout';
import ScoreXtractor from '../components/charts/scorexctractor';

export default class GameParent extends Component {
    state = {
        activeGame: null,
        activeGameId: null,
        snackShow : false,
        messageInfo : {key : "No_KEY"}
    }

    messageQueue = [];

    createGameHandler = () => {
        Apiclient.createGame().then(data => {
            sessionStorage.setItem("gameId", JSON.stringify(data));
            this.setState({ activeGame: null, activeGameId: data.gameId, snackShow : true });
            this.handleServerResponse("Game Created", "success");
        });
    }

    createRoundHandler = () => {
        Apiclient.addRoundToGame().then((game) => {
            this.setState({ activeGame: game, snackShow :true });
            this.handleServerResponse("Round Created", "success");
        });
    }

    roundCompleteMarker = () => {
        Apiclient.markRoundComplete().then((game) => {
            this.setState({ activeGame: game, snackShow : true });
            this.handleServerResponse("Round Completed", "success");
        });
    }

    gameCompleteMarker = () => {
        Apiclient.markGameComplete().then((game) => {
            this.setState({ activeGame: game, snackShow : true });
            this.handleServerResponse("Game Completed", "success");
        });
    }

    joinGameHandler = (gameId, playerName) => {
        Apiclient.joinGame(gameId, playerName).then((data) => {
            console.log("Game Joined: "+ data.gameId)
            console.log("Player Created: "+ data.playerId);
            sessionStorage.setItem("playerProfile", JSON.stringify(data));
            sessionStorage.setItem("gameId", JSON.stringify({'gameId' : gameId}));
            this.setState({activeGameId : data.gameId, snackShow : true});
            this.handleServerResponse("Joined Game", "success");          
        });
    }

    recordPlayerScoreHandler = (score) => {
        Apiclient.recordScore(score).then((data) => {
            let mapData = ScoreXtractor.getTotalsHeatMap(data);
            let lineMapData = ScoreXtractor.getDataForLineMap(data);
            console.log(lineMapData);
            this.setState({ activeGame : data, activeGameId : data.gameID, snackShow : true });
            console.log(mapData);
            this.handleServerResponse("Score Captured", "success");
        });
    }

    reconcileGameData = (gameId) => {
        Apiclient.getGameByGameId(gameId).then((gamedata) => {
            this.setState({ activeGame: gamedata, activeGameId : gamedata.gameID });
        });
    }

    processQueue = () => {
        if (this.messageQueue.length > 0) {
            this.setState({
                snackShow: true,
                messageInfo: this.messageQueue.shift()
            });
        }
    };

    handleServerResponse (message, variant) {
        this.messageQueue.push({
          'message' : message,
          key: new Date().getTime(),
          'variant' : variant
        });
    
        if (this.state.snackShow) {
          this.setState({ snackShow: false });
        } else {
          this.processQueue();
        }
      };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackShow: false });
    };

    handleExited = () => {
        this.processQueue();
    };

    render() {
        return <Layout
            createGameHandler={this.createGameHandler}
            roundCompleteMarker={this.roundCompleteMarker}
            createRoundHandler={this.createRoundHandler}
            gameCompleteMarker={this.gameCompleteMarker}
            recordPlayerScoreHandler={this.recordPlayerScoreHandler}
            currentGame={this.state}
            reconcileGameData = {this.reconcileGameData}
            joinGameHandler={this.joinGameHandler}
            messageQueue = {this.state.messageQueue}
            snackShow = {this.state.snackShow}
            snackCloseHandler = {this.handleClose}
            snackExitHandler = {this.handleExited}
            snackGetMessageInfo = {this.state.messageInfo}
        />
    }
}