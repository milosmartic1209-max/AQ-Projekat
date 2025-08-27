// Language switching functionality
let currentLanguage = 'me'; // Default language

// Embedded translations (fallback for file:// protocol)
const translations = {
    me: {
        nav: {
            home: 'Početna',
            services: 'Usluge',
            journey: 'Put',
            clients: 'Klijenti',
            contact: 'Kontakt'
        },
        hero: {
            badge: 'Profesionalno Knjigovodstvo',
            title: 'Pouzdani Partner',
            titleAccent: 'Za Vaš Biznis',
            description1: 'AQ Accounting pruža kompletne knjigovodstvene usluge i biznis konsalting za preduzeća u Crnoj Gori.',
            description2: 'Naš tim iskusnih stručnjaka pomaže vašem biznisu da raste kroz profesionalno finansijsko upravljanje.',
            cta: 'Besplatna Konsultacija'
        }
    },
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            journey: 'Journey',
            clients: 'Clients',
            contact: 'Contact'
        },
        hero: {
            badge: 'Professional Accounting',
            title: 'Trusted Partner',
            titleAccent: 'For Your Business',
            description1: 'AQ Accounting provides complete accounting services and business consulting for companies in Montenegro.',
            description2: 'Our team of experienced professionals helps your business grow through professional financial management.',
            cta: 'Free Consultation'
        }
    }
};

// Try to load external JSON files, fallback to embedded translations
async function loadTranslations() {
    try {
        // Only try to load from server if not on file:// protocol
        if (window.location.protocol !== 'file:') {
            const [meResponse, enResponse] = await Promise.all([
                fetch('./locales/me.json'),
                fetch('./locales/en.json')
            ]);
            
            if (meResponse.ok && enResponse.ok) {
                translations.me = await meResponse.json();
                translations.en = await enResponse.json();
            }
        }
    } catch (error) {
        console.log('Using embedded translations (fallback)');
    }
    
    // Initialize language after translations are ready
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'me';
    setLanguage(savedLanguage);
}

function setLanguage(lang) {
    currentLanguage = lang;
    updateContent();
    updateLanguageSelectors();
    localStorage.setItem('preferredLanguage', lang);
}

function updateContent() {
    const t = translations[currentLanguage];
    if (!t) return;
    
    console.log('Updating content to:', currentLanguage); // Debug log
    
    // Update navigation
    updateNavigation(t);
    
    // Update hero section
    updateHeroSection(t);
}

function updateNavigation(t) {
    try {
        // Desktop navigation - target the main nav links
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        if (navLinks.length >= 5) {
            navLinks[0].textContent = t.nav.home;
            navLinks[1].textContent = t.nav.services;
            navLinks[2].textContent = t.nav.journey;
            navLinks[3].textContent = t.nav.clients;
            navLinks[4].textContent = t.nav.contact;
        }
        
        // Mobile navigation - target mobile menu links
        const mobileLinks = document.querySelectorAll('#mobileMenu a[href^="#"]');
        if (mobileLinks.length >= 5) {
            mobileLinks[0].textContent = t.nav.home;
            mobileLinks[1].textContent = t.nav.services;
            mobileLinks[2].textContent = t.nav.journey;
            mobileLinks[3].textContent = t.nav.clients;
            mobileLinks[4].textContent = t.nav.contact;
        }
    } catch (error) {
        console.error('Error updating navigation:', error);
    }
}

