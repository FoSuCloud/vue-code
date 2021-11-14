import parse from './parse.js'
const template  = `<div id="app"   class="cls other">
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>
`
const result = parse(template)
console.log(result)
