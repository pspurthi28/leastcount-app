import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SimpleMenu from '../menu/menu';
import ScorePrompt from '../scoreprompt/scoreprompt'


class TopNavBar extends Component {

  state = {
    anchorEl: null,
    gameId: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  classes = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

  render() {
    return (
      <div style={{ 'flexgrow': 1}}>
        <AppBar position="static" style={{'backgroundColor' : '#2196f3'}}>
          <Toolbar>
            <IconButton style={{ marginLeft: -12, marginRight: 20 }} color="inherit" aria-label="Menu">
              <SimpleMenu />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ 'flexGrow': 1 }} >
              LC
            </Typography>            
            <ScorePrompt/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default TopNavBar;
