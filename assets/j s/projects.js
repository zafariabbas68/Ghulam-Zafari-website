// Projects Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
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

    // Map comparison slider
    const initComparisonSlider = () => {
        const slider = document.querySelector('.comparison-slider');
        const beforeImg = document.querySelector('.map-img:last-child');

        if (slider && beforeImg) {
            let isDragging = false;

            slider.addEventListener('mousedown', function() {
                isDragging = true;
                document.body.style.cursor = 'ew-resize';
            });

            document.addEventListener('mouseup', function() {
                isDragging = false;
                document.body.style.cursor = '';
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

            // Touch support
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
    };

    initComparisonSlider();

    // Smooth scroll for project cards
    const projectLinks = document.querySelectorAll('.project-card a');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.project-visual img');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            if (img.hasAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    }
});