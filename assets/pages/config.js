// Función para inicializar la tabla al cargar la página
function inicializarTabla() {
  const datosGuardados = localStorage.getItem("routineTable");

  // Si hay datos guardados en localStorage, cargarlos
  if (datosGuardados) {
    const datos = JSON.parse(datosGuardados);
    const tabla = document.getElementById("routine").getElementsByTagName("tbody")[0];

    // Insertar las filas guardadas
    datos.forEach(filaDatos => {
      const fila = tabla.insertRow();
      filaDatos.forEach(dato => {
        const celda = fila.insertCell();
        celda.innerHTML = `<input type="text" value="${dato}" placeholder="Actividad">`;
      });
    });
  } else {
    // Si no hay datos, crear una tabla vacía con una fila inicial
    agregarFila();
  }
}

// Función para agregar una nueva fila
function agregarFila() {
  const tabla = document.getElementById("routine").getElementsByTagName("tbody")[0];
  
  // Crear una nueva fila
  const fila = tabla.insertRow();

  // Añadir celdas para cada día de la semana
  for (let i = 0; i < 7; i++) {
    const celda = fila.insertCell(i);
    celda.innerHTML = `<input type="text" placeholder="Actividad">`; // Campo editable para ingresar actividad
  }
}

// Función para eliminar la última fila
function eliminarFila() {
  const tabla = document.getElementById("routine").getElementsByTagName("tbody")[0];

  // Eliminar la última fila si hay al menos una
  if (tabla.rows.length > 0) {
    tabla.deleteRow(-1);
  } else {
    alert("No hay filas para eliminar.");
  }
}

// Función para guardar los datos en localStorage
function guardarDatos() {
  const tabla = document.getElementById("routine").getElementsByTagName("tbody")[0];
  const datos = [];

  // Recorrer las filas de la tabla
  for (let i = 0; i < tabla.rows.length; i++) {
    const fila = [];
    // Recorrer las celdas de cada fila
    for (let j = 0; j < tabla.rows[i].cells.length; j++) {
      const valor = tabla.rows[i].cells[j].getElementsByTagName("input")[0].value;
      fila.push(valor);
    }
    datos.push(fila);
  }

  // Guardar el arreglo de datos en localStorage como un string JSON
  localStorage.setItem("routineTable", JSON.stringify(datos));
  localStorage.removeItem("weeksTable") // delete weeks data
  alert("Datos guardados en localStorage");
}

// Función para borrar los datos de localStorage y limpiar la tabla
function borrarDatos() {
  // Borrar el localStorage
  localStorage.removeItem("routineTable");
  localStorage.removeItem("weeksTable")

  // Limpiar la tabla
  const tabla = document.getElementById("routine").getElementsByTagName("tbody")[0];
  tabla.innerHTML = "";

  // Agregar una fila vacía para empezar
  agregarFila();

  alert("Datos eliminados y tabla reiniciada");
}

// Ejecutar la función al cargar la página
window.onload = inicializarTabla;
