// Language switching functionality for inline JSON
let currentLanguage = 'me';
let translations = {};

// Load translations from inline script tags or external files
function loadTranslations() {
    try {
        // Try to load from inline script tags first
        const meScript = document.getElementById('translations-me');
        const enScript = document.getElementById('translations-en');
        
        if (meScript && enScript) {
            translations.me = JSON.parse(meScript.textContent);
            translations.en = JSON.parse(enScript.textContent);
            console.log('Loaded translations from inline scripts');
        } else {
            // Fallback to embedded translations
            translations = {
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
            console.log('Using embedded translations');
        }
        
        // Initialize language
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'me';
        setLanguage(savedLanguage);
        
    } catch (error) {
        console.error('Error loading translations:', error);
    }
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
    
    console.log('Updating content to:', currentLanguage);
    
    // Update navigation
    updateNavigation(t);
    
    // Update hero section
    updateHeroSection(t);
}

function updateNavigation(t) {
    try {
        // Desktop navigation
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        if (navLinks.length >= 5) {
            navLinks[0].textContent = t.nav.home;
            navLinks[1].textContent = t.nav.services;
            navLinks[2].textContent = t.nav.journey;
            navLinks[3].textContent = t.nav.clients;
            navLinks[4].textContent = t.nav.contact;
        }
        
        // Mobile navigation
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
        // Hero badge
        const badge = document.querySelector('.bg-blue-100.text-blue-800');
        if (badge) {
            badge.textContent = t.hero.badge;
        }
        
        // Hero title
        const title = document.querySelector('h1');
        if (title) {
            title.innerHTML = `${t.hero.title}<br><span class="text-[#0F74BC]">${t.hero.titleAccent}</span>`;
        }
        
        // Hero descriptions
        const paragraphs = document.querySelectorAll('section p');
        let descIndex = 0;
        for (let p of paragraphs) {
            if (descIndex === 0 && (p.textContent.includes('AQ Accounting') || p.textContent.includes('complete'))) {
                p.textContent = t.hero.description1;
                descIndex++;
            } else if (descIndex === 1 && (p.textContent.includes('tim') || p.textContent.includes('team'))) {
                p.textContent = t.hero.description2;
                break;
            }
        }
        
        // CTA button
        const button = document.querySelector('section button');
        if (button) {
            button.textContent = t.hero.cta;
        }
    } catch (error) {
        console.error('Error updating hero section:', error);
    }
}

function updateLanguageSelectors() {
    // Update desktop language selector
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = currentLanguage.toUpperCase();
    }
    
    // Update mobile language selector
    const mobileME = document.getElementById('mobileLangME');
    const mobileEN = document.getElementById('mobileLangEN');
    
    if (mobileME && mobileEN) {
        if (currentLanguage === 'me') {
            mobileME.className = 'px-3 py-1 text-sm rounded bg-blue-600 text-white';
            mobileEN.className = 'px-3 py-1 text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300';
        } else {
            mobileEN.className = 'px-3 py-1 text-sm rounded bg-blue-600 text-white';
            mobileME.className = 'px-3 py-1 text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing translations...');
    
    // Load translations
    loadTranslations();
    
    // Language dropdown functionality
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });
        
        document.addEventListener('click', function() {
            languageDropdown.classList.add('hidden');
        });
    }
    
    // Add global functions for debugging
    window.setLanguage = setLanguage;
    window.testTranslation = function() {
        console.log('Current language:', currentLanguage);
        console.log('Translations:', translations);
        updateContent();
    };
});
