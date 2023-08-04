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
const modal = document.querySelectorAll('.modal');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const employees = JSON.parse(localStorage.getItem('employees')) || [];

addEmployee.addEventListener('click', () => {
    btnCreateEmployee.textContent = 'Create';
    openModal(modalEmployee)
});// Open modal window for entry data of employee
addTask.addEventListener('click', () => {
    btnCreateTask.textContent = 'Create';
    openModal(modalTask);
});// Open modal window for entry data of task

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
    modalEmployee.style.display = 'none';
    saveChangeOrCreateCard (e, 'employee');
});// Create card of employee or save change 
btnCreateTask.addEventListener('click', (e) => {
    e.preventDefault();
    modalTask.style.display = 'none';
    saveChangeOrCreateCard (e, 'task');
});// Create card of task or save change 

function saveChangeOrCreateCard (evt, modalContent) {
    evt.target.textContent == 'Create' ? createCard(modalContent) : alert('Are you sure to save changes');
}

let t = tasks.length == 0 ? 0 : tasks.length;
let emp = employees.length == 0 ? 0 : employees.length;
let i = t + emp;// set ID for array employees or tasks
function createCard (role) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const settings = document.createElement('div');
    const content = document.createElement('div');
    const formModal = document.querySelectorAll('form');
    card.setAttribute('class','card show-card');
    card.setAttribute('data-index', (i));
    settings.setAttribute('class', `settings ${role}-edit`);
    settings.innerHTML = `<span class="fas fa-user-edit"></span>`;
    cardHeader.setAttribute('class', 'card-header');
    cardHeader.innerHTML = `<h5>${role}</h5><span class="close">X</span>`;
    content.setAttribute('class', 'card-content');
    cardBody.setAttribute('class', 'card-body');
    cardBody.append(settings);
    card.append(cardHeader, cardBody);
    role == 'employee' ? getDataFromModalEmployee (cardBody, content, card) : role == 'task' ? getDataFromModalTask (cardBody, content, card): alert('!!!');
    document.querySelector('.main').appendChild(card);
    formModal.forEach(form => form.reset());
    i++;
}// append HTML element width content and execution getDataFromModal function

function getDataFromModalTask (body, contents, cards) {
    const taskTitle = document.querySelector('.task-title');
    const taskDescription = document.querySelector('.task-description');
    const taskAssigniee = document.querySelector('.assignee');
    contents.setAttribute('class', 'card-content');
    contents.innerHTML = `<p><strong>Title: </strong>${taskTitle.value}</p><p><strong>Description: </strong>${taskDescription.value}</p><p><strong>Assignieee: </strong>${taskAssigniee.value}</p>`;
    body.appendChild(contents);
    const task = {
        title: taskTitle.value,
        description: taskDescription.value,
        assiggnie: taskAssigniee.value,
        id: cards.getAttribute('data-index')
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}// getting data from modal task and store in array tasks
function getDataFromModalEmployee (body, contents, cards) {
    const employeeName = document.querySelector('.name');
    const employeeMail = document.querySelector('.mail');
    const employeePhone = document.querySelector('.phone');
    const employeeDateBirth = document.querySelector('.birth');
    const employeeSalery = document.querySelector('.salery');    
    contents.setAttribute('class', 'card-content');
    contents.innerHTML = `<p><strong>Name: </strong>${employeeName.value}</p><p><strong>Mail: </strong>${employeeMail.value}</p><p><strong>Phone: </strong>${employeePhone.value}</p><p><strong>Date of birth: </strong>${employeeDateBirth.value}</p><p><strong>Salery: </strong>${employeeSalery.value}</p>`;
    body.appendChild(contents);
    const employee = {
        name: employeeName.value,
        mail: employeeMail.value,
        phone: employeePhone.value,
        birth: employeeDateBirth.value,
        salery: employeeSalery.value,
        id: cards.getAttribute('data-index')
    };
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
}// getting data from modal employee and store in array employee

function closeCard () {
    mainDiv.addEventListener('click', (e) => {
        const parentCard = e.target.closest('.card');
        if (e.target.classList == 'close') {
            const getIdElementForDelete = parentCard.getAttribute('data-index');
            let spliceIndex = employees.findIndex(emp => emp.id == getIdElementForDelete);
            spliceIndex = spliceIndex == -1 ? tasks.findIndex(tsk => tsk.id == getIdElementForDelete) : spliceIndex;
            const arrForUpdate = parentCard.querySelector('h5').textContent;
            console.log(spliceIndex, arrForUpdate)
            parentCard.classList.remove('show-card');
            deleteArrElement (spliceIndex, arrForUpdate);
        }
    })
}// remove card from main tag and execute function for delete array element

function deleteArrElement (index, arr) {
    if (arr == 'employee') {
        employees.splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(employees));
    }
    if (arr == 'task') {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}// function for delete array element

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
}// open modal window for update employee or task
closeCard ();
updateCard ();
console.table(tasks)
console.table(employees)
// localStorage.clear();




