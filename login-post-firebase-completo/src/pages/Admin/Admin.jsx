import React from 'react'
import './admin.css'
import {useState, useEffect} from 'react'
import {auth, db} from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import { addDoc, collection, orderBy, onSnapshot, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'

function Admin(){

    //useState:
    const [tarefaInput, setTarefaInput]= useState("")
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [edit, setEdit] = useState({})

    //useEffect:
    useEffect(()=>{
        async function loadTarefas(){
            const userDetails = localStorage.getItem("@leo")
            setUser(JSON.parse(userDetails))

            if(userDetails){
                const data = JSON.parse(userDetails)

                const tarefaRef = collection(db,"tarefas")

                const busca = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid)) //busca no BD

                const unsub = onSnapshot(busca, (snapshot)=>{
                    let lista = []

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id:doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    console.log(lista)
                    setTarefas(lista)
                })
            }
        }

        loadTarefas()
    }, [])

    //funções:
    async function registrarTarefa(e){
        e.preventDefault()
        if(tarefaInput ===""){
            alert("Digite uma tarefa")
            return
        }

        if(edit?.id){
            atualizarTarefa()
            return
        }

        await addDoc(collection(db, "tarefas"),{
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            alert("Tarefa registrada com sucesso")
            setTarefaInput("")
        })
        .catch((erro)=>{alert("Erro ao cadastrar" + erro)})
    }

    async function sair(){
        await signOut(auth)
    }

    async function deletarTarefa(id){       
        const docRef = doc(db, 'tarefas', id)
        await deleteDoc(docRef)
    }

    async function editarTarefa(item){        
       setTarefaInput(item.tarefa)
       setEdit(item)
    }

    async function atualizarTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {tarefa: tarefaInput})
        .then(()=>{
            setTarefaInput("")
            setEdit({})
        })
        .catch(()=>{
            setTarefaInput("")
            setEdit({})
        })
    }

    return(
        <div className="admin-container">
            <h1>Minhas tarefas</h1>

            <form className="form" onSubmit={registrarTarefa}>
                <textarea placeholder='Digite sua tarefa' value={tarefaInput} onChange={(e)=>{setTarefaInput(e.target.value)}}/>
              
                {Object.keys(edit).length > 0 ? 
                    (<button type='submit' className="btn-register">Atualizar tarefa</button>):
                
                    (<button type='submit' className="btn-register">Registrar tarefa</button>)        
                }


            </form>

            {tarefas.map((item)=>(
                <article className="list" key={item.userUid}>
                    <p>{item.tarefa} </p>
                    <div>
                        <button onClick={()=>{editarTarefa(item)}}>Editar</button>
                        <button className="btn-delete" onClick={()=>deletarTarefa(item.id)}>Concluir</button>
                    </div>
                </article>
            ))}

            <button className="btn-logout" onClick={sair}>Sair</button>

        </div>
    )
}

export default Admin