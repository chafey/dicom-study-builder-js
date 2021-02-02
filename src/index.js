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
            normalizedObjects[key] = groupAttributes
        }
    })
    return normalizedObjects
}

const getOrCreateStudy = (studies, sopInstance) => {
    const studyUid = sopInstance.dataSet['StudyInstanceUID']
    let study = studies[studyUid]
    if(!study) {
        study = {}
        studies[studyUid] = study
    } 
    return study
}

const dicomStudyBuilder = (sopInstances) => {

    const studies = {}

    sopInstances.map((sopInstance) => {
        // create normalized objects
        const normalizedObjects = createNormalizedObjects(sopInstance)
        // add or create study object based on study uid
        const study = getOrCreateStudy(studies, sopInstance)
        // add normalized objects
        Object.keys(normalizedObjects).map((key) => {
            const groupAttributes = normalizedObjects[key]
            const digest = getHash(groupAttributes)
            if(!study[key]) {
                study[key] = {}
            }
            study[key][digest] = groupAttributes
        })
        // add instance specific data

    })

    return studies

}

module.exports = dicomStudyBuilder