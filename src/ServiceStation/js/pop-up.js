document.querySelector(".booking-header__book-btn").addEventListener("click", function() {
  document.querySelector(".pop-up-section").classList.add("active");
});

document.querySelector(".pop-up-header__close-btn").addEventListener("click", function() {
  document.querySelector(".pop-up-section").classList.remove("active");
});