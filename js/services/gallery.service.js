'use strict'

var gImgs = [
    { id: 1, url: '/images/2.jpg', keywords: [] },
    { id: 2, url: '/images/5.jpg', keywords: [] }
]

var gKeywordSearchCountMap = {}

function getImgs() {
    return gImgs
}

function getImgUrlByID(id) {
    const selectedImg = gImgs.find(img => img.id === id)
    return selectedImg.url
}

