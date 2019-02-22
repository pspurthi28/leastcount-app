import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CreateGame from '@material-ui/icons/Create';
import StopRound from '@material-ui/icons/TimerOff';
import StopGame from '@material-ui/icons/Stop';
import AddRound from '@material-ui/icons/Queue';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 155,
        height : 155,
        padding : '2px'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

function QrCardContainer(props) {
    const { classes, theme } = props;
    let gameId = props.currentGame.activeGameId ? props.currentGame.activeGameId : '';
    let imageSourceUrl = ""
    let myappUrl = ""
    if (gameId) {
        myappUrl = window.location.origin + "?gameId=" + gameId;
        console.log(myappUrl);
        imageSourceUrl = "https://api.qrserver.com/v1/create-qr-code/?data=GAMEID&size=150x150".replace("GAMEID", myappUrl);
    }
    return (

        <Card className={classes.card} style={{padding : '5px'}} >
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {gameId ? 'Your Game' : 'Roll The Dice'}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {gameId}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="Create Game" onClick={props.createGameHandler}>
                        <CreateGame color="action" />
                    </IconButton>
                    <IconButton aria-label="Stop Game" onClick={props.gameCompleteMarker}>
                        <StopGame color="secondary" />
                    </IconButton>
                    <IconButton aria-label="Add Round" onClick={props.createRoundHandler}>
                        <AddRound color="action" />
                    </IconButton>
                    <IconButton aria-label="End Round" onClick={props.roundCompleteMarker}>
                        <StopRound color="secondary" />
                    </IconButton>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={imageSourceUrl}
                title={myappUrl}
            />
        </Card>
    );
}

QrCardContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(QrCardContainer);