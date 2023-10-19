document.addEventListener('DOMContentLoaded', function () {
    const botonDisponibilidad = document.getElementById('botonDisponibilidad');
    botonDisponibilidad.addEventListener('click', revisarDisponibilidad);

    const botonGuardarAlumno = document.getElementById('botonGuardarAlumno');
    botonGuardarAlumno.addEventListener('click', guardarAlumno);

    mostrarAlumnos();}
    );

const cronograma = {
    hatha: {
        mediodia: {
            disponible: true,
            precio: 2000
        },
        tarde: {
            disponible: false,
            precio: 2500
        },
        noche: {
            disponible: true,
            precio: 3000
        }
    },
    vinyasa: {
        mediodia: {
            disponible: true,
            precio: 2200
        },
        tarde: {
            disponible: true,
            precio: 2700
        },
        noche: {
            disponible: true,
            precio: 3200
        }
    },
    ashtanga: {
        mediodia: {
            disponible: false,
            precio: 2400
        },
        tarde: {
            disponible: true,
            precio: 2900
        },
        noche: {
            disponible: true,
            precio: 3400
        }
    }
};

const hora = document.getElementById("hora");

fetch('http://worldtimeapi.org/api/ip')
.then(response => response.json() )
.then(data =>{
    hora.innerHTML = `<p> hora: ${data.datetime}</p>`;
})

function revisarDisponibilidad() {
    const clase = document.getElementById('clase').value;
    const horario = document.getElementById('horario').value;

    const disponible = cronograma[clase][horario].disponible;
    const precio = cronograma[clase][horario].precio;

    const anotarse = document.getElementById('anotarse');

    if (disponible) {
        document.getElementById('resultado').innerHTML = `La clase ${clase} en la/el ${horario} esta disponible. El precio es $${precio}.`;

        anotarse.style.display = 'block';
    } else {
        document.getElementById('resultado').innerHTML = `La clase ${clase} en la/el ${horario} no esta disponible. Intenta con otra!`;

        anotarse.style.display = 'none';
    }
}

function guardarAlumno() {
    const nombreAlumno = document.getElementById('nombreAlumno').value;
    if (nombreAlumno.length < 3) {
        swal({
            title: "Error!",
            text: "No es posible registrarse con menos de tres carácteres.",
            icon: "error",
            button: "Reintentar",
        });
        return;
    }
    const clase = document.getElementById('clase').value;
    const horario = document.getElementById('horario').value;

    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    const nuevoAlumno = {
        nombre: nombreAlumno,
        clase: clase,
        horario: horario
    };

    registros.push(nuevoAlumno);
    localStorage.setItem('registros', JSON.stringify(registros));

    mostrarAlumnos();

    swal({
        title: "Genial!",
        text: "Te has anotado en la clase correctamente!",
        icon: "success",
        button: "Aceptar!",
    });
}

function mostrarAlumnos() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const listaRegistros = document.getElementById('listaRegistros');
    listaRegistros.innerHTML = '';
    let dineroTotal = 0;

    registros.forEach((alumno, index) => {
        const itemsAlumnos = document.createElement('li');
        itemsAlumnos.appendChild(document.createTextNode(`${alumno.nombre} - en la clase ${alumno.clase} en el/la  ${alumno.horario}`));

        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Borrar';
        botonBorrar.classList.add('botonBorrar');
        botonBorrar.addEventListener('click', () => {
            borrarAlumnos(index);
        });

        itemsAlumnos.appendChild(botonBorrar);
        listaRegistros.appendChild(itemsAlumnos);

        if (cronograma[alumno.clase] && cronograma[alumno.clase][alumno.horario]) {
            dineroTotal += cronograma[alumno.clase][alumno.horario].precio;
        }
    });

    const verDineroTotal = document.createElement('p');
    verDineroTotal.textContent = `Dinero Total recaudado: $${dineroTotal}`;
    listaRegistros.appendChild(verDineroTotal);
}

function borrarAlumnos(index) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.splice(index, 1);
    localStorage.setItem('registros', JSON.stringify(registros));
    mostrarAlumnos();
}


