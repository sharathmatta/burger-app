import React, { Component } from "react";
import classes from "./modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, prevState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clickedBackDrop={this.props.noOrder} />
        <div
          className={classes.Modal}
          style={{
            display: this.props.show ? "block" : "none",
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;
