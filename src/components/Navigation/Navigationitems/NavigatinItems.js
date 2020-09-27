import React from "react";
import NavigationItem from "./Navigatinitem/NavigatinItem";
import classes from "./Navigationitems.module.css";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" NavClicked={props.clicked}>
        BurgerBuilder
      </NavigationItem>
      <NavigationItem link="/orders" NavClicked={props.clicked}>
        Orders
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
