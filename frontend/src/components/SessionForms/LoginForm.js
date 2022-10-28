import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { login, clearSessionErrors } from "../../store/session";
import "./SessionForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const location = useLocation();

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleDemoLogin = () => {
    // e.preventDefault();
    const demoEmail = Array.from("demo@user.com");
    const demoPassword = Array.from("password");
    setEmail("");
    setPassword("");
    let tempEmail = "";
    let tempPassword = "";

    const loginDemoIntervalAnimation = () => {
      const interval = setInterval(() => {
        if (demoEmail.length > 0) {
          tempEmail += demoEmail.shift();
          setEmail(tempEmail);
        } else if (demoPassword.length > 0) {
          tempPassword += demoPassword.shift();
          setPassword(tempPassword);
        } else {
          clearInterval(interval);
          setEmail(tempEmail);
          setPassword(tempPassword);
          return dispatch(login({ email: tempEmail, password: tempPassword }));
        }
      }, 50);
    };

    loginDemoIntervalAnimation();
  };

  useEffect(() => {
    if (location.state) {
      if (location.state.fromDemoBtn) {
        return handleDemoLogin()
      }
    }

    if (location.state) {
      setEmail(location.state.email);
      setPassword(location.state.password);
      setUsername(location.state.username);
    }
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  return (
    <>
      <form className="session-form" onSubmit={handleSubmit}>
        <div className="session-form-header">
          <h2>Log In</h2>
        </div>
        <div className="demo-user-btn"
          onClick={handleDemoLogin}
        >
          <div>
            Demo User
          </div>
        </div>
        <fieldset className="login-fieldset">
          <legend align="center">OR</legend>
        </fieldset>
        {errors && (
          <div className="errors">{errors?.email || errors?.password}</div>
        )}
        <div className="session-input-container">
          <input
            type="email"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
          <input
            type="password"
            minLength={6}
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
        </div>
        <div className="session-form-btn">
          <input type="submit" value="Log In" disabled={!email || !password} />
        </div>
        <div className="session-form-redirect-container">
          <Link to={{
            pathname: "/signup",
            state: { email, password, username }
          }} 
          className="redirect-to-signup-btn">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
