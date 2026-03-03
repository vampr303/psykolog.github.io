/**
 * 🌸 Психолог для женщин - Вспомогательный JavaScript
 * 
 * Основное приложение работает на Firebase и интегрировано в index.html
 * Этот файл предоставляет дополнительные утилиты
 */

console.log('✓ Сайт психолога загружен');
console.log('🔐 Админ доступ: ?admin=psykolog2024');

// Плавная прокрутка якорей
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
            }
        });
    });

    // Добавляем класс sticky для header при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }, { passive: true });
});

// Утилита для отладки Firebase
window.debugFirebase = function() {
    console.log('Firebase подключена');
    console.log('Доступные коллекции:');
    console.log('- psycholoog (профиль)');
    console.log('- customSections (разделы)');
    console.log('- reviews (отзывы)');
    console.log('- bookings (заявки)');
};

// Карусель для секции "Для кого"
document.addEventListener('DOMContentLoaded', function() {
    const carouselWrapper = document.querySelector('.carousel-image-wrapper');
    if (!carouselWrapper) return;

    const images = Array.from(carouselWrapper.querySelectorAll('.carousel-image'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let current = 0;
    let intervalId = null;

    function goTo(index) {
        images.forEach((img, i) => img.classList.toggle('active', i === index));
        const dots = Array.from(dotsContainer.children);
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        current = index;
    }

    function next() { goTo((current + 1) % images.length); }
    function prev() { goTo((current - 1 + images.length) % images.length); }

    // Создаем точки
    images.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => { goTo(i); resetAuto(); });
        if (i === 0) btn.classList.add('active');
        dotsContainer.appendChild(btn);
    });

    nextBtn?.addEventListener('click', () => { next(); resetAuto(); });
    prevBtn?.addEventListener('click', () => { prev(); resetAuto(); });

    function startAuto() { intervalId = setInterval(next, 4000); }
    function stopAuto() { clearInterval(intervalId); intervalId = null; }
    function resetAuto() { stopAuto(); startAuto(); }

    carouselWrapper.addEventListener('mouseenter', stopAuto);
    carouselWrapper.addEventListener('mouseleave', startAuto);

    // Инициализация
    goTo(0);
    startAuto();
});
