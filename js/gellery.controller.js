'use strict'

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.gallery-container')

    const strHtml = imgs.map(img => `<img src=${img.url}>`)
    elGallery.innerHTML = strHtml.join('')
}