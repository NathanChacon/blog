import React,{useState,useEffect} from 'react'
import axios from '../../../axios/'

export const Category = (props) => {
    
    const [name,setName] = useState("")
    const [error,setError] = useState(false)

    const handleForm = (e) => {
        setError(false)
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!name){
            return setError('Nome inválido')
        }

        if (/^\s+$/.test(name)){
           return setError('Nome inválido')
        }

        axios('/adm/createCategory',{
            method:'POST',
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} ,
            data: {
                name: name
            }
        })
        .then((response) => {
            setName("")
            setError(false)
        })
        .catch(() => {
            console.log('error')
        })
    }

    return(
        <div className="m-center">
           <form className="m-form" method="post">
               <label for="category">Nome categoria</label>
               <input type="text" id="category" placeholder="insira o nome da categoria" value={name} onChange = {(e) => {handleForm(e)}}></input>
               <p className="error color-text-danger">{error ? error : ''}</p>
               <button type="submit" onClick={(e) => {handleSubmit(e)}}>Adicionar Categoria</button>
           </form>
        </div>
    )
}