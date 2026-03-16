document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');

            // Toggle icon between bars and times (close)
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Add scrolled class to header for shadow/bg effects
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.03)';
        }
    });

    // Intersection Observer for fade-in animations (Skills section)
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on index to create stagger effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for fade elements
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
});

// --- PDF Modal Logic ---

// Function to open the modal and set the iframe src
window.openPdfModal = function (pdfUrl) {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfFrame');

    // Append #toolbar=0&navpanes=0&scrollbar=0 to hide download controls
    // Note: PDF viewers in browsers handle this differently, but this works for most modern browsers
    const secureUrl = pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0';

    iframe.src = secureUrl;
    modal.classList.add('active');

    // Prevent scrolling on the body while modal is open
    document.body.style.overflow = 'hidden';
};

// Function to close the modal
window.closePdfModal = function () {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfFrame');

    modal.classList.remove('active');
    // Clear src so the PDF stops rendering/loading in background
    setTimeout(() => {
        iframe.src = '';
    }, 300); // Wait for transition to finish

    // Restore scrolling
    document.body.style.overflow = 'auto';
};

// Close modal when clicking completely outside the modal content
document.getElementById('pdfModal').addEventListener('click', function (event) {
    if (event.target === this) {
        closePdfModal();
    }
});

// Prevent right-click inside the modal area to disable "Save Page As" or inspecting
document.querySelector('.pdf-container').addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
