// ================================
// AQ ACCOUNTING - SIMPLE VANILLA JS
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🔍 Initializing Mobile-Optimized Vanilla JS system...');
    
    // Detect mobile device for optimized animations
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    console.log('📱 Mobile device detected:', isMobile);
    
    // Add mobile-specific CSS optimizations
    if (isMobile) {
        addMobileOptimizations();
    }
    
    // Hide all animation elements initially
    hideAnimationElements();
    
    // Initialize only basic content animations
    setTimeout(() => {
        initMobileOptimizedAnimations(isMobile);
    }, 100);
    
    // Mobile menu functionality
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');

    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', function() {
        const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        
        if (!isExpanded) {
            // Show menu
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            
            const firstMenuItem = mobileMenu.querySelector('a');
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        } else {
            // Hide menu
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        });
    }

    // Close mobile menu when clicking links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const isMenuOpen = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            if (isMenuOpen) {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                mobileNavToggle.focus();
            }
        }
    });

    // Initialize modal functionality
    initModal();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize CTA buttons
    initCTAButtons();
    
    // Initialize timeline animations
    initTimelineAnimation();
    
    // Initialize counters
    initCounters();
});

// 🎯 HIDE ANIMATION ELEMENTS INITIALLY
function hideAnimationElements() {
    console.log('🎯 Hiding animation elements initially...');
    
    // Find all sections that will be animated
    const animateSections = document.querySelectorAll('.animate-section');
    
    animateSections.forEach(section => {
        const contentElements = section.querySelectorAll('h1, h2, h3, p, .grid, .flex, .space-y-8, .max-w-7xl, .service-card, .timeline-step, .testimonial-card');
        
        contentElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
        });
    });
    
    console.log('✅ Animation elements hidden for', animateSections.length, 'sections');
}

// 📱 MOBILE CSS OPTIMIZATIONS
function addMobileOptimizations() {
    console.log('📱 Adding mobile-specific CSS optimizations...');
    
    // Create style element for mobile optimizations
    const mobileCSS = document.createElement('style');
    mobileCSS.textContent = `
        /* Mobile animation optimizations */
        * {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-perspective: 1000;
            perspective: 1000;
        }
        
        /* Reduce motion for mobile performance */
        .animate-section * {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
        }
        
        /* Optimize transitions for mobile */
        .timeline-step,
        .service-card,
        .testimonial-card {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            will-change: auto;
        }
        
        /* Disable hover effects on mobile */
        .service-card:hover,
        .btn:hover,
        .cta-button:hover {
            transform: none !important;
        }
    `;
    document.head.appendChild(mobileCSS);
}

// 🎯 MOBILE-OPTIMIZED VANILLA JS SCROLL ANIMATIONS
function initMobileOptimizedAnimations(isMobile) {
    console.log('🎬 Initializing mobile-optimized animations...');
    
    const sections = document.querySelectorAll('.animate-section');
    console.log(`🔍 Found ${sections.length} sections to animate`);
    
    if (sections.length === 0) {
        console.warn('⚠️ No sections found with .animate-section class');
        return;
    }

    const observerOptions = {
        threshold: isMobile ? 0.1 : 0.15, // Lower threshold on mobile
        rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -80px 0px' // Earlier trigger on mobile
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const contentElements = entry.target.querySelectorAll('h1, h2, h3, p, .grid, .flex, .space-y-8, .max-w-7xl, .service-card, .timeline-step, .testimonial-card');
                
                if (isMobile) {
                    // MOBILE: Manual animation với shorter stagger
                    contentElements.forEach((element, index) => {
                        setTimeout(() => {
                            startMobileFadeIn(element);
                        }, index * 100 + 150); // Longer stagger for visibility
                    });
                } else {
                    // DESKTOP: Full stagger animation
                    contentElements.forEach((element, index) => {
                        setTimeout(() => {
                            startDesktopFadeIn(element);
                        }, index * 75 + 100);
                    });
                }
                
                console.log('✨ Optimized animation for', contentElements.length, 'elements (mobile:', isMobile, ')');
            }
        });
    }, observerOptions);

    // Initially hide content elements with device-specific setup
    sections.forEach(section => {
        const contentElements = section.querySelectorAll('h1, h2, h3, p, .grid, .flex, .space-y-8, .max-w-7xl, .service-card, .timeline-step, .testimonial-card');
        
        contentElements.forEach(element => {
            if (isMobile) {
                // MOBILE: Setup for manual animation - no CSS transitions
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.backfaceVisibility = 'hidden'; // Mobile optimization
                // NO CSS transitions - using manual requestAnimationFrame
            } else {
                // DESKTOP: CSS transitions
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease-out';
            }
        });
        
        scrollObserver.observe(section);
    });
    
    console.log(`👀 Observing ${sections.length} sections with mobile optimization:`, isMobile);
}

