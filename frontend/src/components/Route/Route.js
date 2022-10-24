import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//return route to the component if no one is logged in, return to tweets index otherwise
export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !loggedIn ? <Component {...props} /> : <Redirect to="/tweets" />
      }
    />
  );
};

//return route component if logged in, login page otherwise

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
