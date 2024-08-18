const carousel = document.querySelector('.carousel_track');
const slides = Array.from(carousel.children); // Get all slides
const dots = document.querySelectorAll('.carousel_indicator');
let currentIndex = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID;

function touchStart(index) {
    return function (event) {
        currentIndex = index;
        startPosition = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        carousel.classList.add('grabbing');
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - previousTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();

    carousel.classList.remove('grabbing');
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = previousTranslate + currentPosition - startPosition;
        event.preventDefault(); // Prevent default scrolling behavior
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setCarouselPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setCarouselPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -carousel.offsetWidth;
    previousTranslate = currentTranslate;
    setCarouselPosition();
    updateDots();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        setPositionByIndex();
    });
});

slides.forEach((slide, index) => {
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);

    slide.addEventListener('touchstart', touchStart(index), { passive: false });
    slide.addEventListener('touchend', touchEnd, { passive: false });
    slide.addEventListener('touchmove', touchMove, { passive: false });
});

setPositionByIndex();
