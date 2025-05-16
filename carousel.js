document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.projects-carousel');
  const slides = document.querySelectorAll('.project-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  let currentSlide = 0;
  let dots = [];

  // Initialize dots and carousel height
  function initializeCarousel() {
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create new dots
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
    
    // Set initial active dot
    dots[0].classList.add('active');
    updateCarouselHeight();
    updateCarousel();
  }

  function updateCarouselHeight() {
    const slideHeight = slides[0].offsetHeight;
    carousel.style.height = `${slideHeight * slides.length}px`;
  }

  function updateCarousel() {
    const slideHeight = slides[0].offsetHeight;
    carousel.style.transform = `translateY(-${currentSlide * slideHeight}px)`;
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }

  // Event listeners
  document.querySelector('.carousel-nav.next').addEventListener('click', nextSlide);
  document.querySelector('.carousel-nav.prev').addEventListener('click', prevSlide);
  window.addEventListener('resize', () => {
    updateCarouselHeight();
    updateCarousel();
  });

  // Initialize the carousel
  initializeCarousel();
});