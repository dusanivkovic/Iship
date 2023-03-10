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
let addBtn = document.querySelectorAll('.btn');
addEmployee.addEventListener('click', () => openModal(modalEmployee));
let modal = document.querySelectorAll('.modal');
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
console.log(modal)