// import {users} from '../js/fetchEmployees';
let users=fetch('../data/users.json')
.then((res) => res.json());
const table = document.querySelector('.table tbody');
let modalEmpName = document.getElementById('modal-emp-name');
let modalEmpTime = document.getElementById('modal-attendance-time');

let montlhly_modalEmpName = document.getElementById('modal-monthly-name');
let monthly_modalEmpTime = document.getElementById('modal-attendance-times');
let monthly_modalEmpAbsence = document.getElementById('modal-absence-times');
let monthly_modalEmpLate = document.getElementById('modal-late-times');
let search_term = '';

// console.log(fetchDailyReports);
function createTableElements(){
  table.innerHTML='';
  users.then((data)=>{
    data.employees.filter(
      user=>user.name.toLowerCase().includes(search_term.toLowerCase())
      ).forEach(user=>{
      let emp_TableRow = document.createElement('tr');
    // employees name
    let emp_name = document.createElement('td');
    emp_name.classList.add('emp-table-name');
    emp_name.innerText=user.name;
    // employees username
    let emp_username = document.createElement('td');
    emp_username.classList.add('emp-table-username');
    emp_username.innerText=user.username;
    
    // create report buttons
    let report_buttons= document.createElement('td');
    let dailyReport= document.createElement('a');
    let monthlyReport= document.createElement('a');
    dailyReport.innerHTML = `<a type="button"
                              class="btn btn-light m-1 daily-report"
                              >
                              Daily Report
                              </a>`;
    monthlyReport.innerHTML = `<a type="button"
                              class="btn btn-danger text-light m-1 monthly-report">
                              Monthly Report
                              </a>`;
    report_buttons.appendChild(dailyReport);
    report_buttons.appendChild(monthlyReport);
    // console.log(emp_name);
    emp_TableRow.appendChild(emp_name);
    emp_TableRow.appendChild(emp_username);
    emp_TableRow.appendChild(report_buttons);
    table.appendChild(emp_TableRow);
  });
});
  
}


function fetchDailyReport(e){
  let username = e.target.parentElement.parentElement.previousElementSibling.innerText;
  console.log('wasl', username);
  users.then((data)=>{
    for(let i in data.users){
      let user=data.users[i];
      if(username==user.username){
        console.log('ya salam');
        e.target.setAttribute('data-toggle','modal');
        e.target.setAttribute('data-target','#dailyReport');
        modalEmpName.innerText = username;
        console.log(modalEmpName)
        modalEmpTime.innerText = `Arrived Today at: ${user.dailyReport["arrivalTime"]}`;
        break;
      }
      else{
        e.target.setAttribute('data-toggle','modal');
        e.target.setAttribute('data-target','#dailyReport');
        modalEmpName.innerText = username;
        modalEmpTime.innerText = ``;
      }
    }

  });

}
function fetchMonthlyReport(e){
  let username = e.target.parentElement.parentElement.previousElementSibling.innerText;
  console.log('wasl', username);
  users.then((data)=>{
    for(let i in data.monthlyreport){
      let user=data.monthlyreport[i];
      console.log(user.username);
      if(username==user.username){
        console.log('ya salam',user.username);

        e.target.setAttribute('data-toggle','modal');
        e.target.setAttribute('data-target','#monthlyReport');
        montlhly_modalEmpName.innerText = username;
        monthly_modalEmpAbsence.innerText = `Absent: ${user.absent} times`;
        monthly_modalEmpLate.innerText =  `Late: ${user.lateCounter} times`;
        monthly_modalEmpTime.innerText =  `Attended on time: ${user.attended} times`;
        
        break;
      }
      else{
        e.target.setAttribute('data-toggle','modal');
        e.target.setAttribute('data-target','#monthlyReport');
        modalEmpName.innerText = username;
        modalEmpTime.innerText = ``;
      }
    }

  });

}
createTableElements();

const filterUsers=document.getElementById('filter-users');

filterUsers.addEventListener('input', (e) => {
	search_term = e.target.value;
	// re-display countries again based on the new search_term
	createTableElements();
});

setTimeout(() => {
  let fetchDailyReports=document.querySelectorAll('.daily-report');
  fetchDailyReports.forEach((r)=>{
    // console.log(r);
    r.addEventListener('click',fetchDailyReport);
  });
}, 3000);

setTimeout(() => {
let fetchMonthlyReports=document.querySelectorAll('.monthly-report');
  fetchMonthlyReports.forEach((m)=>{
    m.addEventListener('click',fetchMonthlyReport);
  });
}, 3000);