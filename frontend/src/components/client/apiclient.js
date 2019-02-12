import React from 'react';

const ApiClient = {

    joinGame(gameId, playerName) {
        let url = "http://localhost:8080/games/join"
        let params = {
            'gameId' : gameId,
            'name' : playerName
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