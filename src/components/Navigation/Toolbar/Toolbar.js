import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigationitems/NavigatinItems";
import ToggleSideDrawer from "../SideDrawer/ToggleSideDrawer/ToggleSideDrawer";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <ToggleSideDrawer clicked={props.toggleSideDrawerClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems clicked={props.click}/>
    </nav>
  </header>
);

export default toolbar;
