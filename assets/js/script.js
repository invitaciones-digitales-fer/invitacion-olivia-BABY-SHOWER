
/* ====== Countdown ====== */
const clock = document.getElementById('clock');
const eventDate = new Date('december 9, 2025 21:30:00').getTime();
const pad = n => n.toString().padStart(2, '0');

function updateClock() {
  const gap = eventDate - Date.now();
  const d = Math.floor(gap / 864e5);
  const h = Math.floor(gap / 36e5) % 24;
  const m = Math.floor(gap / 6e4) % 60;
  const s = Math.floor(gap / 1e3) % 60;

  clock.innerHTML = `
    <div><strong>${pad(d)}</strong><span>días</span></div>
    <div><strong>${pad(h)}</strong><span>horas</span></div>
    <div><strong>${pad(m)}</strong><span>min</span></div>
    <div><strong>${pad(s)}</strong><span>seg</span></div>`;
}

setInterval(updateClock, 1000); updateClock();

/* ====== Modal ====== */
const btnGift = document.getElementById('btnGift');
const modal = document.getElementById('modalRegalo');
const close = modal.querySelector('.modal__close');

btnGift.onclick = () => modal.style.display = 'flex';
close.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

/* ====== Scroll reveal para .fade-zoom ====== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-zoom').forEach(el => {
  observer.observe(el);
});
document.querySelectorAll('.fade-zoom, .fade-down').forEach(el => {
  observer.observe(el);
});




const music = document.getElementById('bg-music');
const enterBtn = document.getElementById('enter-button');
const overlay = document.getElementById('welcome');
const toggle = document.getElementById('music-toggle');
const toggleIcon = document.getElementById('music-icon');
let isPlaying = false;

// Cambiar icono
function updateMusicIcon() {
  toggle.classList.remove('playing', 'pulsing');

  if (isPlaying) {
    toggleIcon.setAttribute('src', 'assets/icons/icono-musica_play.png');
    toggleIcon.setAttribute('alt', 'Pause');
    toggle.classList.add('playing');
  } else {
    toggleIcon.setAttribute('src', 'assets/icons/icono-musica_stop.png');
    toggleIcon.setAttribute('alt', 'Play');
    toggle.classList.add('pulsing');
  }
}

// Entrar y reproducir
enterBtn.addEventListener('click', () => {
  overlay.classList.add('fade-out');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);

  if (music) {
    music.volume = 1;
    music.play().then(() => {
      isPlaying = true;
    }).catch(err => {
      console.log('Autoplay bloqueado:', err);
      isPlaying = false;
    }).finally(() => {
      updateMusicIcon();
    });
  }
});

// Toggle play/pause
toggle.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    music.onpause = () => {
      isPlaying = false;
      updateMusicIcon();
    };
  } else {
    music.play().then(() => {
      isPlaying = true;
      updateMusicIcon();
    }).catch(err => {
      console.log('Error al reproducir música:', err);
      isPlaying = false;
      updateMusicIcon();
    });
  }
});


// Pausar si se hace clic en enlaces que deben detener la música
document.querySelectorAll('.pause-music').forEach(link => {
  link.addEventListener('click', () => {
    if (!music.paused) {
      music.pause();
      isPlaying = false;
      updateMusicIcon();
    }
  });
});






/* ====== Galería modal ====== */
/* -------------- GALERÍA -------------- */
const galleryItems = document.querySelectorAll('.gallery__item');
const galleryModal = document.getElementById('galleryModal');
if (galleryItems.length && galleryModal) {
  const galleryImg = galleryModal.querySelector('.gallery-modal__img');
  const btnCloseGal = galleryModal.querySelector('.gallery-modal__close');
  const btnPrev = galleryModal.querySelector('.gallery-modal__prev');
  const btnNext = galleryModal.querySelector('.gallery-modal__next');

  let current = 0;

  const updateImg = () => {
    const pic = galleryItems[current].querySelector('img');
    galleryImg.src = pic.src;
    galleryImg.alt = pic.alt;
  };

  const openGal = i => {
    current = i;
    updateImg();
    galleryModal.classList.add('gallery-modal--active');
    document.body.style.overflow = 'hidden';
  };
  const closeGal = () => {
    galleryModal.classList.remove('gallery-modal--active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((btn, i) => btn.addEventListener('click', () => openGal(i)));
  btnCloseGal.addEventListener('click', closeGal);
  btnPrev.addEventListener('click', () => { current = (current - 1 + galleryItems.length) % galleryItems.length; updateImg(); });
  btnNext.addEventListener('click', () => { current = (current + 1) % galleryItems.length; updateImg(); });

  /* cerrar con ESC o clic fuera */
  window.addEventListener('keydown', e => {
    if (!galleryModal.classList.contains('gallery-modal--active')) return;
    if (e.key === 'Escape') closeGal();
    if (e.key === 'ArrowLeft') btnPrev.click();
    if (e.key === 'ArrowRight') btnNext.click();
  });
  galleryModal.addEventListener('click', e => {
    if (e.target === galleryModal) closeGal();
  });
}

/* -------------- DROPDOWN CALENDARIO -------------- */
const btnCalendar = document.getElementById('btnCalendar');
const calendarMenu = document.getElementById('calendarMenu');

if (btnCalendar && calendarMenu) {
  btnCalendar.addEventListener('click', () => {
    const isOpen = calendarMenu.style.display === 'flex';

    // Toggle display
    calendarMenu.style.display = isOpen ? 'none' : 'flex';

    // Toggle class to change style
    btnCalendar.classList.toggle('open', !isOpen);
  });
}

document.querySelector('.galeria__contenedor')?.classList.remove('hidden');
 






