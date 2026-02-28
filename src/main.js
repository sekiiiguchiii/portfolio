import './style.css'

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger')
const navList = document.getElementById('navList')

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-open')
  navList.classList.toggle('is-open')
})

// ナビリンクをクリックしたらメニューを閉じる
const navLinks = document.querySelectorAll('.nav__link')
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('is-open')
    navList.classList.remove('is-open')
  })
})

// スクロールアニメーション
const fadeElements = document.querySelectorAll('.fade-in')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
    }
  })
}, {
  threshold: 0.1
})

fadeElements.forEach(el => observer.observe(el))
