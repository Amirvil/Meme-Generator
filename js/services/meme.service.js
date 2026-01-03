'use strict'

var gImgs = [
    { id: 1, url: '/images/2.jpg', keywords: [] },
    { id: 2, url: '/images/5.jpg', keywords: [] }
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
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
    gMeme.lines[0].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineColor(color) {
    gMeme.lines[0].color = color
}

function setFontSize(direction) {
    switch (direction) {
        case "increase":
            gMeme.lines[0].size += 1
            break;

        case "decrease":
            gMeme.lines[0].size -= 1
            break;
    }
}