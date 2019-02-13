import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    tabSelected : "Home"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <MenuIcon onClick={this.handleClick}/>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} id="0">Home</MenuItem>
          <MenuItem onClick={this.handleClose} id="1">Dashboard</MenuItem>
          <MenuItem onClick={this.handleClose} id="2">Admin</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
