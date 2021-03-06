import React,{useState} from 'react'
import axios from '../../axios/index';
import {useDispatch} from 'react-redux'
import {successLogin,failLogin} from '../../actions/'
import {withRouter} from 'react-router-dom'

const Login = (props) => {
    const dispatch = useDispatch()
    const [state,setState] = useState({
        name:null,
        password:null
    })

    const [errors,setErrors] = useState({
        name:false,
        password:false
    })
    
    const handleForm = (event) => {
        setState({
            ...state,
            [event.target.name]:event.target.value 
        })

        setErrors({
            ...errors,
            [event.target.name]:false
        })
    }

    const handleSendForm = (event) => {
        event.preventDefault()
       
        if(!state.name){
          return setErrors({
              ...errors,
              name: "Esse campo é obrigatório"
          }) 
       }

       if(!state.password){
        return setErrors({
            ...errors,
            password: "Esse campo é obrigatório"
        }) 
      }

      axios('/authentication/login',{
          method:'POST',
          data: {
              name: state.name,
              password: state.password
          }
      })
      .then((response) => {
         dispatch(successLogin(response.data.userName,response.data.userRol))
         localStorage.setItem('token',response.data.token)
         props.history.push('/')
   
      })
      .catch((error) => {
          dispatch(failLogin())
      })
    }

    return (
        <section className = "l-full-center">
            <form className="m-form" method="post">
                <label for="name">Nome Usuário</label>
                <input type="text" id="name" name="name" value ={state.name} onChange ={(e) => {handleForm(e)}}></input>
                <p className="error color-text-danger">{errors.name ? errors.name : ''}</p>
                
                <label for="password">Senha</label>
                <input type="password" id="password" name="password" value={state.password} onChange ={(e) => {handleForm(e)}}></input>
                <p className="error color-text-danger">{errors.password ? errors.password : ''}</p>

                <button type="submit"  onClick ={(e) => {handleSendForm(e)}}>Criar Conta</button>
            </form>
        </section>
    )
}

export default withRouter(Login)