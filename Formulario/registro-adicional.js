const campos = { // Debe estar global para acceder en todas las funciones
    nrodocumento: false,
    nombre: false,
    fecha_nacimiento: false,
    celular: false,
    direccion: false,
    correo: false
};

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10}$/,
    identificacion: /^\d{7,10}$/,
    direccion: /^.{1,40}$/
};

document.addEventListener('DOMContentLoaded', () => {
    const btnMenor = document.getElementById('btnMenor');
    const btnMayor = document.getElementById('btnMayor');
    const btnNone = document.getElementById('btnNone');
    const dynamicForm = document.getElementById('dynamicForm');
    const formulario = document.getElementById('formulario');

    let personCount = 0; // Contador de personas registradas

    // Función para manejar el envío del formulario
    function handleFormSubmit(event) {
        event.preventDefault(); // Previene el envío real del formulario

        // Verifica si todos los campos son válidos
        if ((campos.nrodocumento && campos.nombre && campos.celular && campos.fecha_nacimiento) || (campos.nrodocumento && campos.nombre && campos.celular && campos.correo)) {
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 3000);

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });

            if (personCount < 5) {
                personCount++;
                // POP UP 
                var modal = document.getElementById("myModal");
                var modalContent = document.querySelector('.modal-content'); // Selecciona el contenedor del contenido del modal
                modalContent.innerHTML = `
                        <span class="close">&times;</span>
                        <p>Persona registrada correctamente. Has registrado ${personCount} de 5 personas.</p>
                    `;
                var span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
                // alert(`Persona registrada correctamente. Has registrado ${personCount} de 5 personas.`);
                dynamicForm.innerHTML = ''; // Limpia el formulario dinámico para permitir agregar otra persona
                formulario.reset(); // Resetea el formulario
                document.getElementById('formulario').style.backgroundColor = 'transparent';
            }

            if (personCount >= 5) {
                // POP UP 
                var modal = document.getElementById("myModal");
                var modalContent = document.querySelector('.modal-content'); // Selecciona el contenedor del contenido del modal
                modalContent.innerHTML = `
                        <span class="close">&times;</span>
                        <p>Has alcanzado el límite de 5 personas registradas.</p>
                    `;
                var span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
                // alert('Has alcanzado el límite de 5 personas registradas.');
                btnMenor.disabled = true;
                btnMayor.disabled = true;
                document.getElementById('formulario').style.backgroundColor = 'transparent';
            }

        } else {
            const mensajeError = document.getElementById('formulario__mensaje');
            mensajeError.classList.add('formulario__mensaje-activo');

            setTimeout(() => {
                mensajeError.classList.remove('formulario__mensaje-activo');
            }, 3000);
        }
    }

    // Redirigir a index.html cuando se selecciona "No agregar persona"
    btnNone.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Función que agrega eventos de validación a los campos dinámicos
    function agregarEventosDinamicos(tipo) {
        console.log("Valor de tipo:", tipo); // Verifica el valor del parámetro
        console.log("eventos dinamicos");
        const inputsDinamicos = dynamicForm.querySelectorAll('input');
        const calendarDinamicos = dynamicForm.querySelectorAll('input[type="date"]');

        if (tipo === 'mayor') {
            console.log("mayor");
            inputsDinamicos.forEach((input) => {
                input.addEventListener('keyup', validarFormularioMayores);
                input.addEventListener('blur', validarFormularioMayores);
            });
        }

        if (tipo === 'menor') {
            console.log("menor");
            inputsDinamicos.forEach((input) => {
                input.addEventListener('keyup', validarFormularioMenores);
                input.addEventListener('blur', validarFormularioMenores);
            });
        }

        calendarDinamicos.forEach((calendar) => {
            calendar.addEventListener('change', validarFormularioMenores);
        });
    }

    // Mostrar formulario para menor de edad
    btnMenor.addEventListener('click', () => {
        document.body.style.backgroundImage = 'url(../Formulario/assets/design.jpg)'; // Fondo amarillo
        document.getElementById('title').style.color = '#000000'; // Color de texto
        document.getElementsByClassName('title')[0].style.color = '#000000';
        document.getElementsByClassName('subtitle')[0].style.color = '#000000';
        document.getElementById('formulario').style.backgroundColor = '#f0f0f0';
        if (personCount < 5) {
            dynamicForm.innerHTML = `
                <!-- Formulario completo para menor de edad -->
                <div class="formulario__grupo" id="grupo__tipodocumento">
                    <label for="tipo_documento" class="formulario__label">Tipo de documento:</label>
                    <select class="formulario__input" id="tipo_documento" name="tipo_documento" required>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="tarjeta_identidad">Tarjeta de identidad - TI</option>
                        <option value="registro_civil">Registro civil</option>
                    </select>
                </div>
                <div class="formulario__grupo" id="grupo__nrodocumento">
                    <label for="numero_documento" class="formulario__label">Número de Documento:</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" id="numero_documento" name="numero_documento" required
                            placeholder="Ingresar numero de documento">
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>
                    <p class="formulario__input-error">El número de documento debe contener máximo 10 dígitos numéricos y
                        debe escribirse sin puntos ni comas.</p>
                </div>
                <div class="formulario__grupo" id="grupo__nombre">
                    <label for="nombre_titular" class="formulario__label">Nombre:</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" id="nombre_titular" name="nombre_titular"
                        placeholder="Ingresar nombre" required>
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>
                    <p class="formulario__input-error">El nombre solo puede contener letras y espacios.</p>
                </div>
                <div class="formulario__grupo" id="grupo__fechanacimiento">
                    <label for="fecha_nacimiento" class="formulario__label">Fecha de Nacimiento:</label>
                    <div class="formulario__grupo-input">
                        <input type="date" class="formulario__input" id="fecha_nacimiento" name="fecha_nacimiento" required>
                    </div>
                    <p class="formulario__input-error">Debe ser mayor de 18 años y la fecha no puede ser posterior a la
                    fecha actual.</p>
                </div>
                <div class="formulario__grupo" id="grupo__sexo">
                    <label for="sexo_titular" class="formulario__label">Sexo:</label>
                    <select id="sexo_titular" class="formulario__input" name="sexo_titular" required>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="mujer">Niña</option>
                        <option value="hombre">Niño</option>
                    </select>
                </div>
                <div class="formulario__grupo" id="grupo__celular">
                    <label for="celular_titular" class="formulario__label">Número Celular:</label>
                    <div class="formulario__grupo-input">
                        <input type="tel" class="formulario__input" id="celular_titular" name="celular_titular"
                            placeholder="Ingresar número de celular" required>
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>
                    <p class="formulario__input-error">El número de celular debe contener un máximo de 10 dígitos numéricos.
                    </p>
                </div>

                <div class="formulario__grupo" id="grupo__parentesco">
                    <label for="parentesco" class="formulario__label">Parentesco:</label>
                    <div class="formulario__grupo-input">
                        <select class="formulario__input" id="parentesco" name="parentesco" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="madre">Madre</option>
                            <option value="padre">Padre</option>
                            <option value="hijo">Hijo</option>
                            <option value="abuelo">Abuelo</option>
                            <option value="abuela">Abuela</option>
                            <option value="tio">Tío</option>
                            <option value="tia">Tía</option>
                            <option value="suegro">Suegro</option>
                            <option value="suegra">Suegra</option>
                            <option value="otro">Otro (especificar)</option>
                        </select>
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>

                    <div class="formulario__grupo-input" id="otroParentescoInput" style="display:none;">
                        <input type="text" class="formulario__input" id="otro_parentesco" name="otro_parentesco" placeholder="Especificar otro parentesco">
                    </div>
                    <p class="formulario__input-error">Por favor, selecciona un parentesco válido o especifica otro.</p>
                </div>

                <!-- BOTON DE ENVIAR -->

                <div class="formulario__grupo formulario__grupo-btn-enviar">
                    <button type="submit" class="formulario__btn">Enviar</button>
                    <p class="formulario__mensaje-exito" id="formulario__mensaje-exito">Formulario enviado exitosamente!
                    </p>
                </div>
            `;

            document.getElementById('parentesco').addEventListener('change', function () {
                var otroInput = document.getElementById('otroParentescoInput');
                if (this.value === 'otro') {
                    otroInput.style.display = 'block';
                } else {
                    otroInput.style.display = 'none';
                }
            });

            // Agregar validaciones a los nuevos campos
            agregarEventosDinamicos("menor");
        } else {
            // POP UP 
            var modal = document.getElementById("myModal");
            var modalContent = document.querySelector('.modal-content'); // Selecciona el contenedor del contenido del modal
            modalContent.innerHTML = `
                    <span class="close">&times;</span>
                    <p>Has alcanzado el límite de 5 personas registradas.</p>
                `;
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            // alert('Ya has alcanzado el límite de 5 personas.');
        }
    });

    // Mostrar formulario para mayor de edad
    btnMayor.addEventListener('click', () => {
        document.body.style.backgroundImage = 'url(http://www.fundatialoren.com/img/fom_bg.jpg)'; // Fondo amarillo
        document.getElementById('title').style.color = '#FECE1A'; // Color de texto
        document.getElementsByClassName('title')[0].style.color = '#FFFFFF';
        document.getElementsByClassName('subtitle')[0].style.color = '#FFFFFF';
        document.getElementById('formulario').style.backgroundColor = '#f0f0f0';
        if (personCount < 5) {
            dynamicForm.innerHTML = `
                <!-- Formulario completo para mayor de edad -->
                <div class="formulario__grupo" id="grupo__nombre">
                    <label for="nombre_titular" class="formulario__label">Nombre:</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" id="nombre_titular" name="nombre_titular"
                        placeholder="Ingresar nombre" required>
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>
                    <p class="formulario__input-error">El nombre solo puede contener letras y espacios.</p>
                </div>
                <div class="formulario__grupo" id="grupo__fechanacimiento">
                    <label for="fecha_nacimiento" class="formulario__label">Fecha de Nacimiento:</label>
                    <div class="formulario__grupo-input">
                        <input type="date" class="formulario__input" id="fecha_nacimiento" name="fecha_nacimiento" required>
                    </div>
                    <p class="formulario__input-error">Debe ser mayor de 18 años y la fecha no puede ser posterior a la
                    fecha actual.</p>
                </div>
                <div class="formulario__grupo" id="grupo__sexo">
                    <label for="sexo_titular" class="formulario__label">Sexo:</label>
                    <select id="sexo_titular" class="formulario__input" name="sexo_titular" required>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="mujer">Mujer</option>
                        <option value="hombre">Hombre</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div class="formulario__grupo" id="grupo__celular">
                    <label for="celular_titular" class="formulario__label">Número Celular:</label>
                    <div class="formulario__grupo-input">
                        <input type="tel" class="formulario__input" id="celular_titular" name="celular_titular"
                            placeholder="Ingresar número de celular" required>
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>
                    <p class="formulario__input-error">El número de celular debe contener un máximo de 10 dígitos numéricos.
                    </p>
                </div>
                <div class="formulario__grupo" id="grupo__direccion">
                    <label for="direccion_titular" class="formulario__label">Dirección:</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" id="direccion_titular" name="direccion_titular"
                            required>
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>
                    <p class="formulario__input-error">La dirección debe tener el formato Cra 0 #00-00</p>
                </div>
                <div class="formulario__grupo" id="grupo__correo">
                    <label for="correo_titular" class="formulario__label">Correo:</label>
                    <div class="formulario__grupo-input">
                        <input type="email" class="formulario__input" id="correo_titular" name="correo_titular" required>
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>
                    <p class="formulario__input-error">Ingresa un correo válido.</p>
                </div>

                <div class="formulario__grupo" id="grupo__parentesco">
                    <label for="parentesco" class="formulario__label">Parentesco:</label>
                    <div class="formulario__grupo-input">
                        <select class="formulario__input" id="parentesco" name="parentesco" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="madre">Madre</option>
                            <option value="padre">Padre</option>
                            <option value="hijo">Hijo</option>
                            <option value="abuelo">Abuelo</option>
                            <option value="abuela">Abuela</option>
                            <option value="tio">Tío</option>
                            <option value="tia">Tía</option>
                            <option value="suegro">Suegro</option>
                            <option value="suegra">Suegra</option>
                            <option value="otro">Otro (especificar)</option>
                        </select>
                        <i class="formulario__validacion-estado material-symbols-outlined">cancel</i>
                    </div>

                    <div class="formulario__grupo-input" id="otroParentescoInput" style="display:none;">
                        <input type="text" class="formulario__input" id="otro_parentesco" name="otro_parentesco" placeholder="Especificar otro parentesco">
                    </div>
                    <p class="formulario__input-error">Por favor, selecciona un parentesco válido o especifica otro.</p>
                </div>

                <!-- BOTON DE ENVIAR -->
                <div class="formulario__mensaje" id="formulario__mensaje">
                    <p><i class="formulario__validacion-alerta material-symbols-outlined">warning</i><b>Error: </b>
                        Por
                        favor   
                        llena el formulario correctamente</p>
                </div> 

                <div class="formulario__grupo formulario__grupo-btn-enviar">
                    <button type="submit" class="formulario__btn">Enviar</button>
                    <p class="formulario__mensaje-exito" id="formulario__mensaje-exito">Formulario enviado exitosamente!
                    </p>
                </div>
            `;

            document.getElementById('parentesco').addEventListener('change', function () {
                var otroInput = document.getElementById('otroParentescoInput');
                if (this.value === 'otro') {
                    otroInput.style.display = 'block';
                } else {
                    otroInput.style.display = 'none';
                }
            });

            // Agregar validaciones a los nuevos campos
            agregarEventosDinamicos("mayor");
        } else {
            // POP UP 
            var modal = document.getElementById("myModal");
            var modalContent = document.querySelector('.modal-content'); // Selecciona el contenedor del contenido del modal
            modalContent.innerHTML = `
                    <span class="close">&times;</span>
                    <p>Has alcanzado el límite de 5 personas registradas.</p>
                `;
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            // alert('Ya has alcanzado el límite de 5 personas.');
        }
    });

    formulario.addEventListener('submit', handleFormSubmit);
});

