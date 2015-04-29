// thats is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function parseJSON(json) {
  console.log('parseJSON called with: ' + json);
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
            console.log('parseArray returning ', result);
            return result;
          } else if (ch === '"') {
            result.push(parse(json.slice(at)));
            console.log('result array is currently set to ', result);
          } else {
            var tmp = parse(json.slice(at));
            console.log('Interal parse returned: ', tmp);
            if (tmp !== undefined) {
              result.push(tmp);
              console.log('result array is currently set to ', result);
            }
          }
          if (ch === ']' && json.charAt(at + 1) !== ',') {
            console.log('parseArray returning ', result);
            return result;
          }
        }
      }
      throw new SyntaxError('Array closure missing.', 'parseJSON.js', 32);
  };
  var escapeChars = {
    '\\': '\\',
    '\s': '\s',
    '\r': '\r',
    '\t': '\t',
    '"': '"'
  };
  var parseString = function parseString() {
    var result = '';
    if (ch === '"') {
      while (at <= json.length) {
        next();
        if (ch === '"') {
          console.log('parseString returning ', result);
          return result;
        } else if (ch === '\\') {
          next();
          if (typeof escapeChars[ch] === 'string') {
            console.log('Found escape char: ', escapeChars[ch]);
            result += escapeChars[ch];
          }
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
          console.log('Main Parseobject Returning ', result);
          return result;
        } else if (ch === ':') {
          next();
          parseWhiteSpace();
          var tmp = parse(json.slice(at));
          console.log('Interal parse returned: ', tmp);
          if (tmp !== undefined) {
            console.log('Setting property ', prop, ' to ', tmp);
            result[prop] = tmp;
          }
        } else {
          prop = parseString();
        }
        if (ch === '}' && json.charAt(at + 1) !== ',') {
          console.log('***-> ', json.slice(at + 1));
          console.log('parseobject Returning ', result);
          return result;
        }
      }
      throw new SyntaxError();
    }
  };
  var parseWord = function parseWord() {
    if (ch === 'n') {
      if (json.slice(at, at+4) === 'null') {
        next();next();next();next();
        return null;
      }
    } else if (ch === 'f') {
      if (json.slice(at, at+5) === 'false') {
        next();next();next();next();next();
        return false;
      }
    } else if (ch === 't') {
      if (json.slice(at, at+4) === 'true') {
        next();next();next();next();
        return true;
      }
    }
  };

  var parseNumber = function parseNumber() {
    var result = '';
    while (ch === '-' || ch === '.' || (ch >= 0 && ch <= 9)) {
      if (ch === ',' || ch === ']' || ch === '}') {
        return +result;
      }
      result += ch;
      next();
    }
    return +result;
  };

  var parse = function parse() {
    while (at < json.length) {
      if (ch === ',') {
        next();
        parseWhiteSpace();
      }
      if (ch === '[') {
        return parseArray();
      } else if (ch === '{') {
        return parseObject();
      } else if (ch === '"') {
        return parseString();
      } else if (ch === 'n' || ch === 't' || ch === 'f') {
        return parseWord();
      } else if (ch === '-' || (ch >= 0 && ch <= 9)) {
        return parseNumber();
      }
      next();
    }
  };

  return parse();
};
