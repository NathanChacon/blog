import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
export const Home = () => {
    const userName = useSelector(state => state.userName)
    const [animate,setAnimate] = useState(false)
    
    useEffect(() => {
        setAnimate(true)
    },[])

    return(
        <section className={`l-center margin-top ${animate ? 'anime-opacity': 'hidden'}`}>
            <div className="m-article-text">
                <h1>Bem vindo {userName ? userName : ''}</h1>
                <header><h1>Blog Do Nathan</h1></header>
                <p>
                Esse blog foi criado com a intenção de melhorar minhas skills de desenvolvedor,
                as tecnologias utilizadas foram: HTML,CSS,REACT,JAVASCRIPTM,NODE,MYSQL
                </p>
            </div>
        </section>
    )
}