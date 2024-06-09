import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.role === role) {
          return <Component {...props} />;
        } else {
          return <Navigate to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;