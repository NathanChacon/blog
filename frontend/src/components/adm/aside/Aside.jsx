import React from 'react'
import {Link} from 'react-router-dom'

export const Aside = () => {
    return(
        <aside className="m-aside">
            <ul>
                <li><Link to="/adm/criarCategoria">Criar categoria</Link></li>
                <li><Link to="/adm/criarArtigo">Criar artigo</Link></li>
            </ul>

        </aside>
    )
}