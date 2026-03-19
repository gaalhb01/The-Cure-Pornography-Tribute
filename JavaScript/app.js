function openModalFromImage(img) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  if (!modal || !modalImg) return;
  modalImg.src = img.src;
  modalImg.alt = img.alt || '';
  modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('open');
}

window.openModal = openModalFromImage;
window.closeModal = closeModal;

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.classList.toggle('active');

      const isOpen = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-open-modal="true"]').forEach(img => {
    img.addEventListener('click', () => openModalFromImage(img));
  });

  const modal = document.getElementById('modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;

  reveals.forEach(el => io ? io.observe(el) : el.classList.add('show'));

  const openBtn = document.getElementById('openPlayer');
  const player = document.getElementById('musicPlayer');
  const closeBtn = document.querySelector('.close-player');
  const audio = document.getElementById('audio');
  const playPause = document.getElementById('playPause');
  const progressBar = document.getElementById('progressBar');
  const volumeBar = document.getElementById('volumeBar');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');

  const formatTime = (sec) => {
    if (!Number.isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (openBtn && player && audio) {
    openBtn.addEventListener('click', () => {
      player.classList.add('active');
      audio.play().catch(() => {});
      if (playPause) playPause.textContent = '❚❚';
    });
  }

  if (closeBtn && player && audio) {
    closeBtn.addEventListener('click', () => {
      player.classList.remove('active');
      audio.pause();
    });
  }

  if (playPause && audio) {
    playPause.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {});
        playPause.textContent = '❚❚';
      } else {
        audio.pause();
        playPause.textContent = '▶';
      }
    });
  }

  if (audio && progressBar && currentTimeEl && durationEl) {
    audio.addEventListener('loadedmetadata', () => {
      progressBar.max = Math.floor(audio.duration || 0);
      durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      progressBar.value = Math.floor(audio.currentTime || 0);
      currentTimeEl.textContent = formatTime(audio.currentTime);
      if (playPause) playPause.textContent = audio.paused ? '▶' : '❚❚';
    });

    progressBar.addEventListener('input', () => {
      audio.currentTime = Number(progressBar.value);
    });
  }

  if (volumeBar && audio) {
    volumeBar.addEventListener('input', () => {
      audio.volume = Number(volumeBar.value);
    });
  }
});

