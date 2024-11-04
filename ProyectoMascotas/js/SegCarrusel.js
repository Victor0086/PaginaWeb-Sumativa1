const carouselContainer = document.querySelector('.product-carousel-container');
let isDown = false;
let startX;
let scrollLeft;

carouselContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    carouselContainer.classList.add('active');
    startX = e.pageX - carouselContainer.offsetLeft;
    scrollLeft = carouselContainer.scrollLeft;
    e.preventDefault(); 
});

carouselContainer.addEventListener('mouseleave', () => {
    isDown = false;
    carouselContainer.classList.remove('active');
});

carouselContainer.addEventListener('mouseup', () => {
    isDown = false;
    carouselContainer.classList.remove('active');
});

carouselContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselContainer.offsetLeft;
    const walk = (x - startX) * 3; 
    carouselContainer.scrollLeft = scrollLeft - walk;
});