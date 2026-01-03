'use strict'

var gImgs = [
    { id: 1, url: '/images/2.jpg', keywords: [] },
    { id: 2, url: '/images/5.jpg', keywords: [] }
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: '#000000'
        },
        {
            txt: 'Wow!',
            size: 20,
            color: '#000000'
        }
    ]
}
var gKeywordSearchCountMap = {}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getImgUrlByID(id) {
    const selectedImg = gImgs.find(img => img.id === id)
    return selectedImg.url
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

function setNewLine(color) {
    const newLine = {
        txt: 'This is your new line',
        size: 20,
        color: color
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