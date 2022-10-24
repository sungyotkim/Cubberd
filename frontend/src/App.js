import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import MainPage from "./components/MainPage/MainPage";
import Cubberd from "./components/Cubberd/Cubberd";

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
  const [query, setQuery] = useState("");

  const getRecipes = async () => {
    const res = await axios.get(`http://localhost:5000/recipes/${query}`);
    // console.log(res.data);
    let newRecipes = res.data;
    setRecipes((oldArr) => [...oldArr, ...newRecipes]);
  };

  // useEffect(() => {
  //   getRecipes();
  // }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    loaded && (
      <>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input type="submit" value="submit" />
        </form>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />

          {/* <ProtectedRoute exact path="/recipe" component={Recipe} /> */}
          <ProtectedRoute exact path="/cubberd" component={Cubberd} />
        </Switch>
      </>
    )
  );
}

export default App;
