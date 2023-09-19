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
const formModal = document.querySelectorAll('form');
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
    showAssign();
});// Create card of employee or save change 
btnCreateTask.addEventListener('click', (e) => {
    e.preventDefault();
    modalTask.style.display = 'none';
    saveChangeOrCreateCard (e, 'task');
    showAssign();
});// Create card of task or save change 

function saveChangeOrCreateCard (evt, modalContent) {
    evt.target.textContent == 'Create' ? createCard(modalContent) : evt.target.textContent == 'Save' ? console.log('update') : alert('!!!');
    formModal.forEach(form => form.reset());
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
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('employees', JSON.stringify(employees));
    i++;
}// append HTML element width content and execution getDataFromModal function

function getDataFromModalTask (body, contents, cards) {
    const taskTitle = document.querySelector('.task-title');
    const taskDescription = document.querySelector('.task-description');
    const taskAssigniee = document.querySelector('.assignee');
    contents.setAttribute('class', 'card-content');
    contents.innerHTML = `<p id ='titleTask'><strong>Title: </strong>${taskTitle.value}</p><p id ='descriptionTask'><strong>Description: </strong>${taskDescription.value}</p><p id ='assigneeTask'><strong>Assignee: </strong>${taskAssigniee.value}</p>`;
    body.appendChild(contents);
    const task = {
        title: taskTitle.value,
        description: taskDescription.value,
        assiggnie: taskAssigniee.value,
        id: cards.getAttribute('data-index')
    };
    tasks.push(task);
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
    // localStorage.setItem('employees', JSON.stringify(employees));
}// getting data from modal employee and store in array employee

function closeCard () {
    mainDiv.addEventListener('click', (e) => {
        const parentCard = e.target.closest('.card');
        if (e.target.classList == 'close') {
            const arrForUpdate = parentCard.querySelector('h5').textContent;
            parentCard.classList.remove('show-card');
            deleteArrElement (getIndexOfElement (parentCard, tasks), arrForUpdate);
        }
    })
}// remove card from main tag and execute function for delete array element

