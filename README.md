## simple webpack demo

#### 利用 `babylon` 来解析语法树AST: abstract syntax tree
* 解析后的 ast 
```
  Node {
    type: 'File',
    start: 0,
    end: 80,
    loc: SourceLocation {
      start: Position { line: 1, column: 0 },
      end: Position { line: 4, column: 36 }
    },
    program: Node {
      type: 'Program',
      start: 0,
      end: 80,
      loc: SourceLocation { start: [Position], end: [Position] },
      sourceType: 'module',
      body: [ [Object], [Node] ],
      directives: [ [Object] ],
      _letDone: true
    },
    comments: [],
    tokens: [
      Token {
        type: [KeywordTokenType],
        value: 'import',
        start: 1,
        end: 7,
        loc: [SourceLocation]
      },
      Token {
        type: [TokenType],
        value: undefined,
        start: 80,
        end: 80,
        loc: [SourceLocation]
      }
    ]
  }

```
* 获取ast的所有依赖
`[ './greeting.js' ]`
* 把ast转换成源码 source
```
  "use strict";

  var _greeting = require("./greeting.js");

  document.write((0, _greeting.greeting)('hua gou'));
```
#### compiler 
* buildModule 返回的数据格式
```
  {
    filename: '/Users/yang/Code/simple-webpack/src/index.js',
    dependencies: [ './greeting.js' ],
    transformCode: '"use strict";\n' +
      '\n' +
      'var _greeting = require("./greeting.js");\n' +
      '\n' +
      "document.write((0, _greeting.greeting)('hua gou'));"
  }
```

