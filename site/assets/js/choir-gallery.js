document.querySelectorAll('.choir-gallery').forEach((gallery) => {
    const photos = Array.from(gallery.querySelectorAll('img'));
    const controls = gallery.querySelector('.choir-gallery-controls');
    const status = controls.querySelector('[aria-live]');
    let current = 0;

    function move(direction) {
        photos[current].hidden = true;
        current = (current + direction + photos.length) % photos.length;
        photos[current].hidden = false;
        status.textContent = `${current + 1} / ${photos.length}`;
    }

    controls.hidden = false;
    controls.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => move(Number(button.dataset.direction)));
    });
    gallery.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
        }
    });
});
