import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Container from './components/Container';
import { StateProvider } from './store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ListPage from './pages/ListPage';

function App() {

  return (
    <div className="App">
      <StateProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/list/:recommendType">
                <ListPage></ListPage>
              </Route>
              <Route path="/users">

              </Route>
              <Route path="/">
                <ListPage></ListPage>
              </Route>
            </Switch>
          </div>
        </Router>
      </StateProvider>
    </div>
  );
}

export default App;
