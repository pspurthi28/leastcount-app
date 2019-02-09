import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';


class RecordScore extends Component {

    state = {
        score : null
    }

    scoreChange = (event) => {
        this.setState({score : event.target.value})
    }

    render() {
        return (
            <Grid   style={{'marginTop' : '10px'}}
                    container
                    direction="column"
                    alignItems="center"
                    justify="center" >
                <Card style={{ 'minWidth': 275 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Enter Scores
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Score:
                        </Typography>
                        <TextField
                            id="outlined-round-input"
                            label="Score"
                            type="text"
                            name="score"
                            autoComplete="Score"
                            margin="normal"
                            variant="outlined"
                            onChange={this.scoreChange}
                        />
                    </CardContent>
                    <CardActions>
                        <Button  size="small">Enter</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default RecordScore;