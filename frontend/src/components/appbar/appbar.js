import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SimpleMenu from '../menu/menu';
import ScorePrompt from '../scoreprompt/scoreprompt'
import CookieParser from '../utils/cookieParser';


class TopNavBar extends Component {

  constructor(props) {
    super(props);
  }

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

  // TODO simplify this logic
  passGameInfoFromCookie() {
    let cookieJson = CookieParser.getCookieJson();
    let urlParams = new URLSearchParams(window.location.search);
    if (cookieJson && cookieJson['leastcountapp-gameid']
      && urlParams.has('gameId')
      && cookieJson['leastcountapp-gameid'] === urlParams.get('gameId')
      && (!sessionStorage.getItem("playerProfile"))//|| (sessionStorage.getItem("playerProfile") && JSON.parse(sessionStorage.getItem("playerProfile").gameId !== urlParams.get('gameId'))))
    ) {
      sessionStorage.setItem("gameId", JSON.stringify({ 'gameId': urlParams.get('gameId') }));
      return { gameId: urlParams.get('gameId'), renderModal: true };
    }
    return {};
  }

  render() {
    return (
      <div style={{ 'flexgrow': 1 }}>
        <AppBar position="static" style={{ 'backgroundColor': '#2196f3' }}>
          <Toolbar>
            <IconButton style={{ marginLeft: -12, marginRight: 20 }} color="inherit" aria-label="Menu">
              <SimpleMenu {...this.props} />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ 'flexGrow': 1 }} >
              LC
            </Typography>
            <ScorePrompt {...this.props} {...this.passGameInfoFromCookie()} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default TopNavBar;
