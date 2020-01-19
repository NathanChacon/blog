import React,{useEffect} from 'react';
import {Route,Switch} from 'react-router-dom'
import axios from './axios/'
import './App.css';
import './smacss/base.css'
import './smacss/layout.css'
import './smacss/color.css'
import './smacss/module.css'
import './smacss/animation.css'
import {Home} from './components/home/Home'
import Nav from './components/nav/Nav'
import {CreateAccount} from './components/createAccount/CreateAccount'
import {Aside} from './components/adm/aside/Aside'
import {Admin} from './components/adm/Admin'
import {TextEditor} from './components/adm/TextEditor'
import {useDispatch} from 'react-redux'
import {successLogin,failLogin} from './actions/'
import Login from './components/login/Login'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios('/authentication/checkUser',{
      method:'GET',
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} 
    })
    .then((response) => {
      dispatch(successLogin(response.data.userName,response.data.userRol))
    })
    .catch(() => {
      dispatch(failLogin())
    })
  },[])


  return (
    <div className="App">
      <Nav></Nav>
      <Switch>
        <Route path="/adm" component ={Admin}/>
        <Route path="/login"><Login></Login></Route>
        <Route path="/criarConta"><CreateAccount></CreateAccount></Route>
        <Route path="/"><Home></Home></Route>
      </Switch>
    </div>
  );
}

export default App;
