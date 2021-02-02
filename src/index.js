const createNormalizedObjects = require('./createNormalizedObjects')

const getOrCreateStudy = (studies, sopInstance) => {
    const studyUid = sopInstance.dataSet['StudyInstanceUID']
    let study = studies[studyUid]
    if(!study) {
        study = {
            groups: {},
            series:{}
        }
        studies[studyUid] = study
    } 
    return study
}

const getOrCreateSeries = (study, sopInstance) => {
    const seriesUid = sopInstance.dataSet['SeriesInstanceUID']
    let series = study.series[seriesUid]
    if(!series) {
        series = {instances:{}}
        study.series[seriesUid] = series
    } 
    return series
}

const getOrCreateInstance = (series, sopInstance) => {
    const sopInstanceUid = sopInstance.dataSet['SOPInstanceUID']
    let instance = series.instances[sopInstanceUid]
    if(!instance) {
        instance = {_groups: []}
        series.instances[sopInstanceUid] = instance
    } 
    return instance
}


const dicomStudyBuilder = (sopInstances) => {
    const studies = {}

    sopInstances.map((sopInstance) => {
        // create normalized objects
        const normalizedObjects = createNormalizedObjects(sopInstance)
        // add or create study object based on study uid
        const study = getOrCreateStudy(studies, sopInstance)
        const series = getOrCreateSeries(study, sopInstance)
        const instance = getOrCreateInstance(series, sopInstance)
        // add normalized objects
        const keySet = new Set()
        Object.keys(normalizedObjects).map((key) => {
            const groupAttributes = normalizedObjects[key]
            study.groups[key] = {...study.groups[key], ...groupAttributes}
            const hash = Object.keys(groupAttributes)[0]
            instance._groups.push(hash)
            Object.keys(groupAttributes[hash]).map((attrKey) => {
                keySet.add(attrKey)
            })
        })

        Object.keys(sopInstance.dataSet._fields).map((key) => {
            if(!keySet.has(key)) {
                instance[key] = sopInstance.dataSet[key]
            }
        })
    })
    return studies
}

module.exports = dicomStudyBuilder