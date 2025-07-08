let player;

// Esta función la llama automáticamente la API de YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'tgbNymZ7vqY', // Tu ID de video de YouTube
    playerVars: {
      controls: 1,
      modestbranding: 1,
      rel: 0,
      enablejsapi: 1
    }
  });
}

// Función para moverse entre secciones y pausar video si no está en inicio
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });

    // Pausar el video de fondo si salimos de la home
    const video = document.getElementById('video-container_3');
    if (video && typeof video.pause === 'function') {
      if (id !== 'home') {
        video.pause();
      } else {
        video.play();
      }
    }
  }
}


function moveCarousel(direction) {
  const track = document.getElementById('videoCarousel');
  const videos = document.querySelectorAll('.carousel-video');
  const totalVideos = videos.length;

  // Pausar el video actual antes de cambiar
  if (videos[currentIndex] && typeof videos[currentIndex].pause === 'function') {
    videos[currentIndex].pause();
  }

  currentIndex += direction;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= totalVideos) currentIndex = totalVideos - 1;

  const offset = videos[0].offsetWidth * currentIndex;
  track.style.transform = `translateX(-${offset}px)`;

  // Mostrar u ocultar flechas
  document.getElementById('prevBtn').style.display = currentIndex > 0 ? 'block' : 'none';
  document.getElementById('nextBtn').style.display = currentIndex < totalVideos - 1 ? 'block' : 'none';
}


window.addEventListener('load', () => {
  moveCarousel(0); // Mostrar correctamente desde el inicio
});

document.getElementById("chatbot-toggle").addEventListener("click", () => {
  document.getElementById("chatbot-window").classList.toggle("hidden");
});

document.getElementById("close-chat").addEventListener("click", () => {
  document.getElementById("chatbot-window").classList.add("hidden");
});

window.addEventListener('scroll', () => {
  const section = document.querySelector('.seccion-historias');
  const scrollY = window.scrollY;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
    const scrollProgress = Math.min(1, (scrollY + window.innerHeight - sectionTop) / sectionHeight);
    const moveY = scrollProgress * 200; // Ajusta el número para más o menos desplazamiento
    section.style.backgroundPosition = `center ${moveY}px`;
  }
});
const historias = document.querySelector('.seccion-historias');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    historias.classList.add('animate-drip');
  }
}, { threshold: 0.5 });

observer.observe(historias);

// Permitir cerrar el modal al hacer clic fuera del contenido
document.querySelectorAll('.historia-modal').forEach(modal => {
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

