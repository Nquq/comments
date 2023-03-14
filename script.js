let inputName = document.querySelector('.name');
let textArea = document.querySelector('.comment');
let date = document.querySelector('.date');
let sendButton = document.querySelector('.send-button');
let commentArea = document.querySelector('.comment-area');
let form = document.querySelector('.form');

let index = 0;

function createComment(name, text, date) {
	let commentDiv = document.createElement('section');
	commentDiv.className = 'comments';

	date = getCurrentDate(date);

	commentDiv.innerHTML = `
		<div class='comment-name'>${name}</div>
		<div class='comment-text'>${text}</div>
		<div class='comment-date'>${date}</div>
		<div class='buttons'>
			<span class='like-count' hidden>1</span>
			<img src='./assets/icons8-favorite-24.png' width='24px' height='24px' class='like' id='${index}like'/>
			<img src="./assets/icons8-trash-32.png" width='24px' height='24px' class='delete' id='${index}delete'/>
		</div>
	`;

	commentArea.append(commentDiv);

	clearInputs();

	let deleteButton = document.getElementById(`${index}delete`);

	deleteButton.addEventListener('click', event => {
		let parent = event.target.closest('section');
		parent.remove();
	});

	let likeButton = document.getElementById(`${index}like`);

	likeButton.addEventListener('click', event => {
		let parent = event.target.closest('div');
		let likeCount = parent.children[0];

		likeCount.hidden ? (likeCount.hidden = false) : (likeCount.hidden = true);
	});

	index++;
}

function clearInputs() {
	inputName.value = '';
	textArea.value = '';
	let clearDate = (document.querySelector('input[type=date]').value = '');
}

function getCurrentDate(date) {
	let currentDate = new Date();

	if (!date || currentDate.getDate() === +date.slice(8)) {
		let hours = currentDate.getHours();
		if (hours < 10) hours = `0${hours}`;

		let minutes = currentDate.getMinutes();
		if (minutes < 10) minutes = `0${minutes}`;

		date = `Сегодня, ${hours}:${minutes}`;
	} else if (currentDate.getDate() - +date.slice(8) === 1) {
		date = 'Вчера';
	}

	return date;
}

sendButton.addEventListener('click', event => {
	event.preventDefault();

	if (!inputName.value || !textArea.value) {
		return false;
	}

	createComment(inputName.value, textArea.value, date.value);
});

textArea.addEventListener('keydown', event => {
	if (!inputName.value || !textArea.value) {
		return false;
	}

	if (event.key === 'Enter') {
		event.preventDefault();
		createComment(inputName.value, textArea.value, date.value);
	}
});

let errorName = document.createElement('span');
let errorText = document.createElement('span');

inputName.addEventListener('blur', () => {
	if (inputName.value.includes('@') || inputName.value.includes(' ') || !inputName.value) {
		inputName.classList.add('invalid');
		errorName.style.color = 'red';
		errorName.innerHTML = 'Имя не должно содержать @, пробелов и быть пустым';
		form.prepend(errorName);
	}
});

inputName.addEventListener('focus', () => {
	if (inputName.classList.contains('invalid')) {
		inputName.classList.remove('invalid');
		errorName.innerHTML = '';
	}
});

textArea.addEventListener('blur', () => {
	if (!textArea.value) {
		textArea.classList.add('invalid');
		errorText.style.color = 'red';
		errorText.innerHTML = 'Поле должно быть заполнено';
		textArea.insertAdjacentElement('beforebegin', errorText);
	}
});

textArea.addEventListener('focus', () => {
	if (textArea.classList.contains('invalid')) {
		textArea.classList.remove('invalid');
		errorText.remove();
	}
});
