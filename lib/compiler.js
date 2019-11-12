
const fs = require('fs');
const path = require('path');
const { getAST, getdependencies, transform } = require('./parser');

module.exports = class Compiler {

  constructor (options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run () {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    // 循环遍历每个入口module的依赖，然后
    this.modules.forEach((_module) => {
      _module.dependencies.forEach((dependencies) => {
        this.modules.push(this.buildModule(dependencies));
      })
    })
    this.emitFiles();
  }

  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      // 不是入口文件的 需要补全到绝对路径
      let absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath);
    }

    return {
      filename,
      dependencies: getdependencies(ast),
      transformCode: transform(ast)
    }
  }

  emitFiles () {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';
    this.modules.forEach((_module) => {
      modules += `'${ _module.filename }': function (require, module, exports) { ${ _module.transformCode } },`
    });
    const bundle = `
      (function(modules) {
                function require(fileName) {
                    const fn = modules[fileName];

                    const module = { exports : {} };

                    fn(require, module, module.exports);

                    return module.exports;
                }
                require('${this.entry}');
            })({${modules}})
    `;
    fs.writeFileSync(outputPath, bundle, 'utf-8')
  }
}