import React,{useState} from 'react'
import axios from '../../axios/index'

export const CreateAccount = (props) => {

    const [state,setState] = useState({
        name:null,
        password:null,
        confirmPassword:null
    })

    const handleForm = (event) => {
        setState({
            ...state,
            [event.target.name]:event.target.value
        })
    }
    
    const handleSendForm = (event) => {
        event.preventDefault()
       /* if(state.name === null || "" || !state.name){
            return console.log('Preencha as informações corretamente')
        }
        if(state.password === null || "" || !state.password){
            return console.log('Preencha as informações corretamente')
        }
        if(state.confirmPassword === null || "" || !state.confirmPassword){
            return console.log('Preencha as informações corretamente')
        }
        if(state.password.length < 8){
            return console.log('A senha deve tem um tamanho de no minimo 8 letras')
        }
        if(state.password !== state.confirmPassword){
            return console.log('As senhas precisam ser iguais')
        }*/

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
            console.log(error.response.data.message)
        })
    }

    return (
        <section className = "l-full-center">
            <form className="m-form" method="post">
                <label for="name">Nome Usuário</label>
                <input type="text" id="name" name="name" value ={state.name} onChange ={(e) => {handleForm(e)}}></input>

                <label for="password">Senha</label>
                <input type="password" id="password" name="password" value={state.password} onChange ={(e) => {handleForm(e)}}></input>

                <label for="confirmPassword">Confirmar Senha</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={state.confirmPassword} onChange ={(e) => {handleForm(e)}}></input>
                <button type="submit"  onClick ={(e) => {handleSendForm(e)}}>Criar Conta</button>
            </form>
        </section>
    )
}