import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.module.css";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Auxiliary>
        <h3 className={classes.orderSummary}>Your Order</h3>
        <p className={classes.orderSummary}>
          A delicious burger with the following ingrdients:
        </p>
        <ul className={classes.orderSummary}>{ingredientSummary}</ul>
        <p>Continue to Checkout?</p>
        <p className={classes.orderSummary}>
          <strong>Total Price : {this.props.price.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}

export default OrderSummary;
