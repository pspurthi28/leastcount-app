import React from 'react';

const ApiClient = {

    buildAppRoot: () => {
        let cookieJson = {};
        let allcookieString = document.cookie;
        let cookies = allcookieString.split(";");
        cookies.forEach(cookie => {
            let entry = cookie.split("=");
            cookieJson[entry[0].replace(/\s/g, '')] = entry[1].replace(/\s/g, '');
        })
        console.log(cookieJson);
        if (cookieJson && Object.keys(cookieJson).length > 0 && cookieJson["leastcountapp-servedviabackend"]) {
            return "";
        }
        return "http://localhost:8080";
    },

    APP_ROOT: () => {
        if (!Object.keys(ApiClient).includes('ROOT_URL')) {
            ApiClient.ROOT_URL = ApiClient.buildAppRoot()
        }
        return ApiClient.ROOT_URL;
    },

    joinGame(gameId, playerName) {
        let url = ApiClient.APP_ROOT() + "/games/join"
        let params = {
            'gameId': gameId,
            'name': playerName
        }
        return ApiClient.fetchCall(url, 'POST', params);
    },

    async getGameByGameId(gameId) {
        let url = ApiClient.APP_ROOT() + "/games/find?gameId=" + gameId;
        let response = await fetch(url);
        return response.json();
    },

    recordScore(score) {
        let params = {};
        let playerProfile = sessionStorage.getItem('playerProfile');
        if (playerProfile) {
            params = JSON.parse(playerProfile)
        }
        if (params) {
            params['score'] = parseInt(score);
        }
        let url = ApiClient.APP_ROOT() + "/games/score"
        return ApiClient.fetchCall(url, 'POST', params);
    },

    createGame() {
        let url = ApiClient.APP_ROOT() + "/games/create"
        return ApiClient.fetchCall(url, 'POST', {});
    },

    addRoundToGame() {
        let params = {};
        let url = ApiClient.APP_ROOT() + "/games/round/create"
        let gameInfo = sessionStorage.getItem('gameId');
        if (gameInfo) {
            params = JSON.parse(gameInfo)
        }
        return ApiClient.fetchCall(url, 'POST', params);
    },

    markRoundComplete() {
        let params = {};
        let url = ApiClient.APP_ROOT() + "/games/round/complete"
        let gameInfo = sessionStorage.getItem('gameId');
        if (gameInfo) {
            params = JSON.parse(gameInfo)
        }
        return ApiClient.fetchCall(url, 'POST', params);
    },

    markGameComplete() {
        let params = {};
        let url = ApiClient.APP_ROOT() + "/games/complete"
        let gameInfo = sessionStorage.getItem('gameId');
        if (gameInfo) {
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