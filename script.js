window.onscroll = () => hideShadow();
function hideShadow() {
    if (scrollY > 60) {
        document.querySelector('header').style.boxShadow = ('0px 0px 0px 0px');
        document.querySelector('header').style.padding = '5px';
    }else {
        document.querySelector('header').style.boxShadow = '0px 4px 5px 0px rgba(0,0,0,0.75)';
        document.querySelector('header').style.padding = '30px';
    }
}
let addEmployee = document.querySelector('#employee');
let modalEmployee = document.querySelector('#modal-employee');
let addTask = document.querySelector('#task');
let modalTask = document.querySelector('#modal-task');
let btnCreateEmployee = document.querySelector('#createEmployee');
let btnCreateTask = document.querySelector('#createTask');
let modal = document.querySelectorAll('.modal');
addEmployee.addEventListener('click', () => openModal(modalEmployee));
addTask.addEventListener('click', () => openModal(modalTask));

function openModal (id) {
    id.style.display = 'block';
}
modal.forEach(item => {
    item.addEventListener('click', (e) => closeModal(e))
})

function closeModal (id) {
    if (id.target == modalEmployee || id.target == modalTask) {
        id.target.style.display = 'none';
    }
}

btnCreateEmployee.addEventListener('click', () => {
    modalEmployee.style.display = 'none';
    createCard('employee');
})
btnCreateTask.addEventListener('click', () => {
    modalTask.style.display = 'none';
    createCard('task');
})

function createCard (role) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const settings = document.createElement('div');
    settings.setAttribute('class', 'settings');
    settings.innerHTML = '<span class="fas fa-user-edit">';
    card.setAttribute('class','card');
    cardHeader.setAttribute('class', 'card-header');
    cardHeader.innerHTML = `<h5>${role}</h5><span class="close">X</span>`;
    cardBody.setAttribute('class', 'card-body');
    cardBody.append(settings);
    card.append(cardHeader, cardBody);
    document.querySelector('.main').appendChild(card);
}
// function createTask () {
//     const card = document.createElement('div');
//     const cardHeader = document.createElement('div');
//     const cardBody = document.createElement('div');
//     const settings = document.createElement('div');
//     settings.setAttribute('class', 'settings');
//     settings.innerHTML = '<span class="fas fa-user-edit">';
//     card.setAttribute('class','card');
//     cardHeader.setAttribute('class', 'card-header');
//     cardHeader.innerHTML = '<h5>task</h5><span class="close">X</span>';
//     cardBody.setAttribute('class', 'card-body');
//     cardBody.append(settings);
//     card.append(cardHeader, cardBody);
//     document.querySelector('.main').appendChild(card);
// }

let updateUser = document.querySelectorAll('.fa-user-edit'); 
updateUser.forEach(item => {
    item.addEventListener('click', () => {
        openModal(modalEmployee);
    })
})
