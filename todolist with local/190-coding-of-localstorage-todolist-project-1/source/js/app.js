let $ = document
let inputElem = $.getElementById('itemInput')
let addButton = $.getElementById('addButton')
let clearButton = $.getElementById('clearButton')
let ulElem = $.getElementById('todoList')

let todoArray = []

function addTodo() {

    let inputValue = inputElem.value

    let newObj = {
        id: todoArray.length + 1,
        title: inputValue,
        state: false
    }
    inputElem.value = ''
    todoArray.push(newObj)
    setLocal(todoArray)
    Genrator(todoArray)
}

function Genrator(todoListItem) {
    let liElem, lableElem, buttonAddElem, buttonDelElem
    ulElem.innerHTML = ''

    todoListItem.forEach(function (todo) {
        liElem = $.createElement('li')
        liElem.className = 'completed well'

        lableElem = $.createElement('label')
        lableElem.innerHTML = todo.title

        buttonAddElem = $.createElement('button')
        buttonAddElem.className = 'btn btn-success'
        buttonAddElem.innerHTML = 'Complete'
        buttonAddElem.setAttribute('onclick', 'CompleteTodo(' + todo.id + ')')


        buttonDelElem = $.createElement('button')
        buttonDelElem.className = 'btn btn-danger'
        buttonDelElem.innerHTML = 'Delete'
        buttonDelElem.addEventListener('click', delTodo)

        liElem.append(lableElem, buttonAddElem, buttonDelElem)
        ulElem.append(liElem)

        if (todo.state) {
            liElem.className = 'uncompleted well'
            buttonAddElem.innerHTML = 'uncompleted'
        }
    })
}

function delTodo(todoId) {
    let localFirst = JSON.parse(localStorage.getItem('todos'))
    todoArray = localFirst
    let mainTodo = todoArray.findIndex(function (todo) {
        return todo.id === todoId

    })
    todoArray.splice(mainTodo, 1)
    setLocal(todoArray)
    Genrator(todoArray)
}

function CompleteTodo(todoId) {
    let localFirst = JSON.parse(localStorage.getItem('todos'))
    todoArray = localFirst
    todoArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.state = !todo.state
        }
        setLocal(todoArray)
    })
}


function setLocal(todoListItem) {
    localStorage.setItem('todos', JSON.stringify(todoListItem))
}

function clearTodo() {
    todoArray = []
    Genrator(todoArray)
    localStorage.removeItem('todos')
}

function addTodoEnter(event) {
    if (event.keyCode === 13) {
        addTodo()
    }
}

function loder() {
    let localFirst = JSON.parse(localStorage.getItem('todos'))
    if (localFirst) {
        todoArray = localFirst
    } else {
        todoArray = []
    }

    Genrator(todoArray)
}

addButton.addEventListener('click', addTodo)
clearButton.addEventListener('click', clearTodo)
inputElem.addEventListener('keydown', addTodoEnter)
window.addEventListener('load', loder)