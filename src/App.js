import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Register, Main, Thread } from "views";
import GlobalSnackbar from "components/GlobalSnackbar";

//function Foo() {
//const [text, setText] = useState("");
//useEffect(() => {
//const fetchData = async () => {
//console.log("START FETCHING");
//const res = await axios
//.get("https://localhost:4000/users")
//.then((resp) => {
//return resp.data;
//});
//console.log(res);
//setText(res[0].email);
//};
//fetchData();
//}, []);
//return (
//<header className="App-header">
//<img src={logo} className="App-logo" alt="logo" />
//<p>
//{text} edit <code>src/App.js</code> and save to {text} reload.
//</p>
//<a
//className="App-link"
//href="https://reactjs.org"
//target="_blank"
//rel="noopener noreferrer"
//>
//Learn React
//</a>
//</header>
//);
//}

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/post/:id">
            <Thread />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
      <GlobalSnackbar />
    </div>
  );
}

export default App;
