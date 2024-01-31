'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");

  });

}



/**
 * header sticky functionality
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 20 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 800 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});



/**
 * image slider
 */

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list")
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;


  // Slide images according to the slide button clicks

  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      /**  clientWidth returns the viewable width of an element in pixels */
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behaviour: "smooth" });
    });
  });

  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none": "block";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none": "block";

  }

  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
  });
}

window.addEventListener("load", initSlider);