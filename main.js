
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCa6fRhVDzhLFeJ_3foQ8Su4qaiiHp4yng",
    authDomain: "final-e1314.firebaseapp.com",
    projectId: "final-e1314",
    storageBucket: "final-e1314.appspot.com",
    messagingSenderId: "707386471184",
    appId: "1:707386471184:web:f96c0ee5bd8891fb786b95",
    measurementId: "G-NX4FQB56XW"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const opp="alum";

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

function añadirInfo(){  
  console.log("hola")
    const $nombre=document.getElementById("nombre").value
    const $apellido=document.getElementById("apellido").value
    const $telefono=document.getElementById("telefono").value
    const $DNI=document.getElementById('dni').value
    db.collection(opp).add({
        Nombre: $nombre,
        Apellido: $apellido,
        DNI:  $DNI,
        Telefono: $telefono,
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
}

function loadInfo(){
    db.collection(opp).get().then((querySnapshot) => {
        CrearDatos(querySnapshot);
    });
}



function CrearDatos(MensajesAll){
    console.log("das")
    const $list= document.getElementById("list")
    $list.innerHTML="";

    MensajesAll.forEach(mensaje=>{
        const reviewsDat = `
         </div>
    <div class="hero">
      <div class="container mt-5">
        
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Teléfono</th>
                    <th>DNI</th>
                    <th>Asistencia</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src="https://api.multiavatar.com/${mensaje.data().Nombre}.png" class="img-fluid rounded-circle" alt="Foto de John"></td>
                    <td>${mensaje.data().Nombre}</td>
                    <td>${mensaje.data().DNI}</td>
                    <td>${mensaje.data().Apellido}</td>
                    <td>${mensaje.data().Telefono}</td>
                    <td><button class="check-button" data-nombre="${mensaje.data().Nombre}" onclick="presente('${mensaje.data().Nombre}')">
                    <span class="material-symbols-outlined">check</span>
                  </button>
                  <button class="BORRAR" onclick="Nopresente('${mensaje.data().Nombre}')">
                    <span class="material-symbols-outlined" >delete</span>
                  </button>

</span> </button>      
</td>

                </tr>
        </table>
    </div>
        `

              $list.innerHTML += reviewsDat;
      });
  }


  loadInfo()

function cambiarBoton(Presentes) {
  Presentes.forEach(mensaje => {
    if (mensaje.data().Asistencia === 'si') {
      const botones = document.querySelectorAll(".check-button");
      botones.forEach(boton => {
        if (boton.dataset.nombre === mensaje.data().Nombre) {
          boton.textContent = 'presente';
        }
      });
    }
  });
}
function presente(nombre) {
  const $confirmacion = "si";
  db.collection("presencia").add({
    Nombre: nombre,
    Asistencia: $confirmacion
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

function loadInfo2() {
  db.collection("presencia").get().then((querySnapshot) => {
    cambiarBoton(querySnapshot);
  });
}


loadInfo2();

function Nopresente(nombre) {
  console.log("hola")
  const $confirmacion = "no";
  db.collection("presencia").add({
    Nombre: nombre,
    Asistencia: $confirmacion
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}



