document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const closeNavToggle = document.getElementById('close-nav-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('#mobile-nav-menu [data-close-menu]');

    const toggleMobileMenu = () => {
        mobileNavMenu.classList.toggle('translate-x-full');
        mobileNavMenu.classList.toggle('active'); // For custom CSS transition
        mobileMenuOverlay.classList.toggle('hidden');
        mobileMenuOverlay.classList.toggle('active'); // For custom CSS transition
        document.body.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
    };

    navToggle.addEventListener('click', toggleMobileMenu);
    closeNavToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu); // Close on overlay click

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            toggleMobileMenu();
            // Smooth scroll to section (optional, can be handled by CSS scroll-smooth on html)
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Hero Carousel ---
    const carousel = document.getElementById('hero-carousel');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const slides = Array.from(carousel.children); // Get all direct children (image divs)
    let currentIndex = 0;
    let slideInterval; // For auto-play

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicatorsContainer.innerHTML = ''; // Clear existing indicators
        slides.forEach((_, index) => {
            const button = document.createElement('button');
            button.classList.add('carousel-indicator'); // Apply Tailwind-based style
            if (index === currentIndex) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetAutoPlay();
            });
            indicatorsContainer.appendChild(button);
        });
    }

    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function startAutoPlay() {
        slideInterval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    prevBtn.addEventListener('click', () => {
        goToPrevSlide();
        resetAutoPlay();
    });
    nextBtn.addEventListener('click', () => {
        goToNextSlide();
        resetAutoPlay();
    });

    // Initialize carousel
    updateCarousel();
    startAutoPlay();

    // --- Tabbed Interface ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabContentContainer = document.getElementById('tab-content'); // Parent for panes

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tab;

            // Remove active classes from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active', 'text-blue-400', 'border-blue-400'));
            tabButtons.forEach(btn => btn.classList.add('text-gray-300', 'border-transparent', 'hover:text-blue-400'));

            // Add active class to clicked button
            button.classList.add('active', 'text-blue-400', 'border-blue-400');
            button.classList.remove('text-gray-300', 'border-transparent');


            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.add('hidden'));

            // Show the target tab pane
            document.getElementById(targetTabId).classList.remove('hidden');
        });
    });

    // Set initial active tab
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }

    // --- ScrollReveal Animations ---
    // Initialize ScrollReveal
    ScrollReveal().reveal('.reveal-bottom', {
        distance: '50px',
        opacity: 0,
        duration: 1000,
        easing: 'ease-out',
        origin: 'bottom',
        interval: 150, // Stagger animations for multiple items (e.g., cards)
        viewFactor: 0.2 // Trigger when 20% of element is in view
    });

    // You might define different reveal effects for different elements
    ScrollReveal().reveal('.card-item', {
        distance: '30px',
        opacity: 0,
        duration: 800,
        easing: 'ease-out',
        interval: 100, // Stagger card animations
        origin: 'bottom',
        viewFactor: 0.2
    });


    // --- Set current year in footer ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Smooth scroll for fixed header offset ---
    // This part is mainly for if you click a link that goes to the current page.
    // CSS scroll-smooth on the HTML tag usually handles it, but this is a JS fallback/enhancement.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight; // Get dynamic nav height
                const offsetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});