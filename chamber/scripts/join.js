const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const timestampField = document.querySelector("#timestamp");

timestampField.value = new Date().toISOString();

const cards = document.querySelectorAll(".membership-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => {
    observer.observe(card);
});

document.addEventListener('DOMContentLoaded', () => {
    const modalLinks = document.querySelectorAll('.modal-link');

    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });
    
    const closeButtons = document.querySelectorAll('.close-modal');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });
    
    const modals = document.querySelectorAll('dialog');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });
});

const timestampInput = document.getElementById('timestamp');
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}