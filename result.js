document.addEventListener('DOMContentLoaded', () => {
    const spirit = localStorage.getItem('spirit');
    const garnish = localStorage.getItem('garnish');
    const mixer = localStorage.getItem('mixer');

    document.getElementById('spiritResult').textContent = `Spirit: ${spirit}`;
    document.getElementById('garnishResult').textContent = `Garnish: ${garnish}`;
    document.getElementById('mixerResult').textContent = `Mixer: ${mixer}`;
});
