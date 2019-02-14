import React, { Component } from 'react';
import TopNavBar from './components/appbar/appbar';
import RecordScore from './components/recordscores/record';
import Admin from './components/admin/admin';

class App extends Component {

  state = {
    currentTab: "0"
  }

  tabChangeHandler = (tabIndex) => {
    console.log(tabIndex);
    this.setState({ currentTab: tabIndex });
  }

  render() {
    let displayTab = <RecordScore key={"scoreentry"} />
    if (this.state.currentTab == "1") {
      //TODO put dashboard here
    } else if (this.state.currentTab == "2") {
      displayTab =  <Admin key={"adminContent"} />
    }

    return (
    <div>
      <TopNavBar key={"navbar"} tabChangeHandler = {this.tabChangeHandler}/>
      {displayTab}
    </div>
    );
  }
}

export default App;
