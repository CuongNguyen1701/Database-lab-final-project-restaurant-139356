import { Route } from "react-router-dom";
import React from "react";

const AuthenticatedRoute = ({ path, element }) => {
  return <Route path={path} element={element}></Route>;
};

export default AuthenticatedRoute;
