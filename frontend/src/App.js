import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import MainPage from "./components/MainPage/MainPage";
import Cubberd from "./components/Cubberd/Cubberd";
import UserPage from "./components/UserPage/UserPage";
import { getCurrentUser } from "./store/session";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Landing from "./components/Landing/Landing";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <Switch>
          <Route exact path="/" component={Landing} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />

          {/* <ProtectedRoute exact path="/recipe" component={Recipe} /> */}
          <ProtectedRoute exact path="/main" component={MainPage} />
          <ProtectedRoute exact path="/profile" component={UserPage} />
          <ProtectedRoute exact path="/cubberd" component={Cubberd} />
        </Switch>
      </>
    )
  );
}

export default App;
