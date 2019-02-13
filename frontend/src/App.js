import React, { Component } from 'react';
import TopNavBar from './components/appbar/appbar';
import RecordScore from './components/recordscores/record'

class App extends Component {

  state = {
    currentTab: "0"
  }

  tabChangeHandler = (tabIndex) => {
    this.setState({ currentTab: tabIndex })
  }

  render() {
    let displayTab = <RecordScore key={"scoreentry"} />
    if (this.state.currentTab == "1") {
      //TODO put dashboard here
    } else if (this.state.currentTab == "2") {
      //TODO put admin here
    }

    return (
    <div>
      <TopNavBar key={"navbar"} />
      {displayTab}
    </div>
    );
  }
}

export default App;
