const modal = document.querySelector('.modal');

document.querySelectorAll('.menu-tours__btn-mobile, .menu-tours__btn').forEach(button => {
  button.addEventListener('click', () => modal?.classList.add('modal--active'));
});

const userFormBtn = document.querySelector('.user-form__btn');
userFormBtn.addEventListener('click', () => {
  modal?.classList.add('modal--success');
  modal?.classList.remove('modal--active');
});

document.getElementById('success-page-btn').addEventListener('click', () => {
  modal?.classList.remove('modal--success');
});

document.querySelector('.modal__close-btn')?.addEventListener('click', () => {
  modal?.classList.remove('modal--active', 'modal--success');
});

const menuToursLinks = document.querySelectorAll('.menu-tours__link');

menuToursLinks.forEach(link => {
  link.addEventListener('click', () => {
    link.classList.toggle('menu-tours__link--active');
  });
});
