import React from 'react';
import {Navigate} from 'react-router-dom';
import verifyUser from './verifyUser';

const PrivateRoute = ({Component}: any) => {
  const auth = verifyUser();

  return auth ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
