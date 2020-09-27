import React, { Component } from "react";
import Auxiliary from "../Auxiliary";
import Modal from "../../components/UI/modal/modal";

const withErrorHandler = (WrappedContent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentDidUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxiliary>
          <Modal show={this.state.error} noOrder={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedContent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
