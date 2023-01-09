import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'




const firebaseConfig = {
    apiKey: "AIzaSyA5GOeQoTeAU3t38h2vGhJMliqEJUBkeRo",
    authDomain: "projetoposts.firebaseapp.com",
    projectId: "projetoposts",
    storageBucket: "projetoposts.appspot.com",
    messagingSenderId: "340739887383",
    appId: "1:340739887383:web:5381402eff629a74e92752",
    measurementId: "G-S7XMWKXYS3"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp) //inicialização da autenticação
  const db = getFirestore(firebaseApp)

  export {db, auth}
