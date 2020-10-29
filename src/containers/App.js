import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import MotorcyclesList from './motorcycles-list'
import Motorcycle from './motorcycle'
import AddMotorcycle from './add-motorcycle'

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/motorcycles" className="navbar-brand">
            Motorcycle Crud
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/motorcycles" className="nav-link">
                Motorcycles
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={"/", "/motorcycles"} component={MotorcyclesList}></Route>
            <Route exact path={"/add"} component={AddMotorcycle}></Route>
            <Route path={"/motorcycles/:id"} component={Motorcycle}></Route>
            <Route exact path={"*"}>
              <Redirect to="/motorcycles" />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
