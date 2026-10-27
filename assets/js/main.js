document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selectors ---
  // About
  const aboutLink = document.getElementById('about-link');
  const aboutOverlay = document.getElementById('about-overlay');
  const closeAbout = document.getElementById('close-about');

  // Shop
  const shopLink = document.getElementById('shop-link');
  const shopOverlay = document.getElementById('shop-overlay');
  const closeShop = document.getElementById('close-shop');

  // Home / Movies
  const moviesLink = document.getElementById('movies-link');
  const homeGalleryGrid = document.getElementById('home-gallery-grid');

  // Projects
  const projectLinks = document.querySelectorAll('.project-link');
  const projectOverlay = document.getElementById('project-overlay');
  const closeProjectBtn = document.getElementById('close-project');
  const projectTitle = document.getElementById('project-title');
  const projectImageGrid = document.getElementById('project-image-grid'); 

  // Lightbox
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeLightboxBtn = document.getElementById('close-lightbox');

  // --- Project Data Configuration ---
  const projectData = {
    movies: {
      title: "Movies",
      images: [
        "assets/img/Movies/The-Devil-Wears-Prada.webp",
        "assets/img/Movies/The-Drama.webp",
        "assets/img/Movies/Friday-the-13th.webp",
        "assets/img/Movies/Halloween.webp",
        "assets/img/Movies/Hocus-Pocus.webp",
        "assets/img/Movies/Moonrise-Kingdom.webp",
        "assets/img/Movies/Obsession.webp",
        "assets/img/Movies/Penelope.webp",
        "assets/img/Movies/Practical-Magic.webp",
        "assets/img/Movies/Pride-and-Prejudice.webp",
        "assets/img/Movies/Rear-Window.webp",
        "assets/img/Movies/Steel-Magnolias.webp",
        "assets/img/Movies/Stepmom.webp",
        "assets/img/Movies/Twilight.webp",
        "assets/img/Movies/Valley-of-the-Dolls.webp",
        "assets/img/Movies/The-Wailing.webp",
        "assets/img/Movies/When-Harry-Met-Sally.webp"
      ]
    },
  };

  // --- Populate Frontpage Movies Grid ---
  function renderHomeGallery() {
    homeGalleryGrid.innerHTML = '';
    projectData.movies.images.forEach(imgSrc => {
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      imgElement.alt = "Movie Illustration";
      homeGalleryGrid.appendChild(imgElement);
    });
  }

  // --- Work Modal ---
  function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    projectTitle.textContent = data.title;
    projectImageGrid.innerHTML = '';
    
    data.images.forEach(imgSrc => {
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      imgElement.alt = `${data.title} image`;
      projectImageGrid.appendChild(imgElement);
    });
    
    projectOverlay.classList.remove('hidden');
  }

  // --- Lightbox Functions ---
  function openLightbox(src) {
    lightboxImage.src = src;
    lightboxOverlay.classList.remove('hidden');
  }

  function closeLightbox() {
    lightboxOverlay.classList.add('hidden');
    lightboxImage.src = '';
  }

  // --- Event Listeners ---
  if (moviesLink) {
    moviesLink.addEventListener('click', (e) => {
      e.preventDefault();
      projectOverlay.classList.add('hidden');
      aboutOverlay.classList.add('hidden');
      shopOverlay.classList.add('hidden');
      closeLightbox();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Open Work modal
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openProject(link.getAttribute('data-project'));
    });
  });

  closeProjectBtn.addEventListener('click', () => {
    projectOverlay.classList.add('hidden');
    projectImageGrid.innerHTML = '';
  });

  // Open About overlay
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    aboutOverlay.classList.remove('hidden');
  });

  closeAbout.addEventListener('click', () => {
    aboutOverlay.classList.add('hidden');
  });

  // Open Shop overlay
  shopLink.addEventListener('click', (e) => {
    e.preventDefault();
    shopOverlay.classList.remove('hidden');
  });

  closeShop.addEventListener('click', () => {
    shopOverlay.classList.add('hidden');
  });

  // Lightbox click trigger: Frontpage Movies grid
  homeGalleryGrid.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      openLightbox(e.target.src);
    }
  });

  // Lightbox click trigger: Work modal grid
  projectImageGrid.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      openLightbox(e.target.src);
    }
  });

  closeLightboxBtn.addEventListener('click', closeLightbox);

  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });

  // Escape key routing
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!lightboxOverlay.classList.contains('hidden')) {
        closeLightbox();
      } else if (!projectOverlay.classList.contains('hidden')) {
        projectOverlay.classList.add('hidden');
      } else if (!aboutOverlay.classList.contains('hidden')) {
        aboutOverlay.classList.add('hidden');
      } else if (!shopOverlay.classList.contains('hidden')) {
        shopOverlay.classList.add('hidden');
      }
    }
  });

  // Initial call
  renderHomeGallery();
});