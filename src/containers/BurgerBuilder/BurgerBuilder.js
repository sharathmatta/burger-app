import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/modal/modal";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/Ordersummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4.0,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://my-burger-49093.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  notPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    console.log(this.props);

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  addItemHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updated = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    const updated_price = this.state.totalPrice + INGREDIENT_PRICES[type];
    updatedIngredients[type] = updated;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updated_price,
    });
  };
  RemoveItemHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updated = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    const updated_price = this.state.totalPrice - INGREDIENT_PRICES[type];
    updatedIngredients[type] = updated;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updated_price,
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
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

    let burger = this.state.error ? <p>Burger cant be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addItemHandler}
            ingredientRemoved={this.RemoveItemHandler}
            disable={disableInfo}
            price={this.state.totalPrice}
            orderStatus={ready}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.notPurchasingHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
