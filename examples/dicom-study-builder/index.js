const fs = require('fs');
const dicomStudyBuilder = require('../../src')
const path = require('path');
const ion = require("ion-js");

const main = async () => {

    const sopInstances = fs.readdirSync(process.argv[2]).map((file) => {
        //console.log(file);
        try {
            const bin = fs.readFileSync(path.join(process.argv[2], file))
            process.stdout.write(".")
            const instance = ion.load(bin)
            //console.log(instance)
            return instance
        } catch(ex) {
            console.log(ex + file)
        }
    });
    process.stdout.write("\n")

    console.log('building study....')
    const result = dicomStudyBuilder(sopInstances)
    fs.writeFileSync(path.join(process.argv[3], 'study.ion'), ion.dumpPrettyText(result), {encoding:'utf8'})
    console.log('done')
}

main()