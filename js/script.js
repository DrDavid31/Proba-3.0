// Archivo: js/script.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // 1. Resaltar enlace activo
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // 2. Animación de entrada (fade-in + slide-up)
  body.classList.add("fade-enter");
  requestAnimationFrame(() => {
    body.classList.add("fade-enter-active");
  });
  body.addEventListener("transitionend", function handler(e) {
    if (e.propertyName === "opacity") {
      body.classList.remove("fade-enter", "fade-enter-active");
      body.removeEventListener("transitionend", handler);
    }
  });

  // 3. Interceptar clics en enlaces internos para animación de salida
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      // Ignorar anclas o enlaces externos
      if (!href.startsWith("#") && !href.startsWith("http")) {
        e.preventDefault();
        body.classList.add("fade-exit");
        requestAnimationFrame(() => {
          body.classList.add("fade-exit-active");
        });
        body.addEventListener("transitionend", function handler2(ev) {
          if (ev.propertyName === "opacity") {
            window.location.href = href;
            body.removeEventListener("transitionend", handler2);
          }
        });
      }
    });
  });
});

// 4. Manejar clic en el botón "volver arriba"
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

// 5. Zoom con seguimiento del mouse en imágenes del portafolio
document.querySelectorAll('.zoom-container img.zoomable').forEach(img => {
  img.addEventListener('mousemove', e => {
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  });
  img.addEventListener('mouseleave', () => {
    img.style.transformOrigin = '';
  });
});
