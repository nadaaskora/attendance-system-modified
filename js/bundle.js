(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
const fs = require('fs');
function handleFormSubmit(event) {
    event.preventDefault();
    
    const data = new FormData(event.target);
    
    const formJSON = Object.fromEntries(data.entries());

    fs.writeFile('../data/users.json', formJSON, (err) => {
      if (err) {
          throw err;
      }
      console.log("JSON data is saved.");
  });
    
    // for multi-selects, we need special handling
    // formJSON.snacks = data.getAll('snacks');
    
    // const results = document.querySelector('.results pre');
    // results.innerText = JSON.stringify(formJSON, null, 2);
  }
  
  const form = document.querySelector('#login');
  form.addEventListener('submit', handleFormSubmit);
},{"fs":1}]},{},[2]);
