const attributeGroups = require('./attributeGroups')
const getHash = require('./getHash')

const createNormalizedObjects = (sopInstance) => {
    const normalizedObjects = {}
    Object.keys(attributeGroups).map((key) => {
        const group = attributeGroups[key]
        const groupAttributes = {}
        let numMapped = 0
        group.map((keyword)=> {
            const attr = sopInstance.dataSet[keyword]
            if(attr) {
                groupAttributes[keyword] = attr
                numMapped++
            }
        })
        if(numMapped) {
            const digest = getHash(groupAttributes)
            normalizedObjects[key] = {}
            normalizedObjects[key][digest] = groupAttributes
        }
    })
    return normalizedObjects
}

module.exports = createNormalizedObjects