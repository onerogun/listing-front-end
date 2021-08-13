import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";

export const SignUp = (props) => {
  const showErr = useRef();

  const server = useContext(ServerContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [EMail, setEMail] = useState("");

  const [match, setMatch] = useState(true);

  const comparePasswords = () => {
    setMatch((curr) => password === passwordVerify);
  };

  function validateForm() {
    return (
      userName.length > 4 &&
      match === true &&
      password.length > 4 &&
      EMail.indexOf("@") > 0 &&
      EMail.indexOf(".") > 1
    );
  }

  useEffect(() => {
    comparePasswords();
  }, [password, passwordVerify]);

  const handleSubmit = (event) => {
    event.preventDefault();

    var newUser = {
      password: password,
      userName: userName,
      userRoles: "USER",
      userEMail: EMail,
    };

    console.log(newUser);
    console.log(server);

    axios
      .post(`${server}/auth/saveUser`, newUser, {
        headers: { "Content-type": "application/json" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5 ">
      <div ref={showErr} className="visually-hidden" role="alert">
        Wrong username or password!
      </div>
      <form className="g-3 needs-validation " onSubmit={handleSubmit}>
        <div className="row ">
          <div className="col-md-5 mx-auto">
            <label className="form-label" for="username">
              Username
            </label>
            <input
              autoFocus
              id="username"
              className="form-control"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-md-5 mx-auto">
            <label className="form-label" for="email">
              E-mail
            </label>
            <input
              id="email"
              className="form-control"
              type="email"
              value={EMail}
              onChange={(e) => setEMail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mx-auto">
            <label className="form-label" for="password">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mx-auto">
            <label className="form-label" for="password">
              Password Verify
            </label>
            <input
              id="passwordverify"
              className="form-control"
              type="password"
              value={passwordVerify}
              onChange={(e) => {
                setPasswordVerify(e.target.value);
              }}
            />
            {match ? null : <p>Passwords do not match!</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 d-grid gap-2 d-md-block mx-auto mt-2">
            <button
              className="btn btn-primary px-4"
              type="submit"
              disabled={!validateForm()}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
