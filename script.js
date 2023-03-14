let inputName = document.querySelector('.name');
let textArea = document.querySelector('.comment');
let date = document.querySelector('.date');
let sendButton = document.querySelector('.send-button');
let commentArea = document.querySelector('.comment-area');
let form = document.querySelector('.form');

let commentsData = [];
let index = 0;

function createComment(name, text, date) {
	let commentDiv = document.createElement('section');
	commentDiv.className = 'comments';
	let currentDate = new Date();

	if (!commentsData.length) {
		index = 0;
	}

	if (!date) {
		let hours = currentDate.getHours();
		if (hours < 10) hours = `0${hours}`;

		let minutes = currentDate.getMinutes();
		if (minutes < 10) minutes = `0${minutes}`;

		date = `Сегодня, ${hours}:${minutes}`;
	}

	if (currentDate.getDate() - +date.slice(8) === 1) {
		date = 'Вчера';
	}

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

	commentsData = [...commentsData, { id: index, name: name, comment: text, isLiked: false }];

	commentArea.append(commentDiv);
	inputName.value = '';
	textArea.value = '';
	let clearDate = (document.querySelector('input[type=date]').value = '');

	let deleteButton = document.getElementById(`${index}delete`);

	deleteButton.addEventListener('click', event => {
		let parent = event.target.closest('section');
		parent.remove();

		let id = parseInt(event.target.getAttribute('id'));
		let copyCommentsData = commentsData.filter(item => {
			return item.id != commentsData[id].id;
		});

		commentsData = [...copyCommentsData];
	});

	let likeButton = document.getElementById(`${index}like`);

	likeButton.addEventListener('click', event => {
		let id = parseInt(event.target.getAttribute('id'));
		let parent = event.target.closest('div');
		let likeCount = parent.children[0];

		likeCount.hidden = commentsData[id].isLiked;
		commentsData[id].isLiked = !commentsData[id].isLiked;
	});

	index++;
}

sendButton.addEventListener('click', event => {
	event.preventDefault();
	let commentName = inputName.value;
	let commentText = textArea.value;
	let commentDate = date.value;

	if (!commentName || !commentText) {
		return false;
	}

	createComment(commentName, commentText, commentDate);
});

textArea.addEventListener('keydown', event => {
	let commentName = inputName.value;
	let commentText = textArea.value;
	let commentDate = date.value;

	if (!commentName || !commentText) {
		return false;
	}

	if (event.key === 'Enter') {
		event.preventDefault();
		createComment(commentName, commentText, commentDate);
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
