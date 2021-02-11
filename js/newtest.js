const search_input = document.getElementById('filter-users');
const results = document.querySelector('.table tbody');
// const results = document.getElementById('results');

let search_term = '';
let countries;

const fetchCountries = async () => {
	countries = await fetch('../data/users.json').then(
		res => res.json()
	);

}

const showCountries = async () => {
	// clearHTML
	results.innerHTML = '';
	
	// getting the data
	await fetchCountries();
	
	// creating the structure
	const ul = document.createElement("tr");
	ul.classList.add('countries');
	
	countries.filter(
		country => country.name.toLowerCase().includes(search_term.toLowerCase())
	).forEach(country => {
		const li = document.createElement('li');
		const country_flag = document.createElement('img');
		const country_name = document.createElement('h3');
		const country_info = document.createElement('div');
		const country_population = document.createElement('h2');
		const country_popupation_text = document.createElement('h5');
		
		li.classList.add('country-item');
		country_info.classList.add('country-info');
		
		country_flag.src = country.flag;
		country_flag.classList.add('country-flag');
		
		country_name.innerText = country.name;
		country_name.classList.add('country-name');
		
		country_population.innerText = numberWithCommas(country.population);
		country_population.classList.add('country-population');
		country_popupation_text.innerText = 'Population';
		country_popupation_text.classList.add('country-population-text');
		
		country_info.appendChild(country_population);
		country_info.appendChild(country_popupation_text);
		
		li.appendChild(country_flag);
		li.appendChild(country_name);
		li.appendChild(country_info);
		ul.appendChild(li);
	})
	results.appendChild(ul);
}

// display initial countries
showCountries();

search_input.addEventListener('input', (e) => {
	search_term = e.target.value;
	// re-display countries again based on the new search_term
	showCountries();
});

// From StackOverflow https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}