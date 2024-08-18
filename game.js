const carousel = document.querySelector('.carousel_track');
const slides = Array.from(carousel.children);
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID;
let currentIndex = 0;

carousel.addEventListener('touchstart', touchStart, { passive: false });
carousel.addEventListener('touchend', touchEnd, { passive: false });
carousel.addEventListener('touchmove', touchMove, { passive: false });

function touchStart(event) {
    startPosition = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    carousel.classList.add('grabbing');
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - previousTranslate;

    if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex += 1;
    if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();
    carousel.classList.remove('grabbing');
}

function touchMove(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    currentTranslate = previousTranslate + currentPosition - startPosition;
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
}
