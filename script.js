/* ============================================
   PORTFOLIO 2025 - DEV VERMA
   Optimized JavaScript - Lightweight Version
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize essential functionality only
    initNavbar();
    initCategoryNavigation();
    initModal();
    initSmoothScroll();
    initScrollAnimations();
});

/* ============================================
   CATEGORY NAVIGATION
   ============================================ */

function initCategoryNavigation() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryContainers = document.querySelectorAll('.gallery-container');

    if (categoryBtns.length === 0 || galleryContainers.length === 0) {
        return;
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Hide all gallery containers
            galleryContainers.forEach(container => {
                container.classList.remove('active');
            });

            // Show the selected gallery container
            const targetContainer = document.querySelector(`[data-category-content="${category}"]`);
            if (targetContainer) {
                targetContainer.classList.add('active');
            }
        });
    });
}

/* ============================================
   NAVIGATION BAR
   ============================================ */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ============================================
   MODAL FUNCTIONALITY
   ============================================ */

function initModal() {
    const modal = document.getElementById('imageModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!modal || !modalClose || !modalTitle || !modalImage) return;

    // Open modal on gallery item click
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const imageSrc = this.getAttribute('data-src') || this.querySelector('.item-image').src;

            modalTitle.textContent = title;
            modalImage.src = imageSrc;
            modalImage.alt = title;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImage.src = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        const items = Array.from(galleryItems);
        const currentSrc = modalImage.src;
        let currentIndex = items.findIndex(item => {
            const src = item.getAttribute('data-src') || item.querySelector('.item-image').src;
            return src === currentSrc;
        });

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % items.length;
            const nextItem = items[currentIndex];
            modalImage.src = nextItem.getAttribute('data-src') || nextItem.querySelector('.item-image').src;
            modalTitle.textContent = nextItem.getAttribute('data-title');
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            const prevItem = items[currentIndex];
            modalImage.src = prevItem.getAttribute('data-src') || prevItem.querySelector('.item-image').src;
            modalTitle.textContent = prevItem.getAttribute('data-title');
        }
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS (Lightweight)
   ============================================ */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe animatable elements
    const elements = document.querySelectorAll(
        '.section-title, .gallery-item, .about-tile, .contact-card, .timeline-item, .software-item, .skill-tag'
    );
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/* ============================================
   PAGE LOAD
   ============================================ */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('Portfolio 2025 - Dev Verma | Optimized Version Loaded');