function updateHeroSection(t) {
    try {
        // Hero badge - first span with specific classes
        const badge = document.querySelector('.bg-blue-100.text-blue-800 span, .bg-blue-100.text-blue-800');
        if (badge) {
            badge.textContent = t.hero.badge;
        }
        
        // Hero title - find h1 in hero section
        const title = document.querySelector('#home h1, section h1');
        if (title) {
            title.innerHTML = `${t.hero.title}<br><span class="text-[#0F74BC]">${t.hero.titleAccent}</span>`;
        }
        
        // Hero descriptions - find paragraphs in hero section
        const paragraphs = document.querySelectorAll('#home p, section p');
        let descIndex = 0;
        for (let p of paragraphs) {
            if (descIndex === 0 && p.textContent.includes('AQ Accounting')) {
                p.textContent = t.hero.description1;
                descIndex++;
            } else if (descIndex === 1 && p.textContent.includes('tim')) {
                p.textContent = t.hero.description2;
                break;
            }
        }
        
        // CTA button - find button in hero section
        const button = document.querySelector('#home button, section button');
        if (button && button.textContent.includes('Konsultacija')) {
            button.textContent = t.hero.cta;
        }
    } catch (error) {
        console.error('Error updating hero section:', error);
    }
}

function updateGuidanceSection(t) {
    // Implementation for guidance section
    // Will be added based on HTML structure
}

function updateStatsSection(t) {
    // Implementation for stats section
    // Will be added based on HTML structure
}

function updateSolutionsSection(t) {
    // Implementation for solutions section
    // Will be added based on HTML structure
}

function updateServicesSection(t) {
    // Implementation for services section
    // Will be added based on HTML structure
}

function updateJourneySection(t) {
    // Implementation for journey section
    // Will be added based on HTML structure
}

function updateTestimonialsSection(t) {
    // Implementation for testimonials section
    // Will be added based on HTML structure
}

function updateContactSection(t) {
    // Implementation for contact section
    // Will be added based on HTML structure
}

function updateFooter(t) {
    // Implementation for footer section
    // Will be added based on HTML structure
}

