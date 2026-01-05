'use strict'

const gImgs = []
const imgCount = 25

var gKeywordSearchCountMap = {}

function createGallery() {

    for (let i = 1; i <= imgCount; i++){
        gImgs.push({
            id: i,
            url: `images/${i}.jpg`,
            keywords: []
        })
    }
}

function getImgs() {
    createGallery()
    return gImgs
}

function getImgUrlByID(id) {
    const selectedImg = gImgs.find(img => img.id === id)
    return selectedImg.url
}

