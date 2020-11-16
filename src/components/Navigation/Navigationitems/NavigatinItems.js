import React from "react";
import NavigationItem from "./Navigatinitem/NavigatinItem";
import classes from "./Navigationitems.module.css";
import { connect } from "react-redux";
import * as actionTypes from "../../../Store/actions/index";

const navigationItems = (props) => {
  const logoutHandle = !props.token ? <NavigationItem link="/auth" NavClicked={props.clicked}>
  Authenticate
</NavigationItem> : <NavigationItem link="/auth" NavClicked={()=>{props.onLogout(); if(props.side){props.clicked()}}} >
Logout
</NavigationItem>
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" NavClicked={props.clicked}>
        BurgerBuilder
      </NavigationItem>
      {props.token ? <NavigationItem link="/orders" NavClicked={props.clicked}>
      Orders
    </NavigationItem> : null}
      {logoutHandle}
    </ul>
  );
};

const mapStateToProps = state =>{
  return {
    token : state.auth.token,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onLogout : () => dispatch(actionTypes.logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(navigationItems);
