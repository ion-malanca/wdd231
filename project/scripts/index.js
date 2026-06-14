// ============ INDEX.JS - COMPLETE WORKING VERSION ============
console.log('Index.js loaded successfully');

// ============ SET CURRENT YEAR ============
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
    console.log('Year set to:', new Date().getFullYear());
}

// ============ MODAL MANAGER CLASS ============
class ModalManager {
    constructor(modalElement) {
        this.modal = modalElement;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const closeBtn = this.modal?.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.open) {
                this.close();
            }
        });
    }
    
    open() {
        console.log('Opening modal');
        this.modal?.showModal();
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        console.log('Closing modal');
        this.modal?.close();
        document.body.style.overflow = '';
    }
}

// ============ MODAL SETUP ============
const attributionModal = document.getElementById('attributionModal');
let attributionModalManager = null;

if (attributionModal) {
    attributionModalManager = new ModalManager(attributionModal);
    console.log('Attribution modal initialized');
} else {
    console.log('Attribution modal not found');
}

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        console.log('Menu toggled');
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.textContent = '☰';
        });
    });
} else {
    console.log('Hamburger or navMenu not found');
}

// ============ SET ACTIVE NAV LINK ============
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navigation a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
            console.log('Active nav link set to:', href);
        }
    });
}

// ============ ATTRIBUTION MODAL HANDLER ============
const attributionLink = document.getElementById('attributionLink');
if (attributionLink && attributionModalManager) {
    attributionLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Attribution link clicked - opening modal');
        attributionModalManager.open();
    });
} else {
    console.log('Attribution link or modal manager not found');
}

// ============ SCROLL ANIMATIONS ============
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.information, .race-highlight, .champion-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    console.log('Scroll animations added for', animatedElements.length, 'elements');
}

// ============ INITIALIZE PAGE ============
function init() {
    console.log('Initializing page...');
    setActiveNavLink();
    addScrollAnimations();
    console.log('Page initialization complete');
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);