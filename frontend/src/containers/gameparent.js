import React, { Component } from 'react';
import Apiclient from  '../components/client/apiclient';

export default class GameParent extends Component {
    state = {
        activeGame : null,
        activeGameId : null
    }

    createGameHandler = () => {
        Apiclient.createGame().then(gameId => {
            sessionStorage.setItem('gameId', gameId);
            this.setState({activeGame : null, activeGameId : gameId});
        })
    }

    createRoundHandler = () => {
        Apiclient.addRoundToGame().then((game) => {
            this.setState({activeGame : game});
        })
    }

    roundCompleteMarker = () => {
        
    }



}