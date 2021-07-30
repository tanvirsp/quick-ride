import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Destination from './Components/Destination/Destination';
import SearchResult from './Components/SearchResult/SearchResult';
import { createContext } from 'react';
import { useState } from 'react';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const UserDestinationContext = createContext()


function App() {
  const [userDestination, setUserDestination] = useState({});
  console.log(userDestination);



  return (
 
    <UserDestinationContext.Provider value={[userDestination, setUserDestination]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/destination/:id">
              <Destination />
            </PrivateRoute>
            <PrivateRoute path="/destination">
              <Destination />
            </PrivateRoute>
            <PrivateRoute path="/search">
              <SearchResult />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
        </Switch>
      </Router>
    </UserDestinationContext.Provider>
    
  );
}

export default App;
