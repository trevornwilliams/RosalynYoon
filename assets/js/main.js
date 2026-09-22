document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selectors ---
  const aboutLink = document.getElementById('about-link');
  const aboutOverlay = document.getElementById('about-overlay');
  const closeAbout = document.getElementById('close-about');

  const moviesLink = document.getElementById('movies-link');
  const homeGalleryGrid = document.getElementById('home-gallery-grid');

  const projectLinks = document.querySelectorAll('.project-link');
  const projectOverlay = document.getElementById('project-overlay');
  const closeProjectBtn = document.getElementById('close-project');
  const projectTitle = document.getElementById('project-title');
  const projectImageGrid = document.getElementById('project-image-grid'); 

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
        "assets/img/Movies/Legally-Blonde.webp",
        "assets/img/Movies/Moonrise-Kingdom.webp",
        "assets/img/Movies/Obsession.webp",
        "assets/img/Movies/Practical-Magic.webp",
        "assets/img/Movies/Rear-Window.webp",
        "assets/img/Movies/Steel-Magnolias.webp",
        "assets/img/Movies/Twilight.webp",
        "assets/img/Movies/Valley-of-the-Dolls.webp"
      ]
    },
    work: {
      title: "Work",
      images: [
        // Books
        "assets/img/Books/Books_01.webp", "assets/img/Books/Books_02.webp", "assets/img/Books/Books_04.webp", "assets/img/Books/Books_05.webp", "assets/img/Books/Books_06.webp",
        // Food
        "assets/img/Food/Food_01.webp", "assets/img/Food/Food_02.webp", "assets/img/Food/Food_03.webp", "assets/img/Food/Food_04.webp", "assets/img/Food/Food_05.webp", "assets/img/Food/Food_06.webp",
        // Soft Sculpture
        // "assets/img/Soft-Sculpture/Soft-Sculpture_01.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_02.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_03.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_04.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_05.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_06.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_07.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_08.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_09.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_10.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_11.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_12.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_13.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_14.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_15.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_16.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_17.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_18.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_19.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_20.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_21.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_22.webp",
        // Trevor & Rosalyn
        "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_01.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_02.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_03.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_04.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_05.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_06.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_07.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_08.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_09.webp",
        // Work / My Dog
        "assets/img/My-Dog-And-I/My-Dog-And-I_01.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_02.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_04.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_05.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_06.webp", "assets/img/Work/Work_01.webp", "assets/img/Work/Work_02.webp", "assets/img/Work/Work_03.webp", "assets/img/Work/Work_04.webp", "assets/img/Work/Work_05.webp", "assets/img/Work/Work_06.webp", "assets/img/Work/Work_07.webp", "assets/img/Work/Work_08.webp", "assets/img/Work/Work_09.webp", "assets/img/Work/Work_10.webp", "assets/img/Work/Work_11.webp", "assets/img/Work/Work_12.webp", "assets/img/Work/Work_13.webp", "assets/img/Work/Work_14.webp", "assets/img/Work/Work_15.webp", "assets/img/Work/Work_16.webp", "assets/img/Work/Work_17.webp", "assets/img/Work/Work_18.webp", "assets/img/Work/Work_19.webp", "assets/img/Work/Work_20.webp", "assets/img/Work/Work_21.webp", "assets/img/Work/Work_22.webp", "assets/img/Work/Work_23.webp", "assets/img/Work/Work_24.webp", "assets/img/Work/Work_25.webp"
      ]
    }
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
  moviesLink.addEventListener('click', (e) => {
    e.preventDefault();
    projectOverlay.classList.add('hidden');
    aboutOverlay.classList.add('hidden');
    closeLightbox();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!lightboxOverlay.classList.contains('hidden')) {
        closeLightbox();
      } else if (!projectOverlay.classList.contains('hidden')) {
        projectOverlay.classList.add('hidden');
      } else if (!aboutOverlay.classList.contains('hidden')) {
        aboutOverlay.classList.add('hidden');
      }
    }
  });

  // Initial call
  renderHomeGallery();
});