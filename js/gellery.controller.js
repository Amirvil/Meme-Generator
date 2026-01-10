'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = ''

    const strHtml = imgs.map(img => `<img src=${img.url} onclick="onImgSelect(${img.id})">`)
    elGallery.innerHTML = strHtml.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    onNavigate('editor')
}