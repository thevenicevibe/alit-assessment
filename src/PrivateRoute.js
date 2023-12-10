import React from 'react';
import { Route, Link } from 'react-router-dom';
import AuthService from './AuthService';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={AuthService.isAuthenticated() ? (
        <Element />
      ) : (
        <Link to="/login" replace />
      )}
    />
  );
};

export default PrivateRoute;
