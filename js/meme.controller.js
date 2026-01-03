'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}


function renderMeme() {
    const elImg = new Image()
    elImg.src = 'images/2.jpg'

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        drawTxt()
    }
}

function drawTxt() {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.textAlign = 'center'
    gCtx.font = '40px Impact'

    gCtx.fillText("First Meme", 150, 50)
    gCtx.strokeText("First Meme", 150, 50)
}
