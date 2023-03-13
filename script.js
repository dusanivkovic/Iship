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
let employees = JSON.parse(localStorage.getItem("employees")) || [];
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

class Employee {
    constructor (nameEmploy, mail, phone, birth, salery) {
        this.nameEmploy = nameEmploy;
        this.mail = mail;
        this.phone = phone;
        this.birth = birth;
        this.salery = salery;
    }
}

class Task {
    constructor (taskTitle, description, assignee) {
        this.taskTitle = taskTitle;
        this.description = description;
        this.assignee = assignee;
    }
}
addEmployee.addEventListener('click', () => {openModal(modalEmployee)});
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
function clearInput () {
    let inputFields = document.querySelectorAll('input');
    inputFields.forEach( item => {item.value = ''})
}

btnCreateEmployee.addEventListener('click', (e, i) => {
    modalEmployee.style.display = 'none';
    nameEmploy = document.querySelector('.name').value;
    mail = document.querySelector('.mail').value;
    phone = document.querySelector('.phone').value;
    birth = document.querySelector('.birth').value;
    salery = document.querySelector('.salery').value;
    e.preventDefault();
    createCard('employee', i);
})
btnCreateTask.addEventListener('click', () => {

    taskTitle = document.querySelector('.task-title').value;
    description = document.querySelector('.task-description').value;
    assignee = document.querySelector('.assignee').value;
    modalTask.style.display = 'none';
    createCard('task', 'i');
})

function createCard (role, i) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const settings = document.createElement('div');
    const content = document.createElement('div');
    const trashEmployee = document.createElement('span');
    const editCard = document.createElement('span');
    const cardWrapper = document.querySelector('.card-wrapper');

    trashEmployee.setAttribute('class', 'close');
    trashEmployee.innerText = 'x';

    const textNodeEmploy = `<p><span>Name: ${nameEmploy}</span></p><p><span>E-mail: ${mail}</span></p><p><span>Phone: ${phone}</span></p><p><span>Date of birth: ${birth}</span></p><p><span>Salery: ${salery}</span></p>`;
    const textNodeTask = `<p><span>Title: ${taskTitle}</span></p><p><span>Description: ${description}</span></p><p><span>Assignee: ${assignee}</span></p>`;

    const employee = new Employee(nameEmploy, mail, phone, birth, salery);
    const task = new Task(taskTitle, description, assignee);
    employees.push(employee);
    tasks.push(task);
    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("tasks", JSON.stringify(tasks));

    content.setAttribute('class', 'card-content');
    content.innerHTML = (role == 'employee') ? textNodeEmploy: textNodeTask;

    settings.setAttribute('class', 'settings');
    editCard.setAttribute('class', 'fas fa-user-edit');
    settings.appendChild(editCard);

    card.setAttribute('class', `card ${role}`);
    card.setAttribute('data-id', `${role}-${i}`);

    cardHeader.setAttribute('class', 'card-header');
    cardHeader.innerHTML = `<h5>${role}</h5>`;
    cardHeader.appendChild(trashEmployee);

    cardBody.setAttribute('class', 'card-body');
    cardBody.append(settings, content);

    card.append(cardHeader, cardBody);

    document.querySelector('.card-wrapper').appendChild(card);

    clearInput();
    //delete employee
    trashEmployee.addEventListener('click', () => {
        cardWrapper.removeChild(card);
        employees.splice(card, 1);
        localStorage.setItem("employees", JSON.stringify(employees));
    })
    //edit employee
    editCard.addEventListener('click', () => openModal(modalEmployee));

}

function getFive() {
    let dupicateArr = [], sortArr = [];
    tasks.forEach( item => {
        if (item.assignee != '') {
            dupicateArr.push([item.assignee])
        }
    })
    sortArr = dupicateArr.reduce((accumulator, value) => {
        return {...accumulator, [value]: (accumulator[value] || 0) + 1};
    }, {});
    let topFive = () => {return Object.entries(sortArr).sort((a,b) => b[1]-a[1])}
    return topFive();
}//five most assignee 
console.table(getFive());






