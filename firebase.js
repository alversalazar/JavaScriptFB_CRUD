
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

  import {getFirestore, collection , addDoc,getDocs ,onSnapshot,deleteDoc,
    doc,
    getDoc,
    updateDoc,}
   from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"

   export class ManageAccount {
    register(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((_) => {
          window.location.href = "login.html";
          // Mostrar alerta de registro exitoso
          alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
        })
        .catch((error) => {
          console.error(error.message);
              // Mostrar alerta de error de registro
              alert("Error al registrar: " + error.message);
        });
    }
  
    authenticate(email, password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((_) => {
          window.location.href = "index.html";
          // Mostrar alerta de inicio de sesión exitoso
          alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
        })
        .catch((error) => {
          console.error(error.message);
                  // Mostrar alerta de error de inicio de sesión
                  alert("Error al iniciar sesión: " + error.message);
        });
    }
  
    signOut() {
      signOut(auth)
        .then((_) => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBIRgNNFet0e--m0biP6qJx0BPF5kcgMzo",
    authDomain: "javascriptfbcrud.firebaseapp.com",
    projectId: "javascriptfbcrud",
    storageBucket: "javascriptfbcrud.appspot.com",
    messagingSenderId: "387278097652",
    appId: "1:387278097652:web:cc2d3367cc11063c0222a1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const db = getFirestore()



   /**
 * Save a New Task in Firestore
 * @param {string} idCareer
 * @param {string} name 
 * * @param {string} duration
 * @param {string} description 
 * * @param {string} status
 */

   export const saveTask = (idCareer, name,duration,description,status) =>
   addDoc(collection(db, "Career"), { idCareer, name,duration,description,status});

export const onGetTasks = (callback) =>
onSnapshot(collection(db,"Career"), callback);

/**
*
* @param {string} id Task ID
*/
export const deleteTask = (id) => deleteDoc(doc(db, "Career", id));

export const getTask = (id) => getDoc(doc(db, "Career", id));

export const updateTask = (id, newFields) =>
updateDoc(doc(db, "Career", id), newFields);

export const getTasks = () => getDocs(collection(db, "Career"));

