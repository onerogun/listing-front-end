import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "./Components/NavBar";
import { SignUp } from "./Login/SignUp";
import { ServerProvider } from "./Contexts/ServerContext";
import { Login } from "./Login/Login";

function App() {
  return (
    <BrowserRouter>
      <ServerProvider>
        <React.Fragment>
          <NavBar />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </React.Fragment>
      </ServerProvider>
    </BrowserRouter>
  );
}

export default App;
