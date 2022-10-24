import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../store/session";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

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
    const user = {
      email,
      username,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <>
      <form className="session-form" onSubmit={usernameSubmit}>
        <div className="session-form-header">
          <h2>Sign Up</h2>
        </div>
        {errors && (
          <div className="errors">
            {errors?.email || errors?.username || errors?.password}
          </div>
        )}
        {password !== password2 && (
          <div className="errors">Confirm Password field must match</div>
        )}
        <div className="session-input-container">
          <input
            type="text"
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
          />
          <input
            type="password"
            value={password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
          />
        </div>
        <div className="session-form-btn">
          <input
            type="submit"
            value="Sign Up"
            disabled={
              !email || !username || !password || password !== password2
            }
          />
        </div>
        <div className="session-form-redirect-container">
          <div className="redirect-to-login-btn">
            Already have an account? Log in
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
