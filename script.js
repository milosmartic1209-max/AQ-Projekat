// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');

    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', function() {
        const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        
        if (!isExpanded) {
            // Show menu - remove translate-x-full class
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            
            // Focus first menu item for keyboard navigation
            const firstMenuItem = mobileMenu.querySelector('a');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
        } else {
            // Hide menu - add translate-x-full class
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.focus();
        }
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.focus();
    });

    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = mobileNavToggle.contains(event.target);
        const isMenuOpen = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        
        if (!isClickInsideMenu && !isClickOnToggle && isMenuOpen) {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Escape key to close mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const isMenuOpen = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            if (isMenuOpen) {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                mobileNavToggle.focus();
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.hero, .guidance-section, .stats-section, .solutions-section, .services-grid, .journey-section, .testimonials-section, .contact-section').forEach(el => {
        el.classList.add('animate-hidden');
        observer.observe(el);
    });

    // Stats counter animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 40);
    }

    // Observe stats counters
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-section').forEach(section => {
        statsObserver.observe(section);
    });

    // Business Journey Timeline
    let currentStep = 0;
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineContents = document.querySelectorAll('.timeline-content');
    let journeyInterval;

    function showStep(stepIndex) {
        // Remove active class from all steps and contents
        timelineSteps.forEach(step => step.classList.remove('active'));
        timelineContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current step and content
        if (timelineSteps[stepIndex]) {
            timelineSteps[stepIndex].classList.add('active');
        }
        if (timelineContents[stepIndex]) {
            timelineContents[stepIndex].classList.add('active');
        }
    }

    function nextStep() {
        currentStep = (currentStep + 1) % timelineSteps.length;
        showStep(currentStep);
    }

    function startJourneyAnimation() {
        // Show first step
        showStep(currentStep);
        
        // Auto-advance every 3 seconds
        journeyInterval = setInterval(nextStep, 3000);
    }

    function stopJourneyAnimation() {
        if (journeyInterval) {
            clearInterval(journeyInterval);
        }
    }

    // Manual step clicking
    timelineSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            stopJourneyAnimation();
            currentStep = index;
            showStep(currentStep);
            
            // Restart auto-animation after 5 seconds
            setTimeout(startJourneyAnimation, 5000);
        });
    });

    // Start journey animation when section is visible
    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startJourneyAnimation();
            } else {
                stopJourneyAnimation();
            }
        });
    }, { threshold: 0.3 });

    const journeySection = document.querySelector('.journey-section');
    if (journeySection) {
        journeyObserver.observe(journeySection);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Molimo popunite sva polja.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Molimo unesite valjan email.');
                return;
            }
            
            // Show success message
            alert('Hvala vam! Vaša poruka je uspešno poslata. Kontaktiraćemo vas uskoro.');
            
            // Reset form
            contactForm.reset();
            
            // Here you would typically send the data to your server
            // fetch('/submit-contact', { method: 'POST', body: formData })
        });
    }

    // CTA button actions
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.scrollToServices = function() {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.callNow = function() {
        window.location.href = 'tel:+38267123456';
    };

    window.sendEmail = function() {
        window.location.href = 'mailto:info@aq-accounting.me';
    };

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Page load performance optimization
window.addEventListener('load', function() {
    // Remove any loading overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add loaded class to body for any CSS that needs it
    document.body.classList.add('loaded');
});
