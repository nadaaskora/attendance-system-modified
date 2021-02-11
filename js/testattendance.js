import {users} from './fetchEmployees.js';
let form =document.getElementById('confirm-attendance-form');
let showModalAttendanceTime = document.getElementById('modal-emp-attendance');
let modalEmpName = document.getElementById('modal-emp-name');
let modalEmpTime = document.getElementById('modal-emp-time');
let confirmAttendanceButton = document.getElementById('confirm-attendance-button');
let attendanceUsername= document.getElementById('attendance-username');
let attendanceTime = new Date().toUTCString();

function checkUser(e){
    e.preventDefault();
    if(attendanceUsername.value===''){
        console.log('fds');
        attendanceUsername.classList.add('is-invalid');
    }
    else{
        users.then((data)=>{
            for(let i in data.employees){
                let obj = data.employees[i];
                console.log('ay 7aga');
                if(obj.username!==attendanceUsername.value){
                        attendanceUsername.classList.add('is-invalid');
                        attendanceUsername.nextElementSibling.innerText= 'User has been confirmed today';
                        break;
                }
                    attendanceUsername.classList.add('is-invalid');
                    attendanceUsername.nextElementSibling.innerText= 'User not found';
                }
                else{
                        attendanceUsername.classList.remove ('is-invalid');
                        console.log('y3ni eh ana fi if w else',obj.username);
                        postUserAttendance(obj.id,obj.username,e);
                        // $("form").on('submit', function(){
                        //     $('#modal-emp-attendance').show();
                        // });
                        // showModalAttendanceTime.style.display='none';
                        modalEmpName.innerText=obj.username;
                        modalEmpTime.innerText=attendanceTime;
                        break;
                }
                // })
            });
        // });
    }
}
function showModal(){
    confirmAttendanceButton.setAttribute('data-toggle','modal');
    confirmAttendanceButton.setAttribute('data-target','#modal-emp-attendance');
}
function postUserAttendance(id,username,e) {
    console.log('confirm');
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({   
            id: id,
            username: username, 
            "attendance-time":attendanceTime, 
         }),
    })
        .then(res => res.json())
        .then(data => {
            data.employees.map((emp)=>{
                console.log('gjhgjhg')
            });
        })
        .catch(err => console.log(err));
}
function checkEmpolyeehasnotsubmitbefore(){
    fetch('http://localhost:3000/users')
    .then((res)=>res.json())
    .then((data)=>{
        data.users.map((emp)=>{
            for(let e in emp.username){
                if(e!==attendanceUsername.value){
                    console.log('heeeh');
                }
                else{
                    console.log('yarab')
                }
            }
        });
    });
}
// checkEmpolyeehasnotsubmitbefore();
form.addEventListener('submit',checkUser);
attendanceUsername.addEventListener('focus',()=>{
    attendanceUsername.classList.remove('is-invalid');
});