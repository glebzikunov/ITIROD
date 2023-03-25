const popUpDropdowns = document.querySelectorAll('.pop-up-dropdown');

popUpDropdowns.forEach(dropdown => {
  const popUpSelect = dropdown.querySelector('.pop-up-dropdown__select');
  const popUpCaret = dropdown.querySelector('.pop-up-dropdown__caret');
  const popUpMenu = dropdown.querySelector('.pop-up-dropdown__menu');
  const popUpOptions = dropdown.querySelectorAll('.pop-up-dropdown__menu li');
  const popUpSelected = dropdown.querySelector('.pop-up-dropdown__selected');

  //Add a click event to the selected element
  popUpSelect.addEventListener('click', () => {
    //Add clicked select styles to the selected element
    popUpSelect.classList.toggle('pop-up-dropdown__select-clicked');
    //Add the rotate styles to the caret element
    popUpCaret.classList.toggle('pop-up-dropdown__caret-rotate');
    //Add the open styles to the menu element
    popUpMenu.classList.toggle('pop-up-dropdown__menu-open');
  });

  popUpOptions.forEach(option => {
    //Add a click event to the option element
    option.addEventListener('click', () => {
      //Change seleceted inner text to clicked option inner text
      popUpSelected.innerText = option.innerText;
      //Add the clicked select styles to the select element
      popUpSelect.classList.remove('pop-up-dropdown__select-clicked')
      //Add the rotae styles to the caret element
      popUpCaret.classList.remove('pop-up-dropdown__caret-rotate');
      //Add the open styles to the menu element
      popUpMenu.classList.remove('pop-up-dropdown__menu-open');
      //Remove active class for all option elements
      popUpOptions.forEach(option => {
        option.classList.remove('pop-up-dropdown__item-active');
      });
      //Add active class to clicked option element
      option.classList.add('pop-up-dropdown__item-active');
    });
  });
});