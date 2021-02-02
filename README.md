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
    patient: {
      e1ff243ecd33bd5a7b7d82cd2ef1810d834a930c38dbd455db9bf9f63cb4168c: {
        PatientName: "Perfusion^MCA Stroke",
        PatientBirthDate: "19500704",
        PatientSex: "M"
      }
    },
    generalStudy: {
      debb01b1ab970ee9fecf3f6d28f6e52e034f3c4ab02b68a32ba014e28916fc38: {
        StudyInstanceUID: "1.3.6.1.4.1.5962.1.2.10.1166562673.14401",
        StudyDate: "20061219",
        StudyTime: "111154.812",
        ReferringPhysicianName: "Thomas^Albert",
        StudyID: "0010",
        AccessionNumber: "0010",
        StudyDescription: null,
        NameOfPhysiciansReadingStudy: "Smith^John"
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
      '2990b433cc9fd3f8060a0ea40b6363b34dd2b9e0ce83d356775ff3b401d5a0c0': {
        ContentDate: "20061219",
        ContentTime: "110930.671",
        ImageType: "DERIVED\\PRIMARY\\PERFUSION\\RCBF",
        BurnedInAnnotation: "NO",
        LossyImageCompression: "00",
        PresentationLUTShape: "IDENTITY"
      }
    },
    imagePixel: {
      '3fbdc0c9687aab01d3817663cacd3fed1ead1ee1cebe7d6a77f5a84f44191a99': {
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
  }
}
```