import React, { Component } from 'react';

const ScoreXtractor = {

    getPieMapInfo(game) {
        let output = {};
        if (game.rounds.length > 0) {
            game.rounds.forEach(round => {
                if (round.scores && round.scores.length > 0) {
                    round.scores.forEach(roundscore => {
                        if (output[roundscore.player.firstname]) {
                            output[roundscore.player.firstname] = output[roundscore.player.firstname] + roundscore.score
                        } else {
                            output[roundscore.player.firstname] = roundscore.score
                        }
                    })
                }
            });
        }
        var returnVal =  Object.keys(output).map(key => {
            return { "id": key, "label": key, "value": output[key] }
        });
        return returnVal;
    },

    getTotalsHeatMap(game) {
        let output = []
        if (game.rounds.length > 0) {
            game.rounds.forEach(round => {
                if (round.scores && round.scores.length > 0) {
                    let outputEntry = {}
                    outputEntry['round'] = round.roundID;
                    round.scores.forEach(playerscore => {
                        outputEntry[playerscore.player.firstname] = parseInt(playerscore.score)
                    })
                    output.push(outputEntry);
                }
            });
        }
        return output;
    },

    getDataForLineMap(game) {
        let output = {}
        if (game.rounds.length > 0) {
            game.rounds.forEach(round => {
                if (round.scores && round.scores.length > 0) {
                    round.scores.forEach(playerscore => {
                        if (Object.keys(output).includes(playerscore.player.firstname)) {
                            output[playerscore.player.firstname].push({ 'x': parseInt(round.roundID), 'y': parseInt(playerscore.score) });
                        } else {
                            output[playerscore.player.firstname] = [{ 'x': parseInt(round.roundID), 'y': parseInt(playerscore.score) }];
                        }
                    });
                }
            });
        }
        if (output) {
            return Object.keys(output).map(k => {
                return { "id": k, "data": output[k] }
            });
        }
        return [];
    },

    getDataForBarGraph(game){
        let output = [];
        ScoreXtractor.getPieMapInfo(game).forEach((entry) => {
            output.push({"player": entry.id,
            "score": entry.value,
            "life" : 300-(entry.value)});
        });
        return output.sort(this.sortBarGraphOutput("score"));
    },

    sortBarGraphOutput(prop) {  
        return function(a, b) {  
            if (a[prop] > b[prop]) {  
                return 1;  
            } else if (a[prop] < b[prop]) {  
                return -1;  
            }  
            return 0;  
        }  
    }  
}

export default ScoreXtractor;