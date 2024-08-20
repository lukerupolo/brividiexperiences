const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

document.querySelector('.next-btn').addEventListener('click', () => {
    carouselItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add('active');
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    carouselItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentIndex].classList.add('active');
});
