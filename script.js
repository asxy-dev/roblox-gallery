document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close');
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const exploreBtn = document.getElementById('exploreBtn');
    const contactBtn = document.getElementById('contactBtn');

    let mouseX = 0;
    let mouseY = 0;

    function initCursor() {
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                cursorDot.style.left = mouseX + 'px';
                cursorDot.style.top = mouseY + 'px';
                
                cursorOutline.style.left = mouseX + 'px';
                cursorOutline.style.top = mouseY + 'px';
            });

            document.addEventListener('mouseenter', () => {
                cursorDot.classList.add('active');
                cursorOutline.classList.add('active');
            });

            document.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('active');
                cursorOutline.classList.remove('active');
            });

            const clickables = document.querySelectorAll('a, button, .plus-container, img');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });
        }
    }

    function createParticles() {
        const particlesContainer = document.getElementById('particles-js');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(88, 101, 242, 0.3);
                border-radius: 50%;
                animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particlesContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0px);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function animateNumbers() {
        const numbers = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            entry.target.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(current);
                        }
                    }, 50);
                    observer.unobserve(entry.target);
                }
            });
        });

        numbers.forEach(number => observer.observe(number));
    }

    function handleButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = this.querySelector('.btn-ripple');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                
                setTimeout(() => {
                    ripple.style.animation = '';
                }, 600);
            });
        });

        exploreBtn.addEventListener('click', () => {
            document.querySelector('#gallery').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });

        contactBtn.addEventListener('click', () => {
            window.open('https://discord.gg/', '_blank');
        });
    }

    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.category, .section-header, .floating-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    function handleMobileMenu() {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        });
    }

    function createImageItem(category, index, name) {
        const item = document.createElement('div');
        item.className = 'image-grid-item';
        
        const img = document.createElement('img');
        img.src = `${category}/${index}.png`;
        img.alt = `${name} ${index}`;
        img.loading = 'lazy';
        
        item.appendChild(img);
        
        item.addEventListener('click', () => {
            const modal = document.querySelector('.modal');
            const modalImg = document.getElementById('modal-image');
            
            modal.style.display = 'block';
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
        
        return item;
    }

    function initImageGallery() {
        // Define image data for each category
        const imageData = {
            'arenas': { count: 4, name: 'Arenas' },
            'simulator': { count: 6, name: 'Simulator Maps' },
            'mini-arena': { count: 4, name: 'Mini Arena' },
            'sci-fi': { count: 7, name: 'Sci-Fi Buildings' },
            'ping-pong': { count: 10, name: 'Ping Pong Lobby + Queue System' },
            'horror': { count: 17, name: 'Horror Hallway' },
            'oldish': { count: 6, name: 'Oldish Lobby' },
            'lightning': { count: 6, name: 'Interior Work + Lightning' }
            
        }; 

        // Load images for each category
        Object.keys(imageData).forEach(category => {
            const grid = document.getElementById(`${category}-grid`);
            if (!grid) return;

            const count = imageData[category].count;
            const name = imageData[category].name;
            
            // Show first 3 images
            for (let i = 1; i <= Math.min(3, count); i++) {
                const item = createImageItem(category, i, name);
                grid.appendChild(item);
            }
            
            // Add plus button if more than 3 images
            if (count > 3) {
                const plusBtn = document.createElement('div');
                plusBtn.className = 'plus-container';
                plusBtn.textContent = `+${count-3}`;
                grid.appendChild(plusBtn);
                
                plusBtn.addEventListener('click', () => {
                    grid.innerHTML = '';
                    for (let i = 1; i <= count; i++) {
                        const item = createImageItem(category, i, name);
                        grid.appendChild(item);
                    }
                });
            }
        });
    }

    function initModal() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && !e.target.closest('.hero-images') && !e.target.closest('.floating-cards')) {
                modal.style.display = 'block';
                modal.style.opacity = '0';
                modalImg.src = e.target.src;
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }
        });
        
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }

    function initNavbarScroll() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    function initLoadingAnimation() {
        const loader = document.querySelector('.loader');
        if (loader) {
            window.addEventListener('load', () => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            });
        }
    }

    // Initialize all functions
    initCursor();
    createParticles();
    animateNumbers();
    handleButtonEffects();
    initTiltEffect();
    initScrollAnimations();
    handleMobileMenu();
    initImageGallery();
    initModal();
    initNavbarScroll();
    initSmoothScrolling();
    initParallaxEffect();
    initLoadingAnimation();

    // Handle window resize
    window.addEventListener('resize', () => {
        initCursor();
    });

    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn-ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
    `;
    document.head.appendChild(rippleStyle);
});