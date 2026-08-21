// ===== Mobile Nav Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Navbar Background on Scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.borderBottomColor = 'var(--border-light)';
  } else {
    navbar.style.borderBottomColor = 'var(--border)';
  }
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.skill-row, .project-card, .info-block, .contact-row').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Add staggered delay to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Add staggered delay to skill rows
document.querySelectorAll('.skill-row').forEach((row, index) => {
  row.style.transitionDelay = `${index * 0.08}s`;
});

// Add staggered delay to info blocks
document.querySelectorAll('.info-block').forEach((block, index) => {
  block.style.transitionDelay = `${index * 0.12}s`;
});

// CSS class for revealed state
const style = document.createElement('style');
style.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;
  const message = document.getElementById('formMessage').value;

  // Placeholder — replace with actual form submission logic
  const btn = document.getElementById('formSubmit');
  const originalText = btn.innerHTML;
  btn.innerHTML = '✓ Sent!';
  btn.style.background = '#22c55e';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 2000);
});

// ===== Typing Effect for Code Block =====
const codeBlock = document.querySelector('.code-block code');
if (codeBlock) {
  const html = codeBlock.innerHTML;
  codeBlock.innerHTML = '';
  codeBlock.style.visibility = 'visible';

  let i = 0;
  const chars = [];
  // Parse HTML to extract characters while preserving tags
  let inTag = false;
  let currentTag = '';

  for (let c = 0; c < html.length; c++) {
    if (html[c] === '<') {
      inTag = true;
      currentTag = '<';
    } else if (html[c] === '>' && inTag) {
      inTag = false;
      currentTag += '>';
      chars.push(currentTag);
      currentTag = '';
    } else if (inTag) {
      currentTag += html[c];
    } else {
      chars.push(html[c]);
    }
  }

  let charIndex = 0;
  let content = '';

  function typeChar() {
    if (charIndex < chars.length) {
      const char = chars[charIndex];
      content += char;
      codeBlock.innerHTML = content;
      charIndex++;

      // Tags render instantly, regular chars have delay
      if (char.startsWith('<')) {
        typeChar();
      } else {
        setTimeout(typeChar, 12);
      }
    }
  }

  // Start typing after a short delay
  setTimeout(typeChar, 800);
}

// ===== Scroll Buttons for Info Sections =====
document.querySelectorAll('.scroll-wrapper').forEach(wrapper => {
  const track = wrapper.querySelector('.scroll-track');
  const leftBtn = wrapper.querySelector('.scroll-btn-left');
  const rightBtn = wrapper.querySelector('.scroll-btn-right');
  const scrollAmount = 320;

  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});

// ===== Image Preview Modal =====
const previewModal = document.getElementById('previewModal');
const previewOverlay = document.getElementById('previewOverlay');
const previewClose = document.getElementById('previewClose');
const previewImage = document.getElementById('previewImage');
const previewCaption = document.getElementById('previewCaption');

function openPreview(imageSrc, captionText) {
  previewImage.src = imageSrc;
  previewCaption.textContent = captionText || '';
  previewModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  previewModal.classList.remove('active');
  document.body.style.overflow = '';
  // Clear src after transition to avoid flash on next open
  setTimeout(() => {
    previewImage.src = '';
    previewCaption.textContent = '';
  }, 350);
}

// Attach click handlers to all preview buttons
document.querySelectorAll('.preview-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const imageSrc = btn.getAttribute('data-preview');

    // Derive caption from the parent context
    let caption = '';
    const infoCard = btn.closest('.info-card');
    const certItem = btn.closest('.skill-tag');

    if (infoCard) {
      const title = infoCard.querySelector('.info-card-title');
      const subtitle = infoCard.querySelector('.info-card-subtitle');
      caption = title ? title.textContent : '';
      if (subtitle) caption += ' — ' + subtitle.textContent;
    } else if (certItem) {
      const strong = certItem.querySelector('strong');
      caption = strong ? strong.parentElement.textContent.trim().split('\n')[0] : '';
    }

    openPreview(imageSrc, caption);
  });
});

// Close on overlay click
previewOverlay.addEventListener('click', closePreview);

// Close on X button
previewClose.addEventListener('click', closePreview);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && previewModal.classList.contains('active')) {
    closePreview();
  }
});
