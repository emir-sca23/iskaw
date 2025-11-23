// Main slider for homepage
let slideIndex = 1

function changeSlide(n) {
  showSlide((slideIndex += n))
}

function currentSlide(n) {
  showSlide((slideIndex = n + 1))
}

function showSlide(n) {
  const slides = document.getElementsByClassName("slide")
  const dots = document.getElementsByClassName("dot")

  if (!slides.length) return

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active")
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active")
  }

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].classList.add("active")
  }
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active")
  }
}

// News gallery slider
let newsSlideIndex = 1

function changeNewsSlide(n) {
  console.log("[v0] changeNewsSlide called with n =", n)
  console.log("[v0] Current newsSlideIndex before change:", newsSlideIndex)
  showNewsSlide((newsSlideIndex += n))
  console.log("[v0] New newsSlideIndex after change:", newsSlideIndex)
}

function currentNewsSlide(n) {
  console.log("[v0] currentNewsSlide called with n =", n)
  showNewsSlide((newsSlideIndex = n))
  console.log("[v0] newsSlideIndex set to:", newsSlideIndex)
}

function showNewsSlide(n) {
  console.log("[v0] showNewsSlide called with n =", n)
  const slides = document.getElementsByClassName("news-gallery-slide")
  const dots = document.getElementsByClassName("news-dot")

  console.log("[v0] Found slides:", slides.length)
  console.log("[v0] Found dots:", dots.length)

  if (!slides.length) {
    console.log("[v0] No slides found, returning")
    return
  }

  if (n > slides.length) {
    newsSlideIndex = 1
    console.log("[v0] n > slides.length, reset to 1")
  }
  if (n < 1) {
    newsSlideIndex = slides.length
    console.log("[v0] n < 1, set to", slides.length)
  }

  // Remove active class from all slides and dots
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active")
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active")
  }

  // Add active class to current slide and dot
  if (slides[newsSlideIndex - 1]) {
    slides[newsSlideIndex - 1].classList.add("active")
    console.log("[v0] Added active class to slide", newsSlideIndex - 1)
  }
  if (dots[newsSlideIndex - 1]) {
    dots[newsSlideIndex - 1].classList.add("active")
    console.log("[v0] Added active class to dot", newsSlideIndex - 1)
  }
}

// Initialize sliders on page load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize main slider if exists
  if (document.getElementsByClassName("slide").length > 0) {
    showSlide(slideIndex)
    // Auto slide every 5 seconds for main slider only
    setInterval(() => {
      changeSlide(1)
    }, 5000)
  }

  // Initialize news gallery slider if exists
  if (document.getElementsByClassName("news-gallery-slide").length > 0) {
    showNewsSlide(newsSlideIndex)
  }
})

function toggleMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    
    burger.classList.toggle('active');
    nav.classList.toggle('active');
}

// Закрытие меню при клике вне его
document.addEventListener('click', function(event) {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    
    if (!burger.contains(event.target) && !nav.contains(event.target)) {
        burger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// Закрываем меню при клике на ссылку
const links = document.querySelectorAll('nav ul li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('nav');
        
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});