/**
 * Portfolio - JavaScript amélioré
 * Animations fluides avec IntersectionObserver
 * Respect de prefers-reduced-motion pour l'accessibilité
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 0. DÉTECTION DES PRÉFÉRENCES D'ACCESSIBILITÉ
    // ==========================================================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================================================
    // 1. GESTION DU MENU MOBILE (Hamburger)
    // ==========================================================================
    const menuButton = document.querySelector('.header__menu-button');
    const mobileMenu = document.querySelector('.header__nav--mobile');
    const links = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
            mobileMenu.classList.remove('is-visible');
            setTimeout(() => mobileMenu.classList.add('is-hidden'), prefersReducedMotion ? 0 : 300);
        } else {
            mobileMenu.classList.remove('is-hidden');
            setTimeout(() => mobileMenu.classList.add('is-visible'), 10);
        }
    }

    menuButton.addEventListener('click', toggleMenu);
    
    // Fermer le menu lors du clic sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('is-hidden')) {
                toggleMenu();
            }
        });
    });

    // ==========================================================================
    // 2. EFFET MACHINE À ÉCRIRE (Typed Text)
    // ==========================================================================
    const typedTextElement = document.querySelector('.hero__typed-text');
    const textToType = 'El Hadji Boubacar Mbaye — Développeur web';
    let index = 0;
    
    function typeEffect() {
        if (typedTextElement && index < textToType.length) {
            typedTextElement.textContent += textToType.charAt(index);
            index++;
            const delay = prefersReducedMotion ? 0 : 70;
            setTimeout(typeEffect, delay);
        } else if (typedTextElement && !prefersReducedMotion) {
            // Ajout du curseur clignotant (sauf si animations réduites)
            typedTextElement.style.borderRight = '2px solid var(--color-primary)';
            typedTextElement.style.animation = 'blink-caret 0.75s step-end infinite';
        }
    }

    // Styles pour le curseur clignotant
    if (!prefersReducedMotion) {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes blink-caret {
                from, to { border-color: transparent }
                50% { border-color: var(--color-primary); }
            }
        `;
        document.head.appendChild(style);
    }

    // Démarrage de l'animation après le chargement du Hero
    const typeDelay = prefersReducedMotion ? 0 : 1200;
    setTimeout(typeEffect, typeDelay);


    // ==========================================================================
    // 3. INTERSECTION OBSERVER POUR LES ANIMATIONS AU SCROLL
    // ==========================================================================
    
    // Observer pour les éléments avec classe fade-in
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer l'observer aux éléments de texte et sections
    const fadeElements = document.querySelectorAll('.section__title, .about__bio, .form__instructions');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        fadeInObserver.observe(element);
    });

    // CSS pour l'animation fade-in
    const fadeInStyle = document.createElement('style');
    fadeInStyle.innerHTML = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity ${prefersReducedMotion ? '0.01ms' : '0.6s'} ease-out, transform ${prefersReducedMotion ? '0.01ms' : '0.6s'} ease-out;
        }
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(fadeInStyle);


    // ==========================================================================
    // 4. ANIMATION DES BARRES DE COMPÉTENCES
    // ==========================================================================
    const skillBars = document.querySelectorAll('.skill-card__bar');
    const skillsSection = document.getElementById('skills');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    

    // ==========================================================================
    // 5. GESTION DU FORMULAIRE DE CONTACT
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const copyEmailButton = document.getElementById('copyEmailButton');
    const targetEmail = 'mbayeboubacar195@gmail.com';
    
    // Validation du formulaire
    function validateForm(name, email, message) {
        let isValid = true;
        
        // Validation Nom
        if (name.trim().length < 2) {
            document.getElementById('nameError').textContent = 'Votre nom doit contenir au moins 2 caractères.';
            isValid = false;
        } else {
            document.getElementById('nameError').textContent = '';
        }
        
        // Validation Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Veuillez entrer une adresse email valide.';
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
        }

        // Validation Message
        if (message.trim().length < 10) {
            document.getElementById('messageError').textContent = 'Votre message doit contenir au moins 10 caractères.';
            isValid = false;
        } else {
            document.getElementById('messageError').textContent = '';
        }

        return isValid;
    }

    // Soumission du formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (validateForm(name, email, message)) {
                // Construction du lien mailto:
                const subject = encodeURIComponent(`Nouveau message de ${name} via Portfolio`);
                const body = encodeURIComponent(`De: ${name} (${email})\n\nMessage:\n${message}`);
                
                const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
                
                // Ouvre le client mail
                window.location.href = mailtoLink;
                
                // Affiche un statut
                formStatus.textContent = 'Ouverture de votre client mail...';
                formStatus.className = 'form__status success';
                setTimeout(() => {
                    contactForm.reset();
                    formStatus.textContent = '';
                }, 2000);
            } else {
                formStatus.textContent = 'Veuillez corriger les erreurs dans le formulaire.';
                formStatus.className = 'form__status';
            }
        });
    }

    // Fonctionnalité Copy-to-clipboard
    if (copyEmailButton) {
        copyEmailButton.addEventListener('click', () => {
            navigator.clipboard.writeText(targetEmail).then(() => {
                formStatus.textContent = `L'email (${targetEmail}) a été copié !`;
                formStatus.className = 'form__status success';
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form__status';
                }, 3000);
            }).catch(err => {
                formStatus.textContent = "Erreur: Impossible de copier l'email.";
                formStatus.className = 'form__status';
                console.error('Erreur de copie:', err);
            });
        });
    }


    // ==========================================================================
    // 6. SCROLL SPY - Mettre à jour la navigation au scroll
    // ==========================================================================
    const navLinks = document.querySelectorAll('.header__link');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================================================
    // 7. ANIMATION DES ÉLÉMENTS AOS (si présent)
    // ==========================================================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: prefersReducedMotion ? 0 : 800,
            easing: 'ease-out-quad',
        });
    }
});
