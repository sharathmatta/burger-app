import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigationitems/NavigatinItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";

const sideDrawer = (props) => {
  let sideDrawerClasses = props.open
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];

  return (
    <Auxiliary>
      <BackDrop show={props.open} clickedBackDrop={props.click} />
      <div className={sideDrawerClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems clicked={props.click} side={true}/>
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
