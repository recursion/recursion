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
          if (ch === ']') {
            console.log('parseArray returning ', result);
            return result;
          }
        }
      }
      throw new SyntaxError('Array closure missing.', 'parseJSON.js', 32);
  };
  var parseString = function parseString() {
    var result = '';
    if (ch === '"') {
      while (at <= json.length) {
        next();
        parseWhiteSpace();
        if (ch === '"') {
          console.log('parseString returning ', result);
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
          console.log('parseobject Returning ', result);
          return result;
        } else if (ch === ':') {
          next();
          parseWhiteSpace();
          result[prop] = parseString();
        } else {
          prop = parseString();
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
      }
      next();
    }
  };

  return parse();
};
