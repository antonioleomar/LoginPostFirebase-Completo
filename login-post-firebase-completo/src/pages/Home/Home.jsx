import React from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './home.css'
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Home(){
    
    //useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate();

    //Funções:
    async function login(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{navigate('/admin', { replace: true } )})
            .catch(()=>{alert("Erro ao logar")})
        }
        else{
        alert("Preencha todos os campos!")     
        }
    }
     
    //Componente
    return(
        <div className='home-container'>
            <h1>Lista de Tarefas</h1>
            <span>Gerencie sua agenda de forma fácil</span>

            <form className='form' onSubmit={login}>
                <input type='text' placeholder='Digite seu email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type='password' placeholder='******' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">Acessar</button>
            </form>

            <Link className="button-link" to="/register"> Não possui uma conta? Cadastre-se </Link>
            
        </div>
    )
}

export default Home;