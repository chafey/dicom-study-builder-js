const createNormalizedObjects = require('./createNormalizedObjects')

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
            if(!study[key]) {
                study[key] = {}
            }
            study[key] = {...study[key], groupAttributes}
        })
        // add instance specific data

    })

    return studies

}

module.exports = dicomStudyBuilder