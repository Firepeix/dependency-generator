const fs = require("fs")

const DIR = ["src/mappers", "src/repositories", "src/services"]
const defaultRegister = [
    {
        imports: "import { ebisuClient } from 'boot/axios'",
        varname: 'axiosinstance',
        alias: "ebisuClient",
     }
]
const lines = []

async function getFiles() {
    const filesNames = []
    DIR.forEach(dir => {
        fs.readdir(dir, (_, subDirs) => {
            subDirs.forEach(subDir => {
                fs.readdir(`${dir}/${subDir}`, (_, files) => {
                    files.forEach(file => {
                        const fqdn = `${dir}/${subDir}/${file}`
                        filesNames.push({fqdn})
                    })
                })
            })
        })
    })

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(filesNames), 1000);
    });
}


function importSection(files) {
    const clazz = []
    files.forEach(file => {
        const name = file.fqdn.split("/").reverse()[0].replace(".js", "")
        clazz.push({name, ...file, varname: name.toLowerCase()})
        lines.push(`import ${name} from '${file.fqdn}'`)
    })
    defaultRegister.forEach(register => {
        clazz.push(register)
        lines.push(register.imports)
    })

    return clazz
}

function guessDependencies(classes) {
    const clazzes = []
    classes.forEach(clazz => {
        const dependencies = []
        if(clazz.imports === undefined) {
            const content = fs.readFileSync(clazz.fqdn, {encoding: "utf-8"})
            const requires = content.replaceAll("\n", "").match(/\*\*.*constructor/)
            if(requires != null) {
                requires[0].split("*").forEach(dependency => {
                    const dependencyClass = dependency.match(/\{.*\}/)
                    if(dependencyClass != null) {
                        const dependency = dependencyClass[0].replaceAll("{",  "").replaceAll("}", "").toLowerCase()
                        dependencies.push(dependency)
                    }
                })
            
            }
        }
        clazzes.push({...clazz, dependencies})
    })

    return clazzes
}

function instanciate(classes) {
    const instanciated = []
    const maxAttempts = 100
    let attempts = 0
    classes.filter(c => c.dependencies.length === 0).forEach(clazz => {
        instanciated.push(clazz)
        if(clazz.alias === undefined) {
            lines.push(`const ${clazz.name.toLowerCase()} = new ${clazz.name}()`)
        }
    })

    while(instanciated.length !== classes.length && attempts <= maxAttempts) {
        console.log(`Tentando resolver dependencias: ${attempts}`);
        const attempt = classes.filter(c => instanciated.find(i => c.varname === i.varname) === undefined)
        attempt.forEach(clazz => {
        const hasBeenFullfilled = clazz.dependencies.filter(d => instanciated.find(c => c.varname === d) === undefined).length === 0
            if (hasBeenFullfilled) {
                const dependencies = clazz.dependencies.map(d => {
                    const clazz = instanciated.find(c => c.varname == d)
                    return clazz.alias === undefined ? clazz.varname : clazz.alias
                })
                instanciated.push(clazz)
                lines.push(`const ${clazz.name.toLowerCase()} = new ${clazz.name}(${dependencies.join()})`)
            }
        })
        attempts++
    }

    return instanciated
}

function exportClasses(classes) {
    lines.push("")
    const names = classes.filter(c => c.alias == undefined).map(c => c.varname)
    lines.push(`export { ${names.join()} }`)
}

async function main() {
    const files = await getFiles()
    const classes = importSection(files)
    lines.push("")
    lines.push("/** ARQUIVO GERADO COM MAGIA NEGRA POR FAVOR NAO ALTERAR  */")
    lines.push("")
    exportClasses(instanciate(guessDependencies(classes)))
    fs.writeFileSync("src/dependencies.js", lines.join("\n"))
}

main()