function startMobileFadeIn(element) {
    // MOBILE: Manual animation using requestAnimationFrame za guaranteed smoothness
    const startTime = Date.now();
    const duration = 500; // 0.5 seconds
    const startOpacity = 0;
    const startTranslateY = 20;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        // Apply values
        element.style.opacity = startOpacity + (1 - startOpacity) * easeOut;
        element.style.transform = `translateY(${startTranslateY - (startTranslateY * easeOut)}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation complete - clean up
            element.style.opacity = '1';
            element.style.transform = 'translateY(0px)';
            element.style.willChange = 'auto';
            console.log('📱 Mobile animation completed for element');
        }
    }
    
    // Start animation
    element.style.willChange = 'opacity, transform';
    requestAnimationFrame(animate);
}

function startDesktopFadeIn(element) {
    // Desktop animation with full effects
    element.style.opacity = '1';
    element.style.transform = 'translateY(0px)';
}

// VANILLA JS Counter animation bez anime.js
function animateVanillaCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 120; // 120 frames za smooth animation (2 seconds at 60fps)
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out expo easing equivalent
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        current = target * easedProgress;
        element.textContent = Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// 🎯 SCROLL-LOCKED TIMELINE ANIMATION - SPOTLIGHT STYLE
function initTimelineAnimation() {
    console.log('🔧 Starting initTimelineAnimation...');
    
    const journeySection = document.querySelector('#journey');
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const progressBar = document.getElementById('journeyProgress');
    
    console.log('🔍 Found journey section:', !!journeySection);
    console.log('🔍 Found timeline steps:', timelineSteps.length);
    console.log('🔍 Found progress bar:', !!progressBar);
    
    if (!journeySection || timelineSteps.length === 0) {
        console.log('❌ Missing required elements for timeline');
        return;
    }
    
    let currentStep = 0;
    let isScrollLocked = false;
    let isStepTransitioning = false; // Prevent rapid step changes
    let lastScrollTime = 0;
    let journeyCompleted = false; // Track if all steps are done
    const STEP_DELAY = 1200; // 1.2 seconds delay between steps
    
    console.log('✅ Initializing scroll-locked timeline with', timelineSteps.length, 'steps');
    
    // Add CSS for spotlight effect
    const spotlightCSS = document.createElement('style');
    spotlightCSS.textContent = `
        .timeline-step {
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
            cursor: default !important;
            pointer-events: none !important;
        }
        .timeline-step.spotlight-active {
            opacity: 1 !important;
            transform: translateY(0px) scale(1) !important;
            filter: brightness(1) saturate(1) !important;
        }
        .timeline-step.spotlight-completed {
            opacity: 1 !important;
            transform: translateY(0px) scale(1) !important;
            filter: brightness(1) saturate(1) !important;
        }
        .timeline-step.spotlight-future {
            opacity: 0.3 !important;
            transform: translateY(20px) scale(0.95) !important;
            filter: brightness(0.7) saturate(0.6) !important;
        }
        /* Remove any hover effects */
        .timeline-step:hover {
            transform: none !important;
            box-shadow: none !important;
        }
        /* Override default active class to prevent blue flash */
        .timeline-step.active {
            border-color: transparent !important;
            background: white !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
        }
        /* Disable text selection during timeline */
        #journey.scroll-locked {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
    `;
    document.head.appendChild(spotlightCSS);
    
    // Initialize all steps
    timelineSteps.forEach((step, index) => {
        if (index === 0) {
            step.classList.add('spotlight-active');
            step.classList.remove('active');
        } else {
            step.classList.add('spotlight-future');
            step.classList.remove('active');
        }
    });
    
    function updateTimelineStep(stepIndex) {
        console.log('🔄 Updating to step:', stepIndex + 1, '/', timelineSteps.length);
        
        // Set transitioning state
        isStepTransitioning = true;
        
        timelineSteps.forEach((step, index) => {
            // Remove all spotlight classes
            step.classList.remove('spotlight-active', 'spotlight-completed', 'spotlight-future');
            
            if (index === stepIndex) {
                // Active step
                step.classList.add('spotlight-active');
                // Remove active class to prevent blue flash
                step.classList.remove('active');
            } else if (index < stepIndex) {
                // Completed steps
                step.classList.add('spotlight-completed');
                step.classList.remove('active');
            } else {
                // Future steps
                step.classList.add('spotlight-future');
                step.classList.remove('active');
            }
        });
        
        // Update progress bar
        if (progressBar) {
            const progress = ((stepIndex + 1) / timelineSteps.length) * 100;
            progressBar.style.width = progress + '%';
            console.log('📊 Progress bar updated to:', progress + '%');
        }
        
        // Clear transitioning state after animation completes
        setTimeout(() => {
            isStepTransitioning = false;
            console.log('✅ Step transition completed - ready for next scroll');
        }, STEP_DELAY);
    }
    
    // Scroll event listener for timeline control
    function handleTimelineScroll(event) {
        if (!isScrollLocked) return;
        
        event.preventDefault();
        event.stopPropagation();
        
        // Block all scrolling if currently transitioning
        if (isStepTransitioning) {
            console.log('⏳ Please wait - step transition in progress...');
            return;
        }
        
        const currentTime = Date.now();
        
        // Additional throttle check for extra safety
        if (currentTime - lastScrollTime < STEP_DELAY) {
            console.log('⏳ Scroll blocked - wait for', Math.round((STEP_DELAY - (currentTime - lastScrollTime)) / 100) / 10, 'more seconds');
            return;
        }
        
        const delta = event.deltaY;
        console.log('🖱️ Scroll detected - delta:', delta, 'Current step:', currentStep + 1);
        
        if (delta > 0 && currentStep < timelineSteps.length - 1) {
            // Scroll down - next step
            lastScrollTime = currentTime;
            currentStep++;
            updateTimelineStep(currentStep);
            console.log('➡️ Advancing to step:', currentStep + 1, '- Next scroll available in', STEP_DELAY/1000, 'seconds');
            
            // Complete journey on last step
            if (currentStep === timelineSteps.length - 1) {
                setTimeout(() => {
                    journeyCompleted = true;
                    
                    // Make all steps completed (no spotlight)
                    timelineSteps.forEach(step => {
                        step.classList.remove('spotlight-active', 'spotlight-completed', 'spotlight-future');
                        step.classList.add('spotlight-completed');
                        step.classList.remove('active');
                    });
                    
                    // Keep progress bar at 100%
                    if (progressBar) {
                        progressBar.style.width = '100%';
                    }
                    
                    // Unlock scroll to allow going to other sections
                    isScrollLocked = false;
                    document.body.style.overflow = 'auto';
                    journeySection.classList.remove('scroll-locked');
                    window.removeEventListener('wheel', handleTimelineScroll);
                    
                    console.log('🏁 Journey COMPLETED! All steps completed, scroll unlocked for navigation');
                }, STEP_DELAY + 800); // Extra delay for final step
            }
            
        } else if (delta < 0 && currentStep > 0 && !journeyCompleted) {
            // Block backward scroll through timeline steps
            console.log('🚫 Cannot go back through timeline steps - journey must progress forward only');
        } else {
            if (delta > 0) {
                if (journeyCompleted) {
                    console.log('✅ Journey completed - scroll freely to other sections');
                } else {
                    console.log('🏁 Reaching final step - completing journey...');
                }
            } else {
                if (journeyCompleted) {
                    console.log('✅ Journey completed - scroll freely to other sections');
                } else {
                    console.log('🚫 Already at first step - cannot go back further');
                }
            }
        }
    }
    
    // Intersection observer to trigger scroll lock
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('👁️ Journey section intersection:', entry.intersectionRatio);
            
            if (entry.isIntersecting && entry.intersectionRatio > 0.62) {
                if (!isScrollLocked && !journeyCompleted) {
                    // Log viewport info for debugging
                    console.log('📐 VIEWPORT INFO:');
                    console.log('   Window height:', window.innerHeight + 'px');
                    console.log('   Window width:', window.innerWidth + 'px');
                    console.log('   Current scroll Y:', window.scrollY + 'px');
                    
                    // Scroll to better position to show steps and progress bar
                    const journeyRect = journeySection.getBoundingClientRect();
                    const targetScroll = window.scrollY + journeyRect.top;
                    
                    console.log('📍 JOURNEY SECTION INFO:');
                    console.log('   Journey top from viewport:', journeyRect.top + 'px');
                    console.log('   Journey height:', journeyRect.height + 'px');
                    console.log('   Target scroll position:', targetScroll + 'px');
                    console.log('   Journey will be at:', (targetScroll + journeyRect.top) + 'px from top');
                    
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        isScrollLocked = true;
                        currentStep = 0;
                        updateTimelineStep(currentStep);
                        document.body.style.overflow = 'hidden';
                        journeySection.classList.add('scroll-locked');
                        
                        // Add scroll listener
                        window.addEventListener('wheel', handleTimelineScroll, { passive: false });
                        
                        console.log('🔒 Timeline scroll LOCKED - journey begins at optimal position!');
                    }, 300); // Wait for smooth scroll to complete
                }
            }
        });
    }, {
    threshold: [0.1, 0.2, 0.3, 0.5, 0.6, 0.62, 0.7, 0.9],
    rootMargin: '0px'
    });
    
    timelineObserver.observe(journeySection);
    console.log('👁️ Observer attached to journey section');
    
    // Backup observer for fast scrolling - triggers earlier
    const fastScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.55 && !isScrollLocked && !journeyCompleted) {
                console.log('⚡ Fast scroll detected - preparing timeline lock...');
                // Pre-position and prepare for lock
                const journeyRect = journeySection.getBoundingClientRect();
                if (journeyRect.top < window.innerHeight * 0.7) {
                    console.log('⚡ Fast scroll backup - activating timeline (fluid)');
                    // Smooth positioning
                    const targetScroll = window.scrollY + journeyRect.top;
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                    // Immediate lock
                    isScrollLocked = true;
                    currentStep = 0;
                    updateTimelineStep(currentStep);
                    document.body.style.overflow = 'hidden';
                    journeySection.classList.add('scroll-locked');
                    window.addEventListener('wheel', handleTimelineScroll, { passive: false });
                    console.log('⚡ EMERGENCY TIMELINE LOCK activated for fast scroll!');
                }
            }
        });
    }, {
        threshold: [0.55, 0.62, 0.7],
        rootMargin: '0px'
    });
    fastScrollObserver.observe(journeySection);
    
    // Emergency unlock with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isScrollLocked) {
            isScrollLocked = false;
            document.body.style.overflow = 'auto';
            journeySection.classList.remove('scroll-locked');
            window.removeEventListener('wheel', handleTimelineScroll);
            console.log('🆘 Emergency unlock with Escape key');
        }
    });
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                alert('Hvala vam! Vaša poruka je poslana. Kontaktiraćemo vas uskoro.');
                this.reset();
            } else {
                alert('Molim vas popunite sva polja.');
            }
        });
    }
}

// CTA buttons
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Kontaktirajte nas na +382 67 123 456 ili office@aq-accounting.me');
            }
        });
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('serviceModal');
    const closeModal = document.getElementById('closeModal');
    
    if (modal && closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }
}

// Initialize counters when they come into view
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateVanillaCounter(entry.target); // Use vanilla counter
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}
