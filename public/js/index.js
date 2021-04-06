// const oneBtn = document.getElementById('one');
// const tenBtn = document.getElementById('ten');
const form = document.getElementById('jokes');
const ul = document.getElementById('joke-list');

// oneBtn.addEventListener('click', () => {
// 	console.log('clicked!');
// 	fetch('/api/v1/jokes/random', {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Host: '127.0.0.1:7890',
// 		},
// 	})
// 		.then((res) => res.json())
// 		.then(appendJoke);
// });

// const appendJoke = (joke) => {
// 	const li = document.createElement('li');
// 	li.textContent = `${joke.setup} ${joke.punchline}`;
// 	ul.appendChild(li);
// };

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const data = new FormData(form);

	fetch('/api/v1/jokes/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			type: data.get('joke-type'),
			quantity: data.get('quantity'),
		}),
	})
		.then((res) => res.body)
		.then(console.log('Joke added successfully!'));
	// .then((jokes) => {
	// 	jokes.map((joke) => {
	// 		console.log(joke);
	// 		const li = document.createElement('li');
	// 		li.textContent = `${joke.setup} ${joke.punchLine}`;
	// 		ul.appendChild(li);
	// 		console.log('joke appended');
	// 	});
	// });
});

fetch('/api/v1/jokes')
	.then((res) => res.json())
	.then((jokes) => {
		jokes.map((joke) => {
			console.log(joke);
			const li = document.createElement('li');
			li.textContent = `${joke.setup} ${joke.punchLine}`;
			ul.appendChild(li);
			console.log('joke appended');
		});
	});
