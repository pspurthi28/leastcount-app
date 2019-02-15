import React, {Component} from 'react';

const ScoreXtractor = {

    getTotalsHeatMap(game){
        let output = []
        if(game.rounds.length > 0){
            game.rounds.forEach(round => {
                let outputEntry = {}
                outputEntry['round'] = round.roundID;
                round.scores.forEach(playerscore => {
                    outputEntry[playerscore.player.firstname] = playerscore.score
                })
                output.push(outputEntry);
            });
        } 
        return output;
    },

    getDataForLineMap(game){
        let output = {}
        if(game.rounds.length > 0){
            game.rounds.forEach(round => {
                round.scores.forEach(playerscore => {
                    if(Object.keys(output).includes(playerscore.player.firstname)){
                        output[playerscore.player.firstname].push({'x' : round.roundID , 'y' : playerscore.score});
                    } else {
                        output[playerscore.player.firstname] = [{'x' : round.roundID , 'y' : playerscore.score}];
                    }
                });
            });
        }
        if(output){
            return Object.keys(output).map(k => {
                return {"id" : k, "data" : output[k]}
            });            
        }
        return [];
    }
}

export default ScoreXtractor;