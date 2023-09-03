import css from 'css'
import fs from 'fs'

const folders = ['example-1', 'example-2', 'example-3']

folders.forEach((folder, folderIndex) => {

    const files = ['desktop.css', 'mobile.css', 'tablet.css']

    files.forEach((file, fileIndex) => {

        const filePath = `./examples/${folder}/css/_${file}`

        if (fs.existsSync(filePath)) {

            const buffer = fs.readFileSync(`./examples/${folder}/css/_${file}`)
            const fileContents = buffer.toString()

            var options = {}
            var object = css.parse(fileContents, options)
            var rules = object.stylesheet.rules

            rules.forEach((rule, ruleIndex) => {

                // don't apply dynamic var to container
                var isContainer = false
                if(rule.selectors[0] == '#container') {
                    isContainer = true
                }

                var declarations = rule.declarations
                declarations.forEach((declaration, declarationIndex) => {
                    // set var
                    const properties = [ 'top', 'left', 'width', 'height' ]
                    if(declaration.type == 'declaration' && properties.includes(declaration.property) && !isContainer) {
                        declaration.value = `calc(${declaration.value} * var(--dynamicContainerRatio))`
                    }

                })
                // add position absolute
                const declaration = {
                    type: 'declaration',
                    property: 'position',
                    value: 'absolute'
                }
                declarations.push(declaration)
            })

            var ASTobject = {
                type: 'stylesheet',
                stylesheet: {
                    source: undefined,
                    rules: rules,
                    parsingErrors: []
                }
            }
            var string = css.stringify(ASTobject)

            fs.writeFileSync(`./examples/${folder}/css/${file}`, string)
        }
    })
})