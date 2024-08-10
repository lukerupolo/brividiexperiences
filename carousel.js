const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);
const descriptionContainer = document.querySelector('.game-description');
const game2ExtraContent = document.querySelector('.game-2-extra');
const playButton = document.querySelector('.play-button');

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

// Move to the next slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

    // Update description
    const description = targetSlide.dataset.description;
    descriptionContainer.textContent = description;

    // Update play button URL
    const url = targetSlide.dataset.url;
    playButton.href = url;

    // Show special content for game 2
    if (targetSlide === slides[1]) {
        game2ExtraContent.style.display = 'block';
        descriptionContainer.style.display = 'none';
    } else {
        game2ExtraContent.style.display = 'none';
        descriptionContainer.style.display = 'block';
    }
};

// Update dots
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('active');
    targetDot.classList.add('active');
};

// Handle swipe functionality
let startX;
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchmove', (e) => {
    if (!startX) return;
    const moveX = e.touches[0].clientX;
    const diffX = startX - moveX;
    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swiped left
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            const currentDot = dotsNav.querySelector('.active') || dots[0];
            const nextDot = currentDot.nextElementSibling || dots[0];
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        } else {
            // Swiped right
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
            const currentDot = dotsNav.querySelector('.active') || dots[0];
            const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
        }
        startX = null; // Reset the swipe start position
    }
});

// Clicking the nav indicators
dotsNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide') || slides[0];
    const currentDot = dotsNav.querySelector('.active') || dots[0];
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});
