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

// --- Add Logo Insertion Logic ---
// Ensure this runs after the DOM is ready and logo.js is loaded
document.addEventListener('DOMContentLoaded', () => {
    const logoContainer = document.getElementById('logo-container');
    if (logoContainer) {
      // Call the function from logo.js to create the SVG
      // Provide desired Tailwind size units (e.g., '8' for h-8/w-8)
      const logoSvgElement = createLogoSVG('8', '8', ''); // Creates h-8 w-8 SVG
  
      // Append the created SVG element to the container
      if (logoSvgElement) {
        logoContainer.appendChild(logoSvgElement);
      } else {
        console.error("Failed to create logo SVG element.");
      }
    } else {
      console.error("Logo container element not found.");
    }
  });

// Optional: Add active state to nav links on scroll
// (More complex JS, omitted for brevity but consider adding for better UX)
