const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.dropdown__select');
  const caret = dropdown.querySelector('.dropdown__caret');
  const menu = dropdown.querySelector('.dropdown__menu');
  const options = dropdown.querySelectorAll('.dropdown__menu li');
  const selected = dropdown.querySelector('.dropdown__selected');

  //Add a click event to the selected element
  select.addEventListener('click', () => {
    //Add clicked select styles to the selected element
    select.classList.toggle('dropdown__select-clicked');
    //Add the rotate styles to the caret element
    caret.classList.toggle('dropdown__caret-rotate');
    //Add the open styles to the menu element
    menu.classList.toggle('dropdown__menu-open');
  });

  options.forEach(option => {
    //Add a click event to the option element
    option.addEventListener('click', () => {
      //Change seleceted inner text to clicked option inner text
      selected.innerText = option.innerText;
      //Add the clicked select styles to the select element
      select.classList.remove('dropdown__select-clicked')
      //Add the rotae styles to the caret element
      caret.classList.remove('dropdown__caret-rotate');
      //Add the open styles to the menu element
      menu.classList.remove('dropdown__menu-open');
      //Remove active class for all option elements
      options.forEach(option => {
        option.classList.remove('dropdown__item-active');
      });
      //Add active class to clicked option element
      option.classList.add('dropdown__item-active');
    });
  });
});