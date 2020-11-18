import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

const PrivateRoute: React.FC<RouteProps & {}> = (props) => {

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const result = !!token;
    return result;
  }
  const condition = isAuthenticated();

  return condition ? (<Route {...props} />) :
    (<Redirect to="/login" />);
};
export default PrivateRoute;