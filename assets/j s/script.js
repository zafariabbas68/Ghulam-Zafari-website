// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});
// Add to your script.js or projects.js
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.comparison-slider');
    const beforeImg = document.querySelector('.map-img:last-child');

    if (slider && beforeImg) {
        let isDragging = false;

        slider.addEventListener('mousedown', function() {
            isDragging = true;
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;

            const container = slider.parentElement;
            const containerRect = container.getBoundingClientRect();
            let xPos = e.clientX - containerRect.left;

            // Keep within bounds
            xPos = Math.max(0, Math.min(xPos, containerRect.width));

            const percent = (xPos / containerRect.width) * 100;
            beforeImg.style.width = `${percent}%`;
            slider.style.left = `${percent}%`;
        });

        // Touch support for mobile
        slider.addEventListener('touchstart', function() {
            isDragging = true;
        });

        document.addEventListener('touchend', function() {
            isDragging = false;
        });

        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;

            const container = slider.parentElement;
            const containerRect = container.getBoundingClientRect();
            let xPos = e.touches[0].clientX - containerRect.left;

            xPos = Math.max(0, Math.min(xPos, containerRect.width));

            const percent = (xPos / containerRect.width) * 100;
            beforeImg.style.width = `${percent}%`;
            slider.style.left = `${percent}%`;
        });
    }
});
// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});