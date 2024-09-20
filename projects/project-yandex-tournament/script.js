// Бегущая строка
document.addEventListener('DOMContentLoaded', function () {
	const tickerLists = document.querySelectorAll('.ticker__list');
	tickerLists.forEach(function (tickerList) {
		const clone = tickerList.cloneNode(true);
		tickerList.closest('.ticker__wrapper').appendChild(clone);
	});
});

// Счетчик этапов
document.addEventListener('DOMContentLoaded', function () {
	var counters = document.querySelectorAll('.stage-card__counter');

	counters.forEach(function (counter, index) {
		counter.textContent = index + 1;
	});
});

// Карусели
const gap = 20;
const minWidth = 375;
const maxWidth = 728;

function createStagesCarousel() {
	document.addEventListener('DOMContentLoaded', function () {
		const stagesList = document.getElementById('stages-list');
		const stagesBtnPrev = document.getElementById('stages-btn-prev');
		const stagesBtnNext = document.getElementById('stages-btn-next');
		const stagesCounter = document.querySelector('.stages__counter');

		let totalItems = stagesList.children.length;
		let stagesCarouselElem = 1; // Количество элементов в карусели фиксированное
		let itemWidth = calculateItemWidth();
		let current = 0;

		// Создание счетчика
		const counterItems = [];
		for (let i = 0; i < totalItems; i++) {
			const counterItem = document.createElement('div');
			counterItem.classList.add('stages__counter-item');
			counterItems.push(counterItem);
			stagesCounter.appendChild(counterItem);
		}

		function calculateItemWidth() {
			const stagesListWidth = stagesList.clientWidth;

			// Если ширина родителя меньше 728px, рассчитываем ширину элемента
			if (stagesListWidth < maxWidth) {
				return (
					(stagesListWidth - gap * (stagesCarouselElem - 1)) /
					stagesCarouselElem
				);
			} else {
				// Ширина элемента по умолчанию (если ширина родителя больше 728px)
				return minWidth;
			}
		}

		function updateCarousel() {
			itemWidth = calculateItemWidth(); // Пересчитываем ширину элемента при обновлении

			for (let i = 0; i < totalItems; i++) {
				const stageItem = stagesList.children[i];
				if (stagesList.clientWidth < maxWidth) {
					stageItem.style.minWidth = itemWidth + 'px';
				} else {
					stageItem.style.minWidth = ''; // Убираем значение minWidth, если ширина родителя больше 728px
				}
			}
			stagesList.style.transform = `translateX(-${
				(itemWidth + gap) * current
			}px)`;
			updateCounterIndicator();
			updateNavButtons();
		}

		function updateCounterIndicator() {
			counterItems.forEach((item, index) => {
				item.classList.toggle(
					'stages__counter-item--active',
					index === current,
				);
			});
		}

		function updateNavButtons() {
			stagesBtnPrev.disabled = current === 0;
			stagesBtnNext.disabled = current >= totalItems - stagesCarouselElem;
		}

		function clickStagesBtnPrev() {
			if (current > 0) {
				current -= 1;
			}
			updateCarousel();
		}

		function clickStagesBtnNext() {
			if (current < totalItems - stagesCarouselElem) {
				current += 1;
			}
			updateCarousel();
		}

		stagesBtnPrev.addEventListener('click', clickStagesBtnPrev);
		stagesBtnNext.addEventListener('click', clickStagesBtnNext);

		window.addEventListener('resize', function () {
			updateCarousel(); // Обновляем карусель при изменении размера окна
		});

		updateCarousel();
	});
}

function createMembersCarousel() {
	document.addEventListener('DOMContentLoaded', function () {
		const membersCarousel = document.getElementById('members-list');
		const totalCounter = document.querySelector('.members__counter-total');
		const currentCounter = document.querySelector('.members__counter-current');
		const membersBtnLeft = document.getElementById('members-btn-prev');
		const membersBtnRight = document.getElementById('members-btn-next');

		let totalItems = membersCarousel.children.length;
		totalCounter.textContent = totalItems;

		let membersCarouselElem = 3;
		let itemWidth = calculateItemWidth();
		let current = 0;

		function calculateItemWidth() {
			let membersCarouselWidth = membersCarousel.clientWidth;

			if (membersCarouselWidth < 2 * (minWidth + gap)) {
				membersCarouselElem = 1;
			} else if (membersCarouselWidth < 3 * (minWidth + gap)) {
				membersCarouselElem = 2;
			} else {
				membersCarouselElem = 3;
			}
			return (
				(membersCarouselWidth - gap * (membersCarouselElem - 1)) /
				membersCarouselElem
			);
		}

		function updateCarousel() {
			itemWidth = calculateItemWidth(); // Пересчитываем ширину элемента при обновлении

			for (let i = 0; i < totalItems; i++) {
				membersCarousel.children[i].style.minWidth = itemWidth + 'px';
			}
			membersCarousel.style.transform = `translateX(-${
				(itemWidth + gap) * current
			}px)`;
			totalItems = membersCarousel.children.length;
			totalCounter.textContent = totalItems;
			updateCurrentCounter();
		}

		function updateCurrentCounter() {
			let lastIndex = Math.min(current + membersCarouselElem, totalItems);
			currentCounter.textContent = `${lastIndex}`;
		}

		function clickMembersBtnLeft() {
			current -= 1;
			if (current < 0) {
				current = totalItems - membersCarouselElem;
			}
			updateCurrentCounter();
			updateCarousel();
		}

		function clickMembersBtnRight() {
			current += 1;
			if (current > totalItems - membersCarouselElem) {
				current = 0;
			}
			updateCurrentCounter();
			updateCarousel();
		}

		membersBtnLeft.addEventListener('click', clickMembersBtnLeft);
		membersBtnRight.addEventListener('click', clickMembersBtnRight);

		setInterval(() => {
			clickMembersBtnRight();
		}, 4000);

		window.addEventListener('resize', function () {
			updateCarousel(); // Обновляем карусель при изменении размера окна
		});

		updateCarousel();
	});
}

createStagesCarousel();
createMembersCarousel();
