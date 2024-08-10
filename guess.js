document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guessForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const spirit = document.getElementById('spirit').value;
        const garnish = document.getElementById('garnish').value;
        const mixer = document.getElementById('mixer').value;

        localStorage.setItem('spirit', spirit);
        localStorage.setItem('garnish', garnish);
        localStorage.setItem('mixer', mixer);

        // Redirect to the result page
        window.location.href = 'result.html';
    });
});
