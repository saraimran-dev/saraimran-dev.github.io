// ============================================
// NAVIGATION & HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Add scrolled class to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// CV UPLOAD FUNCTIONALITY
// ============================================

const cvInput = document.getElementById('cvInput');
const cvStatus = document.getElementById('cvStatus');

cvInput.addEventListener('change', handleCVUpload);

function handleCVUpload(event) {
    const file = event.target.files[0];
    
    if (!file) return;

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showCVStatus('File size exceeds 5MB', 'error');
        cvInput.value = '';
        return;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        showCVStatus('Invalid file format. Use PDF, DOC, or DOCX', 'error');
        cvInput.value = '';
        return;
    }

    // Store file in localStorage (for demo purposes)
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            localStorage.setItem('cvFile', e.target.result);
            localStorage.setItem('cvFileName', file.name);
            showCVStatus(`✓ CV uploaded: ${file.name}`, 'success');
        } catch (error) {
            showCVStatus('Storage error. Please try again.', 'error');
        }
    };
    reader.readAsDataURL(file);
}

function showCVStatus(message, type) {
    cvStatus.textContent = message;
    cvStatus.className = `cv-status ${type}`;
    
    // Remove status message after 5 seconds if it's not a persistent success
    if (type === 'error') {
        setTimeout(() => {
            cvStatus.textContent = '';
            cvStatus.className = 'cv-status';
        }, 5000);
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Validate form
    if (!name.trim() || !email.trim() || !message.trim()) {
        alert('Please fill in all fields');
        return;
    }

    // Validate email
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Store message in localStorage (for demo)
    const messageData = {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };

    try {
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(messageData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message sent!';
        submitBtn.style.opacity = '0.7';

        // Reset form
        contactForm.reset();

        // Restore button
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
        }, 3000);
    } catch (error) {
        alert('Error sending message. Please try again.');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and content blocks
document.querySelectorAll('.project-card, .skill-category, .stat-card, .timeline-content, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Navbar height offset
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// ============================================
// PROJECT LINK INTERACTIONS
// ============================================

const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Project link would navigate to your project. Update the href in the HTML to point to your actual project URLs.');
    });
});

// ============================================
// SOCIAL LINKS INTERACTIONS
// ============================================

const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Social link would navigate to your profile. Update the href in the HTML to point to your actual social profiles (LinkedIn, GitHub, Twitter, etc.)');
    });
});

// ============================================
// SKILL TAG INTERACTION
// ============================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('click', function() {
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 100);
    });
});

// ============================================
// UTILITY: PARALLAX EFFECT (OPTIONAL)
// ============================================

function initParallax() {
    const shapes = document.querySelectorAll('.geometric-shape');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Only initialize parallax on larger screens
if (window.innerWidth > 768) {
    initParallax();
}

// ============================================
// STATS COUNTER ANIMATION
// ============================================

const statCards = document.querySelectorAll('.stat-card h3');
let hasAnimated = false;

window.addEventListener('scroll', () => {
    if (hasAnimated) return;

    const statsSection = document.querySelector('.stat-card');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        animateCounters();
        hasAnimated = true;
    }
});

function animateCounters() {
    statCards.forEach(card => {
        const target = parseInt(card.textContent);
        if (isNaN(target)) return;

        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                card.textContent = target + (card.textContent.includes('+') ? '+' : card.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                card.textContent = current + (card.textContent.includes('+') ? '+' : card.textContent.includes('%') ? '%' : '');
            }
        }, 30);
    });
}

// ============================================
// LOAD CV FROM STORAGE (OPTIONAL)
// ============================================

function loadStoredCV() {
    const cvFileName = localStorage.getItem('cvFileName');
    if (cvFileName) {
        showCVStatus(`✓ CV on file: ${cvFileName}`, 'success');
        // Remove the success message after a few seconds
        setTimeout(() => {
            const status = document.getElementById('cvStatus');
            if (status.classList.contains('success')) {
                status.textContent = '';
                status.className = 'cv-status';
            }
        }, 8000);
    }
}

// Load stored CV on page load
document.addEventListener('DOMContentLoaded', loadStoredCV);

// ============================================
// UTILITY: DEBUGGING/CONSOLE INFO
// ============================================

console.log('Portfolio website loaded successfully!');
console.log('Features:');
console.log('- Responsive navigation');
console.log('- CV upload functionality (stored in localStorage)');
console.log('- Contact form with validation');
console.log('- Smooth scrolling and animations');
console.log('- Mobile-friendly design');
