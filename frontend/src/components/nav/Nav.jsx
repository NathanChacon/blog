import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {failLogin} from '../../actions/'
 const Nav = (props) => {
     const dispatch = useDispatch()
    const isLogged = useSelector(state => state.isLogged)

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(failLogin()) 
        props.history.push('/')
    }
    return(
        <nav className="m-nav color-blue">
            <ul>
                <li><Link to = '/'>Home</Link></li>
                <li>Artigos</li>
            </ul>
            <ul>
                {isLogged ? 
                    <li className="anime-opacity" onClick = {() => {handleLogout()}}>Sair</li>
                    :
                    <li className="anime-opacity"><Link to = '/login'>Entrar</Link></li>
                }
               <li> <Link to = '/criarConta'>Criar Conta</Link></li>
            </ul>
        </nav>
    )
}

export default withRouter(Nav)