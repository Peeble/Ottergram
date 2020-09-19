var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]'
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]'
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]'
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]'
var DETAIL_LEFT_SELECTOR = '[data-image-role="left"]'
var DETAIL_RIGHT_SELECTOR = '[data-image-role="right"]'
var TINY_EFFECT_CLASS = 'is-tiny'
var HIDDEN_DETAIL_CLASS = 'hidden-detail'
var ESC_KEY = 'Escape'

function setDetails (imageUrl, titleText, indexNum) {
  'use strict'
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR)
  detailImage.setAttribute('src', imageUrl)
  detailImage.setAttribute('data-index', indexNum)

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR)
  detailTitle.textContent = titleText
}

function imageFromThumb (thumbnail) {
  'use strict'
  return thumbnail.getAttribute('data-image-url')
}

function titleFromThumb (thumbnail) {
  'use strict'
  return thumbnail.getAttribute('data-image-title')
}

function indexFromThumb (thumbnail) {
  'use strict'
  return thumbnail.getAttribute('data-index')
}

function setDetailsFromThumb (thumbnail) {
  'use strict'
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail), indexFromThumb(thumbnail))
}

function addThumbClickHandler (thumb) {
  'use strict'
  thumb.addEventListener('click', function (event) {
    event.preventDefault()
    setDetailsFromThumb(thumb)
    showDetails()
  })
}

function getThumbnailsArray () {
  'use strict'
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR)
  var thumbnailArray = [].slice.call(thumbnails)
  return thumbnailArray
}

function hideDetails () {
  'use strict'
  document.body.classList.add(HIDDEN_DETAIL_CLASS)
}

function showDetails () {
  'use strict'
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR)
  document.body.classList.remove(HIDDEN_DETAIL_CLASS)
  frame.classList.add(TINY_EFFECT_CLASS)
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS)
  }, 50)
}

function addKeyPressHandler () {
  'use strict'
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault()
    console.log(event.key)
    if (event.key === ESC_KEY) {
      hideDetails()
    }
  })
}

function addArrowClickHandler (images) {
  var left = document.querySelector(DETAIL_LEFT_SELECTOR)
  var right = document.querySelector(DETAIL_RIGHT_SELECTOR)

  left.addEventListener('click', function (event) {
    event.preventDefault()
    // console.log('test')

    // console.log(indexFromDetail())

    var position = parseInt(indexFromDetail())
    if (position >= 1) {
      setDetailsFromThumb(images[position - 1])
    }
  })

  right.addEventListener('click', function (event) {
    event.preventDefault()
    console.log('test')

    var position = parseInt(indexFromDetail())
    if (position < 4) {
      setDetailsFromThumb(images[position + 1])
    }
  })
}

function indexFromDetail () {
  'use strict'
  return (document.querySelector(DETAIL_IMAGE_SELECTOR).getAttribute('data-index'))
}

function initializeEvents () {
  'use strict'
  var thumbnails = getThumbnailsArray()

  addArrowClickHandler(thumbnails)
  thumbnails.forEach(addThumbClickHandler)
  addKeyPressHandler()
}

initializeEvents()
