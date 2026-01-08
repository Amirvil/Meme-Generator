'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.gallery')

    const strHtml = imgs.map(img => `<img src=${img.url} onclick="onImgSelect(${img.id})">`)
    elGallery.innerHTML = strHtml.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    showEditor()
}

function showEditor() {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
    elGallery.classList.add('hidden')
    elEditor.classList.remove('hidden')

    onInitEditor()
}