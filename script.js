const userName = document.querySelector('#name');
const pass = document.querySelector('#pass1');
const pass2 = document.querySelector('#pass2');
const email = document.querySelector('#mail');
const error = document.querySelectorAll('.error-text');
const clearBtn = document.querySelector('.clear');
const sendBtn = document.querySelector('.send');
const closePopupBtn = document.querySelector('.close');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	formBox.classList.add('error');

	const errorMsg = formBox.querySelector('.error-text');
	errorMsg.textContent = msg;
};

const clearError = input => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} składa się z min. ${min} znaków.`
		);
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value.length !== pass2.value.length) {
		showError(pass2, 'Hasła do siebie nie pasują.');
	}
};

const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'Email jest niepoprawny.');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++;			
		}
	});

	if(errorCount === 0) {
		popup.classList.add('show-popup')
	}
};

sendBtn.addEventListener('click', e => {
	e.preventDefault();

	checkForm([userName, pass, pass2, email]);
	checkLength(userName, 3);
	checkLength(pass, 8);
	checkPassword(pass, pass2);
	checkMail(email);
	checkErrors()
});

clearBtn.addEventListener('click', e => {
	e.preventDefault();

	[userName, pass, pass2, email].forEach(el => {
		el.value = '';

		clearError(el);
	});
});

closePopupBtn.addEventListener('click', e => {
	popup.classList.remove('show-popup');
});
