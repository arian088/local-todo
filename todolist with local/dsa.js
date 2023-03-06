let $ = document
let itemInput = $.getElementById('itemInput')
let addButton = $.getElementById('addButton')
let clearButton = $.getElementById('clearButton')
let todoListElem = $.getElementById('todoList')
let complet = $.querySelector('.btncom')
let del = $.querySelector('.btndel')

let todoArray = []

function addtodo() {
    let inputValue = itemInput.value

    let newObj = {
        id: todoArray.length + 1,
        title: inputValue,
        state: false
    }
    itemInput.value = ''
    todoArray.push(newObj)
    localHostUser(todoArray)
    Gerator(todoArray)
    itemInput.focus()
}

function localHostUser(todolists) {
    localStorage.setItem('todos', JSON.stringify(todolists))
}

function Gerator(todolists) {
    let liElem, labelElem, buttonAddElem, buttonDelElem

    todoListElem.innerHTML = ''

    todolists.forEach(function (todo) {
        liElem = $.createElement('li')
        liElem.className = 'completed well'

        labelElem = $.createElement('label')
        labelElem.innerHTML = todo.title

        buttonAddElem = $.createElement('button')
        buttonAddElem.className = 'btn btn-success'
        buttonAddElem.innerHTML = 'Complete'
        buttonAddElem.addEventListener('click', completedTodo)


        buttonDelElem = $.createElement('button')
        buttonDelElem.className = 'btn btn-danger'
        buttonDelElem.innerHTML = 'Delete'
        buttonDelElem.addEventListener('click', removeTodo)


        liElem.append(labelElem, buttonAddElem, buttonDelElem)
        todoListElem.append(liElem)
    })
}

function completedTodo(todoId) {
    let localTodo = JSON.parse(localStorage.getItem('todos'))
    todoArray = localTodo
    todoArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.state = !todo.state
        }
    })

    localHostUser(todoArray)
}

function removeTodo(todoid) {
    let localTodo = JSON.parse(localStorage.getItem('todos'))
    todoArray = localTodo
    let mainlocal = todoArray.findIndex(function (todo) {
        return todo.id === todoid
    })
    todoArray.splice(mainlocal, 1)
    localHostUser(todoArray)
    Gerator(todoArray)
    
}

function localLodear() {
    let localTodo = JSON.parse(localStorage.getItem('todos'))
    if (localTodo) {
        todoArray = localTodo
    } else {
        todoArray = []
    }

    Gerator(todoArray)

}

function clearBtn() {
    todoArray = []
    Gerator(todoArray)
    localStorage.removeItem('todos')
}

function enterElem(event) {
    if (event.keyCode === 13) {
        addtodo()
    }
}



window.addEventListener('load', localLodear)
addButton.addEventListener('click', addtodo)
clearButton.addEventListener('click', clearBtn)
itemInput.addEventListener('keydown', enterElem)



