/**
 * Early Childhood Services Portfolio
 * Custom JavaScript for interactivity and functionality
 */

// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all interactive features
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initNavbarBehavior();
    initLazyLoading();
    
    console.log('ECS Portfolio initialized successfully');
});

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('subscriberName').value;
            const email = document.getElementById('subscriberEmail').value;
            
            // Simulate form submission
            showAlert('success', `Thank you, ${name}! You've been subscribed successfully.`);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('newsletterModal'));
            if (modal) {
                modal.hide();
            }
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            
            // Simulate form submission
            showAlert('success', `Thank you, ${name}! Your message has been sent.`);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            if (modal) {
                modal.hide();
            }
            
            // Reset form
            contactForm.reset();
        });
    }
}

// ===== ALERT SYSTEM =====
function showAlert(type, message) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to body
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ===== ANIMATIONS ON SCROLL =====
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.card, section').forEach(element => {
        observer.observe(element);
    });
}

// ===== NAVBAR BEHAVIOR =====
function initNavbarBehavior() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
        
        lastScroll = currentScroll;
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    // Native lazy loading is used in HTML with loading="lazy"
    // This function adds a fallback for older browsers
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        return;
    }
    
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    // Create button
    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    button.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.display = 'none';
    button.style.zIndex = '1000';
    button.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(button);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTopButton();

// ===== ACCORDION ENHANCEMENTS =====
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function() {
        // Smooth scroll to accordion item when opened
        setTimeout(() => {
            const accordion = this.closest('.accordion-item');
            const offset = accordion.offsetTop - 100;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }, 350);
    });
});

// ===== CARD HOVER EFFECTS =====
document.querySelectorAll('.hover-lift').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// ===== STATISTICS COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-box h3');
    
    counters.forEach(counter => {
        const target = counter.innerText;
        
        // Only animate if it's a number
        if (!isNaN(target)) {
            let count = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        }
    });
}

// Initialize counter animation
animateCounters();

// ===== GALLERY LIGHTBOX =====
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', function() {
        // Create lightbox overlay
        const overlay = document.createElement('div');
        overlay.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        overlay.style.zIndex = '9999';
        overlay.style.cursor = 'pointer';
        
        // Create enlarged image
        const enlargedImg = document.createElement('img');
        enlargedImg.src = this.src;
        enlargedImg.className = 'img-fluid';
        enlargedImg.style.maxWidth = '90%';
        enlargedImg.style.maxHeight = '90%';
        
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        // Close on click
        overlay.addEventListener('click', function() {
            this.remove();
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                overlay.remove();
            }
        });
    });
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add keyboard navigation for cards
document.querySelectorAll('.card').forEach(card => {
    const link = card.querySelector('a');
    if (link) {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                link.click();
            }
        });
    }
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ===== EXPORT FUNCTIONS FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showAlert,
        initSmoothScrolling,
        initFormHandling
    };
}
