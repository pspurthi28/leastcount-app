import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import CreateGame from '@material-ui/icons/Create';
import StopRound from '@material-ui/icons/TimerOff';
import StopGame from '@material-ui/icons/Stop';
import AddRound from '@material-ui/icons/Queue';
import { GridList, Grid, Paper, Chip, Typography, Table, TableHead, TableRow, TableCell, TableBody, Tooltip} from '@material-ui/core';


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

    sampledata = [
        {
            roundID: 1,
            rWinner: {
                firstname: 'SK'
            },
            showcount: 5,
            status: "Completed"
        }
    ]

    createGameHandler = (event) => {
        console.log("Create Game clicked");
    }

    getGameId() {
        let renderContent = "";
        renderContent =
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="subtitle2" >
                        Game Id:
                    </Typography>
                </Paper>
            </Grid>
        return renderContent;
    }

    getTableContent(data) {
        let table = <div></div>
        //figure if table needs to be displayed, get game data and rounds and display data accordingly
        if (true) {
            table =
                <Grid item xs={12}>
                    <Paper>
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
                                        <TableCell align="right">{row.status}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
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
                <GridList style={{ 'marginTop': '10px', 'marginBottom': '10px' }}
                    cols={36}
                    cellHeight="auto" >
                    <Tooltip title="CreateGame" aria-label="CreateGame" placement="top">
                        <Fab color="primary" aria-label="CreateGame" className={"icon-spacing"} variant="extended" onClick={this.createGameHandler}>
                            <CreateGame />
                        </Fab>
                    </Tooltip>
                    <Tooltip title="StopGame" aria-label="StopGame" placement="top">
                    <Fab color="primary" aria-label="StopGame" className="icon-spacing" variant="extended" onClick={this.createGameHandler}>
                        <StopGame />
                    </Fab>
                    </Tooltip>
                    <Tooltip title="AddRound" aria-label="AddRound" placement="top">
                    <Fab color="primary" aria-label="AddRound" className="icon-spacing" variant="extended" onClick={this.createGameHandler}>
                        <AddRound />
                    </Fab>
                    </Tooltip>
                    <Tooltip title="StopRound" aria-label="StopRound" placement="top">
                    <Fab color="primary" aria-label="StopRound" className="icon-spacing" variant="extended" onClick={this.createGameHandler}>
                        <StopRound />
                    </Fab>
                    </Tooltip>
                </GridList >
                {this.getGameId()}
                {this.getTableContent(this.sampledata)}
            </Grid>
        );
    }
}