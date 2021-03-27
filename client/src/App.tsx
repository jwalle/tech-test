import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./scopes/Login/Login";

import "./App.css";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import TokenHandler from "./scopes/TokenHandler/TokenHandler";
import Forum from "./scopes/Forum/Forum";

// The famous nullable boolean we inherited from Java
type nullableBoolean = boolean | null;

function App() {
  const [connected, setConnected] = useState<nullableBoolean>(null);
  const { user } = useAppContext();

  useEffect(() => {
    fetch("http://localhost:4242/hello")
      .then(() => setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://www.freepnglogos.com/uploads/counter-strike-png-logo/counter-strike-symbol-png-logo-11.png"
          className="App-logo"
          alt="logo"
        />
      </header>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          {user.token && (
            <>
              <Route path="/forum" component={Forum} />
            </>
          )}
          <Route path="*" exact>
            <div style={{ margin: "0 auto", textAlign: "center" }}>
              <h1>
                API: {connected ? " connected" : " not connected"}
              </h1>
              <Link className="login" to="/login">Login</Link>
            </div>
          </Route>
        </Switch>
        <Route path="*" component={TokenHandler} />
      </Router>
    </div>
  );
}

const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default WrappedApp;
