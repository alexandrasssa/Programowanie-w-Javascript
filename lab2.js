const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slideWidth = slides[0].clientWidth;
let slideIndex = 0;
let timerId;

// Set initial slide position
slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

// Go to specific slide
function goToSlide(index) {
  if (index < 0) {
    index = slides.length - 1;
  } else if (index >= slides.length) {
    index = 0;
  }
  document.querySelector('.slides').style.transform = `translateX(-${slideWidth * index}px)`;
  slideIndex = index;
  setActiveDot();
}

// Go to previous slide
function prevSlide() {
  goToSlide(slideIndex - 1);
}

// Go to next slide
function nextSlide() {
  goToSlide(slideIndex + 1);
}

// Set active dot
function setActiveDot() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[slideIndex].classList.add('active');
}

// Start automatic slideshow
function startSlideshow() {
  timerId = setInterval(() => {
    nextSlide();
  }, 5000);
}

// Stop automatic slideshow
function stopSlideshow() {
  clearInterval(timerId);
}

// Event listeners
prevBtn.addEventListener('click', () => {
  prevSlide();
  stopSlideshow();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  stopSlideshow();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    stopSlideshow();
  });
});