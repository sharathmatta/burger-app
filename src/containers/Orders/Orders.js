import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onInitOrder(this.props.token, this.props.userId);
    
  }
  render() {
    let allOrders = <p>orders</p>;
    if (this.props.loading) {
      allOrders = <Spinner />;
    }
    if (this.props.orders) {
      allOrders = this.props.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      });
    }
    return <div>{allOrders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.ordersLoading,
    token : state.auth.token,
    userId : state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    oncheckAuthState : () => dispatch(actions.checkAuthState()),
    onInitOrder: (token, userId) => dispatch(actions.fetchOrders(token,userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
