import fs from 'fs'

const name = 'example-1a'
const configFile = './examples/example-1/config/config.json'
const targetHtmlFile = `./examples/example-1/config/${name}.html`
const targetCssFile = `./examples/example-1/config/${name}.css`

var object = null

if (fs.existsSync(configFile)) {
    const buffer = fs.readFileSync(configFile)
    const contents = buffer.toString()
    object = JSON.parse(contents)
}

const htmlString = () => {
    var htmlString = ''
    htmlString+= '<html><head>'
    htmlString+= `<link rel="stylesheet" type="text/css" href="${name}.css" />`
    htmlString+= '</head><body>'
    object.elements.forEach((element) => {
        htmlString+= `<div id="${element.name}">${element.isText ? element.textContent : ''}</div>`
    })
    htmlString+= '</body></html>'
    return htmlString
}

const cssString = () => {
    var cssString = ''
    object.elements.forEach((e) => {

        cssString+= `
            #${e.name} {
                /* position */
                position: absolute;
                ${e.style.position && e.style.position.top ? `top: ${e.style.position.top};` : '' }
                ${e.style.position && e.style.position.left ? `left: ${e.style.position.left};` : '' }
                /* dimensions */
                ${e.style.dimensions && e.style.dimensions.width ? `width: ${e.style.dimensions.width};` : '' }
                ${e.style.dimensions && e.style.dimensions.height ? `height: ${e.style.dimensions.height};` : '' }
                /* colors */
                ${e.style.colors && e.style.colors.color ? `color: ${e.style.colors.color};` : '' }
                ${e.style.colors && e.style.colors["background-color"] ? `background-color: ${e.style.colors["background-color"]};` : '' }
                /* typography */
                ${e.style.typography && e.style.typography["font-family"] ? `font-family: ${e.style.typography["font-family"]};` : '' }
                ${e.style.typography && e.style.typography["font-size"] ? `font-size: ${e.style.typography["font-size"]};` : '' }
                ${e.style.typography && e.style.typography["font-weight"] ? `font-weight: ${e.style.typography["font-weight"]};` : '' }
                ${e.style.typography && e.style.typography["line-height"] ? `line-height: ${e.style.typography["line-height"]};` : '' }
                ${e.style.typography && e.style.typography["letter-spacing"] ? `letter-spacing: ${e.style.typography["letter-spacing"]};` : '' }
                ${e.style.typography && e.style.typography["font-align"] ? `font-align: ${e.style.typography["font-align"]};` : '' }
                /* borders */
                ${e.style.borders && e.style.borders["border-radius"] ? `border-radius: ${e.style.borders["border-radius"]};` : '' }
                /* transform */
                ${e.style.transform && e.style.transform["text-transform"] ? `text-transform: ${e.style.transform["text-transform"]};` : '' }
            }
        `
    })
    return cssString
}

const createHtmlFile = () => {
    return fs.writeFileSync(targetHtmlFile, htmlString())
}

const createCssFile = () => {
    return fs.writeFileSync(targetCssFile, cssString())
}

createHtmlFile()
createCssFile()