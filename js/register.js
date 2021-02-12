let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let address = document.getElementById('address');
let age = document.getElementById('age');
let random = Math.floor(Math.random()*100000000).toString(36);

function isString(name) {
	return typeof name === 'string' || name instanceof String;
}
function addUserPost() {
    let name= `${fname.value} ${lname.value}`;
    fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({   
            username: random,
            password: random,
            name: name,
            email: email.value, 
            address:address.value, 
            age:age.value
         }),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            alert('add done')
            sendMail()
            .then(result =>{
                console.log(result)
            })
        })
        .catch(err => console.log(err));

}
async function sendMail(){
    return await Email.send({
        Host : "smtp.gmail.com",
        Username: 'nadanodyahmed98@gmail.com',
        Password: 'pfogiixyeflcmlhp',
        To : "nadaaskora@gamil.com",
        From : "nadanodyahmed98@gmail.com",
        Subject : `username & password confirmation`,
        Body : `Username $"user" <br/> Password pass`
    })
}


const submitUser=document.getElementById('add-user');


sendMail();

submitUser.addEventListener('submit', function (event) {
    event.preventDefault();
    if (submitUser.checkValidity()) {
        addUserPost();
    }
});