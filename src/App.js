import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "views/Login";
import Register from "views/Register";

function Foo() {
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      console.log("START FETCHING");
      const res = await axios
        .get("http://localhost:4000/users")
        .then((resp) => {
          console.log(resp);
          return resp.data[0].email;
        });
      console.log(res);
      setText(res);
    };
    fetchData();
  }, []);
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        {text} edit <code>src/App.js</code> and save to {text} reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Foo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
