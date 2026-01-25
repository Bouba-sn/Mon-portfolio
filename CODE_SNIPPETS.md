# 💻 Code Snippets - Copier-Coller pour Améliorations Futures

## 📋 Index des Snippets

1. [Dark Mode Toggle](#1-dark-mode-toggle)
2. [Back to Top Button](#2-back-to-top-button)
3. [Newsletter Signup](#3-newsletter-signup)
4. [Contact Form avec Validation Avancée](#4-contact-form-avancé)
5. [Scroll Progress Bar](#5-scroll-progress-bar)
6. [Smooth Page Transition](#6-smooth-page-transition)
7. [Loading Animation](#7-loading-animation)
8. [Toast Notifications](#8-toast-notifications)
9. [Dynamic Project Cards](#9-dynamic-project-cards)
10. [Parallax Scroll Effect](#10-parallax-scroll-effect)

---

## 1. Dark Mode Toggle

### HTML
```html
<!-- Ajouter dans le header -->
<button class="theme-toggle" aria-label="Toggle dark mode" id="themeToggle">
    <i class="fas fa-moon"></i>
</button>
```

### CSS
```css
.theme-toggle {
    background: none;
    border: none;
    color: var(--color-white);
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: var(--spacing-md);
    transition: all var(--transition-speed);
}

.theme-toggle:hover {
    color: var(--color-accent);
    transform: rotate(360deg);
}

/* Dark mode colors */
:root.dark-mode {
    --color-black: #1a1a1a;
    --color-white: #e8e8e8;
    --color-card-bg: #2a2a2a;
    --color-border: #444;
}

@media (prefers-color-scheme: dark) {
    :root:not(.light-mode) {
        --color-black: #1a1a1a;
        --color-white: #e8e8e8;
    }
}
```

### JavaScript
```javascript
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Détecter la préférence système
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

// Appliquer le thème au démarrage
function applyTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        htmlElement.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
}

applyTheme(savedTheme);

// Toggle au clic
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});
```

---

## 2. Back to Top Button

### HTML
```html
<!-- Ajouter en bas du body, avant le closing </body> -->
<button class="back-to-top" id="backToTop" aria-label="Retour au sommet">
    <i class="fas fa-chevron-up"></i>
</button>
```

### CSS
```css
.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    color: var(--color-black);
    border: none;
    cursor: pointer;
    opacity: 0;
    transform: translateY(100px);
    transition: all var(--transition-smooth);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
}

.back-to-top.show {
    opacity: 1;
    transform: translateY(0);
}

.back-to-top:hover {
    box-shadow: 0 8px 25px rgba(0, 119, 182, 0.5);
    transform: translateY(-5px);
}
```

### JavaScript
```javascript
const backToTopBtn = document.getElementById('backToTop');

// Afficher/masquer le bouton
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Scroll au top
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

---

## 3. Newsletter Signup

### HTML
```html
<!-- Ajouter avant le footer -->
<section class="newsletter-section">
    <div class="newsletter-container">
        <h2>Recevez mes derniers articles</h2>
        <p>Subscrivez à ma newsletter pour rester à jour.</p>
        <form class="newsletter-form" id="newsletterForm">
            <input 
                type="email" 
                placeholder="Votre email..." 
                class="newsletter-input"
                required>
            <button type="submit" class="button button--primary">
                S'abonner
            </button>
        </form>
        <div class="newsletter-status" id="newsletterStatus"></div>
    </div>
</section>
```

### CSS
```css
.newsletter-section {
    background: linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 217, 255, 0.05));
    padding: var(--spacing-xl) var(--spacing-md);
    margin: var(--spacing-xl) 0;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-primary);
}

.newsletter-container {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
}

.newsletter-container h2 {
    font-size: 2rem;
    margin-bottom: var(--spacing-md);
    display: block;
    border: none;
    padding: 0;
}

.newsletter-form {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.newsletter-input {
    flex: 1;
    padding: 12px;
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius);
    background-color: var(--color-black);
    color: var(--color-text);
    transition: all var(--transition-speed);
}

.newsletter-input:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.2);
}

.newsletter-status {
    margin-top: var(--spacing-sm);
    font-size: 0.9rem;
}

.newsletter-status.success {
    color: #4CAF50;
}

.newsletter-status.error {
    color: #FF6B6B;
}
```

### JavaScript
```javascript
const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Validation basique
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newsletterStatus.textContent = 'Email invalide';
            newsletterStatus.className = 'newsletter-status error';
            return;
        }
        
        // Si vous avez un serveur backend:
        // const response = await fetch('/api/subscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        // });
        
        // Sinon, afficher juste un message
        newsletterStatus.textContent = '✅ Merci! Vérifiez votre email.';
        newsletterStatus.className = 'newsletter-status success';
        newsletterForm.reset();
        
        setTimeout(() => {
            newsletterStatus.textContent = '';
        }, 5000);
    });
}
```

---

## 4. Contact Form Avancé

### Amélioration du formulaire existant

```javascript
// Ajouter ceci à app.js dans le formulaire
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Float labels au focus
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('has-focus');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('has-focus');
        }
    });
});

