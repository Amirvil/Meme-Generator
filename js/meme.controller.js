'use strict'

var gElCanvas
var gCtx

function onInitEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    renderMeme()
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    onClearCanvas()
    const meme = getMeme()
    const imgUrl = getImgUrlByID(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = imgUrl
    reasizeCanvas(elImg.height, elImg.width)

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            const { txt, size, color, pos } = line
            gCtx.font = `${size}px Impact`
            line.width = gCtx.measureText(txt).width

            drawTxt(txt, size, color, pos.x, pos.y)

            if (idx === meme.selectedLineIdx) {
                drawTxtFrame(txt, size, pos.x, pos.y)
            }
        })
    }
}

function renderInputs() {
    const meme = getMeme()
    const elTxtInput = document.querySelector('.input-txt')
    const elClrInput = document.querySelector('.input-clr')
    if (meme.selectedLineIdx !== -1) {
        const currentLine = meme.lines[meme.selectedLineIdx]
        elTxtInput.value = currentLine.txt
        elClrInput.value = currentLine.color
    }
    else {
        elTxtInput.value = ''
        elClrInput.value = '#000000'
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

function onAddLine() {
    const elClrInput = document.querySelector('.input-clr')
    setNewLine(elClrInput.value, gElCanvas.width, gElCanvas.height)
    renderMeme()
    renderInputs()
}

function onSwitchLine() {
    setSwitchLine()
    renderMeme()
    renderInputs()
}

function drawTxtFrame(txt, size, x, y) {
    gCtx.font = `${size}px Impact`
    const textWidth = gCtx.measureText(txt).width

    const padding = 10
    const width = textWidth + (padding * 2)
    const height = size + (padding * 2)

    const rectX = x - (width / 2)
    const rectY = y - (height / 1.5)

    gCtx.beginPath()
    gCtx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    gCtx.fillRect(rectX, rectY, width, height)
}

function addListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
}

function onDown(ev) {
    const { offsetX, offsetY } = ev
    console.log(offsetX, offsetY)
    const pos = { x: offsetX, y: offsetY }
    isLineClicked(pos)
    renderMeme()
    renderInputs()
}

function showGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')

    elGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')

    renderMeme()
}

function reasizeCanvas(imgHeight, imgWidth) {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = imgHeight * gElCanvas.width / imgWidth
}

