import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./Global/AuthProvider";

const SecureRoute = ({ component: SecureComp, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(SecureProp) => {
        return currentUser ? (
          <SecureComp {...SecureProp} />
        ) : (
          <Redirect to="/sign" />
        );
      }}
    />
  );
};

export default SecureRoute;
