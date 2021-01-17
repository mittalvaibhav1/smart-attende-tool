import Login from "./components/Login";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import UserContextProvider from "./contexts/UserContext";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Switch>
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
