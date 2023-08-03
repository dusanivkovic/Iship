window.onscroll = () => hideShadow();
function hideShadow() {
    if (scrollY > 60) {
        document.querySelector('header').style.boxShadow = ('0px 0px 0px 0px');
        document.querySelector('header').style.height = '15vh';
    }else {
        document.querySelector('header').style.boxShadow = '0px 4px 5px 0px rgba(0,0,0,0.75)';
        document.querySelector('header').style.height = '45vh';
    }
}
const addEmployee = document.querySelector('#employee');
const modalEmployee = document.querySelector('#modal-employee');
const addTask = document.querySelector('#task');
const modalTask = document.querySelector('#modal-task');
const btnCreateEmployee = document.querySelector('#createEmployee');
const btnCreateTask = document.querySelector('#createTask');
const mainDiv = document.querySelector('.main');
let modal = document.querySelectorAll('.modal');
addEmployee.addEventListener('click', () => {
    btnCreateEmployee.textContent = 'Create';
    openModal(modalEmployee)
});
addTask.addEventListener('click', () => {
    btnCreateTask.textContent = 'Create';
    openModal(modalTask);
});

function openModal (id) {
    id.style.display = 'block';
}

window.addEventListener('click', (e) => closeModal(e));

function closeModal (mod) {
    if (mod.target.classList == 'modal') {
        mod.target.style.display = 'none';
    }
}

btnCreateEmployee.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target.textContent)
    modalEmployee.style.display = 'none';
    saveChangeOrCreateCard (e, 'employee');
})
btnCreateTask.addEventListener('click', (e) => {
    e.preventDefault();
    modalTask.style.display = 'none';
    saveChangeOrCreateCard (e, 'task');
})

function saveChangeOrCreateCard (evt, modalContent) {
    evt.target.textContent == 'Create' ? createCard(modalContent) : alert('Are you sure to save changes');
}

function createCard (role) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const settings = document.createElement('div');
    const content = document.createElement('div');
    const formModal = document.querySelectorAll('form');
    card.setAttribute('class','card show-card');
    settings.setAttribute('class', `settings ${role}-edit`);
    settings.innerHTML = `<span class="fas fa-user-edit"></span>`;
    cardHeader.setAttribute('class', 'card-header');
    cardHeader.innerHTML = `<h5>${role}</h5><span class="close">X</span>`;
    content.setAttribute('class', 'card-content');
    cardBody.setAttribute('class', 'card-body');
    cardBody.append(settings);
    card.append(cardHeader, cardBody);
    role == 'employee' ? getDataFromModalEmployee (cardBody, content) : role == 'task' ? getDataFromModalTask (cardBody, content): alert('!!!');
    document.querySelector('.main').appendChild(card);
    formModal.forEach(form => form.reset());
}

function getDataFromModalTask (cards, contents) {
    const taskTitle = document.querySelector('.task-title');
    const taskDescription = document.querySelector('.task-description');
    const taskAssigniee = document.querySelector('.assignee');
    contents.setAttribute('class', 'card-content');
    contents.innerHTML = `<p><strong>Title: </strong>${taskTitle.value}</p><p><strong>Description: </strong>${taskDescription.value}</p><p><strong>Assignieee: </strong>${taskAssigniee.value}</p>`;
    cards.appendChild(contents);
}
function getDataFromModalEmployee (cards, contents) {
    const employeeName = document.querySelector('.name');
    const employeeMail = document.querySelector('.mail');
    const employeePhone = document.querySelector('.phone');
    const employeeDateBirth = document.querySelector('.birth');
    const employeeSalery = document.querySelector('.salery');    
    contents.setAttribute('class', 'card-content');
    contents.innerHTML = `<p><strong>Name: </strong>${employeeName.value}</p><p><strong>Mail: </strong>${employeeMail.value}</p><p><strong>Phone: </strong>${employeePhone.value}</p><p><strong>Date of birth: </strong>${employeeDateBirth.value}</p><p><strong>Salery: </strong>${employeeSalery.value}</p>`;
    cards.appendChild(contents);
}

function closeCard () {
    mainDiv.addEventListener('click', (e) => {
        if (e.target.classList == 'close') {
            e.target.parentElement.parentElement.classList.remove('show-card');
        }
    })
}

function updateCard () {
    mainDiv.addEventListener('click', (e) => {
        if (e.target.parentElement.classList ==('settings task-edit'))  {
            btnCreateTask.textContent = 'Save';
            openModal (modalTask);
        }
        if (e.target.parentElement.classList ==('settings employee-edit'))  {
            btnCreateEmployee.textContent = 'Save';
            openModal (modalEmployee);
        }
    })
}
closeCard ();
updateCard ();





