import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {
        let fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    let allOrders = <p>orders</p>;

    if (this.state.loading) {
      allOrders = <Spinner />;
    }
    if (this.state.orders) {
      allOrders = Object.keys(this.state.orders).map((id) => {
        return [...Array(this.state.orders)].map((_, i) => {
          return (
            <Order
              key={this.state.orders[id].id}
              ingredients={this.state.orders[id].ingredients}
              price={this.state.orders[id].price}
            />
          );
        });
      });
    }
    return <div>{allOrders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
