import React from 'react'
import {Aside} from './aside/Aside'
import {Switch,Route} from 'react-router-dom'
import {TextEditor} from './TextEditor'
import {Category} from './category/Category'

export const Admin = (props) => {
    return(
        <section className="l-adm margin-top">
            <Aside></Aside>
            <Switch>
                <Route path='/adm/criarCategoria' component={Category}></Route>
                <Route path='/adm/criarArtigo' component={TextEditor}></Route>
            </Switch>
        </section>
    )
}   