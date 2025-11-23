// Слайдер новостей на главной странице
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.news-slider');
    const slides = document.querySelectorAll('.news-slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Функция для показа слайда
    function showSlide(index) {
        // Убедимся, что индекс в допустимых пределах
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Сдвигаем слайдер
        const offset = -currentSlide * 100;
        slider.style.transform = `translateX(${offset}%)`;
        
        // Обновляем активный слайд
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Следующий слайд
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Предыдущий слайд
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Обработчики кнопок
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    // Автоматическая прокрутка каждые 5 секунд
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Остановка автопрокрутки при наведении
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoSlide);
    });
    
    // Возобновление автопрокрутки
    slider.addEventListener('mouseleave', function() {
        autoSlide = setInterval(nextSlide, 5000);
    });
    
    // Поддержка свайпов на мобильных
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Свайп влево - следующий слайд
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Свайп вправо - предыдущий слайд
            prevSlide();
        }
    }
    
    // Показываем первый слайд
    showSlide(0);
});