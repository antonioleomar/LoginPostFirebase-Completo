import React from 'react'
import './register.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {db, auth} from '../../firebaseConnection'


function Register(){
    
    //useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")  
    const navigate = useNavigate();   

    //Funções:
    async function registrar(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            await createUserWithEmailAndPassword(auth, email, password) 
            .then(()=>{navigate('/admin', { replace: true })})
            .catch(()=>{alert("Erro ao cadastrar")})
        }
        else{
        alert("Preencha todos os campos!")     
        }
    }
     
    //Componente
    return(
        <div className='register-container'>
            <h1>Cadastre-se</h1>
            <span>Crie sua conta de forma fácil</span>

            <form className='form' onSubmit={registrar}>
                <input type='text' placeholder='Digite seu email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type='password' placeholder='******' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">Cadastrar</button>
            </form>

            <Link className="button-link" to="/"> Já possui uma conta? Faça login! </Link>
            
        </div>
    )
}

export default Register;