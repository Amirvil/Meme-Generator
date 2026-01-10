'use strict'

var gElCanvas
var gCtx
var gStartPos

function onInitEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    initButtons()
    renderInputs()
    renderMeme()
}

function initButtons() {
    const buttons = document.querySelectorAll('.inputs-container button')
    buttons.forEach(button => {
        const imgUrl = `images/buttons/${button.className}.svg`
        button.style.backgroundImage = `url(${imgUrl})`
        button.style.backgroundRepeat = "no-repeat";
        button.style.backgroundPosition = "center";
        button.style.backgroundSize = "70%";
    })
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
    resizeCanvas(elImg.height, elImg.width)

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            const { txt, size, color, pos, font } = line
            document.fonts.load(`${size}px ${font}`).then(() => {
                gCtx.font = `${size}px ${font}`
                line.width = gCtx.measureText(txt).width

                drawTxt(txt, size, color, pos.x, pos.y, font)

                if (idx === meme.selectedLineIdx) {
                    drawTxtFrame(txt, size, pos.x, pos.y, font)
                }
            })

        })
    }
}

function resizeCanvas(imgHeight, imgWidth) {
    gElCanvas.height = imgHeight * gElCanvas.width / imgWidth
}

function renderInputs() {
    const elTxtInput = document.querySelector('.input-line')
    const elClrInput = document.querySelector('.input-clr')
    if (gMeme.selectedLineIdx !== -1) {
        const currentLine = gMeme.lines[gMeme.selectedLineIdx]
        elTxtInput.value = currentLine.txt
        elClrInput.value = currentLine.color
    }
    else {
        elTxtInput.value = ''
        elClrInput.value = '#000000'
    }
}

function drawTxt(txt, size, color, x, y, font) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.textAlign = 'center'
    gCtx.font = `${size}px ${font}`

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onTxtChange(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onColorChange(color) {
    const elClrInput = document.querySelector('.input-clr')
    console.log(elClrInput)
    elClrInput.style.setProperty('color', color, 'imprtant')
    setLineColor(color)
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onChangeFontSize(direction) {
    setFontSize(direction)
    renderMeme()
}

function onSetMove(direction) {
    setMove(direction)
    renderMeme()
}

function onSetTextAlign(align) {
    setTextAlign(align)
    renderMeme()
}

function onAddLine() {
    const elClrInput = document.querySelector('.input-clr')
    const elFontInput = document.querySelector('.select-font')
    setNewLine(elClrInput.value, gElCanvas.width, gElCanvas.height, elFontInput.value)
    renderInputs()
    renderMeme()
}

function onSwitchLine() {
    setSwitchLine()
    renderInputs()
    renderMeme()

}

function onDeleteLine() {
    setDeleteLine()
    renderInputs()
    renderMeme()
}

function drawTxtFrame(txt, size, x, y, font) {
    gCtx.font = `${size}px ${font}`
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

function showGallery() {
    onUpdateNav('gallery')
    closeMenuMobile()
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
    elGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')
}

function addListeners() {
    // Mouse Events
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)

    // Touch Events
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return

    gMeme.lines[gMeme.selectedLineIdx].isDrag = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderInputs()
    renderMeme()
}

function onMove(ev) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line || !line.isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (line) line.isDrag = false
    document.body.style.cursor = 'default'
    renderInputs()
    renderMeme()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onShare(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    uploadImg(canvasData, onSuccess)
}

function onUpdateNav(pageName) {
    const elLinks = document.querySelectorAll('.main-nav a')
    elLinks.forEach(elLink => {
        const isMatch = elLink.innerText.toLowerCase() === pageName.toLowerCase()
        elLink.classList.toggle('active', isMatch)
    })
}

function closeMenuMobile() {
    if (window.innerWidth <= 660) {
        document.body.classList.remove('menu-open')
    }
}



