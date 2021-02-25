import Login from "./components/Login";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import UserContextProvider from "./contexts/UserContext";
import Home from "./components/Home";
import NewUser from "./components/NewUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Switch>
            <Route path="/login/new" component = {NewUser} />
            <Route path="/login" component = {Login} />
            <Route path="/" component = {Home} />
            <Redirect to="/" />
          </Switch>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
