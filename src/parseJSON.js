// thats is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function parseJSON(json) {
  console.log('parseJSON called with: ' + json);
  var parsedResult; // parse result
  var at = 0;
  var ch = json[at];

  var next = function next(c) {
    if (at < json.length) {
      at++;
      ch = json.charAt(at);
      return ch;
    } else {
      throw new SyntaxError();
    }
  };
  var parseArray = function parseArray() {
      var result = [];
      if (ch === '[') {
        while (at < json.length) {
          next();
          parseWhiteSpace();
          if (ch === ']') {
            return result;
          } else {
            result.push(parseJSON(json.slice(at)));
          }
        }
      }
      throw new SyntaxError('Array closure missing.', 'parseJSON.js', 32);
  };
  var parseString = function parseString() {
    var result = '';
    if (ch === '"') {
      while (at < json.length) {
        next();
        parseWhiteSpace();
        if (ch === '"') {
          return result;
        } else {
          result += ch;
        }
      }
      throw new SyntaxError();
    }

  };
  var parseWhiteSpace = function parseWhiteSpace() {
    while (ch === ' ') {
      console.log('parsing whitespace.');
      next();
    }
  };
  var parseObject = function parseObject() {
    var result = {};
    var prop;
    if (ch === '{') {
      while (at < json.length) {
        next();
        parseWhiteSpace();
        if (ch === '}') {
          return result;
        } else if (ch === ':') {
          next();
          parseWhiteSpace();
          result[prop] = parseString();
        } else if (ch === ',') {
          next();
          parseWhiteSpace();
        } else if (ch === '"') {
          // Parse property here
          prop = parseString();
        }
      }
      throw new SyntaxError();
    }
  };

  while (at < json.length) {
    if (ch === '[') {
      parsedResult = parseArray();
    } else if (ch === '{') {
      parsedResult = parseObject();
    } else if (ch === '"') {
      parsedResult = parseString();
    }
    next();
  }

  return parsedResult;
};
