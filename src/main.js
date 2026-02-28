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
