// disable для полей
document.addEventListener('DOMContentLoaded', () => {
	function toggleField(checkboxId, fieldId, clearOnDisable = false) {
		const checkbox = document.getElementById(checkboxId);
		const field = document.getElementById(fieldId);

		const updateField = () => {
			field.disabled = !checkbox.checked;
			field.required = checkbox.checked;
			if (!checkbox.checked && clearOnDisable) field.value = '';
		};

		checkbox.addEventListener('change', updateField);
		updateField();
	}

	['subscribe', 'for-friend', 'paycheck-to-email'].forEach((id) => {
		toggleField(
			id,
			`${id
				.replace('subscribe', 'user-email')
				.replace('for-friend', 'user-friend-phone')
				.replace('paycheck-to-email', 'email-for-paycheck')}`,
			true,
		);
	});

	const deliveryOptions = ['radio-self', 'radio-delivery', 'radio-express'];
	const userAddress = document.getElementById('user-address');

	function handleDeliveryChange() {
		const isDisabled = document.getElementById('radio-self').checked;
		userAddress.disabled = isDisabled;
		userAddress.required = !isDisabled;
		if (isDisabled) userAddress.value = '';
	}

	deliveryOptions.forEach((option) => {
		document
			.getElementById(option)
			.addEventListener('change', handleDeliveryChange);
	});

	handleDeliveryChange();

	const paymentRadios = document.querySelectorAll(
		'#radio-card, #radio-cash, #radio-phone',
	);
	const cardDataInputs = document.querySelectorAll(
		'.order-form__card-data .custom-input__field',
	);

	function toggleCardInputs() {
		const shouldEnable = document.getElementById('radio-card').checked;
		cardDataInputs.forEach((input) => {
			input.disabled = !shouldEnable;
		});
	}

	paymentRadios.forEach((radio) =>
		radio.addEventListener('change', toggleCardInputs),
	);
	toggleCardInputs();
});

// номер телефона
document.addEventListener('DOMContentLoaded', function () {
	const eventCallback = function (e) {
		const el = e.target,
			clearVal = el.dataset.phoneClear,
			pattern = el.dataset.phonePattern,
			matrix_def = '+7 (___) ___-__-__',
			matrix = pattern ? pattern : matrix_def,
			def = matrix.replace(/\D/g, '');
		let val = e.target.value.replace(/\D/g, ''); // Use let instead of const
		let i = 0;
		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = '';
				return;
			}
		}
		if (def.length >= val.length) val = def;
		e.target.value = matrix.replace(/./g, function (a) {
			return /[_\d]/.test(a) && i < val.length
				? val.charAt(i++)
				: i >= val.length
				? ''
				: a;
		});
	};

	const tel_inputs = document.querySelectorAll('input[type="tel"]');

	for (const elem of tel_inputs) {
		for (const ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, eventCallback);
		}

		elem.addEventListener('focus', function (e) {
			if (!e.target.value.startsWith('+7')) {
				e.target.value = '+7 ' + e.target.value;
			}
		});

		elem.addEventListener('keydown', function (e) {
			if (
				!/[\d]/.test(e.key) &&
				!['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(
					e.key,
				)
			) {
				e.preventDefault();
			}
		});
	}
});

