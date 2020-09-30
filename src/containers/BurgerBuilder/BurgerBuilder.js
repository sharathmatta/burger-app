import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/modal/modal";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/Ordersummary";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  notPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0 ? true : false;
    }
    let ready = true;
    for (let key in disableInfo) {
      if (!disableInfo[key]) {
        ready = false;
      }
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Burger cant be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disable={disableInfo}
            price={this.props.pri}
            orderStatus={ready}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.notPurchasingHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.pri}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} noOrder={this.notPurchasingHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingState.ingredients,
    error: state.ingState.error,
    pri: state.priceState.price,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => {
      dispatch(actionCreators.addIngredient(ingName));
      dispatch(actionCreators.increasePrice(ingName));
    },

    onRemoveIngredient: (ingName) => {
      dispatch(actionCreators.removeIngredient(ingName));
      dispatch(actionCreators.decreasePrice(ingName));
    },
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
