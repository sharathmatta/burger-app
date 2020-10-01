import React, { PureComponent } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends PureComponent {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    console.log(this.props.purchased);
    if (this.props.ings) {
      let Purchased = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {Purchased}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingState.ingredients,
    purchased: state.orderState.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
