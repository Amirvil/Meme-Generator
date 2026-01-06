'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: []
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(direction) {
    switch (direction) {
        case 'increase':
            gMeme.lines[gMeme.selectedLineIdx].size += 1
            break;

        case 'decrease':
            gMeme.lines[gMeme.selectedLineIdx].size -= 1
            break;
    }
}

function setMove(direction) {
    const idx = gMeme.selectedLineIdx

    if (idx === -1 || !gMeme.lines[idx]) return

    const line = gMeme.lines[idx]
    const MOVE_STEP = 5

    switch (direction) {
        case "left":
            line.pos.x -= MOVE_STEP;
            break;
        case "up":
            line.pos.y -= MOVE_STEP;
            break;
        case "down":
            line.pos.y += MOVE_STEP;
            break;
        case "right":
            line.pos.x += MOVE_STEP;
            break;
    }

}



function setNewLine(color, canvasWidth, canvasHeight) {
    const newLine = {
        txt: 'This is your new line',
        size: 20,
        color: color,
        pos: { x: canvasWidth / 2, y: canvasHeight / 2 },
        width: 0,
        isDrag: false
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function setSwitchLine() {
    gMeme.selectedLineIdx++

    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = -1
        const elTxtInput = document.querySelector('.input-txt')
        elTxtInput.value = ''
    }
}

function setDeleteLine() {
    if (gMeme.selectedLineIdx === -1 || gMeme.lines.length === 0) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = -1
}

function setTextAlign(align) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line) return

    switch (align) {
        case 'left':
            line.pos.x = 5 + line.width / 2
            break;
        case 'center':
            line.pos.x = gElCanvas.width / 2
            break;
        case 'right':
            line.pos.x = gElCanvas.width - 5 - line.width / 2
            break;
    }
}

function isLineClicked(clickedPos) {
    const clickedLineIdx = gMeme.lines.findIndex(line => {
        return (
            clickedPos.x >= line.pos.x - line.width / 2 &&
            clickedPos.x <= line.pos.x + line.width / 2 &&
            clickedPos.y >= line.pos.y - line.size &&
            clickedPos.y <= line.pos.y + line.size
        )
    })
    gMeme.selectedLineIdx = clickedLineIdx
    return (gMeme.selectedLineIdx >= 0) ? true : false
}

function moveLine(dx, dy) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.pos.x += dx
    line.pos.y += dy
}