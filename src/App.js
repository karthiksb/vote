import logo from "./logo.svg";
import "./App.css";
import Login from "./Login/Login";
import AdminLogin from "./Login/AdminLogin";
import AdminSection from "./AdminSection/AdminSection";
import Usersection from "./UserSection/Usersection";
import Publish from "./UserSection/Publish";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Usersection />
          </Route>
          <Route exact path="/admin">
            <AdminLogin />
          </Route>
          <Route exact path="/adminhome">
            <AdminSection />
          </Route>
          <Route exact path="/publish">
            <Publish />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
