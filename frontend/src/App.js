import React, { Component } from 'react';
import TopNavBar from './components/appbar/appbar';
import RecordScore from './components/recordscores/record'

class App extends Component {

  render() {
    return ([
      <TopNavBar id={"navbar"} />,
      <RecordScore id={"scoreentry"}/>]
    );
  }
}

export default App;
