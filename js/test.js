// const fs = require('fs');
// function handleFormSubmit(event) {
//     event.preventDefault();
    
//     const data = new FormData(event.target);
    
//     const formJSON = Object.fromEntries(data.entries());

//     fs.writeFile('../data/users.json', formJSON, (err) => {
//       if (err) {
//           throw err;
//       }
//       console.log("JSON data is saved.");
//   });
    
//     // for multi-selects, we need special handling
//     // formJSON.snacks = data.getAll('snacks');
    
//     // const results = document.querySelector('.results pre');
//     // results.innerText = JSON.stringify(formJSON, null, 2);
//   }
const table = document.querySelector('.table tbody');
 
// const form = document.querySelector('#login');
// form.addEventListener('submit', handleFormSubmit);
Adata=[];

function getUsers(){
  fetch('../data/users.json')
  .then((res) => res.json())
      .then((data) => {
    Adata.push(...data);
    data.forEach(user => {
      createTableElements(user);
      // filter();
      // findMatchs(user,data);
    });
  });
}

function createTableElements(user){
  // table.innerHTML='';
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
                            class="btn btn-light m-1"
                            data-toggle="modal"
                            data-target="#dailyReport">
                            Daily Report
                            </a>`;
  monthlyReport.innerHTML = `<a type="button"
  class="btn btn-danger text-light m-1"
    data-toggle="modal"
    data-target="#monthlyReport">
    Monthly Report
                             </a>`;
    report_buttons.appendChild(dailyReport);
    report_buttons.appendChild(monthlyReport);
    
    table.appendChild(emp_TableRow);
    emp_TableRow.appendChild(emp_name);
    emp_TableRow.appendChild(emp_username);
    emp_TableRow.appendChild(report_buttons);
}


// function findMatchs(username,data){
//   return data.filter(user=>{
//     const regex = new RegExp(username,'gi');
//     return user.username.match(regex) || user.name.match(regex);
//   });
// }

// function displayMatch(){
//   const tableName = document.querySelectorAll('.emp-table-name');
//   const tableUsername = document.querySelectorAll('.emp-table-username');
//   const match= findMatchs(this.value,Adata);
//   const html = match.map(u=>{
//     tableName.forEach(name=>{
//       if(!(name.innerText === u.name)){
//         name.parentElement.style.display='none';
//       }

//     });
//     // return 
//   });
//   // table.innerHTML=html;
//   // console.log(match);
// }

// let search_tr='';
// function filter(){
//   const filterUsers=document.getElementById('filter-users');
//   filterUsers.addEventListener('change',(e)=>{
//     search_tr=e.target.value;
//     console.log(search_tr)
//     createTableElements(user);
//   });
// }
getUsers();
