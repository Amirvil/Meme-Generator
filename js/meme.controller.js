'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}


function renderMeme() {
    const meme = getMeme()
    const { txt, size, color } = meme.lines[0]
    const imgUrl = getImgUrlByID(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = imgUrl


    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        drawTxt(txt, size, color)
    }
}

function drawTxt(txt, size, color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.textAlign = 'center'
    gCtx.font = `${size}px Impact`

    gCtx.fillText(txt, 150, 50)
    gCtx.strokeText(txt, 150, 50)
}
