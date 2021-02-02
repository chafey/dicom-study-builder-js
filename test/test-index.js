const assert = require('assert')
const dicomStudyBuilder = require('../src/index')
const fs = require('fs')
const path = require('path')
const ion = require("ion-js");
const util = require('util')

const loadIon = (path) => {
    const data = fs.readFileSync(path)
    return ion.load(data)
}

describe('index', async () => {

    before(async() => {
    })

    it('exports', async () => {
        // Arrange

        // Act

        // Assert
        assert.notStrictEqual(dicomStudyBuilder, undefined)
    })

    it('exports', async () => {
        // Arrange
        const sopInstance = loadIon('test/fixtures/image.ion')

        // Act
        const output = dicomStudyBuilder([sopInstance])
        let ionText = ion.dumpPrettyText(output)
        console.log(ionText)

        // Assert
        assert.notStrictEqual(dicomStudyBuilder, undefined)
    })


})
