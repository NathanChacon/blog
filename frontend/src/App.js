import React from 'react';
import {Route,Switch} from 'react-router-dom'
import './App.css';
import './smacss/base.css'
import './smacss/layout.css'
import './smacss/color.css'
import './smacss/module.css'
import {Home} from './components/home/Home'
import {Nav} from './components/nav/Nav'
import {CreateAccount} from './components/createAccount/CreateAccount'
import {Login} from './components/login/Login'

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Switch>
        <Route path="/login"><Login></Login></Route>
        <Route path="/criarConta"><CreateAccount></CreateAccount></Route>
        <Route path="/"><Home></Home></Route>
      </Switch>
    </div>
  );
}

export default App;
