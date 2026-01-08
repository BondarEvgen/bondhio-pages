document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('slider-track');
    const slides = track.children;
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const indicators = document.getElementById('indicators').children;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Initialize
    updateSliderPosition();

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    Array.from(indicators).forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Auto Play
    startAutoPlay();

    // Pause on hover
    const container = document.getElementById('slider-container');
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    // Touch Support (Basic Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }

    // Functions
    function updateSliderPosition() {
        // Move track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        Array.from(indicators).forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-white/50');
                dot.classList.add('bg-white');
            } else {
                dot.classList.add('bg-white/50');
                dot.classList.remove('bg-white');
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }
        updateSliderPosition();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
});
