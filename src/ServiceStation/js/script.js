document.querySelector('.header__burger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('nav').classList.toggle('open');
})