// Funciones de validación
const validarFormularioMayores = (e) => {
    switch (e.target.name) {
        case "nombre_titular":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "celular_titular":
            validarCampo(expresiones.telefono, e.target, 'celular');
            break;
        case "direccion_titular":
            validarCampo(expresiones.direccion, e.target, 'direccion');
            break;
        case "correo_titular":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
    }
}

const validarFormularioMenores = (e) => {
    switch (e.target.name) {
        case "numero_documento":
            validarCampo(expresiones.identificacion, e.target, 'nrodocumento');
            break;
        case "nombre_titular":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "fecha_nacimiento":
            validarFechaNacimiento(e.target);
            break;
        case "celular_titular":
            validarCampo(expresiones.telefono, e.target, 'celular');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        console.log('correcto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        const icono = document.querySelector(`#grupo__${campo} .formulario__validacion-estado`);
        icono.outerHTML = '<i class="formulario__validacion-estado material-symbols-outlined">check_circle</i>';
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        console.log('incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        const icono = document.querySelector(`#grupo__${campo} .formulario__validacion-estado`);
        icono.outerHTML = '<i class="formulario__validacion-estado material-symbols-outlined">cancel</i>';
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarFechaNacimiento = (input) => {
    const fechaIngresada = new Date(input.value);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Asegura que la comparación se haga solo con la fecha, sin considerar la hora.

    // Calcula la edad de la persona
    let edad = fechaActual.getFullYear() - fechaIngresada.getFullYear();
    const mes = fechaActual.getMonth() - fechaIngresada.getMonth();

    // Ajusta la edad si el mes actual es menor al mes de nacimiento o si es el mismo mes pero el día aún no ha llegado
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaIngresada.getDate())) {
        edad--;
    }

    // Verifica si la persona tiene al menos 18 años
    if (edad >= 18) {
        document.getElementById(`grupo__fechanacimiento`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__fechanacimiento`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__fechanacimiento .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['fecha_nacimiento'] = true;
    } else {
        document.getElementById(`grupo__fechanacimiento`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__fechanacimiento`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__fechanacimiento .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['fecha_nacimiento'] = false;
    }
}
