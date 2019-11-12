
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
  getAST: (path) => {
    const resource = fs.readFileSync(path, 'utf-8');

    return babylon.parse(resource, {
      sourceType: 'module'
    });
  },
  getDependencis: (ast) => {
    const dependencis = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencis.push(node.source.value);
      }
    });
    return dependencis;
  },
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env']
    })

    return code;
  }
}