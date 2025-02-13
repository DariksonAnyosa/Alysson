document.addEventListener('DOMContentLoaded', function() {
  // ---------------------------
  // NAVEGACIÓN ENTRE SECCIONES
  // ---------------------------
  const sections = {
    bienvenida: document.getElementById('section-bienvenida'),
    fechas: document.getElementById('section-fechas'),
    diario: document.getElementById('section-diario'),
    suenos: document.getElementById('section-suenos'),
    final: document.getElementById('section-final')
  };

  const btnEmpezar         = document.getElementById('btn-empezar');
  const btnFechasSiguiente   = document.getElementById('btn-fechas-siguiente');
  const btnDiarioSiguiente   = document.getElementById('btn-diario-siguiente');
  const btnSuenosSiguiente   = document.getElementById('btn-suenos-siguiente');
  const btnReiniciar       = document.getElementById('btn-reiniciar');

  function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    section.classList.add('active');
    section.scrollIntoView({ behavior: 'smooth' });
  }

  btnEmpezar.addEventListener('click', () => showSection(sections.fechas));
  btnFechasSiguiente.addEventListener('click', () => showSection(sections.diario));
  btnDiarioSiguiente.addEventListener('click', () => showSection(sections.suenos));
  btnSuenosSiguiente.addEventListener('click', () => showSection(sections.final));
  btnReiniciar.addEventListener('click', () => showSection(sections.bienvenida));

  // ---------------------------
  // POPUP PARA AMPLIAR IMÁGENES
  // ---------------------------
  const popup = document.getElementById('popup');
  const popupImage = popup.querySelector('img');
  const popupMessage = document.getElementById('popup-message');
  const closePopup = document.getElementById('close-popup');

  function abrirPopup(e) {
    if (e.target.tagName === 'IMG') {
      const imgSrc = e.target.getAttribute('src');
      const message = e.target.getAttribute('data-message');
      popupImage.setAttribute('src', imgSrc);
      popupMessage.textContent = message;
      popup.style.display = 'block';
    }
  }

  const carouselTrack = document.querySelector('.carousel-track');
  carouselTrack.addEventListener('click', abrirPopup);
  const gridGallery = document.querySelector('.grid-gallery');
  gridGallery.addEventListener('click', abrirPopup);
  closePopup.addEventListener('click', () => popup.style.display = 'none');

  // ---------------------------
  // CARRUSEL DE IMÁGENES (FLEX)
  // ---------------------------
  window.onload = function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);
    let currentSlide = 0;

    function updateSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${100 * currentSlide}%)`;
    }

    function updateDots(oldDot, newDot) {
      oldDot.classList.remove('current-slide');
      newDot.classList.add('current-slide');
    }

    nextButton.addEventListener('click', () => {
      const oldDot = dots[currentSlide];
      updateSlide(currentSlide + 1);
      const newDot = dots[currentSlide];
      updateDots(oldDot, newDot);
    });

    prevButton.addEventListener('click', () => {
      const oldDot = dots[currentSlide];
      updateSlide(currentSlide - 1);
      const newDot = dots[currentSlide];
      updateDots(oldDot, newDot);
    });

    dotsNav.addEventListener('click', e => {
      if (!e.target.classList.contains('carousel-indicator')) return;
      const oldDot = dots[currentSlide];
      const targetIndex = dots.indexOf(e.target);
      updateSlide(targetIndex);
      const newDot = dots[currentSlide];
      updateDots(oldDot, newDot);
    });

    updateSlide(0);
  };

  // ---------------------------
  // DETALLE ONE PIECE: Modal Pirata para el Sombrero
  // ---------------------------
  const luffyHat = document.getElementById('luffy-hat');
  const pirateModal = document.getElementById('pirate-modal');
  const pirateClose = document.getElementById('pirate-close');
  const pirateNext = document.getElementById('pirate-next');
  const pirateStep1 = document.getElementById('pirate-content-step1');
  const pirateStep2 = document.getElementById('pirate-content-step2');
  const pirateClose2 = document.getElementById('pirate-close2');
  const pirateShowPhoto = document.getElementById('pirate-show-photo');
  const pirateFinalPhoto = document.getElementById('pirate-final-photo');
  const pirateCloseButton = document.getElementById('pirate-close-button');

  luffyHat.addEventListener('click', () => {
    pirateModal.style.display = 'block';
    pirateStep1.style.display = 'block';
    pirateStep2.style.display = 'none';
  });

  pirateClose.addEventListener('click', () => {
    pirateModal.style.display = 'none';
  });

  pirateNext.addEventListener('click', () => {
    pirateStep1.style.display = 'none';
    pirateStep2.style.display = 'block';
  });

  pirateClose2.addEventListener('click', () => {
    pirateModal.style.display = 'none';
  });

  pirateShowPhoto.addEventListener('click', () => {
    pirateFinalPhoto.style.display = 'block';
    pirateCloseButton.style.display = 'inline-block';
    pirateShowPhoto.style.display = 'none';
  });

  pirateCloseButton.addEventListener('click', () => {
    pirateModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === pirateModal) {
      pirateModal.style.display = 'none';
    }
  });

  // ---------------------------
  // Reproducir audio automáticamente
  // ---------------------------
  window.addEventListener('load', () => {
    const myAudio = document.getElementById('myAudio');
    myAudio.play().catch(error => {
      console.log("El auto-play fue bloqueado:", error);
      document.getElementById('btnPlayAudio').style.display = 'block';
    });
  });

  const btnPlayAudio = document.getElementById('btnPlayAudio');
  btnPlayAudio.addEventListener('click', () => {
    const myAudio = document.getElementById('myAudio');
    myAudio.play();
    btnPlayAudio.style.display = 'none';
  });

  // ---------------------------
  // (Opcional) GSAP para animar el título de bienvenida
  // ---------------------------
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from("#section-bienvenida h1", {
      duration: 1.5,
      y: 50,
      opacity: 0,
      scrollTrigger: "#section-bienvenida"
    });
  }
});