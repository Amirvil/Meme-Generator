'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()

    // renderMeme()
}


function renderMeme() {
    const meme = getMeme()
    const { txt, size, color } = meme.lines[0]
    const imgUrl = getImgUrlByID(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = imgUrl


    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        meme.lines.forEach((line, idx) => {
            let y = (idx === 0) ? 50 : gElCanvas.height - 50
            drawTxt(line.txt, line.size, line.color, gElCanvas.width / 2, y)
        })
    }
}

function drawTxt(txt, size, color, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.textAlign = 'center'
    gCtx.font = `${size}px Impact`

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onTxtChange(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onColorChange(color) {
    setLineColor(color)
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onChangeFontSize(className) {
    switch (className) {
        case "btn-increase":
            setFontSize("increase")
            break;

        case "btn-decrease":
            setFontSize("decrease")
            break;
    }
    renderMeme()
}
