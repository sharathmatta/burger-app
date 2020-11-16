import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAegEjTBebnCvOUNtlFemDWn031glBMB_w";

    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAegEjTBebnCvOUNtlFemDWn031glBMB_w";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userId',response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const checkAuthState = () =>{
  return dispatch =>{
    const token = localStorage.getItem('token');
    if(!token){
      dispatch(logout());
    } else{
      const expirationTime = new Date(localStorage.getItem('expirationTime'));
      if(expirationTime < new Date()){
        console.log('Logo')
        dispatch(logout());
      } else{
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token,userId));
        dispatch(checkAuthTimeout(Math.round((expirationTime - new Date())/1000)));
      }
    }
    
  }
}