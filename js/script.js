// js/script.js

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple form submission handler
const form = document.querySelector('#contact-form'); // Added an ID to the form for better selection
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you'd send data to a server here
        alert('Thank you for your interest! Our team will contact you shortly.');
        form.reset();
    });
}

// Optional: Add active state to nav links on scroll
// (More complex JS, omitted for brevity but consider adding for better UX)