document.addEventListener('DOMContentLoaded', () => {
    
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
            setTimeout(() => mobileMenu.classList.add('is-hidden'), 300); // Pour la transition CSS
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
            setTimeout(typeEffect, 70); // Vitesse d'écriture
        } else if (typedTextElement) {
            // Ajout du curseur clignotant
            typedTextElement.style.borderRight = '2px solid var(--color-primary)';
            typedTextElement.style.animation = 'blink-caret 0.75s step-end infinite';
        }
    }

    // Styles pour le curseur (à ajouter dans styles.css pour les puristes)
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: var(--color-primary); }
        }
    `;
    document.head.appendChild(style);

    // Démarrage de l'animation après le chargement du Hero (géré par AOS)
    setTimeout(typeEffect, 1200);


    // ==========================================================================
    // 3. ANIMATION DES BARRES DE COMPÉTENCES
    // ==========================================================================
    const skillBars = document.querySelectorAll('.skill-card__bar');
    const skillsSection = document.getElementById('skills');

    // Intersection Observer pour déclencher l'animation quand la section est visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Déclenchement à 50% de visibilité
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level; // Déclenche la transition CSS
                });
                observer.unobserve(entry.target); // Arrête d'observer après le déclenchement
            }
        });
    }, observerOptions);

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // ==========================================================================
    // 4. GESTION DU FORMULAIRE DE CONTACT
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const copyEmailButton = document.getElementById('copyEmailButton');
    const targetEmail = 'mbayeboubacar195@gmail.com';
    
    // Validation simple
    function validateForm(name, email, message) {
        let isValid = true;
        
        // Validation Nom (exemple)
        if (name.trim().length < 2) {
            document.getElementById('nameError').textContent = 'Votre nom est trop court.';
            isValid = false;
        } else {
            document.getElementById('nameError').textContent = '';
        }
        
        // Validation Email (format de base)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Veuillez entrer une adresse email valide.';
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
        }

        // Validation Message (exemple)
        if (message.trim().length < 10) {
            document.getElementById('messageError').textContent = 'Votre message doit contenir au moins 10 caractères.';
            isValid = false;
        } else {
            document.getElementById('messageError').textContent = '';
        }

        return isValid;
    }

    // Soumission du formulaire (via mailto:)
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
                
                // Ouvre le client mail de l'utilisateur
                window.location.href = mailtoLink;
                
                // Affiche un statut après l'envoi (peut-être pas visible si le client mail prend le focus)
                formStatus.textContent = 'Ouverture de votre client mail...';
                formStatus.className = 'form__status success';
                contactForm.reset();
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
                formStatus.textContent = `L'email (${targetEmail}) a été copié dans le presse-papiers !`;
                formStatus.className = 'form__status success';
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form__status';
                }, 3000);
            }).catch(err => {
                formStatus.textContent = "Erreur: Impossible de copier l'email. Veuillez le copier manuellement.";
                formStatus.className = 'form__status';
                console.error('Erreur de copie:', err);
            });
        });
    }
});