import React,{useState} from 'react'
import axios from '../../axios/index'

export const CreateAccount = (props) => {

    const [state,setState] = useState({
        name:null,
        password:null,
        confirmPassword:null
    })
    const [errors,setErrors] = useState({
        name:false,
        password:false,
        confirmPassword:false
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
        if(state.name === null || "" || !state.name){
            return setErrors({
                ...errors,
                name:"Esse campo é obrigatório"
            })
        }
        if(state.name.length < 3 || state.name.length > 15){
            return setErrors({
                ...errors,
                name:"Deve possuir no minimo 3 caracteres e no máximo 15"
            })
        }
        if (/^\s+$/.test(state.name)){
            return setErrors({
                ...errors,
                name:"Nome inválido"
            })
        }
        if(state.password === null || "" || !state.password){
            return setErrors({
                ...errors,
                password:"Esse campo é obrigatório"
            })
        }
        if (/^\s+$/.test(state.password)){
            return setErrors({
                ...errors,
                password:"Senha inválida"
            })
        }

        if(state.password.length < 8){
            return setErrors({
                ...errors,
                password:"Senha deve ter no minimo 8 caracteres"
            })
        }

        if(state.confirmPassword === null || "" || !state.confirmPassword){
            return setErrors({
                ...errors,
                confirmPassword:"Esse campo é obrigatório"
            })
        }
        if(state.password !== state.confirmPassword){
            return setErrors({
                ...errors,
                confirmPassword:"As senhas não são idênticas"
            })
        }

        axios('/authentication/createAccount',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            data:{
                name:state.name,
                password:state.password,
                confirmPassword:state.confirmPassword
            }
        })
        .then((response) => {
            
        })
        .catch((error) => {
            setErrors({
                ...errors,
                [error.response.data.input]:error.response.data.message
            })
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

                <label for="confirmPassword">Confirmar Senha</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={state.confirmPassword} onChange ={(e) => {handleForm(e)}}></input>
                <p className="error color-text-danger">{errors.confirmPassword ? errors.confirmPassword : ''}</p>

                <button type="submit"  onClick ={(e) => {handleSendForm(e)}}>Criar Conta</button>
            </form>
        </section>
    )
}