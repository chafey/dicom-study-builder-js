# dicom-study-builder-js
Ingestion logic for building a DICOM study from sop instances

Project Status: pre-release software, do not use yet

## Design Thoughts:

- take as input output from [dicom2ion](https://github.com/chafey/dicom2ion-js) for sop instances
- generate as output an ion document per study built from sop instances
- groups of related attributes will be clustered and can be referenced by individual sop instances
  - acts as a form of compression since there is a lot of data replication between sop instances
  - needed to support normalization and validation logic (e.g. different patient names)
    - normalization, validation and conflict resolution happens downstream (as it may requrie user input)

## Sample Output
```
{
  '1.3.6.1.4.1.5962.1.2.10.1166562673.14401': {
    groups: {
      patient: {
        '1ac8a6dd9a3db4b28555fd26f984e42649f46dd193697a64d1c5c9c0ea998ba4': {
          PatientName: "Perfusion^MCA Stroke",
          PatientID: "0010",
          PatientBirthDate: "19500704",
          PatientSex: "M"
        }
      },
      generalStudy: {
        c25201566e5125b010b55b50b680354ea5625b761767eab3720e4cb3ef7cbaf9: {
          StudyInstanceUID: "1.3.6.1.4.1.5962.1.2.10.1166562673.14401",
          StudyDate: "20061219",
          StudyTime: "111154.812",
          ReferringPhysicianName: "Thomas^Albert",
          StudyID: "0010",
          AccessionNumber: "0010",
          StudyDescription: null,
          NameOfPhysiciansReadingStudy: "Smith^John",
          PatientAge: "052Y",
          PatientSize: "1.6",
          PatientWeight: "75"
        }
      },
      generalSeries: {
        '422a047238b9689dc0c058f766606deb529a42eb1c85136139a37f15f787364d': {
          Modality: "CT",
          SeriesInstanceUID: "1.3.6.1.4.1.5962.1.3.10.3.1166562673.14401",
          SeriesNumber: "3",
          SeriesDate: "20061219",
          SeriesTime: "110929.984",
          PerformingPhysicianName: "Smith^John",
          SeriesDescription: null,
          OperatorsName: "Jones^Molly",
          PatientPosition: "HFS"
        }
      },
      frameOfReference: {
        a4c67e7812b62b44568592bdb32410e96ee8da21ffbf861abb6e7364552c4be9: {
          FrameOfReferenceUID: "1.3.6.1.4.1.5962.1.4.10.1.1166562673.14401",
          PositionReferenceIndicator: null
        }
      },
      generalEquipment: {
        c5a4eb1ebf73de8525df2637e92ccf61531c5ae4fa312e23c1e6f2e45deb0f91: {
          Manufacturer: "Acme Medical Devices",
          InstitutionName: "St. Nowhere Hospital",
          StationName: "CONSOLE01",
          ManufacturerModelName: "Super Dooper Scanner",
          DeviceSerialNumber: "123456",
          SoftwareVersions: "1.00"
        }
      },
      generalImage: {
        '73775625a469f20a12389b1795dfad53b1a2ca6966ad2718060a3283aa3caf46': {
          ContentDate: "20061219",
          ContentTime: "110930.671",
          ImageType: "DERIVED\\PRIMARY\\PERFUSION\\RCBF",
          BurnedInAnnotation: "NO",
          LossyImageCompression: "00",
          PresentationLUTShape: "IDENTITY",
          SOPClassUID: "1.2.840.10008.5.1.4.1.1.2.1",
          SpecificCharacterSet: "ISO_IR 100",
          InstanceCreationDate: "20061219",
          InstanceCreationTime: "202309"
        }
      },
      imagePixel: {
        '7ca4c0855fc8bbcf8e4de2a0d1ecad21978e1b615c08f23cd4172c014fe67e73': {
          TransferSyntaxUID: "1.2.840.10008.1.2.4.80",
          SamplesPerPixel: 1,
          PhotometricInterpretation: "MONOCHROME2",
          Rows: 512,
          Columns: 512,
          BitsAllocated: 16,
          BitsStored: 16,
          HighBit: 15,
          PixelRepresentation: 0
        }
      },
      colorLookupTable: {
        '4e08c9ff0c8aea67cb07819fd30ec08ff08c0cdc414fd093548eb63c034d8439': {
          RedPaletteColorLookupTableDescriptor: {{ZAAABBAA}},
          GreenPaletteColorLookupTableDescriptor: {{ZAAABBAA}},
          BluePaletteColorLookupTableDescriptor: {{ZAAABBAA}},
          RedPaletteColorLookupTableData: {{AAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEBAgIDAwRTB+MKcw4EEpQVJBm1HEUg1SNmJ/YqhS0WMaY0NzhUPHE/6EJ4RghKmU0CUR9USVfZWnZelWO0aNJtMnTge4+CPYrqkJiYR6D1p6OvUbf/vq3GW86i1bbcZOQS7MDzbfr+/j////////////8=}},
          GreenPaletteColorLookupTableData: {{AAEAAQABAAEAAQABAAEAAQABAAGAAQ8EBQZUCL4MUBGuFcsZ6h6VIycoRCxiMIE1njm9PttC+UcXTDZRVFVxWZBermLLZulqCHAldEN4Yn2AgJ+Fvordj/uUGpqHoDSn4a2btLu73MKWyUPQ8Nad3X7k9+qk8dz1+fkY//////////////////////////////////////////////////////////////////////////////////////////////////////8=}},
          BluePaletteColorLookupTableData: {{AAE9C3kUtx6VMENEvFc2a3wXN5Cjox23/sqd3bXo8/Mx/v////////////////////////////////////////////////////////////////////////////////////8L/3397/uR91Tuy+Qb22zSY8kmwF63rq5ypTac+ZLwiUGBRHkIcMtmj11TVBZL2kHEOBUwqCmJJGsfAx6SICIjWSeUL9E4DEGISTdSv1r9ZDtw+Xq4hPWONJpxpK+v7bnRxGjOpNc=}}
        }
      }
    },
    series: {
      '1.3.6.1.4.1.5962.1.3.10.3.1166562673.14401': {
        instances: {
          '1.3.6.1.4.1.5962.1.1.10.3.1.1166562673.14401': {
            _groups: [
              "1ac8a6dd9a3db4b28555fd26f984e42649f46dd193697a64d1c5c9c0ea998ba4",
              "c25201566e5125b010b55b50b680354ea5625b761767eab3720e4cb3ef7cbaf9",
              "422a047238b9689dc0c058f766606deb529a42eb1c85136139a37f15f787364d",
              "a4c67e7812b62b44568592bdb32410e96ee8da21ffbf861abb6e7364552c4be9",
              "c5a4eb1ebf73de8525df2637e92ccf61531c5ae4fa312e23c1e6f2e45deb0f91",
              "73775625a469f20a12389b1795dfad53b1a2ca6966ad2718060a3283aa3caf46",
              "7ca4c0855fc8bbcf8e4de2a0d1ecad21978e1b615c08f23cd4172c014fe67e73",
              "4e08c9ff0c8aea67cb07819fd30ec08ff08c0cdc414fd093548eb63c034d8439"
            ],
            SOPInstanceUID: "1.3.6.1.4.1.5962.1.1.10.3.1.1166562673.14401",
            InstanceNumber: "1",
            AcquisitionNumber: "1",
            PixelData: {
              dataOffset: 3920,
              length: 85608,
              sha256: "fc003556dfa33c59e59a9575f2eb8ed4a7cb5349a7159d0abf85fd8ab7948a6b",
              encapsulatedPixelData: true,
              basicOffsetTable: [
                0,
                46416
              ],
              fragments: [
                {
                  offset: 0,
                  position: 3944,
                  length: 46408
                },
                {
                  offset: 46416,
                  position: 50360,
                  length: 39160
                }
              ]
            },
            SourceApplicationEntityTitle: "CLUNIE1",
            ImplementationVersionName: "OFFIS_DCMTK_361",
            FileMetaInformationGroupLength: {{0AAAAA==}},
            FileMetaInformationVersion: {{AAE=}},
            MediaStorageSOPClassUID: "1.2.840.10008.5.1.4.1.1.2.1",
            MediaStorageSOPInstanceUID: "1.3.6.1.4.1.5962.1.1.10.3.1.1166562673.14401",
            ImplementationClassUID: "1.2.276.0.7230010.3.0.3.6.1",
            InstanceCreatorUID: "1.3.6.1.4.1.5962.3",
            TimezoneOffsetFromUTC: "-0500",
            ReferencedRawDataSequence: [
              {
                StudyInstanceUID: "1.3.6.1.4.1.5962.1.2.10.1166562673.14401",
                ReferencedSeriesSequence: [
                  {
                    SeriesInstanceUID: "1.3.6.1.4.1.5962.1.3.10.3.1166562673.14401",
                    ReferencedSOPSequence: [
                      {
                        ReferencedSOPClassUID: "1.2.840.10008.5.1.4.1.1.66",
                        ReferencedSOPInstanceUID: "1.3.6.1.4.1.5962.1.9.10.1.1166562673.14401"
                      }
                    ]
                  }
                ]
              }
            ],
            PixelPresentation: "COLOR",
            VolumetricProperties: "VOLUME",
            VolumeBasedCalculationTechnique: "NONE",
            ContrastBolusAgentSequence: [
              {
                CodeValue: "C-B0322",
                CodingSchemeDesignator: "SRT",
                CodeMeaning: "Iohexol",
                ContrastBolusAdministrationRouteSequence: [
                  {
                    CodeValue: "G-D101",
                    CodingSchemeDesignator: "SNM3",
                    CodeMeaning: "Intravenous route"
                  }
                ],
                ContrastBolusVolume: "150",
                ContrastBolusIngredientConcentration: "300",
                ContrastBolusAgentNumber: 1,
                ContrastBolusIngredientCodeSequence: [
                  {
                    CodeValue: "C-11400",
                    CodingSchemeDesignator: "SRT",
                    CodeMeaning: "Iodine"
                  }
                ]
              }
            ],
            ContentQualification: "PRODUCT",
            DimensionOrganizationSequence: [
              {
                DimensionOrganizationUID: "1.3.6.1.4.1.5962.1.6.10.3.0.1166562673.14401"
              }
            ],
            DimensionIndexSequence: [
              {
                DimensionOrganizationUID: "1.3.6.1.4.1.5962.1.6.10.3.0.1166562673.14401",
                DimensionIndexPointer: "00209056",
                FunctionalGroupPointer: "00209111"
              },
              {
                DimensionOrganizationUID: "1.3.6.1.4.1.5962.1.6.10.3.0.1166562673.14401",
                DimensionIndexPointer: "00209057",
                FunctionalGroupPointer: "00209111"
              }
            ],
            NumberOfFrames: "2",
            AcquisitionContextSequence: [
            ],
            SharedFunctionalGroupsSequence: [
              {
                CTImageFrameTypeSequence: [
                  {
                    FrameType: "DERIVED\\PRIMARY\\PERFUSION\\RCBF",
                    PixelPresentation: "COLOR",
                    VolumetricProperties: "VOLUME",
                    VolumeBasedCalculationTechnique: "NONE"
                  }
                ],
                ContrastBolusUsageSequence: [
                  {
                    ContrastBolusAgentNumber: 1,
                    ContrastBolusAgentAdministered: "YES",
                    ContrastBolusAgentDetected: "YES",
                    ContrastBolusAgentPhase: "DYNAMIC"
                  }
                ],
                IrradiationEventIdentificationSequence: [
                  {
                    IrradiationEventUID: "1.3.6.1.4.1.5962.1.10.10.3.1.1166562673.14401"
                  }
                ],
                FrameAnatomySequence: [
                  {
                    AnatomicRegionSequence: [
                      {
                        CodeValue: "T-A0100",
                        CodingSchemeDesignator: "SNM3",
                        CodeMeaning: "Brain"
                      }
                    ],
                    FrameLaterality: "U"
                  }
                ],
                PlaneOrientationSequence: [
                  {
                    ImageOrientationPatient: "-1.00000\\0.00000\\0.00000\\0.00000\\1.00000\\0.00000"
                  }
                ],
                PixelMeasuresSequence: [
                  {
                    PixelSpacing: "0.388672\\0.388672",
                    SliceThickness: "10.0000"
                  }
                ],
                FrameVOILUTSequence: [
                  {
                    WindowCenter: "49.0000",
                    WindowWidth: "102.000"
                  }
                ],
                PixelValueTransformationSequence: [
                  {
                    RescaleSlope: "1.00000",
                    RescaleIntercept: "-1024.00",
                    RescaleType: "US"
                  }
                ],
                RealWorldValueMappingSequence: [
                  {
                    LUTExplanation: "Regional Cerebral Blood Flow",
                    MeasurementUnitsCodeSequence: [
                      {
                        CodeValue: "ml/100ml/s",
                        CodingSchemeDesignator: "UCUM",
                        CodingSchemeVersion: "1.4",
                        CodeMeaning: "ml/100ml/s"
                      }
                    ],
                    LUTLabel: "RCBF",
                    RealWorldValueLastValueMapped: 4095,
                    RealWorldValueFirstValueMapped: 0,
                    RealWorldValueIntercept: -1024,
                    RealWorldValueSlope: 1
                  }
                ]
              }
            ],
            PerFrameFunctionalGroupsSequence: [
              {
                FrameContentSequence: [
                  {
                    StackID: "1",
                    InStackPositionNumber: {{AgAAAA==}},
                    FrameAcquisitionNumber: 1,
                    DimensionIndexValues: {{AQAAAAIAAAA=}}
                  }
                ],
                PlanePositionSequence: [
                  {
                    ImagePositionPatient: "99.5000\\-301.500\\-159.000"
                  }
                ]
              },
              {
                FrameContentSequence: [
                  {
                    StackID: "1",
                    InStackPositionNumber: {{AQAAAA==}},
                    FrameAcquisitionNumber: 1,
                    DimensionIndexValues: {{AQAAAAEAAAA=}}
                  }
                ],
                PlanePositionSequence: [
                  {
                    ImagePositionPatient: "99.5000\\-301.500\\-149.000"
                  }
                ]
              }
            ]
          }
        }
      }
    }
  }
}
```