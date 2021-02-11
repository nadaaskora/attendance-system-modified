import {users} from './fetchEmployees.js';
let form =document.getElementById('confirm-attendance-form');
let showModalAttendanceTime = document.getElementById('modal-emp-attendance');
let modalEmpName = document.getElementById('modal-emp-name');
let modalEmpTime = document.getElementById('modal-emp-time');
let confirmAttendanceButton = document.getElementById('confirm-attendance-button');
let attendanceUsername= document.getElementById('attendance-username');
let date=new Date();
let arrivalTime = date.toLocaleTimeString('en-GB');
let archiveTime = date.toLocaleTimeString('en-GB');
let attendanceTime = "9:00:00";
let absentTime = "20:00:00";
let lateDaily=0,
    absent=0,
    attended=0;
let counterOfLates = 0,
    counterOfAttended =0,
    counterOfAbsent=0;

let todayDay = date.getDay();
let currentYear = date.getFullYear();
let currentMonth= date.getMonth()+1;
function lastDayOfMonth(currentYear,currentMonth){
    return new Date(currentYear,currentMonth, 0).getDate();
}
    
function checkUser(e){
    e.preventDefault();
    if(attendanceUsername.value!==''){
        console.log('ay 7aga');
        users.then((data)=>{
            for(let i in data.employees){
                let emp = data.employees[i];
                if((emp.username===attendanceUsername.value) && !checkEmployeeSubmitBefore()){
                    postUserAttendance(emp.id,emp.username,absent);
                    updateMonthlyReport(emp.id);
                    showModal(emp.username);
                    break;
                }else{
                    console.log('user not found and ha');
                    checkUserNotfound();
                }
            }

        });
    }else{
        console.log('fds');
        attendanceUsername.classList.add('is-invalid');
    }
}
function showModal(empUsername){
    confirmAttendanceButton.setAttribute('data-toggle','modal');
    confirmAttendanceButton.setAttribute('data-target','#modal-emp-attendance');
    modalEmpName.innerText=empUsername;
    modalEmpTime.innerText=arrivalTime;
}
function postUserAttendance(id,username,absent) {
    console.log('confirm');
    checkIfUserIsLate();
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({   
            id: id,
            username: username, 
            "dailyReport":{
                "arrivalTime":arrivalTime, 
                "attended":attended,
                "lateDaily":lateDaily,
                "absent":absent
            }
         }),
    })
        .then(res => res.json())
        .then(data => {console.log(data)})
        .catch(err => console.log(err));
        lateDaily=0;
}

function checkEmployeeSubmitBefore(){
    attendanceUsername.classList.remove('is-invalid');
    users.then((data)=>{
        data.users.map((user)=>{
            if(user.username===attendanceUsername.value){
                    console.log('confirmed beforeeee');
                    attendanceUsername.classList.add('is-invalid');
                    attendanceUsername.nextElementSibling.innerText= 'User has been confirmed';
                    return false;
            }
            else{
                return true;
            }
        });
    });
}

function checkUserNotfound(){
    attendanceUsername.classList.add('is-invalid');
    attendanceUsername.nextElementSibling.innerText= 'User not found';
}
function checkIfUserIsLate(){
    if(attendanceTime<=arrivalTime){
        attended+=1;
    }
    else if(attendanceTime>arrivalTime){
        lateDaily+=1;
    }
}

let attendedUsers =[];

function checkIfUserIsAbsent(){
    let currentTime = new Date().toLocaleTimeString('en-GB');
    console.log(currentTime);
    if(currentTime>absentTime){
        users.then((data)=>{
            for(let i in data.employees){
                let emp = data.employees[i];
                for(let j in data.users){
                    let user = data.users[j];
                    if(emp.username===user.username){
                        attendedUsers.push(emp.username);
                    }
                }
                if(attendedUsers[i]!==emp.username){
                    absent=1;
                    postUserAttendance(emp.id,emp.username,absent);
                }
            }
        });
    }
}

function deleteUsersDaily(){
    if(archiveTime==="23:59:00"){
        //
        fetch('http://localhost:3000/users')
        .then(res=>res.json())
        .then(data=>{
            data.map(u=>{

                console.log(u.username)
                let getId=u.id;
                console.log(getId)
            //
            
            fetch(`http://localhost:3000/users/${getId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            
            })
                .then(res => res.json())
                .then(data => {console.log(data)})
                .catch(err => console.log(err));
            });
        });
    }
}
deleteUsersDaily();
function updateMonthlyReport(id){
    if(todayDay<lastDayOfMonth(currentYear,currentMonth)){
    //
    fetch(`http://localhost:3000/monthlyreport/${id}`)
    .then(res=>res.json())
    .then(data=>{
        counterOfLates=data.lateCounter;
        counterOfAttended=data.attended;
        counterOfAbsent= data.absent;
        console.log(data.lateCounter);
    //

    fetch(`http://localhost:3000/monthlyreport/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({   
           "lateCounter":counterOfLates+1,
           "attended": counterOfAttended+1,
           "absent": counterOfAbsent+1
        }),
    })
    .then(res => res.json())
    .then(data => {console.log(data)})
    .catch(err => console.log(err));
    });
    }
}
// monthlyReportLate();

checkIfUserIsAbsent();
form.addEventListener('submit',checkUser);
attendanceUsername.addEventListener('focus',()=>{
    attendanceUsername.classList.remove('is-invalid');
});