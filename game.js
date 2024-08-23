document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        loop: false, // Enable looping if needed
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                const currentSlide = swiper.slides[swiper.activeIndex];
                const url = currentSlide.getAttribute('data-url');
                updateDescription(url); // Custom function to update description or handle slide change
                console.log('Current slide URL:', url);
            }
        }
    });

    function updateDescription(url) {
        const gameDescription = document.querySelector('.game-description');
        const gameExtra = document.querySelector('.game-2-extra');

        // Example logic for updating the description based on the slide's URL
        if (url.includes('celebrityheads')) {
            gameDescription.style.display = 'none';
            gameExtra.style.display = 'block';
        } else {
            gameDescription.style.display = 'block';
            gameExtra.style.display = 'none';
        }
    }

    // Optional: Handle click on the slide to navigate to the URL
    swiper.slides.forEach((slide) => {
        slide.addEventListener('click', function () {
            const url = slide.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });
});
