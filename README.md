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

[Click Here](study.ion)
