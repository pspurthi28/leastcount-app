import React from 'react';

const ApiClient = {

    APP_ROOT : "http://localhost:8080",

    joinGame(gameId, playerName) {
        let url = ApiClient.APP_ROOT+"/games/join"
        let params = {
            'gameId' : gameId,
            'name' : playerName
        }
        return ApiClient.fetchCall(url, 'POST', params);
    },

    recordScore(score){
        let params = {};
        let playerProfile = sessionStorage.getItem('playerProfile');
        if(playerProfile){
            params = JSON.parse(playerProfile)
        }
        if(params){
            params['score'] = score;
        }
        let url =  ApiClient.APP_ROOT + "/games/score"
        return ApiClient.fetchCall(url, 'POST', params);
    },

    createGame(){
        let url = ApiClient.APP_ROOT+"/games/create"
        return ApiClient.fetchCall(url, 'POST', {});
    },

    addRoundToGame(){
        let params = {};
        let url = ApiClient.APP_ROOT+"/games/rounds/create"
        let gameInfo = sessionStorage.getItem('gameId');
        if(gameInfo){
            params = JSON.parse(gameInfo)
        }
        return ApiClient.fetchCall(url, 'POST', params);
    },

    markRoundComplete() {
        let params = {};
        let url = ApiClient.APP_ROOT+"/games/rounds/complete"
        let gameInfo = sessionStorage.getItem('gameId');
        if(gameInfo){
            params = JSON.parse(gameInfo)
        }
        return ApiClient.fetchCall(url, 'POST', params);
    },

    async fetchCall(url, method, params) {
        let response = await fetch(url, {
            method: method,
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return await response.json()
    },
};

export default ApiClient;