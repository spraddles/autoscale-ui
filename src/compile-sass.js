import * as sass from 'sass'
import fs from 'fs'

const result = sass.compile(`./src/_index.scss`, {
  // options
  style: 'compressed',
  sourceMap: false,
  verbose: false,
})

fs.writeFile(`./public/compiled.css`, result.css, (err) => {
  if (err) {
    console.error(err)
  }
})