// import {users} from '../js/fetchEmployees';
let users=fetch('../data/users.json')
.then((res) => res.json());
const table = document.querySelector('.table tbody');
let date=new Date();
let todayDate = document.getElementById('date');
todayDate.innerText =`Date: ${date.toLocaleString('en-GB')}`;
let attendanceTime = date.toLocaleTimeString('en-GB');
let attendanceDate = date.toLocaleDateString();
let late_MonthlyCounter=0,
    attendance_MonthlyCounter=0,
    absent_MonthlyCounter=0;
let currentYear=date.getFullYear();
let currentMonth= date.getMonth()+1;
function lastDayOfMonth(currentYear,currentMonth){
    return new Date(currentYear,currentMonth, 0).getDate();
}

let search_term='';
function createUsersTable(){
        table.innerHTML='';
        users.then((data)=>{
          data.users.filter(
            user=>user.username.toLowerCase().includes(search_term.toLowerCase())
            ).forEach(user=>{
            let emp_TableRow = document.createElement('tr');
          // employees name
          let emp_username = document.createElement('td');
          emp_username.classList.add('emp-table-username');
          emp_username.innerText=user.username;
          // employees attended 
          let emp_attended = document.createElement('td');
          emp_attended.classList.add('emp-table-attended');
          emp_attended.innerText=user.dailyReport["attended"];
          //employees late
          let emp_late = document.createElement('td');
          emp_late.classList.add('emp-table-late');
          emp_late.innerText=user.dailyReport["lateDaily"];
          // employees Excuse
          let emp_excuse = document.createElement('td');
          emp_excuse.classList.add('emp-table-excuse');
          emp_excuse.innerText= 0;  //user.dailyReport["excuseDaily"];
          // employees absent
          let emp_absent = document.createElement('td');
          emp_absent.classList.add('emp-table-absent');
          emp_absent.innerText= user.dailyReport["absent"];
          emp_TableRow.appendChild(emp_username);
          emp_TableRow.appendChild(emp_attended);
          emp_TableRow.appendChild(emp_late);
          emp_TableRow.appendChild(emp_excuse);
          emp_TableRow.appendChild(emp_absent);
          table.appendChild(emp_TableRow);
        });
      });
}
createUsersTable();
const filterUsers=document.getElementById('filter-users');

filterUsers.addEventListener('input', (e) => {
	search_term = e.target.value;
	// re-display countries again based on the new search_term
	createUsersTable();
});