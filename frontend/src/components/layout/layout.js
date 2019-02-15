import React, { Component } from 'react';
import TopNavBar from '../appbar/appbar';
import RecordScore from '../recordscores/record';
import Admin from '../admin/admin';

class Layout extends Component {

  constructor(props){
    super(props);
  }

  state = {
    currentTab: "0"
  }

  tabChangeHandler = (tabIndex) => {
    console.log(tabIndex);
    this.setState({ currentTab: tabIndex });
  }

  render() {
    let displayTab = <RecordScore key={"scoreentry"} {...this.props} />
    if (this.state.currentTab === "1") {
      //TODO put dashboard here
    } else if (this.state.currentTab === "2") {
      displayTab =  <Admin key={"adminContent"} {...this.props} />
    }

    return (
    <div>
      <TopNavBar key={"navbar"} tabChangeHandler = {this.tabChangeHandler} {...this.props} />
      {displayTab}
    </div>
    );
  }
}

export default Layout;
