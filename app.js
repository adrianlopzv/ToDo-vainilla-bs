//se pasan todas las Ids en variables const
const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTarea = document.getElementById('lista-tareas')
const template = document.getElementById('template').content //siempre va content al final de template
const fragment = document.createDocumentFragment() //Crea un nuevo DocumentFragment vacio, dentro del cual un nodo del DOM puede ser adicionado para construir un nuevo arbol DOM fuera de pantalla


let tareas = {
    1653659986816: {
        id: 1653659986816,
        texto: 'Tarea #1',
        estado: false
    },
    1653660048224: {
        id: 1653660048224,
        texto: 'Tarea #2',
        estado: false
    }
}

// console.log(Date.now())

// esta escucha de evento trae el evento del boton'submit'que esta dentro del formulario
formulario.addEventListener('submit', e => {
    e.preventDefault()
    console.log(input.value)
    // otras formas de traer el value del input
    //console.log(e.target[0].value) target trae el form el [0] el primer elemento y su value es lo que se escribe en el input
    //console.log(e.target.querySelector('input').value) - otra forma
    //
    setTask()
})

const setTask = e => {
    if(input.value.trim() === ''){
    console.log('no escribiste nada flaco')
    return // el return solo dentro del If hace que se salga de la funcion despues de entrar al if y llegar al return
    }
    
    formulario.reset() //limpia el form despues del submit
}