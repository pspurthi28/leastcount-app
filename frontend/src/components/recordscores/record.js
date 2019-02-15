import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Grid, Tooltip } from '@material-ui/core';
import ScoreXtractor from '../charts/scorexctractor';
import HeatMapChart from '../charts/heatmap/heatmapchart';
import Switch from '@material-ui/core/Switch';


class RecordScore extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        score: null,
        showCards: false
    }

    scoreChange = (event) => {
        this.setState({ score: event.target.value })
    }

    scoreEnterHandler = (event) => {
        this.props.recordPlayerScoreHandler(this.state.score);
        this.setState({score : null, showCards : false});
    }

    showSwitchToggle = () => {
        this.setState({ isShow: !this.state.showCards });
    }

    render() {
        let scorecard = this.getScoreCard();
        let renderContent = scorecard
        if (this.props.currentGame.activeGame) {
            renderContent =
                <div>
                    {scorecard}
                    <Grid style={{ 'marginTop': '10px' }}
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ 'height': '500px' }}>
                        <HeatMapChart mapData={ScoreXtractor.getTotalsHeatMap(this.props.currentGame.activeGame)} mapLegendKey="round" />
                    </Grid>
                </div>
        }
        return renderContent;
    }

    getScoreCard() {
        return (
            <Grid style={{ 'marginTop': '10px' }}
                container
                direction="column"
                alignItems="center"
                justify="center" >
                <Card style={{ 'minWidth': 275 }}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom variant="h6" align="center">
                            Do one proud
                        </Typography>
                        <TextField
                            style={{ 'justifyContent': 'center' }}
                            id="outlined-round-input"
                            label="Score"
                            type="text"
                            name="score"
                            autoComplete="Score"
                            margin="normal"
                            variant="outlined"
                            onChange={this.scoreChange}
                            value={this.state.score ? this.state.score : ''}
                        />
                    </CardContent>
                    <CardActions style={{ 'justifyContent': 'center' }}>
                        <Tooltip title="Show" aria-label="Show" placement="bottom">
                            <Switch
                                checked={this.state.showCards}
                                onChange={this.showSwitchToggle}
                            />
                        </Tooltip>
                        <Button variant="contained" color="primary" size="small" onClick={this.scoreEnterHandler} align="center">Enter</Button>
                    </CardActions>
                </Card>
            </Grid>);
    }
}

export default RecordScore;