// Ограничения для полей ввода кредитной карты
document.addEventListener('DOMContentLoaded', () => {
	[
		{ id: 'card-month', maxLength: 2, maxValue: 12 },
		{ id: 'card-year', maxLength: 2, minValue: 24, maxValue: 32 },
		{ id: 'card-cvv', maxLength: 3 },
	].forEach(({ id, maxLength, minValue, maxValue }) => {
		let input = document.getElementById(id);

		input.addEventListener('input', (e) => {
			let value = e.target.value.slice(0, maxLength);
			if (id === 'card-month' && value === '00') {
				value = '';
			}
			if (maxValue !== undefined && parseInt(value, 10) > maxValue) {
				value = maxValue.toString().slice(0, maxLength);
			}
			e.target.value = value;
		});

		if (id === 'card-month' || id === 'card-year') {
			input.addEventListener('blur', (e) => {
				let value = e.target.value;
				if (value.length === 1 && value !== '0') {
					value = '0' + value;
				}
				if (id === 'card-month' && value === '0') {
					value = '01';
				}
				if (id === 'card-year') {
					let intValue = parseInt(value, 10);
					if (intValue < minValue) {
						value = minValue.toString();
					}
				}
				e.target.value = value;
			});
		}
	});

	let cardNumberInput = document.getElementById('card-number');
	cardNumberInput.addEventListener('input', (e) => {
		let value = e.target.value.replace(/\D/g, '').slice(0, 16);
		e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
	});

	cardNumberInput.addEventListener('blur', (e) => {
		let value = e.target.value.replace(/\s+/g, '');
		if (value.length !== 16) {
			e.target.value = '';
		}
	});

	let cvvInput = document.getElementById('card-cvv');
	cvvInput.addEventListener('input', (e) => {
		e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
	});
});

// Отправка формы
const submitButton = document.querySelector('.order-form [type=submit]');
const requiredFields = document.querySelectorAll('.order-form [required]');
const customInputs = document.querySelectorAll('.custom-input');
const customCheckboxes = document.querySelectorAll('.custom-checkbox');
const customTextareas = document.querySelectorAll('.custom-textarea');

function inputError() {
    let errorFound = false;

    // Проверка обязательных полей формы
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        const correspondingCustomField = field.closest('.custom-input, .custom-checkbox, .custom-textarea');

        // Проверка текстовых полей (всех типов), включая textarea
		if ((field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') && field.value.trim() === '') {
            if (field.tagName === 'INPUT') {
                correspondingCustomField.classList.add('custom-input--error');
            } else if (field.tagName === 'TEXTAREA') {
                correspondingCustomField.classList.add('custom-textarea--error');
            }
            errorFound = true;
            break;
        }

        // Проверка чекбоксов
        if (field.tagName === 'INPUT' && field.type === 'checkbox' && !field.checked) {
            correspondingCustomField.classList.add('custom-checkbox--error');
            errorFound = true;
            break;
        }
    }

    if (errorFound) {
        submitButton.classList.add('btn--error');
        setTimeout(function() {
            submitButton.classList.remove('btn--error');
        }, 1000);
    }
}

requiredFields.forEach(function(field) {
    field.addEventListener('input', function() {
        const correspondingCustomField = field.closest('.custom-input, .custom-checkbox, .custom-textarea');
        correspondingCustomField.classList.remove('custom-input--error', 'custom-checkbox--error', 'custom-textarea--error');
    });
});

customTextareas.forEach(function(textarea) {
    textarea.addEventListener('input', function() {
        const correspondingCustomField = textarea.closest('.custom-textarea');
        correspondingCustomField.classList.remove('custom-textarea--error');
    });
});

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    inputError(); // Проверяем наличие ошибок в заполнении формы
    const errors = document.querySelectorAll('.custom-input--error, .custom-checkbox--error, .custom-textarea--error');
    if (errors.length === 0) { // Если ошибок нет
        submitButton.classList.add('btn__onclick'); // Добавляем класс для анимации клика на кнопке
        setTimeout(validate, 250); // Выполняем валидацию
    }
});

function validate() {
    setTimeout(function() {
        submitButton.classList.remove('btn__onclick'); // Удаляем класс для анимации клика
        submitButton.classList.add('btn__validate'); // Добавляем класс для анимации валидации
        setTimeout(callback, 450); // Выполняем колбэк
    }, 2000);
}

function callback() {
    setTimeout(function() {
        submitButton.classList.remove('btn__validate'); // Удаляем класс для анимации валидации
    }, 1000);
}
