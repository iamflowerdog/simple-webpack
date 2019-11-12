
const path = require('path');
const { getAST, getDependencis, transform } = require('./parser.js');

// 获取 ../src/index.js 的 abstract syntax tree
const ast = getAST(path.join(__dirname, '../src/index.js'))

// getDependencis(ast) 获取当前 ast 的所有依赖
const dependencis = getDependencis(ast);

// 把ast转换成源码
const source = transform(ast);

console.log(source);