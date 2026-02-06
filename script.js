// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

mobileToggle.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');

    // Add or remove CTA button in mobile menu
    if (isActive && navCta) {
        // Clone the CTA button and add it to mobile menu if not already there
        if (!navLinks.querySelector('.mobile-cta-clone')) {
            const ctaClone = navCta.cloneNode(true);
            ctaClone.classList.add('mobile-cta-clone');
            ctaClone.style.marginTop = '1rem';
            navLinks.appendChild(ctaClone);
        }
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling (Polyfill for older browsers/fine control)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's strictly an anchor on the same page
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for sticky header
                const headerOffset = 100; // Adjusted for floating nav
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.trust-item, .contact-card, .h2, .hero-content > *');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

// Add reveal class to improved elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section > .container > h2, .trust-item, .contact-card, .hero-text, .hero-image').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
});

// Form Handling (Frontend Demo + Netlify Support)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        // If Netlify, we let it submit naturally or use AJAX. 
        // For this demo, we'll keep the prevention to show the success message
        // unless it's actually running on Netlify which catches the submit.

        // e.preventDefault(); 
        // For a static site demo without backend, we simulate success:

        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';

        // Simulate delay
        setTimeout(() => {
            btn.innerText = 'Request Sent!';
            btn.style.backgroundColor = '#28a745';
            this.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        }, 1000);
    });
}
