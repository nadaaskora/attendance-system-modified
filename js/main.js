const date = document.getElementById('date');
const no_employees = document.getElementById('no_employees');
const attended_users = document.getElementById('attended-users');
const late_users = document.getElementById('late-users');
import {users} from './fetchEmployees.js';

getNumberOfUsers();
getCurrentDate();
getAttendedUsers();
getLateUsers();
function getNumberOfUsers(){
    users.then((data)=>{ no_employees.innerHTML=`<i class="fas fa-user"></i> ${data.employees.length}`});
}
function getAttendedUsers(){
    let countAttended=0;
    users.then((data)=>{
        for(let i in data.users){
            let obj=data.users[i];
            if(obj.dailyReport["attended"]==0){
                break;

            }else{
                countAttended+=1;
            }
        }
        attended_users.innerHTML= `<i class="fas fa-user"></i> ${countAttended} `;
        //  attended_users.innerHTML=`<i class="fas fa-user"></i> ${console.log(data.users.for)}`});
});
}
function getLateUsers(){
    let countLate=0;
    users.then((data)=>{
        for(let i in data.users){
            let obj=data.users[i];
            if(obj.dailyReport["late"]==0){
                break;

            }else{
                countLate+=1;
            }
        }
        late_users.innerHTML= `<i class="fas fa-users-slash"></i> ${countLate} `;

    });
}
function getCurrentDate(){
    const datee = new Date().toString().split('GMT');
    date.innerText = `Date: ${datee[0]}`;
}