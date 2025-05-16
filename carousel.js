document.addEventListener('DOMContentLoaded', () => {
  // Theme System
  let currentTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', currentTheme);

  document.getElementById('themeBtn').addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  });

  // Carousel Logic
  const carousel = document.querySelector('.projects-carousel');
  const slides = document.querySelectorAll('.project-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  let currentSlide = 0;
  let dots = [];

  function initializeCarousel() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
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
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
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

  // Language System
  const translations = {
    en: {
      tagline: "Backend Developer | APIs • Databases • Cloud",
      aboutTitle: "About Me",
      aboutText: "I'm a backend developer with expertise in building scalable systems (mainly in Java), designing databases, and creating RESTful APIs. Currently familiarizing myself with distributed architectures and microservices.",
      skillsTitle: "Skills",
      projectsTitle: "Projects",
      project1Title: "Authorization API",
      project1Desc: "A REST API for Authorization using JWT. Built over Spring Authorization Server using Spring WebFlux, PostgreSQL and Redis for session management and device fingerprinting.",
      project2Title: "JWT Validator",
      project2Desc: "A small Java wrapper library meant to avoid code repetition in microservices.",
      contactTitle: "Contact",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn"
    },
    es: {
      tagline: "Desarrollador Backend | APIs • Bases de Datos • Nube",
      aboutTitle: "Acerca de Mi",
      aboutText: "Soy desarrollador backend con experiencia en construcción de sistemas escalables (principalmente en Java), diseño de bases de datos y creación de APIs REST. Actualmente aprendiendo sobre arquitecturas distribuidas y microservicios.",
      skillsTitle: "Habilidades",
      projectsTitle: "Proyectos",
      project1Title: "API de Autorización",
      project1Desc: "API REST para autorización usando JWT. Construida usando Spring Authorization Server con Spring WebFlux, PostgreSQL y Redis para gestión de sesiones y huella digital de dispositivos.",
      project2Title: "Validador JWT",
      project2Desc: "Librería Java para evitar repetición de código en microservicios.",
      contactTitle: "Contacto",
      email: "Correo",
      github: "GitHub",
      linkedin: "LinkedIn"
    }
  };

  let currentLang = localStorage.getItem('lang') || 'en';

  function updateContent() {
    Object.entries(translations[currentLang]).forEach(([key, value]) => {
      document.querySelectorAll(`[data-translate="${key}"]`).forEach(element => {
        element.textContent = value;
      });
    });
  }

  document.getElementById('languageBtn').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', currentLang);
    updateContent();
  });

  // Initialize
  initializeCarousel();
  updateContent();
  document.querySelector('.carousel-nav.next').addEventListener('click', nextSlide);
  document.querySelector('.carousel-nav.prev').addEventListener('click', prevSlide);
  window.addEventListener('resize', () => {
    updateCarouselHeight();
    updateCarousel();
  });
});