const Compiler = require('./compiler.js');
const options = require('../simplepack.config.js');

let test = new Compiler(options).run();
console.log(test);