import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { ServerContext } from "../Contexts/ServerContext";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const server = useContext(ServerContext);

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    var userLogin = {
      userName: userName,
      password: password,
    };

    console.log(userLogin);

    axios({
      method: "POST",
      url: `${server}/login`,
      data: userLogin,
      headers: { "Content-type": "application/json" },
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="container mt-5">
      <form className="g-3 needs-validation " onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3 mx-auto">
            <label className="form-label" for="username">
              Username or e-mail
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
        <div className="row">
          <div className="col-md-3 mx-auto">
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
          <div className="col-md-3 d-grid gap-2 d-md-block mx-auto mt-2">
            <button
              className="btn btn-primary px-4"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
