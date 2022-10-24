import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import MainPage from "./store/components/MainPage/MainPage";

import { getCurrentUser } from "./store/session";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  const getRecipes = async () => {
    const res = await axios.get(`http://localhost:5000/recipes/${query}`);
    console.log(res.data);
    setRecipes(res.data);
  };

  // useEffect(() => {
  //   getRecipes();
  // }, [query]);

  return (
    loaded && (
      <>
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />

          {/* <ProtectedRoute exact path="/recipe" component={Recipe} /> */}
        </Switch>
      </>
    )
  );
}

export default App;