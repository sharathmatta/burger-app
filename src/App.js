import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import { connect } from 'react-redux'
import * as actions from './Store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
});


class App extends Component {
  componentDidMount(){
    this.props.oncheckAuthState();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/orders" component={asyncOrders} />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps= dispatch =>{
  return{
    oncheckAuthState : () => dispatch(actions.checkAuthState())
  }
}
export default connect(null, mapDispatchToProps)(App);
