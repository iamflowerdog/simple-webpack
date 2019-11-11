
const path = require('path');
const { getAST } = require('./parser.js');

console.log(getAST(path.join(__dirname, '../src/index.js')));