// Compteur de caractères pour message
const charCount = document.createElement('span');
charCount.className = 'char-count';
messageInput.parentElement.appendChild(charCount);

messageInput.addEventListener('input', () => {
    charCount.textContent = `${messageInput.value.length}/500`;
});

messageInput.setAttribute('maxlength', '500');
```

### CSS pour Float Labels
```css
.form__group {
    position: relative;
    margin-bottom: var(--spacing-md);
}

.form__label {
    position: absolute;
    left: 12px;
    top: 14px;
    background-color: var(--color-card-bg);
    padding: 0 4px;
    font-size: 0.9rem;
    transition: all var(--transition-speed);
    color: var(--color-text);
    pointer-events: none;
}

.form__group.has-focus .form__label,
.form__input:not(:placeholder-shown) ~ .form__label {
    top: -10px;
    font-size: 0.75rem;
    color: var(--color-primary);
}

.char-count {
    display: block;
    text-align: right;
    font-size: 0.8rem;
    opacity: 0.7;
    margin-top: 4px;
}
```

---

## 5. Scroll Progress Bar

### HTML
```html
<!-- Ajouter en haut du body -->
<div class="scroll-progress" id="scrollProgress"></div>
```

### CSS
```css
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
    width: 0%;
    z-index: 1001;
    transition: width 0.1s ease-out;
    box-shadow: 0 0 10px var(--color-primary);
}
```

### JavaScript
```javascript
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
});
```

---

## 6. Smooth Page Transition

### CSS
```css
/* Page fade transition */
@keyframes pageIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

body {
    animation: pageIn 0.5s ease-out;
}
```

### JavaScript
```javascript
// Smooth transition entre pages
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
```

---

## 7. Loading Animation

### HTML
```html
<!-- Loading spinner au démarrage -->
<div class="loader" id="loader">
    <div class="loader-spinner"></div>
    <p>Chargement...</p>
</div>
```

### CSS
```css
.loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--color-black);
    z-index: 2000;
    opacity: 1;
    transition: opacity 0.5s ease-out;
}

.loader.hidden {
    opacity: 0;
    pointer-events: none;
}

.loader-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

### JavaScript
```javascript
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
});
```

---

## 8. Toast Notifications

### HTML
```html
<!-- Container pour toasts -->
<div id="toastContainer" class="toast-container"></div>
```

### CSS
```css
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    background-color: var(--color-card-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    color: var(--color-text);
    min-width: 300px;
    animation: slideInRight 0.3s ease-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.toast.success {
    border-left: 4px solid #4CAF50;
}

.toast.error {
    border-left: 4px solid #FF6B6B;
}

.toast.info {
    border-left: 4px solid var(--color-primary);
}
```

### JavaScript
```javascript
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}

// Utilisation:
// showToast('Email copié!', 'success');
// showToast('Erreur!', 'error');
```

---

## 9. Dynamic Project Cards

### HTML
```html
<!-- Ajouter data-filter à chaque card -->
<article class="project-card" data-filter="web">
    <!-- ... card content ... -->
</article>
```

### JavaScript
```javascript
// Filtre de projets
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.filter === filter) {
                card.style.display = 'block';
                card.animation = 'slideInUp 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
```

---

## 10. Parallax Scroll Effect

### HTML
```html
<!-- Ajouter data-parallax à des éléments -->
<div class="parallax-element" data-parallax="0.5">
    Contenu avec parallax
</div>
```

### CSS
```css
.parallax-element {
    will-change: transform;
}
```

### JavaScript
```javascript
const parallaxElements = document.querySelectorAll('[data-parallax]');

if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax;
            const offset = window.scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    });
}
```

---

## 🔗 Intégration Rapide

Copiez-collez les snippets qui vous intéressent:

1. **Dark Mode**: 3 blocs (HTML + CSS + JS)
2. **Back to Top**: 3 blocs
3. **Newsletter**: 3 blocs
4. **Autres features**: Chacun son code

**Temps d'intégration par feature: 5-10 minutes**

---

## 📝 Notes Importantes

- Tester sur mobile après chaque ajout
- Respecter `prefers-reduced-motion`
- Valider l'accessibilité (ARIA labels)
- Minifier avant production
- Tester les performances (Lighthouse)

---

## 💡 Où Ajouter le Code?

```
index.html   → Ajouter HTML snippets
styles.css   → Ajouter CSS snippets
app.js       → Ajouter JavaScript snippets
```

---

## 📞 Questions?

Email: mbayeboubacar195@gmail.com  
Tel: +221 77 473 14 93

---

**Snippet Collection**: v1.0  
**Créé**: Janvier 2025  
**Pour**: Portfolio El Hadji Boubacar Mbaye
