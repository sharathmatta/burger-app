import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerHandler = () => {
    let showSide = !this.state.showSideDrawer;
    this.setState({ showSideDrawer: showSide });
  };
  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxiliary>
        <Toolbar toggleSideDrawerClicked={this.toggleSideDrawerHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          click={this.sideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
