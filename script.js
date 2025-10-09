document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    
    let currentLang = 'en';
    
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
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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
    
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});