//Script Formulario
//Guargar informacion del formulario antes un f5
let id = document.getElementById('fNombre');
let id2 = document.getElementById('fMail');
let id3 = document.getElementById('fNumber');

let tempDATA = JSON.parse(localStorage.getItem('input')); //recupero lo guardado
let tempDATA2 = JSON.parse(localStorage.getItem('input1'));
let tempDATA3 = JSON.parse(localStorage.getItem('input2'));


if (tempDATA != null) { nombreF = tempDATA; id.value = (nombreF); }  //si tempdata tiene caracteres ejemplo va a almacenar esa info
if (tempDATA2 != null) { emailF = tempDATA2; id2.value = (emailF); } //los ejemplos = nombreF,emailF,numeroF
if (tempDATA3 != null) { numeroF = tempDATA3; id3.value = (numeroF); }

function save() {
    localStorage.setItem('input', JSON.stringify(nombreF)); //strings transform
    localStorage.setItem('input1', JSON.stringify(emailF));
    localStorage.setItem('input2', JSON.stringify(numeroF));
}

function comprobacion() {
    console.log('comprobracion = ' + timer);
    nombreF = id.value;
    emailF = id2.value; //re-guardo los valores
    numeroF = id3.value;

    console.log(nombreF, emailF, numeroF);
    save(); //guardo/actualizo en localStorage
}


let timer;

//Creo Clase
class Consulta {
    constructor(nombre, email, numero) {
        this.nombre = nombre;
        this.email = email;
        this.numero = numero;
    }
}

//defino variables globales par DOM
let arrayConsulta = [];
let miFormulario = document.querySelector("#formulario");
let inputNombre = document.querySelector("#fNombre");




let flag = false;

//Defino eventos de boton

miFormulario.addEventListener("submit", agregarConsulta);

inputNombre.focus();

//Funciones
function validarForm() {
    nombreF = document.getElementById("fNombre").value;
    emailF = document.getElementById("fMail").value;
    numeroF = document.getElementById("fNumber").value;

    if (nombreF == '' || emailF == '' || numeroF == '') {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Por favor Ingrese nuevamente los datos',
        })
        // alert("ERROR - Todos los campos tienen que estar completos.");
        inputNombre.focus();
        flag = false;
    } else {
        Swal.fire(
            'Gracias por tu Visita!',
            'Pronto nos estaremos comunicando!',
            // 'Por favor Validar la informacion'
        )
        flag = true;
    }
}

//Funcion para Agregar Consultas al Array, se agrego las alertas de libreria

function agregarConsulta(e) {
    e.preventDefault();
    validarForm(); //Validacion del Form.
    if (flag == true) {
        Swal.fire({
            title: 'Deseas Enviar el Formulario?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            denyButtonText: `No Enviar`,
        }).then((result) => {
            if (result.isConfirmed) {
                sendMail();
                Swal.fire('Mail Enviado', '', 'success')
                let test = e.target
                arrayConsulta.push(new Consulta(nombreF, emailF, numeroF));
                limpiarFormulario();

            } else if (result.isDenied) {
                Swal.fire('No se envio el Formulario', '', 'info')
                limpiarFormulario();
                inputNombre.focus();
                // console.log(arrayConsulta);
            }
        })
    } else {
        inputNombre.focus();
    }
}


function limpiarFormulario() {
    document.getElementById("formulario").reset();

}


// const btn = document.getElementById('button');
// Esto funciona bien.

function sendMail() {
    const btn = document.getElementById('button');
    document.getElementById('formulario')
        .addEventListener('submit', function (event) {
            event.preventDefault();

            btn.value = 'Sending...';

            const serviceID = 'service_hta6td8';
            const templateID = 'template_mj7xopq';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Send Email';

                }, (err) => {

                    alert(JSON.stringify(err));
                });
        });
}