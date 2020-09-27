import React from "react";
import classes from "./Navigatinitem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        activeClassName={classes.active}
        to={props.link}
        exact
        onClick={props.NavClicked}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
