const tareaForm = document.getElementById("tareaForm");
let tareas = [];

let fechaHoy = new Date();
const fechaActual = new Date().toISOString().slice(0, 10);
document.getElementById("tiempo").setAttribute("min", fechaActual);

function sumarDias(fecha, dias) {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

tareaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = new FormData(tareaForm);
  const tareaX = form.get("tareaX");
  const tiempo = form.get("tiempo");
  const PrioridadT = form.get("PrioridadT");
  const tituloT = form.get("tituloTarea");
  const descripcionT = form.get("descripcionTarea");



  const tarea = {
    tareaX,
    tiempo,
    PrioridadT,
    tituloT,
    descripcionT,
    fechaActual: new Date(),
    fechaFinal: new Date(Date.parse(tiempo)),
    diasRestantes:  Math.floor((new Date(Date.parse(tiempo)).getTime() - new Date().getTime())/(1000*60*60*24))+2,
  };

  tareas.push(tarea);
  nuevaTarea(tareas);
  guardarTareaStorage(tareas);
});

window.addEventListener("load", () => {

  const tareasAll = obtenerTareaStorage();
  tareasAll.forEach((tarea) => {
    tarea.fechaActual = new Date();
    // tarea.diasRestantes = (new Date(Date.parse(tarea.fechaFinal)))
    tarea.diasRestantes = Math.floor((new Date(Date.parse(tarea.fechaFinal)).getTime() - new Date().getTime())/(1000*60*60*24))+2  
  });
  // tareasAll[0].PrioridadT = "5"
  nuevaTarea(tareasAll)
  guardarTareaStorage(tareasAll)
  console.log(tareasAll);
});

const nuevaTarea = (tareas) => {
  const listaTareas = document.getElementById("listaTareas");
  const div = document.createElement("div");

  listaTareas.innerHTML = "";

  tareas.forEach((tarea) => {
    div.innerHTML += `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong class="p-1">Tipo de tarea:</strong> ${tarea.tareaX} <div></div> 
                    <strong class="p-1">Fecha:</strong> ${tarea.tiempo} 
                    <strong class="p-1">Dias restantes:</strong> ${tarea.diasRestantes}
                    <strong class="p-1">Prioridad:</strong> ${tarea.PrioridadT}
                    <strong class="p-1">Título:</strong> ${tarea.tituloT} 
                    <strong class="p-1">Descripción:</strong> ${tarea.descripcionT}
                    <button href="#" class="btn btn-outline-info rounded m-2" id="${tarea.tituloT}" name="delete" value="${tarea.tituloT}">Borrar</button>
                </div>
            </div>
        `;
    listaTareas.appendChild(div);
  });

  document.getElementById("tareaForm").reset();

  listaTareas.addEventListener("click", (e) => {
    borrarTarea(e.target.value);
  });
};

const borrarTarea = (tituloT) => {
  tareas.forEach((tarea, index) => {
    if (tarea.tituloT === tituloT) {
      tareas.splice(index, 1);
    }
  });
  nuevaTarea(tareas);
  guardarTareaStorage(tareas);
};

const guardarTareaStorage = (tareas) => {
  localStorage.setItem("tareas", JSON.stringify(tareas));
};

const obtenerTareaStorage = () => {
  const tareasStorage = JSON.parse(localStorage.getItem("tareas"));
  return tareasStorage;
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tareas")) {
    tareas = obtenerTareaStorage();
    nuevaTarea(tareas);
  }
});
