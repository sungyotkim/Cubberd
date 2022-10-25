import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../store/session";
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      setPasswordError("")
      const user = {
        email,
        username,
        password,
      };
      return dispatch(signup(user));
    } 
    return setPasswordError("Passwords do not match")
  };

  return (
    <>
      <form className="session-form signup-form" onSubmit={usernameSubmit}>
        <div className="session-form-header">
          <h2>Sign Up</h2>
        </div>
        <div className="demo-user-btn">
          <div>
            Demo User
          </div>
        </div>
        <fieldset className="login-fieldset">
          <legend align="center">OR</legend>
        </fieldset>
        {errors && (
          <div className="errors">
            {errors?.email || errors?.username || errors?.password}
          </div>
        )}
        {passwordError && (
          <div className="errors">{passwordError}</div>
        )}
        <div className="session-input-container">
          <input
            type="email"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
          <input
            type="text"
            value={username}
            onChange={update("username")}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
            minLength={6}
          />
          <input
            type="password"
            value={password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
            minLength={6}
          />
        </div>
        <div className="session-form-btn">
          <input
            type="submit"
            value="Sign Up"
            disabled={
              !email || !username || !password || !password2
            }
          />
        </div>
        <div className="session-form-redirect-container">
          <Link to="/login" className="redirect-to-login-btn">
            Already have an account? Log in
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
