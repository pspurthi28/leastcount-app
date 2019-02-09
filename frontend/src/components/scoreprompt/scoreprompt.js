import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Aux from '../../hoc/auxFile';
import TextField from '@material-ui/core/TextField';

class ScorePrompt extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    joinGameHandler = (event) => {

    };

    gameIdChange = (event) => {
        this.setState({ gameId: event.target.value })
      };
    
      nameChange = (event) => {
        this.setState({ playerName: event.target.value })
      };

    render() {

        return (
            <Aux>
                <Button color="inherit" onClick={this.handleOpen}>Join</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Identify yourself"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div> Please enter Game Id & Name </div>
                            <TextField
                                style={{'marginRight' : '5px'}}
                                id="outlined-gameID-input"
                                label="Game ID"
                                type="text"
                                name="game_id"
                                autoComplete="Game_ID"
                                margin="normal"
                                variant="outlined"
                                onChange={this.gameIdChange}
                                />
                            <TextField
                                id="outlined-name-input"
                                label="Name"
                                type="text"
                                name="name"
                                autoComplete="Name"
                                margin="normal"
                                variant="outlined"
                                onChange={this.nameChange}
                                />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>                        
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Join 
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Aux>
        );
    }
}

export default ScorePrompt;