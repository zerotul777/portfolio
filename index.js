// Swiper
const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	loop: true,
	pagination: {
		el: '.swiper-pagination',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	// autoplay: {
	// 	delay: 5000,
	// }
});

// message-form
emailjs.init('JhDjeuhAeoz9U0bK7');
document
	.getElementById('contactForm')
	.addEventListener('submit', function (event) {
		event.preventDefault();
		emailjs.sendForm('service_sryreze', 'template_rq3kk9a', this).then(
			function () {
				const popup = document.getElementById('popup');
				popup.classList.add('popup--open');
			},
			function (error) {
				alert('Soory, something is wrong(');
			},
		);
	});

// popup-close
document.querySelector('.popup__btn').addEventListener('click', function () {
	const popup = document.getElementById('popup');
	popup.classList.remove('popup--open');
});


// burger
const burger = document.querySelector('.burger');
const header = document.querySelector('.header');
const nav = document.querySelector('.header__nav');

burger.addEventListener('click', () => {
  header.classList.toggle('header--open');
});

// Добавляем обработчик события для nav
nav.addEventListener('click', () => {
  header.classList.remove('header--open');
});
