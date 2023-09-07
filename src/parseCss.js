import css from 'css'
import fs from 'fs'

const setDynamicRatio = (declaration) => {
    declaration.value = `calc(${declaration.value} * var(--ratio))`
}

const addPositionAbsolute = (array) => {
    const declaration = {
        type: 'declaration',
        property: 'position',
        value: 'absolute'
    }
    array.declarations.push(declaration)
}

const addImageDeclarations = (declarations) => {
    const imageDeclarations = [
        {
            type: 'declaration',
            property: 'background-size',
            value: 'cover'
        },
        {
            type: 'declaration',
            property: 'background-repeat',
            value: 'no-repeat'
        },
        {
            type: 'declaration',
            property: 'background-repeat',
            value: 'center center'
        }
    ]
    imageDeclarations.forEach((declaration) => {
        declarations.push(declaration)
    })
}

const addPtagRule = (rules) => {
    const rule = {
        type: 'rule',
        selectors: ['p'],
        declarations: [{
            type: 'declaration',
            property: 'position',
            value: 'relative !important'
        }]
    }
    rules.push(rule)
}

const folders = ['example-1', 'example-2', 'example-3']

folders.forEach((folder) => {

    const files = ['desktop.css', 'mobile.css', 'tablet.css']

    files.forEach((file) => {

        const filePath = `./examples/${folder}/css/_${file}`

        if (fs.existsSync(filePath)) {

            const buffer = fs.readFileSync(`./examples/${folder}/css/_${file}`)
            const fileContents = buffer.toString()

            var options = {}
            var object = css.parse(fileContents, options)
            var rules = object.stylesheet.rules

            // add P tag rule
            addPtagRule(rules)

            rules.forEach((rule, ruleIndex) => {

                // don't apply dynamic var to container
                var isContainer = false
                if(rule.selectors[0] == '#container') {
                    isContainer = true
                }

                // add position absolute
                addPositionAbsolute(rules[ruleIndex])

                // change position absolute for P tags
                var isPtag = false
                if(rule.selectors[0] == [ 'p' ]) {
                    isPtag = true
                }
                
                var declarations = rule.declarations
                declarations.forEach((declaration, declarationIndex) => {

                    // change for P tags
                    if(isPtag && declaration.property == 'position' && declaration.value == 'absolute') {
                        declarations.splice(declarationIndex, 1)
                    }

                    // set dynamic ratio for these CSS props:
                    const allPropsArray = [
                        // positions
                        'top', 'left', 'width', 'height',
                        // fonts
                        'font-size', 'line-height', 'letter-spacing'
                    ]
                    const allProps = declaration.type == 'declaration' && allPropsArray.includes(declaration.property) && !isContainer
                    if (allProps) {
                        setDynamicRatio(declaration)
                    }

                    // add background image rules
                    const imagePropsArray = ['background-image']
                    const imageProps = declaration.type == 'declaration' && imagePropsArray.includes(declaration.property) && !isContainer
                    if(imageProps) {
                        addImageDeclarations(declarations)
                    }
                })
            })

            var ASTobject = {
                type: 'stylesheet',
                stylesheet: {
                    source: undefined,
                    rules: rules,
                    /* rules: [
                        {
                            type: 'rule',
                            selectors: [ '#text' ],
                            declarations: [
                                {
                                    type: 'declaration',
                                    property: 'font-size',
                                    value: '22px'
                                }
                            ],
                        }
                    ] */
                    parsingErrors: []
                }
            }
            var string = css.stringify(ASTobject)

            fs.writeFileSync(`./examples/${folder}/css/${file}`, string)
        }
    })
})
