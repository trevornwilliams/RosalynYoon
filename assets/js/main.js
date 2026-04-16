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
      images: ["assets/img/Work/Work_01.webp", "assets/img/Work/Work_02.webp", "assets/img/Work/Work_03.webp", "assets/img/Work/Work_04.webp"]
    },
    books: {
      title: "Books",
      images: ["assets/img/Books/Books_01.webp", "assets/img/Books/Books_02.webp", "assets/img/Books/Books_03.webp", "assets/img/Books/Books_04.webp", "assets/img/Books/Books_05.webp", "assets/img/Books/Books_06.webp"]
    },
    bestFriends: {
      title: "My Dog and I",
      images: ["assets/img/My-Dog-And-I/My-Dog-And-I_01.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_02.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_03.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_04.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_05.webp", "assets/img/My-Dog-And-I/My-Dog-And-I_06.webp"]
    },
    tandR: {
      title: "Trevor & Rosalyn",
      images: ["assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_01.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_02.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_03.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_04.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_05.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_06.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_07.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_08.webp", "assets/img/Trevor-and-Rosalyn/Trevor-and-Rosalyn_09.webp"]
    },
    softSculpture: {
      title: "Soft Sculpture",
      images: ["assets/img/Soft-Sculpture/Soft-Sculpture_01.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_02.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_03.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_04.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_05.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_06.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_07.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_08.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_09.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_10.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_11.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_12.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_13.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_14.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_15.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_16.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_17.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_18.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_19.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_20.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_21.webp", "assets/img/Soft-Sculpture/Soft-Sculpture_22.webp"]
    }
  };

  // --- Functions ---
  function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    projectTitle.textContent = data.title;
    
    projectImageGrid.innerHTML = '';

    if (data.images.length < 3) {
      projectImageGrid.classList.add('few-images');
    } else {
      projectImageGrid.classList.remove('few-images');
    }
    
    data.images.forEach(imgSrc => {
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      imgElement.alt = `${data.title} image`;
      projectImageGrid.appendChild(imgElement);
    });
    
    logoContainer.style.display = 'none';
    projectOverlay.classList.remove('hidden');
  }

  // --- Event Listeners: Dropdown ---
  const dropBtn = document.querySelector('.dropbtn');
  if (dropBtn) {
    dropBtn.addEventListener('click', (e) => {
      e.preventDefault();
    });
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
    projectImageGrid.innerHTML = '';
  });

  // --- Event Listeners: Lightbox ---  
  projectImageGrid.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      lightboxImage.src = e.target.src;
      lightboxOverlay.classList.remove('hidden');
    }
  });

  function closeLightbox() {
    lightboxOverlay.classList.add('hidden');
    lightboxImage.src = "";
  }

  closeLightboxBtn.addEventListener('click', closeLightbox);

  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });

}); 