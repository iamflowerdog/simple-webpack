
const path = require('path');
const { getAST, getdependencies, transform } = require('./parser.js');

// 获取 ../src/index.js 的 abstract syntax tree
const ast = getAST(path.join(__dirname, '../src/index.js'))

// getdependencies(ast) 获取当前 ast 的所有依赖
const dependencies = getdependencies(ast);

// 把ast转换成源码
const source = transform(ast);

console.log(dependencies);