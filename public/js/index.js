const form = document.getElementById('sign-up');
const ul = document.getElementById('joke-list');

const appendJoke = (joke) => {
	const li = document.createElement('li');
	li.textContent = `${joke.setup} ${joke.punchline}`;
	ul.appendChild(li);
};

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const data = new FormData();

	const category = data.get('joke-category');
	const quantity = data
		.get('quantity')

		// fetch('/api/v1/jokes', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		first_name: data.get('first_name'),
		// 		last_name: data.get('last_name'),
		// 		email: data.get('email'),
		// 		type: data.get('joke-category'),
		// 		quantity: data.get('quantity'),
		// 	}),
		// })

		.then((res) => res.json())
		.then(appendJoke);
});

fetch('/api/v1/jokes')
	.then((res) => res.json())
	.then((jokes) => {
		jokes.forEach(appendJoke);
	});
