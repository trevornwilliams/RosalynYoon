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
      images: ["assets/img/work/Work_00.jpg"]
    },
    books: {
      title: "Books",
      images: ["assets/img/Books/Books_00.jpg", "assets/img/Books/Books_01.jpg", "assets/img/Books/Books_02.jpg", "assets/img/Books/Books_03.jpg", "assets/img/Books/Books_04.jpg", "assets/img/Books/Books_05.jpg"]
    },
    bestFriends: {
      title: "My Dog and I",
      images: ["assets/img/Best Friends/Best_Friends_01.jpg", "assets/img/Best Friends/Best_Friends_02.jpg", "assets/img/Best Friends/Best_Friends_03.jpg", "assets/img/Best Friends/Best_Friends_04.jpg", "assets/img/Best Friends/Best_Friends_05.jpg", "assets/img/Best Friends/Best_Friends_06.jpg"]
    },
    tandR: {
      title: "Trevor & Rosalyn",
      images: ["assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_00.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_01.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_02.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_03.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_04.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_05.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_06.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_07.jpg", "assets/img/Trevor-And-Rosalyn/Trevor-And-Rosalyn_08.jpg"] 
    },
    softSculpture: {
      title: "Soft Sculptures",
      images: ["assets/img/Soft Sculpture/Soft-Sculptures_01.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_02.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_03.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_04.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_05.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_06.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_07.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_08.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_09.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_10.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_11.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_12.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_13.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_14.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_15.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_16.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_17.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_18.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_19.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_20.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_21.jpg", "assets/img/Soft Sculpture/Soft-Sculptures_22.jpg"]
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