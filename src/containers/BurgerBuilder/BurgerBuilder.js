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
import * as actionTypes from "../../Store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get("https://my-burger-49093.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  notPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // console.log(this.props);

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
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
    // let burger = this.state.error ? <p>Burger cant be loaded</p> : <Spinner />;
    let burger = null;
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
    pri: state.priceState.price,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => {
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName });
      dispatch({
        type: actionTypes.INCREASE_PRICE,
        ingredientName: ingName,
      });
    },

    onRemoveIngredient: (ingName) => {
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      });
      dispatch({
        type: actionTypes.DECREASE_PRICE,
        ingredientName: ingName,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
