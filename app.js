//se pasan todas las Ids en variables const
const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTarea = document.getElementById('lista-tareas')
const template = document.getElementById('template').content //siempre va content al final de template
// en esta variable 'capturamos' el template
const fragment = document.createDocumentFragment() //Crea un nuevo DocumentFragment vacio, dentro del cual un nodo del DOM puede ser adicionado para construir un nuevo arbol DOM fuera de pantalla

let tasksList = {
    // 160: {
    //     id: 160,
    //     texto: 'Tarea #1',
    //     estado: false
    // }
}

document.addEventListener('DOMContentLoaded', () => {
    printTask()
})

listaTarea.addEventListener('click', e => {
    btnAccion(e)
})
// console.log(Date.now())

// esta escucha de evento trae el evento del boton'submit'que esta dentro del formulario
formulario.addEventListener('submit', e => {
    e.preventDefault()
    //console.log(input.value)
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

    const task = {
        id: Date.now(), // es funcion da la fecha en milisegundos, lo usamos para el ID
        texto: input.value,
        estado: false
    }
    
    tasksList[task.id] = task
    // console.log(tasksList)

    formulario.reset() //limpia el form despues del submit
    input.focus() //para mantener el focus en el input

    printTask()
}

const printTask = () => {
    if(Object.values(tasksList).length === 0) {
        listaTarea.innerHTML = `
        <div class="alert alert-dark "> All tasks done! ✨</div>
        `
        return
    }

    listaTarea.innerHTML = null //pa limpiar el DOM y que empiece vacio
    Object.values(tasksList).forEach(task => {
        const clone = template.cloneNode(true) // importante que esto este al principio para ir modificando sobre el clone
        //se va a clonar todo lo que esta en la etiqueta template
        clone.querySelector('p').textContent = task.texto

        if(task.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = task.id
        clone.querySelectorAll('.fas')[1].dataset.id = task.id
        fragment.appendChild(clone)
    })
    listaTarea.appendChild(fragment)
}

const btnAccion = e => {
    if(e.target.classList.contains('fa-check-circle')) {
        // console.log(e.target.dataset.id)
        tasksList[e.target.dataset.id].estado = true
        printTask()
        console.log(tasksList)
    }

    if(e.target.classList.contains('fa-minus-circle')) {
        delete tasksList[e.target.dataset.id]
        printTask()
    }

    if(e.target.classList.contains('fa-undo-alt')) {
        tasksList[e.target.dataset.id].estado = false
        printTask()
    }

    e.stopPropagation() //es para que solo se active ESTE evento y no los demas
}