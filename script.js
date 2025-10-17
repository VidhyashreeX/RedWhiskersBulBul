document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    const header = document.querySelector('header');
    
    let currentLang = 'en';
    let lastScrollY = window.scrollY;
    
    languageToggle.addEventListener('click', function() {
        if (currentLang === 'en') {
            currentLang = 'ta';
            document.body.classList.add('tamil');
        } else {
            currentLang = 'en';
            document.body.classList.remove('tamil');
        }
        
        langOptions.forEach(option => {
            if (option.dataset.lang === currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        localStorage.setItem('preferredLanguage', currentLang);
    });
    
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'ta') {
        currentLang = 'ta';
        document.body.classList.add('tamil');
        langOptions.forEach(option => {
            if (option.dataset.lang === 'ta') {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', function() {
            videos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });
    
    const audioPlayer = document.getElementById('beta-song');
    if (audioPlayer) {
        audioPlayer.addEventListener('play', function() {
            videos.forEach(video => {
                video.pause();
            });
        });
    }
    
    // Enhanced scroll-based header behavior
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.background = 'rgba(251, 251, 253, 0.92)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.background = 'rgba(251, 251, 253, 0.8)';
            header.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
    
    // Smooth parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }, { passive: true });
    }
    
    // Enhanced intersection observer with stagger effect
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.story-card, .fact-card, .spiritual-card, .video-card, .photo-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Enhanced smooth scroll with offset
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.story-card, .fact-card, .video-card, .photo-card, .lang-toggle');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)';
        });
    });
    
    // Lazy loading enhancement for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease';
                    
                    img.addEventListener('load', function() {
                        this.style.opacity = '1';
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Add momentum scrolling feel
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        document.body.style.pointerEvents = 'none';
        
        isScrolling = setTimeout(function() {
            document.body.style.pointerEvents = 'auto';
        }, 66);
    }, { passive: true });
    
    // Preload critical assets
    const preloadVideo = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.preload = 'metadata';
        });
    };
    preloadVideo();
    
    // Add reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
    
    // Apple-style Carousel
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (carouselTrack && carouselSlides.length > 0) {
        let currentIndex = 0;
        const totalSlides = carouselSlides.length;
        
        // Create indicators
        carouselSlides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            indicator.setAttribute('aria-label', `Go to image ${index + 1}`);
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselTrack.style.transform = `translateX(${offset}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        // Button controls
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isDragging = true;
        }, { passive: true });
        
        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselTrack.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        // Mouse drag support (desktop)
        let mouseStartX = 0;
        let mouseEndX = 0;
        let isMouseDragging = false;
        
        carouselTrack.addEventListener('mousedown', (e) => {
            mouseStartX = e.screenX;
            isMouseDragging = true;
            carouselTrack.style.cursor = 'grabbing';
        });
        
        carouselTrack.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            mouseEndX = e.screenX;
        });
        
        carouselTrack.addEventListener('mouseup', () => {
            if (!isMouseDragging) return;
            isMouseDragging = false;
            carouselTrack.style.cursor = 'grab';
            
            const swipeThreshold = 50;
            const diff = mouseStartX - mouseEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            if (isMouseDragging) {
                isMouseDragging = false;
                carouselTrack.style.cursor = 'grab';
            }
        });
        
        carouselTrack.style.cursor = 'grab';
        
        // Auto-play (optional - commented out by default)
        // let autoplayInterval = setInterval(nextSlide, 5000);
        // carouselTrack.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        // carouselTrack.addEventListener('mouseleave', () => {
        //     autoplayInterval = setInterval(nextSlide, 5000);
        // });
    }
});