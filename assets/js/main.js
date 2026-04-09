document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selectors ---
  const aboutLink = document.getElementById('about-link');
  const aboutOverlay = document.getElementById('about-overlay');
  const closeAbout = document.getElementById('close-about');
  const logoContainer = document.getElementById('logo-container');
  const logoImg = document.getElementById('logo-img');

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
    work: {
      title: "Work",
      images: []
    },
    books: {
      title: "Books",
      images: ["assets/img/Books/Books_00.jpg", "assets/img/Books/Books_01.jpg", "assets/img/Books/Books_02.jpg", "assets/img/Books/Books_03.jpg", "assets/img/Books/Books_04.jpg", "assets/img/Books/Books_05.jpg"]
    },
    bestFriends: {
      title: "Best Friends",
      images: ["assets/img/Best Friends/Best_Friends_01.jpg", "assets/img/Best Friends/Best_Friends_02.jpg", "assets/img/Best Friends/Best_Friends_03.jpg", "assets/img/Best Friends/Best_Friends_04.jpg", "assets/img/Best Friends/Best_Friends_05.jpg"]
    },
    tandR: {
      title: "Trevor & Rosalyn",
      images: ["assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_00.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_01.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_02.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_03.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_04.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_05.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_06.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_07.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_08.jpg"] 
    },
    softSculpture: {
      title: "Soft Sculpture",
      images: []
    }
  };

  // --- Functions ---
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
    
    logoContainer.style.display = 'none';
    projectOverlay.classList.remove('hidden');
  }

  // --- Event Listeners: About ---
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    logoContainer.style.display = 'none';
    aboutOverlay.classList.remove('hidden');
  });

  logoImg.addEventListener('click', (e) => {
    e.preventDefault();
    if (aboutOverlay.classList.contains('hidden')) {
      logoContainer.style.display = 'none';
      aboutOverlay.classList.remove('hidden');
    } else {
      logoContainer.style.display = 'flex';
      aboutOverlay.classList.add('hidden');
    }
  });

  closeAbout.addEventListener('click', () => {
    logoContainer.style.display = 'flex';
    aboutOverlay.classList.add('hidden');
  });

  // --- Event Listeners: Projects ---
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = link.getAttribute('data-project');
      openProject(projectId);
    });
  });

  closeProjectBtn.addEventListener('click', () => {
    projectOverlay.classList.add('hidden');
    logoContainer.style.display = 'flex'; 
    projectImageGrid.innerHTML = ''; // Clear the grid when closed
  });

  // --- Event Listeners: Lightbox ---  
  projectImageGrid.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      lightboxImage.src = e.target.src; // Copy the image source
      lightboxOverlay.classList.remove('hidden'); // Show the lightbox
    }
  });

  function closeLightbox() {
    lightboxOverlay.classList.add('hidden');
    lightboxImage.src = ""; // Clear the image
  }

  closeLightboxBtn.addEventListener('click', closeLightbox);

  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });

}); // <-- Everything must stay safely inside this final closing bracket!