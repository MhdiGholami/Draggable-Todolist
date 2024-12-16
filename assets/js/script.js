// Draggable Todolist Project
// ******************************


// Dom Elements Selection
const openModal = document.querySelector('.open-modal')
const bodyElem = document.querySelector('body')
const modal = document.querySelector('.modal')
const addForm = document.getElementById('add-form')
const btnClose = document.getElementById('btn-close')
const btnAdd = document.getElementById('btn-add')
const titleInput = document.getElementById('title-input')
const desc = document.getElementById('desc')
const todoListContainer = document.querySelector('.todo-list-container')
const inprogressListContainer = document.getElementById('inprogress-list-container')
const doneListContainer = document.getElementById('done-list-container')
const trashListContainer = document.getElementById('trash-list-container')
const cleanTrash = document.querySelector('.clean-trash')
const deleteIcon = document.querySelector('.delete-icon')
const toggleTheme = document.querySelector('.toggle-theme')
const themesParent = document.querySelector('.themes-parent')
const themesElem = document.querySelector('.themes')
const theme = document.querySelector('.theme')
let idNumber = 0
let idSaver = 0
let flag = 0


// my themes color database
const themesColor = [
    { id: 1, color: 'rgb(116, 124, 152)' },
    { id: 2, color: 'rgb(255, 84, 84)' },
    { id: 3, color: 'rgb(255, 189, 35)' },
    { id: 4, color: 'rgb(68, 255, 143)' },
    { id: 5, color: '#805ad5' },
    { id: 6, color: 'rgb(0, 187, 255)' },
]


// onload function
window.onload = function() {
    themesColor.forEach(function (data) {
        // console.log(data.color);
        let colorBox = document.createElement('div')
        colorBox.classList.add('theme')
        colorBox.setAttribute('onclick', 'themeHandler(event)')
        colorBox.style.backgroundColor = data.color
        themesElem.appendChild(colorBox)
    })
}


// Function for open todo modal
openModal.addEventListener('click', function () {
    modal.style.display = 'block'
})

// Function for close modal
btnClose.addEventListener('click', function () {
    modal.style.display = 'none'
})

// Function for create and add new todo item
btnAdd.addEventListener('click', function (event) {
    modal.style.display = 'none'
    event.preventDefault()

    let newLi = document.createElement('li')
    newLi.setAttribute('class', 'todolist-item')
    newLi.setAttribute('id', idNumber)
    newLi.setAttribute('draggable', 'true')
    newLi.setAttribute('ondragstart', 'dragStartHandler(event)')
    newLi.setAttribute('ondragover', 'noAllowDrop(event)')
    newLi.innerHTML = `
        <div class="todolist-itemRow">
            <h4 class="todolist-itemTitle">${titleInput.value}</h4>
            <div class="status-color"></div>
        </div>
        <p class="todolist-itemDesc">${desc.value}</p>
        <div class="todolist-itemDelete">
            <img onclick="deleteItem(event)" class="delete-icon" src="assets/images/icon-cross.png" alt="">
        </div>
    `
    todoListContainer.append(newLi)
    idNumber += 1
})

// Function when start dragging an items
function dragStartHandler(event) {
    idSaver = event.target.id
}

// Function when start dropping an items
function dropHandler(event) {
    let targetId = idSaver
    let targetElem = document.getElementById(targetId)
    if (event.target.id === 'inprogress-list-container') {
        targetElem.firstElementChild.lastElementChild.style.backgroundColor = 'yellow'
    } else if (event.target.id === 'done-list-container') {
        targetElem.firstElementChild.lastElementChild.style.backgroundColor = 'green'
    } else if (event.target.id === 'trash-list-container') {
        targetElem.firstElementChild.lastElementChild.style.backgroundColor = 'red'
    }

    event.target.append(targetElem)
}

// Function when click on clean button to remove all items
cleanTrash.addEventListener('click', function (event) {
    event.target.parentElement.nextElementSibling.innerHTML = ''
})

// Function for delete an item
function deleteItem(event) {
    event.target.parentElement.parentElement.remove()
}

// Function for set preventDefault when dragging
function dragOverHandler(event) {
    event.preventDefault()
}

// Function for set stopPropagation 
function noAllowDrop(event) {
    event.stopPropagation()
}

// Function for handling project theme
function themeHandler(event) {
    bodyElem.style.backgroundColor = event.target.style.backgroundColor
}

// Function to open the theme menu
function openThemeMenu(event) {
    themesElem.classList.toggle('hidden')
    themesParent.classList.toggle('opacity')
}

// addEventListeners
toggleTheme.addEventListener('click', openThemeMenu)