// NeuraByte Website JavaScript
// Where Magic Meets Technology

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // ===== Loading Screen Animation =====
    function handleLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        const wand = document.querySelector('.wand');
        const spellParticles = document.querySelector('.spell-particles');
        
        // Create loading animation
        gsap.to(wand, {
            rotation: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
        
        // Create spell particle effects
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 8 + 2 + 'px';
            particle.style.height = Math.random() * 8 + 2 + 'px';
            particle.style.backgroundColor = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`;
            spellParticles.appendChild(particle);
            
            gsap.to(particle, {
                x: Math.random() * 150 - 75,
                y: Math.random() * 150 - 75,
                opacity: 0,
                duration: Math.random() * 2 + 0.5,
                repeat: -1,
                delay: Math.random() * 0.5,
                ease: "power2.out"
            });
        }
        
        // Hide loading screen after resources are loaded
        window.addEventListener('load', function() {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                delay: 1,
                onComplete: function() {
                    loadingScreen.style.display = 'none';
                    animateHomeElements();
                }
            });
        });
    }
    
    // ===== Navigation Functionality =====
    function setupNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        // Mobile menu toggle
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.classList.contains('login-btn')) return;
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
        
        // Login button modal trigger
        const loginBtn = document.querySelector('.login-btn');
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.querySelector('.close-modal');
        
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            gsap.fromTo(loginModal, {opacity: 0}, {opacity: 1, duration: 0.3});
            gsap.fromTo('.modal-content', {y: -50, opacity: 0}, {y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.4)"});
        });
        
        closeModal.addEventListener('click', function() {
            gsap.to(loginModal, {opacity: 0, duration: 0.3, onComplete: function() {
                loginModal.style.display = 'none';
            }});
        });
        
        // Close modal if clicked outside
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                gsap.to(loginModal, {opacity: 0, duration: 0.3, onComplete: function() {
                    loginModal.style.display = 'none';
                }});
            }
        });
    }
    
    // ===== Home Section Animations =====
    function animateHomeElements() {
        // Generate floating candles
        const candlesContainer = document.querySelector('.floating-candles');
        for (let i = 0; i < 12; i++) {
            const candle = document.createElement('div');
            candle.className = 'floating-candle';
            
            // Randomize candle positions
            candle.style.left = Math.random() * 100 + '%';
            candle.style.animationDelay = Math.random() * 5 + 's';
            candle.style.height = Math.random() * 30 + 60 + 'px';
            
            const flame = document.createElement('div');
            flame.className = 'candle-flame';
            candle.appendChild(flame);
            
            candlesContainer.appendChild(candle);
        }
        
        // Animate hero content
        gsap.from('.crest-logo', {
            scale: 0.5,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
        });
        
        gsap.from('.spell-text', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.5
        });
        
        gsap.from('.tagline', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.8
        });
        
        gsap.from('.cta-button', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            delay: 1.2,
            ease: "back.out(1.7)"
        });
        
        // Add glow effect to the cta button
        const ctaButton = document.querySelector('.cta-button');
        const wandSpark = document.querySelector('.wand-spark');
        
        ctaButton.addEventListener('mouseenter', function() {
            wandSpark.style.opacity = '1';
            wandSpark.style.transform = 'scale(1.2) rotate(45deg)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            wandSpark.style.opacity = '0';
            wandSpark.style.transform = 'scale(0) rotate(0)';
        });
    }
    
    // ===== About Section Animations =====
    function setupAboutSection() {
        // Flip card animation for team members
        const wizardCards = document.querySelectorAll('.wizard-card');
        
        wizardCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('flipped');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('flipped');
            });
        });
        
        // Timeline scroll animation
        ScrollTrigger.create({
            trigger: ".magical-timeline",
            start: "top 80%",
            onEnter: function() {
                gsap.from('.timeline-event', {
                    x: -100,
                    opacity: 0,
                    stagger: 0.3,
                    duration: 0.8,
                    ease: "power2.out"
                });
            },
            once: true
        });
    }
    
    // ===== Services Section - Spellbook =====
    function setupServicesSection() {
        const bookCover = document.querySelector('.book-cover');
        const bookPages = document.querySelector('.book-pages');
        const servicePages = document.querySelectorAll('.service-page');
        
        let isOpen = false;
        
        bookCover.addEventListener('click', function() {
            if (!isOpen) {
                gsap.to(bookCover, {
                    rotationY: -180,
                    duration: 1.5,
                    ease: "power2.inOut"
                });
                
                gsap.to(bookPages, {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.5
                });
                
                gsap.from(servicePages, {
                    opacity: 0,
                    x: 50,
                    stagger: 0.2,
                    duration: 0.8,
                    delay: 0.8
                });
                
                isOpen = true;
            } else {
                gsap.to(bookCover, {
                    rotationY: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                });
                
                gsap.to(bookPages, {
                    opacity: 0,
                    duration: 0.5
                });
                
                isOpen = false;
            }
        });
    }
    
    // ===== Projects Section =====
    function setupProjectsSection() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        // Project filtering
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        gsap.to(card, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5
                        });
                        card.style.display = 'block';
                    } else {
                        gsap.to(card, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.5,
                            onComplete: function() {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
        
        // Project card hover effects
        projectCards.forEach(card => {
            const overlay = card.querySelector('.magic-overlay');
            const projectInfo = card.querySelector('.project-info');
            
            card.addEventListener('mouseenter', function() {
                gsap.to(overlay, {
                    opacity: 0.7,
                    duration: 0.3
                });
                
                gsap.to(projectInfo, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3
                });
                
                gsap.to(projectInfo, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5
                });
            });
        });
    }
    
    // ===== Blog Section =====
    function setupBlogSection() {
        const scrollCategories = document.querySelectorAll('.scroll-category');
        const scrollItems = document.querySelectorAll('.scroll-item');
        const searchInput = document.querySelector('.scroll-search-input');
        
        // Category filtering
        scrollCategories.forEach(category => {
            category.addEventListener('click', function() {
                // Update active category
                scrollCategories.forEach(cat => cat.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.textContent.trim();
                
                // Filter blog posts
                scrollItems.forEach(item => {
                    const itemCategory = item.querySelector('.scroll-category-tag').textContent;
                    
                    if (filter === 'All Scrolls' || itemCategory === filter) {
                        gsap.to(item, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5
                        });
                        item.style.display = 'block';
                    } else {
                        gsap.to(item, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.5,
                            onComplete: function() {
                                item.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            scrollItems.forEach(item => {
                const title = item.querySelector('.scroll-title').textContent.toLowerCase();
                const excerpt = item.querySelector('.scroll-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5
                    });
                    item.style.display = 'block';
                } else {
                    gsap.to(item, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.5,
                        onComplete: function() {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
        
        // Blog scroll animation
        scrollItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Add slight rotation for parchment effect
                gsap.to(this.querySelector('.scroll-preview'), {
                    rotationY: 5,
                    duration: 0.5
                });
            });
            
            item.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(this.querySelector('.scroll-preview'), {
                    rotationY: 0,
                    duration: 0.5
                });
            });
        });
    }
    
    // ===== Contact Section =====
    function setupContactSection() {
        const contactForm = document.querySelector('.owl-post-form');
        const sendOwl = document.querySelector('.send-owl');
        const owlAnimation = document.querySelector('.owl-animation');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate the owl
            gsap.to(owlAnimation, {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(owlAnimation, {
                x: 300,
                opacity: 0,
                duration: 1.5,
                delay: 0.5,
                onComplete: function() {
                    // Reset animation
                    gsap.set(owlAnimation, { x: 0 });
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.textContent = 'Your message has been sent via Owl Post!';
                    
                    contactForm.appendChild(successMsg);
                    
                    gsap.from(successMsg, {
                        y: 20,
                        opacity: 0,
                        duration: 0.5
                    });
                    
                    // Clear form
                    contactForm.reset();
                    
                    // Remove success message after a delay
                    setTimeout(() => {
                        gsap.to(successMsg, {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: function() {
                                successMsg.remove();
                            }
                        });
                    }, 5000);
                }
            });
        });
        
        // Add location marker animation on map
        const locationMarker = document.querySelector('.location-marker');
        
        gsap.to(locationMarker, {
            y: -10,
            opacity: 0.7,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    }
    
    // ===== Scroll Animations =====
    function setupScrollAnimations() {
        // Section title animations
        gsap.utils.toArray('.section-title').forEach(title => {
            ScrollTrigger.create({
                trigger: title,
                start: "top 80%",
                onEnter: function() {
                    gsap.from(title, {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                },
                once: true
            });
        });
        
        // Navbar scroll effect
        const navbar = document.querySelector('.nav-parchment');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== Initialize All Functions =====
    function init() {
        handleLoadingScreen();
        setupNavigation();
        setupAboutSection();
        setupServicesSection();
        setupProjectsSection();
        setupBlogSection();
        setupContactSection();
        setupScrollAnimations();
    }
    
    init();
});