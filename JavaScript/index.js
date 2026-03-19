function openModal(imgElement) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "flex";
    modalImg.src = imgElement.src.replace("_kicsi", "_nagy");
  }
  
  function closeModal(event) {
    if (event) event.stopPropagation();
    document.getElementById("modal").style.display = "none";
  }
  
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  
  hamburger.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.style.maxHeight = navLinks.scrollHeight + "px";
      navLinks.style.transition =
        "max-height 0.45s cubic-bezier(0.22, 0.61, 0.36, 1)";
      requestAnimationFrame(() => {
        navLinks.style.maxHeight = "0px";
      });
      navLinks.addEventListener("transitionend", function handler() {
        navLinks.classList.remove("active");
        navLinks.style.maxHeight = "";
        navLinks.style.transition = "";
        navLinks.removeEventListener("transitionend", handler);
      });
    } else {
      navLinks.classList.add("active");
      navLinks.style.overflow = "hidden";
      navLinks.style.maxHeight = "0px";
      navLinks.style.transition =
        "max-height 0.45s cubic-bezier(0.22, 0.61, 0.36, 1)";
      requestAnimationFrame(() => {
        navLinks.style.maxHeight = navLinks.scrollHeight + "px";
      });
      navLinks.addEventListener("transitionend", function handler() {
        navLinks.style.maxHeight = "";
        navLinks.style.transition = "";
        navLinks.removeEventListener("transitionend", handler);
      });
    }
  });
  
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  
  window.scrollTo(0, 0);
  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
  });
  
  (function () {
    if ("fonts" in document) {
      Promise.all([
        document.fonts.load("400 1em NewCreation")
      ]).then(function () {
        document.documentElement.classList.add("fonts-ready");
      });
    }
  })();
  
  const openBtn = document.getElementById("openPlayer");
  const player = document.getElementById("musicPlayer");
  const closeBtn = document.querySelector(".close-player");
  const audio = document.getElementById("audio");
  const playPause = document.getElementById("playPause");
  const progressBar = document.getElementById("progressBar");
  const volumeBar = document.getElementById("volumeBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  
  openBtn.addEventListener("click", () => {
    player.classList.add("active");
    audio.play();
    playPause.textContent = "II";
  });
  
  closeBtn.addEventListener("click", () => {
    player.classList.remove("active");
    audio.pause();
  });
  
  playPause.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPause.textContent = "II";
    } else {
      audio.pause();
      playPause.textContent = "▶";
    }
  });
  
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });
  
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = audio.currentTime;
    progressBar.max = audio.duration;
    progressBar.style.setProperty("--progress", `${progress}%`);
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
  
  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });
  
  volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
    volumeBar.style.setProperty(
      "--progress",
      `${volumeBar.value * 100}%`
    );
  });
  
  function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }
  
  playPause.classList.toggle("pause");
  
  function hidePlayer() {
    player.style.transform = "translate(-50%, 150%)";
    player.style.opacity = "0";
    player.style.pointerEvents = "none";
  }
  
  function showPlayer() {
    player.style.transform = "translate(-50%, 0)";
    player.style.opacity = "1";
    player.style.pointerEvents = "auto";
  }
  
  function checkWindowSize() {
    if (window.innerWidth <= 600) {
      hidePlayer();
    } else {
      showPlayer();
    }
  }
  
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  
  player.addEventListener(
    "touchstart",
    (e) => {
      if (!player.classList.contains("active")) return;
      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      player.style.transition = "none";
    },
    { passive: true }
  );
  
  player.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        e.preventDefault();
        player.style.transform = `translate(-50%, ${deltaY}px)`;
        player.style.opacity = `${1 - deltaY / 300}`;
      }
    },
    { passive: false }
  );
  
  player.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
  
    const deltaY = currentY - startY;
    player.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  
    if (deltaY > 120) {
      player.classList.remove("active");
      audio.pause();
      setTimeout(() => {
        player.style.transform = "";
        player.style.opacity = "";
      }, 300);
    } else {
      player.style.transform = "";
      player.style.opacity = "";
    }
  });
  