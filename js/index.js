document.addEventListener('DOMContentLoaded', function () {
  header()
  products()
  service()
  popupScripts()

  setInterval(function () { makeTimer() }, 1000)
})
$(window).on('load', function () {
  map()
})

function header() {
  const headerElement = document.querySelector('.header')
  const burgerOpenButton = document.querySelector('.header__open-burger')
  const burgerCloseButton = document.querySelector('.header__close-burger')
  const headerShadow = headerElement.querySelector('.header__shadow')

  burgerOpenButton.addEventListener('click', function () {
    headerElement.classList.add('header--open')
    document.documentElement.classList.add('ov-hidden')
  })
  burgerCloseButton.addEventListener('click', function () {
    headerBurgerClose()
  })
  headerShadow.addEventListener('click', function () {
    headerBurgerClose()
  })
  for (const link of headerElement.querySelectorAll('.header__link')) {
    link.addEventListener('click', function () {
      headerBurgerClose()
    })
  }
}
function headerBurgerClose() {
  const headerElement = document.querySelector('.header')
  headerElement.classList.remove('header--open')
  document.documentElement.classList.remove('ov-hidden')
}

function map() {
  if (document.querySelector('#contactsMap')) {
    ymaps.ready(mapInit)
  }
}
function mapInit() {
  const mapIconImageSize = $(window).width() > 767 ? [100, 104] : [58, 60]
  const mapIconImageOffset = $(window).width() > 767 ? [-52, -52] : [-30, -30]

  const myMap = new ymaps.Map('contactsMap', {
    center: [51.79471, 39.199559],
    zoom: 15,
    controls: []
  }, {
    suppressMapOpenBlock: true
  })
  const placemark = new ymaps.Placemark([51.79471, 39.199559], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map_logo.svg',
    iconImageSize: mapIconImageSize,
    iconImageOffset: mapIconImageOffset
  })

  myMap.geoObjects.add(placemark)
  myMap.behaviors.disable('scrollZoom')
  if (window.innerWidth < 1025) {
    myMap.behaviors.disable('drag')
  }
}

function products() {
  $('.products__bullet').on('click', function () {
    $(this).parents('.products__slider').find('.products__img').removeClass('products__img--active')
    $(this).parents('.products__slider').find('.products__img').eq($(this).index()).addClass('products__img--active')
    $(this).siblings('.products__bullet').removeClass('products__bullet--active')
    $(this).addClass('products__bullet--active')
  })
}

function service() {
  if ($('.service').length > 0) {
    const serviceSlider = new Swiper('.service .swiper', {
      spaceBetween: 15,
      slidesPerView: 'auto',
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      },
      breakpoints: {
        767: {
          spaceBetween: 45
        },
        1024: {
          spaceBetween: 104
        }
      }
    })
  }
}

function decOfNumber(number, titles) {
  const decCache = []
  const decCases = [2, 0, 1, 1, 1, 2]
  if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]
  return titles[decCache[number]]
}

function makeTimer() {
  const timerBlock = document.querySelector('#timer')
  const startTime = (Date.parse(new Date(timerBlock.dataset.start))) / 1000
  const endTime = (Date.parse(new Date(timerBlock.dataset.end))) / 1000
  const now = (Date.parse(new Date()) / 1000)

  const timeLeft = endTime - now
  const duration = Math.floor((endTime - startTime) / 86400)

  const days = Math.floor(timeLeft / 86400)
  let hours = Math.floor((timeLeft - (days * 86400)) / 3600)
  let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60)
  let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)))

  if (hours < '10') { hours = `0${hours}` }
  if (minutes < '10') { minutes = `0${minutes}` }
  if (seconds < '10') { seconds = `0${seconds}` }

  const circle = document.querySelectorAll('.timer__anim')
  const circleLength = circle[0].getTotalLength()

  $(circle).css('stroke-dasharray', circleLength)
  $(circle).css('stroke-dashoffset', circleLength)

  function timerUpdateValues(id, item, descr, durationMax) {
    const element = $(`#timer-${id}`)
    element.html(item)
    element.parents('.timer__item').find('.timer__descr').html(decOfNumber(item, descr))
    element.parents('.timer__item').find('.timer__anim').css('stroke-dashoffset', circleLength - (item * (circleLength / durationMax)))
  }
  if (days > -1) {
    timerUpdateValues('days', days, ['день', 'дня', 'дней'], (duration + 1))
    timerUpdateValues('hours', hours, ['час', 'часа', 'часов'], 24)
    timerUpdateValues('minutes', minutes, ['минута', 'минуты', 'минут'], 60)
    timerUpdateValues('seconds', seconds, ['секунда', 'секунды', 'секунд'], 60)
  }
}

function getPopup(url) {
  const popupUrl = url
  Fancybox.show(
    [
      {
        src: popupUrl,
        preload: false
      }
    ],
    {
      mainClass: 'popup',
      parentEl: document.querySelector('.wrapper'),
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      closeButton: false,
      hideScrollbar: true,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false,
      animated: false
    }
  )
  Fancybox.defaults.ScrollLock = false
  return false
}
function popupScripts() {
  $('.js-popup-close').on('click', function () {
    Fancybox.close(true)
  })
}
