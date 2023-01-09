import {useState, useEffect} from 'react'
import {auth} from '../firebaseConnection'
import {onAuthStateChanged} from 'firebase/auth'
import {Navigate} from 'react-router-dom'


function Private({children}){

    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false) //verifica se está logado

    useEffect(()=>{

        async function checkLogin(){

            const verific = onAuthStateChanged(auth, (user)=>{
                //Se tem user logado
                if(user){

                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem("@leo", JSON.stringify(userData)) //salvar no localStorage

                    setLoading(false)
                    setSigned(true)
                }
                else{
                //Não possui user logado
                setLoading(false)
                setSigned(false)
                }
            })

        }
        checkLogin()

    }, [])

    if(loading){
        return(
            <div></div>
        )
    }
    //Não logado, direciona para page Home
    if(!signed){
        return(<Navigate to="/"/>)
    }


    return children
}

export default Private