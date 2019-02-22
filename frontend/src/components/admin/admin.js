import React, { Component } from 'react';
import { GridList, Grid, Paper, Chip, Typography, Table, TableHead, TableRow, TableCell, TableBody, Tooltip } from '@material-ui/core';
import QrCardContainer from './qrcard';


import './admin.css';

export default class Admin extends Component {

    constructor(props) {
        super(props);
    }

    styles = {
        root: {
            margin: '5px'
        }
    }

    getGameId() {
        let renderContent = "";
        renderContent =
            <Grid item xs={12} style={{margin : '5px', padding : '5px'}}>                
                <QrCardContainer {...this.props}/>                
            </Grid>
        return renderContent;
    }

    getTableContent(currentGame) {
        let table = <div></div>
        if(currentGame && currentGame.activeGame && currentGame.activeGame.rounds && currentGame.activeGame.rounds.length > 0) {
            let data = currentGame.activeGame.rounds
            table =
                <Grid item xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Round #</TableCell>
                                <TableCell align="right">Winner</TableCell>
                                <TableCell align="right">Show Count</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => {
                                return <TableRow key={row.roundID}>
                                    <TableCell align="right">{row.roundID}</TableCell>
                                    <TableCell align="right">{row.rWinner.firstname}</TableCell>
                                    <TableCell align="right">{row.showcount}</TableCell>
                                    <TableCell align="right">{row.isCompleted ? 'Completed' : 'Running'}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Grid>
        }
        return table;
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center" >
                {this.getGameId()}
                {this.getTableContent(this.props.currentGame)}
            </Grid>
        );
    }
}