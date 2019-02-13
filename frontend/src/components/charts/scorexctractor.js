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
    }
}

export default ScoreXtractor;