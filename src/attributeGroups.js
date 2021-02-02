
const patient = [
    'PatientName',
    'PatientID',
    'PatientBirthDate',
    'PatientSex',
    // TODO: Quality Control Subject
    'ReferencedPatientSequence',
    'PatientBirthTime',
    'OtherPatientIDs',
    'OtherPatientIDsSequence',
    'OtherPatientNames',
    'EthnicGroup',
    'PatientComments',
    'PatientSpeciesDescription',
    'PatientSpeciesCodeSequence',
    'PatientBreedDescription',
    'PatientBreedCodeSequence',
    'BreedRegistrationSequence',
    'ResponsiblePerson',
    'ResponsiblePersonRole',
    'ResponsibleOrganization',
    'PatientIdentityRemoved',
    'DeidentificationMethod',
    'DeidentificationMethodCodeSequence'
]

const clinicalTrialSubject = [
]

const generalStudy = [
    'StudyInstanceUID',
    'StudyDate',
    'StudyTime',
    'ReferringPhysicianName',
    'ReferringPhysicianIdentificationSequence',
    'StudyID',
    'AccessionNumber',
    'IssuerOfAccessionNumberSequence',
    'StudyDescription',
    'PhysiciansOfRecord',
    'PhysiciansOfRecordIdentificationSequence',
    'NameOfPhysiciansReadingStudy',
    'PhysiciansReadingStudyIdentificationSequence',
    'RequestingServiceCodeSequence',
    'ReferencedStudySequence',
    'ProcedureCodeSequence',
    'ReasonForPerformedProcedureCodeSequence',

    // Extra
    'PatientAge',
    'PatientSize',
    'PatientWeight',
]

const patientStudy = [
]

const clinicalTrialStudy = [
]

const generalSeries = [
    'Modality',
    'SeriesInstanceUID',
    'SeriesNumber',
    'Laterality',
    'SeriesDate',
    'SeriesTime',
    'PerformingPhysicianName',
    'PerformingPhysicianIdentificationSequence',
    'PerformingPhysicianIdentificationSequence',
    'SeriesDescription',
    'SeriesDescriptionCodeSequence',
    'OperatorsName',
    'OperatorIdentificationSequence',
    'ReferencedPerformedProcedureStepSequence',
    'RelatedSeriesSequence',
    'BodyPartExamined',
    'PatientPosition',
    'SmallestPixelValueInSeries',
    'LargestPixelValueInSeries',
    'RequestAttributesSequence',
    'AnatomicalOrientationType',

]

const clinicalTrialSeries = [
]

const enhancedSeries = []

const frameOfReference = [
    'FrameOfReferenceUID',
    'PositionReferenceIndicator',
]

const synchronization = []

const generalEquipment = [
    'Manufacturer',
    'InstitutionName',
    'InstitutionAddress',
    'StationName',
    // TODO 'Institutional Department Name', - missing
    'ManufacturerModelName',
    'DeviceSerialNumber',
    'SoftwareVersions',
    'GantryID',
    'SpatialResolution',
    'DateOfLastCalibration',
    'TimeOfLastCalibration',
    'PixelPaddingValue'
]

const enhancedGeneralEquipment = []

const generalImage = [
    // InstanceNumber = varies
    'PatientOrientation',
    //'ContentDate', - varies
    //'ContentTime', - varies
    'ImageType',
    // Acquisition Number - varies
    //'AcquisitionDate', - varies
    //'AcquisitionTime', - varies
    //'AcquisitionDateTime', - varies
    // ReferencedImageSequence
    'DerivationDescription',
    'DerivationCodeSequence',
    // SourceImageSequence - varies
    // ReferencedImageSequence - varies
    'ImagesInAcquisition',
    'ImageComments',
    'QualityControlImage',
    'BurnedInAnnotation',
    'RecognizableVisualFeatures',
    'LossyImageCompression',
    // LossyImageCompressionRatio - varies
    'LossyImageCompressionMethod',
    // IconImageSequence - varies
    'PresentationLUTShape',
    // IrradiationEventUID - varies??
    // RealWorldValueMappingSequence - ??

    'SOPClassUID',
    'SpecificCharacterSet',
    'InstanceCreationDate',
    'InstanceCreationTime'
]

const imagePlane = [
    'PixelSpacing',
    'ImageOrientationPatient',
    // ImagePositionPatient, - varies
    'SliceThickness',
    // SliceLocation - varies
]

const imagePixel = [
    'TransferSyntaxUID',
    'SamplesPerPixel',
    'PhotometricInterpretation',
    'Rows',
    'Columns',
    'BitsAllocated',
    'BitsStored',
    'HighBit',
    'PixelRepresentation',
    //PixelData - varies
    'PlanarConfiguration',
    'PixelAspectRatio',
    //'SmallestPixelValue' - varies
    //LargestImagePixelValue - varies
    'ICCProfile'
]

const colorLookupTable = [
    'RedPaletteColorLookupTableDescriptor',
    'GreenPaletteColorLookupTableDescriptor',
    'BluePaletteColorLookupTableDescriptor',
    'RedPaletteColorLookupTableData',
    'GreenPaletteColorLookupTableData',
    'BluePaletteColorLookupTableData',
]

const attributeGroups = {
    patient,
    clinicalTrialSubject,
    generalStudy,
    patientStudy,
    clinicalTrialStudy,
    generalSeries,
    clinicalTrialSeries,
    enhancedSeries,
    frameOfReference,
    synchronization,
    generalEquipment,
    enhancedGeneralEquipment,
    generalImage,
    imagePlane,
    imagePixel,
    colorLookupTable
}

module.exports = attributeGroups
