import './style.css'
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      fpsLimit: 100,
      detectRetina: false, // trueからfalseに変更して負荷を軽減
      particles: {
        number: {
          value: 20, // 数を絞ることで「大きな円」が際立ちます
          density: { enable: true, area: 800 }
        },
        color: {
          // スクリーンショットに近い暖色・寒色のミックス
       //   value: [ "#e6b4ff", "#a7ffea", "#e2ffa9", "#ffeabc"]
         // value: [ "#ffffff",  "#ffd260","#e2ffa9", "#a7ffea","#edcaff"]
         //pop value: ["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]
         value: [ "#ffffff",  "#E8E8E8","#c5c5c5", "#9b9b9b","#d0d0d0"]
        },
        shape: {
          type: "circle" // 円に限定
          //type: ["circle", "square", "triangle", "polygon"], // 丸・四角・三角・多角形
        },
        opacity: {
         value: 0.15, // 重なりが見えるように半透明に
        },
        size: {
          value: { min: 600, max: 700 }, // かなり大きく設定するのがコツです
        },
        move: {
          enable: true,
          speed: 4, // ゆっくり動かす
          direction: "top", // 上方向へ流す
          random: false,  // 直線的すぎる動きを抑える
          straight: false,
          // outModes: "out", // 画面外に出たら消えて下から再登場

          enable: true,
  outModes: "out",
  vibrate: false,     // 余計な計算をオフにする
        }
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          resize: true
        }
      },
      background: {
color: "#ffffff" // 背景は白
      },
      responsive: [
      {
        maxWidth: 768, // 768px以下のデバイス（スマホ・タブレット）に適用
        options: {
          particles: {
            size: {
              value: { min: 350, max: 400 } // スマホではサイズを小さくする
            },
          number: {
              value: 40, // 数も少し減らすとパフォーマンスが安定します
            density: {
            enable: true,
            area: 400 // areaを小さく（例: 800→400）すると、狭い範囲に密集します
          }
            }
          }


        }
      }
    ],
      fullScreen: {
        enable: true,
        zIdex: -1
      }
    }
  });
})();

// ============
// ハンバーガーメニュー
// ============
const hamburger = document.getElementById('hamburger')
const navList = document.getElementById('navList')

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-open')
  navList.classList.toggle('is-open')
})

const navLinks = document.querySelectorAll('.nav__link')
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('is-open')
    navList.classList.remove('is-open')
  })
})

// リサイズ中はtransitionを無効化
let resizeTimer = null
window.addEventListener('resize', () => {
  document.body.classList.add('is-resizing')
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('is-resizing')
  }, 200)

  if (window.innerWidth > 768) {
    hamburger.classList.remove('is-open')
    navList.classList.remove('is-open')
  }
})

// ============
// スクロールアニメーション
// ============
const fadeElements = document.querySelectorAll('.fade-in')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
})

fadeElements.forEach(el => observer.observe(el))

window.addEventListener('load', () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible')
    }
  })
})

// ============
// HTMLメール スライダー
// ============
const sliderImgs = document.querySelectorAll('#mmSlider .slider__img')
const sliderDots = document.querySelectorAll('#mmDots .slider__dot')
let currentSlide = 0
let sliderTimer = null

function goToSlide(index) {
  sliderImgs[currentSlide].classList.remove('is-active')
  sliderDots[currentSlide].classList.remove('is-active')
  currentSlide = index
  sliderImgs[currentSlide].classList.add('is-active')
  sliderDots[currentSlide].classList.add('is-active')
}

function startSlider() {
  sliderTimer = setInterval(() => {
    const next = (currentSlide + 1) % sliderImgs.length
    goToSlide(next)
  }, 3000)
}

sliderDots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(sliderTimer)
    goToSlide(Number(dot.dataset.index))
    startSlider()
  })
})

startSlider()

// ============
// Lightbox（PCのみ）
// ============
let lbTimerRef = null

const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
lightbox.className = 'lightbox'
lightbox.innerHTML = `
  <div class="lightbox__overlay"></div>
  <div class="lightbox__content">
    <button class="lightbox__close" aria-label="閉じる">&#x2715;</button>
    <div class="lightbox__body"></div>
  </div>
`
document.body.appendChild(lightbox)

const lightboxBody = lightbox.querySelector('.lightbox__body')
const lightboxOverlay = lightbox.querySelector('.lightbox__overlay')
const lightboxClose = lightbox.querySelector('.lightbox__close')

function openLightbox(card) {
  const imgArea = card.querySelector('.work-card__img')
  const isSlider = imgArea.classList.contains('work-card__img--slider')

  if (isSlider) {
    const clone = imgArea.cloneNode(true)
    clone.classList.add('lightbox__slider')
    lightboxBody.innerHTML = ''
    lightboxBody.appendChild(clone)

    let lbCurrent = currentSlide
    const lbImgs = clone.querySelectorAll('.slider__img')
    const lbDots = clone.querySelectorAll('.slider__dot')

    lbImgs.forEach(img => img.classList.remove('is-active'))
    lbDots.forEach(dot => dot.classList.remove('is-active'))
    lbImgs[lbCurrent].classList.add('is-active')
    lbDots[lbCurrent].classList.add('is-active')

    function lbGoToSlide(index) {
      lbImgs[lbCurrent].classList.remove('is-active')
      lbDots[lbCurrent].classList.remove('is-active')
      lbCurrent = index
      lbImgs[lbCurrent].classList.add('is-active')
      lbDots[lbCurrent].classList.add('is-active')
    }

    function lbStartSlider() {
      lbTimerRef = setInterval(() => {
        const next = (lbCurrent + 1) % lbImgs.length
        lbGoToSlide(next)
      }, 3000)
    }

    lbDots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(lbTimerRef)
        lbGoToSlide(Number(dot.dataset.index))
        lbStartSlider()
      })
    })

    lbStartSlider()

  } else {
    const img = imgArea.querySelector('img')
    lightboxBody.innerHTML = `<img src="${img.src}" alt="${img.alt}">`
  }

  requestAnimationFrame(() => {
    lightbox.classList.add('is-open')
  })
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  clearInterval(lbTimerRef)
  lbTimerRef = null
  lightbox.classList.remove('is-open')
  setTimeout(() => {
    lightboxBody.innerHTML = ''
  }, 300)
  document.body.style.overflow = ''
}

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    if (window.innerWidth > 663) {
      openLightbox(card)
    }
  })
  if (window.innerWidth > 663) {
    card.style.cursor = 'pointer'
  }
})

lightboxOverlay.addEventListener('click', closeLightbox)
lightboxClose.addEventListener('click', closeLightbox)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox()
})
