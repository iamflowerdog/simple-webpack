
const fs = require('fs');
const babylon = require('babylon');

module.exports = {
  getAST: (path) => {
    const resource = fs.readFileSync(path, 'utf-8');

    return babylon.parse(resource, {
      sourceType: 'module'
    })
  }
}