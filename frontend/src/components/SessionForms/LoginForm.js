import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../store/session";
import "./SessionForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <form className="session-form" onSubmit={handleSubmit}>
        <div className="session-form-header">
          <h2>Log In</h2>
        </div>
        {errors && (
          <div className="errors">{errors?.email || errors?.password}</div>
        )}
        <div className="session-input-container">
          <input
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
        </div>
        <div className="session-form-btn">
          <input type="submit" value="Login" disabled={!email || !password} />
        </div>
        <div className="session-form-redirect-container">
          <div className="redirect-to-signup-btn">
            Don't have an account? Sign up
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
