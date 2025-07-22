// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation for Roles with forward slashes
    // Typing Effect
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['Omar Amer', 'a Software Engineer', 'a Flutter Developer', 'a UI/UX Designer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (typedTextSpan && cursorSpan) {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains('typing')) {
                    cursorSpan.classList.add('typing');
                }
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }
    }
    
    function erase() {
        if (typedTextSpan && cursorSpan) {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains('typing')) {
                    cursorSpan.classList.add('typing');
                }
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) {
                    textArrayIndex = 0;
                }
                setTimeout(type, typingDelay + 1100);
            }
        }
    }
    
    if (typedTextSpan && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
    
  
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    
    
    // Mobile Navigation Toggle
   const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

if (mobileNavToggle && mobileNav && mobileNavOverlay) {
    mobileNavToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    mobileNavOverlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        const icon = mobileNavToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}



    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Input validation on blur
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            // Skip checkbox inputs for blur validation
            if (input.type === 'checkbox') return;
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                const feedbackEl = this.parentElement.querySelector('.form-feedback');
                if (feedbackEl) {
                    feedbackEl.textContent = '';
                    feedbackEl.classList.remove('error');
                }
            });
        });
        
        // Form submission
      contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formStatus = contactForm.querySelector('.form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Reset form status
    if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';
    }

    // Validate inputs
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (!isValid) return;

    // Show loading
    submitBtn.classList.add('loading');
    if (formStatus) {
        formStatus.textContent = 'Sending message...';
        formStatus.style.display = 'block';
    }

    // Prepare custom HTML content
    const htmlContent = `
        <h2 style="color:#4CAF50;">New Inquiry</h2>
        <p><strong>Name:</strong> ${contactForm.name.value}</p>
        <p><strong>Email:</strong> ${contactForm.email.value}</p>
        <p><strong>Inquiry Type:</strong> ${contactForm.inquiry_type.value}</p>
        <p><strong>Subject:</strong> ${contactForm.subject.value}</p>
        <p><strong>Message:</strong><br>${contactForm.message.value}</p>
    `;

    // Send Email via EmailJS
    emailjs.send('service_rgookqa', 'template_xxg5yl9', {
        name: contactForm.name.value,
        email: contactForm.email.value,
        inquiry_type: contactForm.inquiry_type.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value,
        message_html: htmlContent
    })
    .then(function(response) {
        formStatus.textContent = 'Your message has been sent successfully! I will get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
    }, function(error) {
        formStatus.textContent = 'Failed to send message. Please try again later.';
        formStatus.className = 'form-status error';
    })
    .finally(() => {
        submitBtn.classList.remove('loading');
    });
});

    }
    
    // Input validation function
    function validateInput(input) {
        const value = input.value.trim();
        const feedbackEl = input.parentElement.querySelector('.form-feedback');
        let isValid = true;
        
        // Skip validation for non-required fields that are empty
        if (!input.required && value === '') {
            return true;
        }
        
        // Different validation based on input type
        switch (input.type) {
            case 'text':
                if (value === '') {
                    showError(feedbackEl, 'This field is required');
                    isValid = false;
                } else if (input.name === 'name' && value.length < 2) {
                    showError(feedbackEl, 'Name must be at least 2 characters');
                    isValid = false;
                }
                break;
                
            case 'email':
                if (value === '') {
                    showError(feedbackEl, 'Email is required');
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    showError(feedbackEl, 'Please enter a valid email address');
                    isValid = false;
                }
                break;
                
            case 'select-one':
                if (value === '') {
                    showError(feedbackEl, 'Please select an option');
                    isValid = false;
                }
                break;
                
            case 'textarea':
                if (value === '') {
                    showError(feedbackEl, 'This field is required');
                    isValid = false;
                } else if (value.length < 10) {
                    showError(feedbackEl, 'Message must be at least 10 characters');
                    isValid = false;
                }
                break;
                
            case 'checkbox':
                if (!input.checked && input.required) {
                    // For checkboxes, we need to find the label and add the error after it
                    const label = input.parentElement.querySelector('label');
                    if (label && label.nextElementSibling && label.nextElementSibling.classList.contains('form-feedback')) {
                        showError(label.nextElementSibling, 'You must agree to continue');
                    } else if (feedbackEl) {
                        showError(feedbackEl, 'You must agree to continue');
                    }
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.classList.add('error');
        }
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check for elements in viewport on page load
    checkAnimationElements();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkAnimationElements);
    
    function checkAnimationElements() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                // Get animation type from data attribute or default to 'fadeIn'
                const animationType = element.dataset.animation || 'fadeIn';
                element.classList.add('animated', animationType);
                
                // Add delay if specified
                if (element.dataset.delay) {
                    element.style.animationDelay = element.dataset.delay + 's';
                }
                
                // Add duration if specified
                if (element.dataset.duration) {
                    element.style.animationDuration = element.dataset.duration + 's';
                }
            }
        });
    }
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('loaded');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 1000);
        });
    }

     // Mobile Navigation
  // Mobile Navigation
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.onclick = () => {
    navMenu.classList.toggle('open');
};

// قفل المينيو لما تضغط على لينك
navLinks.forEach(link => {
    link.onclick = () => {
        navMenu.classList.remove('open');
    };
});



});