const getIndexOfElement = (parent, arr) => {
    const dataIndx = parent.getAttribute('data-index');
    let indexArr = arr.findIndex(ar => ar.id == dataIndx);
    return indexArr;
}

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
        if (e.target.classList == 'fas fa-user-edit')  {
            const parentCard = e.target.closest('.card');
            btnCreateTask.textContent = 'Save';
            btnCreateEmployee.textContent = 'Save';
            if (e.target.parentElement.classList == 'settings task-edit') {
                openModal (modalTask);
                let indexOfTaskElement = getIndexOfElement (parentCard, tasks);
                parentCard.setAttribute('id', 'updating');
                modalTask.querySelector('.task-title').value = tasks[indexOfTaskElement].title;
                modalTask.querySelector('.task-description').value = tasks[indexOfTaskElement].description;
                modalTask.querySelector('.assignee').value = tasks[indexOfTaskElement].assiggnie;
                modalTask.querySelectorAll('input').forEach(inpt => {
                    inpt.addEventListener('change', (e) =>  {
                        if (inpt.classList.contains('task-title') && parentCard.getAttribute('id') == 'updating') {
                            tasks[indexOfTaskElement].title = e.target.value;
                            parentCard.querySelector('#titleTask').innerHTML = `<p><strong>Title: </strong>${tasks[indexOfTaskElement].title}</p>`;
                            localStorage.setItem('tasks', JSON.stringify(tasks));
                        }
                        if (inpt.classList.contains('task-description') && parentCard.getAttribute('id') == 'updating') {
                            tasks[indexOfTaskElement].description = e.target.value;
                            parentCard.querySelector('#descriptionTask').innerHTML = `<p><strong>Description: </strong>${tasks[indexOfTaskElement].description}</p>`;
                            localStorage.setItem('tasks', JSON.stringify(tasks));
                        }
                        if (inpt.classList.contains('assignee') && parentCard.getAttribute('id') == 'updating') {
                            tasks[indexOfTaskElement].assiggnie = e.target.value;
                            parentCard.querySelector('#assigneeTask').innerHTML = `<p><strong>Assiggnee: </strong>${tasks[indexOfTaskElement].assiggnie}</p>`;
                            localStorage.setItem('tasks', JSON.stringify(tasks));
                        }
                    });
                    btnCreateTask.addEventListener('click', () => {
                        parentCard.removeAttribute('id');
                        showAssign();
                    });
                })
            }
            if (e.target.parentElement.classList == 'settings employee-edit') {
                openModal(modalEmployee);
                const allCardParagraf = parentCard.querySelectorAll('p');
                let indexOfEmpolyeeElement = getIndexOfElement (parentCard, employees);
                parentCard.setAttribute('id', 'updating');
                modalEmployee.querySelector('.name').value = employees[indexOfEmpolyeeElement].name;
                modalEmployee.querySelector('.mail').value = employees[indexOfEmpolyeeElement].mail;
                modalEmployee.querySelector('.phone').value = employees[indexOfEmpolyeeElement].phone;
                modalEmployee.querySelector('.birth').value = employees[indexOfEmpolyeeElement].birth;
                modalEmployee.querySelector('.salery').value = employees[indexOfEmpolyeeElement].salery;
                modalEmployee.querySelectorAll('input').forEach(inpt => {
                    inpt.addEventListener('change', (e) => {
                        if (inpt.classList.contains('name') && parentCard.getAttribute('id') == 'updating') {
                            employees[indexOfEmpolyeeElement].name = e.target.value;
                            allCardParagraf[0].innerHTML = `<p><strong>Name: </strong>${employees[indexOfEmpolyeeElement].name}</p>`;
                            localStorage.setItem('employees', JSON.stringify(employees));
                        }
                        if (inpt.classList.contains('mail') && parentCard.getAttribute('id') == 'updating') {
                            employees[indexOfEmpolyeeElement].mail = e.target.value;
                            allCardParagraf[1].innerHTML = `<p><strong>Mail: </strong>${employees[indexOfEmpolyeeElement].mail}</p>`;
                            localStorage.setItem('employees', JSON.stringify(employees));
                        }
                        if (inpt.classList.contains('phone') && parentCard.getAttribute('id') == 'updating') {
                            employees[indexOfEmpolyeeElement].phone = e.target.value;
                            allCardParagraf[2].innerHTML = `<p><strong>Phone: </strong>${employees[indexOfEmpolyeeElement].phone}</p>`;
                            localStorage.setItem('employees', JSON.stringify(employees));
                        }
                        if (inpt.classList.contains('birth') && parentCard.getAttribute('id') == 'updating') {
                            employees[indexOfEmpolyeeElement].birth = e.target.value;
                            allCardParagraf[3].innerHTML = `<p><strong>Date of birth: </strong>${employees[indexOfEmpolyeeElement].birth}</p>`;
                            localStorage.setItem('employees', JSON.stringify(employees));
                        }
                        if (inpt.classList.contains('salery') && parentCard.getAttribute('id') == 'updating') {
                            employees[indexOfEmpolyeeElement].salery = e.target.value;
                            allCardParagraf[4].innerHTML = `<p><strong>Salery: </strong>${employees[indexOfEmpolyeeElement].salery}</p>`;
                            localStorage.setItem('employees', JSON.stringify(employees));
                        }
                    });
                    btnCreateEmployee.addEventListener('click', () => {
                        parentCard.removeAttribute('id');
                        showAssign();
                    });
                })
            }

        }
    })

}// open modal window for update employee or task

// find top five assigned employee
let getFive = () => {
    let duplicateArr = [], sortArr = [];
    tasks.forEach( item => {
        if (item.assiggnie != '') {
            duplicateArr.push([item.assiggnie]);
        }
        console.log(duplicateArr)
    })
    sortArr = duplicateArr.reduce((accumulator, value) => {
        return {...accumulator, [value]: (accumulator[value] || 0) + 1};
    }, {});
    // return sortArr;
    return Object.entries(sortArr).sort((a,b) => b[1]-a[1]);
}
console.log(getFive())
showAssign();

function showAssign () {
    const topList = document.querySelector('.list-name');
    topList.innerHTML = '';
    const topArr = {... getFive()};
    for (let i = 0; i < Object.keys(topArr).length; i++) {
        if (i < 5) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            li.innerHTML += `Name: ${(topArr[i][0])}<span class='top-five'>${topArr[i][1]}</span>`;
            topList.append(li);
        }
    }
}


closeCard ();
updateCard ();
document.querySelector('.reset').addEventListener('click', () => {
    localStorage.clear();
    mainDiv.querySelectorAll('.card').forEach(card => card.remove());
    while (document.querySelector('.list-name').hasChildNodes()) {
        document.querySelector('.list-name').removeChild(document.querySelector('.list-name').firstChild)
    }
    location.reload();
    delete tasks;
    showAssign();
})
// ;




