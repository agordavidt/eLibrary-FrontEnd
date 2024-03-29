/**
 * image slider
 */

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list")
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector("scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumn drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;


    // Update thumb position on mouse save
      const handleMouseMove = () => {
      const deltaX = e.clientX - startX;
      const newThumPosition = thumbPosition + deltaX;

      const maxThumposition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;


      const boundedPosition = Math.max(0, Math.min(maxThumposition, newThumPosition));

      const scrollPosition = (boundedPosition / maxThumposition) * maxScrollLeft;

      scrollbarThumb.style.left = `${newThumPosition}px`;
      imageList.scrollLeft = scrollPosition;
    }

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

    }

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);


  })


  // Slide images according to the slide button clicks

  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      /**  clientWidth returns the viewable width of an element in pixels */
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behaviour: "smooth" });
    });
  });


  // Show or hide slide buttons based on scroll position

  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none": "flex";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none": "flex";

  }


  // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;


  };

  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition();
  });
}


window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);