function updateLanguageSelectors() {
    // Update desktop language selector
    document.getElementById('currentLang').textContent = currentLanguage.toUpperCase();
    
    // Update mobile language selector
    const mobileME = document.getElementById('mobileLangME');
    const mobileEN = document.getElementById('mobileLangEN');
    
    if (currentLanguage === 'me') {
        mobileME.className = 'px-3 py-1 text-sm rounded bg-blue-600 text-white';
        mobileEN.className = 'px-3 py-1 text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300';
    } else {
        mobileEN.className = 'px-3 py-1 text-sm rounded bg-blue-600 text-white';
        mobileME.className = 'px-3 py-1 text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing translations...'); // Debug
    
    // Load translations first
    loadTranslations();
    
    // Language dropdown functionality
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageDropdown.classList.add('hidden');
        });
    }

    // Add window.setLanguage for debugging
    window.setLanguage = setLanguage;
    window.testTranslation = function() {
        console.log('Current language:', currentLanguage);
        console.log('Translations:', translations);
        updateContent();
    };

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
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.focus();
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.focus();
        }
    });

    // Parallax stacking effect for sections
    function initParallaxStacking() {
        // Disable on small screens or reduced motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (window.innerWidth <= 768 || prefersReduced) return;
        const stackSections = document.querySelectorAll('.stack-section:not(.first)'); // Exclude first section
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20% 0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                const ratio = entry.intersectionRatio;
                
                if (entry.isIntersecting) {
                    // Suptilan parallax efekat na osnovu scroll pozicije
                    const transform = `translateY(${(1 - ratio) * 5}px) scale(${0.98 + ratio * 0.02})`;
                    const opacity = 0.85 + ratio * 0.15;
                    
                    section.style.transform = transform;
                    section.style.opacity = opacity;
                    
                    // bez dodatnih senki na mobilnom
                } else {
                    // Reset transformacije kada sekcija nije vidljiva
                    section.style.transform = '';
                    section.style.opacity = '';
                    section.style.boxShadow = '';
                }
            });
        }, observerOptions);

        stackSections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize parallax stacking
    initParallaxStacking();

    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize the page
    console.log('AQ Accounting website loaded successfully');

    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            switch(buttonText) {
                case 'Besplatna Konsultacija':
                    alert('Kontakt forma za besplatnu konsultaciju će se otvoriti ovde');
                    break;
                case 'Zakažite Razgovor':
                    alert('Kalendar za zakazivanje razgovora će se otvoriti ovde');
                    break;
                case 'Počnite Danas':
                    alert('Forma za početak saradnje će se otvoriti ovde');
                    break;
                default:
                    alert('Akcija: ' + buttonText);
            }
        });
    });

    // Business Journey Scroll-Based Animation with Scroll Lock
    function initJourneyAnimation() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth <= 768;
        // On mobile or reduced motion, replace scroll lock with simple highlight behavior
        if (isMobile || prefersReduced) {
            // Simple active state on intersection (mobile already handled below)
            return; // Skip heavy scroll-lock logic entirely
        }
        const steps = document.querySelectorAll('.timeline-step');
        const progressFill = document.getElementById('journeyProgress');
        const journeySection = document.querySelector('#journey');
        let currentStep = -1; // Start from -1 so first activation becomes step 0
        let journeyCompleted = false;
        let journeyPermanentlyCompleted = false; // NEW: Track permanent completion
        let isScrollLocked = false;
        let scrollAccumulator = 0;
        const scrollThreshold = 30; // Lower threshold for easier triggering
        let isProcessingStep = false; // Prevent rapid step changes
        let lastScrollTime = 0;
        const scrollCooldown = 800; // INCREASED: Minimum time between step changes (ms)
        let stepLockTimeout = null; // Timeout for forced step lock

        function animateStep(stepIndex) {
            if (stepIndex < steps.length && stepIndex !== currentStep && stepIndex >= 0 && !isProcessingStep && !journeyPermanentlyCompleted) {
                isProcessingStep = true;
                console.log(`Animating step from ${currentStep} to ${stepIndex}`);
                
                // Remove active styles from all steps
                steps.forEach(step => {
                    step.classList.remove('journey-active', 'bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'border-2', 'border-blue-300', 'scale-105');
                    step.classList.add('bg-white');
                });
                
                // Add active styles to current step
                if (steps[stepIndex]) {
                    steps[stepIndex].classList.remove('bg-white');
                    steps[stepIndex].classList.add('journey-active');
                }
                
                // Update progress bar
                const progressPercent = ((stepIndex + 1) / steps.length) * 100;
                progressFill.style.width = progressPercent + '%';
                
                currentStep = stepIndex;
                
                // Check if journey is completed (reached final step)
                if (stepIndex === steps.length - 1) {
                    console.log('Journey PERMANENTLY completed!');
                    journeyCompleted = true;
                    journeyPermanentlyCompleted = true; // PERMANENT completion
                    
                    // Delay unlock by 5s before disabling all future interactions
                    setTimeout(() => {
                        isScrollLocked = false;
                        console.log('Scroll unlocked after 1s delay - journey permanently done');
                    }, 1000);
                    
                    // Keep step 5 active and progress bar full FOREVER
                    steps[stepIndex].classList.add('active');
                    progressFill.style.width = '100%';
                    
                    return; // Exit early, no more processing needed
                }
                
                // FORCED LOCK: Release processing lock after longer delay (only if not permanently completed)
                clearTimeout(stepLockTimeout);
                stepLockTimeout = setTimeout(() => {
                    isProcessingStep = false;
                    console.log('Step lock released');
                }, scrollCooldown);
            }
        }

        function handleJourneyScroll(event) {
            if (!journeySection) return;
            
            const rect = journeySection.getBoundingClientRect();
            const currentTime = Date.now();
            
            // Better scroll lock positioning - activate when section is more centered
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;
            
            // Activate scroll lock when section title is visible and steps are in view
            const isInJourneyZone = rect.top <= 100 && rect.bottom >= viewportHeight * 0.4;
            
            if (isInJourneyZone) {
                // If permanently completed but still in delay period, block scrolling
                if (journeyPermanentlyCompleted && isScrollLocked) {
                    event.preventDefault();
                    return; // Block scroll during delay period
                }
                
                // If permanently completed and delay passed, allow normal scrolling
                if (journeyPermanentlyCompleted) {
                    return; // Journey is done forever, ignore all scrolls
                }
                
                // Allow scroll up if user is scrolling up (negative deltaY)
                if (event.deltaY < 0) {
                    // Allow upward scroll without preventing default
                    return;
                }
                
                if (!journeyCompleted) {
                    event.preventDefault();
                    isScrollLocked = true;
                    
                    // STRICT COOLDOWN: Check cooldown period - NO EXCEPTIONS
                    if (currentTime - lastScrollTime < scrollCooldown || isProcessingStep) {
                        console.log('Scroll blocked - cooldown active or processing step');
                        return; // Blocked - must wait
                    }
                    
                    // Only accumulate positive scroll (downward) with REDUCED sensitivity
                    if (event.deltaY > 0) {
                        scrollAccumulator += Math.min(event.deltaY, 20); // Cap scroll delta to prevent fast scrolling
                    }
                    
                    // Check if we've scrolled enough to advance to ONLY next step
                    if (scrollAccumulator >= scrollThreshold && currentStep < steps.length - 1) {
                        const nextStep = currentStep + 1; // Only increment by 1, never skip
                        console.log(`Advancing from step ${currentStep} to ${nextStep}`);
                        animateStep(nextStep);
                        scrollAccumulator = 0; // Reset accumulator
                        lastScrollTime = currentTime; // Update last scroll time
                    }
                }
            } else {
                // Reset when completely outside the journey zone
                const isCompletelyOutside = rect.bottom < 0 || rect.top > window.innerHeight;
                
                if (!journeyPermanentlyCompleted && isCompletelyOutside) {
                    // Only reset if journey hasn't been permanently completed and we're completely outside
                    journeyCompleted = false;
                    currentStep = -1; // Start from -1 so first step becomes 0
                    scrollAccumulator = 0;
                    isProcessingStep = false;
                    lastScrollTime = 0;
                    isScrollLocked = false; // Release scroll lock
                    clearTimeout(stepLockTimeout);
                    // Remove active class from all steps when leaving
                    steps.forEach(step => {
                        step.classList.remove('journey-active', 'bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'border-2', 'border-blue-300', 'scale-105');
                        step.classList.add('bg-white');
                    });
                    if (progressFill) progressFill.style.width = '0%';
                }
            }
        }

        function updateJourneyOnScroll() {
            if (!journeySection) return;
            
            const rect = journeySection.getBoundingClientRect();
            
            // If permanently completed, keep final state
            if (journeyPermanentlyCompleted) {
                // Ensure step 5 stays active and progress bar stays full
                steps.forEach((step, index) => {
                    if (index === steps.length - 1) {
                        step.classList.remove('bg-white');
                        step.classList.add('journey-active');
                    } else {
                        step.classList.remove('journey-active', 'bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'border-2', 'border-blue-300', 'scale-105');
                        step.classList.add('bg-white');
                    }
                });
                if (progressFill) progressFill.style.width = '100%';
                return; // Don't initialize anything new
            }
            
            // Initialize first step when section title is visible
            const titleVisible = rect.top <= 200 && rect.bottom >= 200;
            if (titleVisible && currentStep === -1) {
                animateStep(0); // Activate first step
            }
        }

        // Add wheel event listener for scroll locking
        window.addEventListener('wheel', handleJourneyScroll, { passive: false });
        
        // Store handler globally for bypass access
        window.handleJourneyScrollGlobal = handleJourneyScroll;
        
        // Add regular scroll listener for section detection
        window.addEventListener('scroll', updateJourneyOnScroll);
        
        // Initial update
        updateJourneyOnScroll();
    }

    // Initialize journey animation
    initJourneyAnimation();
    
    // Mobile Journey Step Highlighting with Beautiful Animations
    function initMobileJourneyHighlighting() {
        // Only run on mobile devices
        if (window.innerWidth <= 768) {
            const steps = document.querySelectorAll('.timeline-step');
            const progressFill = document.getElementById('journeyProgress');
            let journeyCompleted = false; // Track if user has reached step 5
            let isUpdating = false; // Prevent rapid updates
            let updateTimeout = null; // Debounce rapid scroll changes
            
            const observer = new IntersectionObserver((entries) => {
                // Clear any pending updates to prevent flashing
                if (updateTimeout) {
                    clearTimeout(updateTimeout);
                }
                
                // Debounce updates to prevent flashing during rapid scroll
                updateTimeout = setTimeout(() => {
                    if (isUpdating) return; // Skip if already updating
                    isUpdating = true;
                    
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Only update if this step isn't already active
                            const stepIndex = Array.from(steps).indexOf(entry.target);
                            const isAlreadyActive = entry.target.classList.contains('mobile-active');
                            
                            if (!isAlreadyActive) {
                                // Remove mobile-active and journey-active class from all steps
                                steps.forEach(step => {
                                    step.classList.remove('mobile-active', 'journey-active', 'bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'border-2', 'border-blue-300', 'scale-105');
                                    step.classList.add('bg-white');
                                });
                                
                                // Add journey-active class to the step in view (same effects as desktop)
                                entry.target.classList.remove('bg-white');
                                entry.target.classList.add('mobile-active', 'journey-active');
                                
                                // Update progress bar based on which step is active
                                if (stepIndex !== -1 && progressFill) {
                                    const progressPercent = ((stepIndex + 1) / steps.length) * 100;
                                    progressFill.style.width = progressPercent + '%';
                                    
                                    // Mark journey as completed if user reaches step 5
                                    if (stepIndex === steps.length - 1) {
                                        journeyCompleted = true;
                                    }
                                }
                            }
                        } else {
                            // Only remove effects if this step was actually active
                            if (entry.target.classList.contains('mobile-active')) {
                                entry.target.classList.remove('mobile-active', 'journey-active', 'bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'border-2', 'border-blue-300', 'scale-105');
                                entry.target.classList.add('bg-white');
                                
                                // Only reset progress bar if journey hasn't been completed
                                if (!journeyCompleted) {
                                    // Check if any step is still active, if not reset progress bar
                                    setTimeout(() => {
                                        const hasActiveStep = Array.from(steps).some(step => step.classList.contains('mobile-active'));
                                        if (!hasActiveStep && progressFill) {
                                            progressFill.style.width = '0%';
                                        }
                                    }, 100); // Small delay to prevent flickering
                                }
                            }
                        }
                    });
                    
                    // Release update lock after a short delay
                    setTimeout(() => {
                        isUpdating = false;
                    }, 150);
                }, 50); // Debounce delay to prevent rapid changes
            }, {
                threshold: 0.6, // Trigger when 60% of the step is visible
                rootMargin: '-10% 0px -10% 0px' // Trigger when step is more centered
            });
            
            steps.forEach(step => {
                observer.observe(step);
            });
        }
    }
    
    // Initialize mobile highlighting
    initMobileJourneyHighlighting();
    
    // Services spotlight animation for mobile
    function initServicesSpotlight() {
        // Only run on mobile devices
        if (window.innerWidth <= 768) {
            const serviceCards = document.querySelectorAll('.service-card');
            
            if (serviceCards.length === 0) return;
            
            let isUpdating = false; // Prevent rapid updates
            let updateTimeout = null; // Debounce rapid scroll changes
            
            const observer = new IntersectionObserver((entries) => {
                // Clear any pending updates to prevent flashing
                if (updateTimeout) {
                    clearTimeout(updateTimeout);
                }
                
                // Debounce updates to prevent flashing during rapid scroll
                updateTimeout = setTimeout(() => {
                    if (isUpdating) return; // Skip if already updating
                    isUpdating = true;
                    
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Only update if this card isn't already active
                            const isAlreadyActive = entry.target.classList.contains('service-active');
                            
                            if (!isAlreadyActive) {
                                // Remove active class from all cards first
                                serviceCards.forEach(card => {
                                    card.classList.remove('service-active');
                                });
                                
                                // Add active class to the card in viewport (same as hover effect)
                                entry.target.classList.add('service-active');
                            }
                        } else {
                            // Remove active class when card leaves viewport
                            entry.target.classList.remove('service-active');
                        }
                    });
                    
                    // Reset updating flag after a short delay
                    setTimeout(() => {
                        isUpdating = false;
                    }, 100);
                }, 150); // Debounce delay
            }, {
                threshold: 0.6, // Card needs to be 60% visible to activate
                rootMargin: '-50px 0px' // Offset for better timing
            });
            
            // Observe all service cards
            serviceCards.forEach(card => {
                observer.observe(card);
            });
        }
    }
    
    // Initialize services spotlight
    initServicesSpotlight();
    
    // Re-initialize on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset all steps to default state first
            const steps = document.querySelectorAll('.timeline-step');
            steps.forEach(step => {
                step.classList.remove('mobile-active', 'journey-active', 'bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'border-2', 'border-blue-300', 'scale-105');
                step.classList.add('bg-white');
            });
            
            // Reset progress bar
            const progressFill = document.getElementById('journeyProgress');
            if (progressFill) progressFill.style.width = '0%';
            
            if (window.innerWidth <= 768) {
                initMobileJourneyHighlighting();
                initServicesSpotlight();
            } else {
                // Reset service cards on desktop
                const serviceCards = document.querySelectorAll('.service-card');
                serviceCards.forEach(card => {
                    card.classList.remove('service-active');
                });
            }
        }, 250); // Debounce resize events
    });

    // Scroll to contact function with journey bypass
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        const journeySection = document.querySelector('#journey');
        
        if (!contactSection) return;
        
        // Temporarily disable journey scroll lock during CTA navigation
        const originalWheelHandler = window.handleJourneyScrollGlobal;
        if (originalWheelHandler) {
            window.removeEventListener('wheel', originalWheelHandler);
        }
        
        // Scroll to contact section
        contactSection.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Re-enable journey scroll lock after scroll completes
        setTimeout(() => {
            if (originalWheelHandler) {
                window.addEventListener('wheel', originalWheelHandler, { passive: false });
            }
        }, 1000); // Wait for smooth scroll to complete
    };
    
    // Store the journey wheel handler globally for bypass access
    if (typeof initJourneyAnimation === 'function') {
        // We'll modify the journey animation to expose the handler
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.service) {
                alert('Molimo popunite sva obavezna polja.');
                return;
            }
            
            // Simulate form submission
            alert(`Hvala vam ${formData.name}! Vaš upit je poslat. Kontaktiraćemo vas uskoro na ${formData.email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scroll for contact link
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Navbar hide/show on scroll
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up or at top - show navbar
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load translations first
    loadTranslations();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize business journey animation
    initJourneyAnimation();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize language dropdown
    initLanguageDropdown();
    
    // Initialize CTA buttons
    initCTAButtons();
});

// Scroll animations with IntersectionObserver
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-hidden');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.remove('animate-hidden');
                
                // Add appropriate animation class
                if (element.classList.contains('animate-slide-top')) {
                    element.classList.add('animate-slide-top');
                } else if (element.classList.contains('animate-in-left')) {
                    element.classList.add('animate-in-left');
                } else if (element.classList.contains('animate-in-right')) {
                    element.classList.add('animate-in-right');
                } else if (element.classList.contains('animate-scale')) {
                    element.classList.add('animate-scale');
                } else {
                    element.classList.add('animate-in');
                }
                
                // Start counter animation if element has counter class
                const counter = element.querySelector('.counter');
                if (counter) {
                    animateCounter(counter);
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.textContent.includes('%') ? '%' : '+';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(target * easedProgress);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// End of script
