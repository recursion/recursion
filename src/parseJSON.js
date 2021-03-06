// thats is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
//
var parseJSON = function parseJSON(json) {
  var at = 0;
  var ch = json[at];
  var escapeChars = {
    '\\': '\\',
    '\s': '\s',
    '\r': '\r',
    '\t': '\t',
    '\n': '\n',
    '"': '"'
  };
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
      var tmp;
      if (ch === '[') {
        while (at < json.length) {
          next();
          parseWhiteSpace();
          if (ch === ']') {
            return result;
          }
          if (ch === '"') {
            result.push(parse(json.slice(at)));
          } else {
            tmp = parse(json.slice(at));
            if (tmp !== undefined) {
              result.push(tmp);
            }
          }
          if (ch === ']') {
            return result;
          }
        }
      }
      throw new SyntaxError('Array closure missing.', 'parseJSON.js', 32);
  };
  // I feel like this function should call next before returning
  // However that is currently breaking things, so will save for refactor.
  var parseString = function parseString() {
    var result = '';
    if (ch === '"') {
      while (at <= json.length) {
        next();
        if (ch === '"') {
          return result;
        } else if (ch === '\\') {
          next();
          if (typeof escapeChars[ch] === 'string') {
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
        if (ch === ':') {
          next();
          parseWhiteSpace();
          var tmp = parse(json.slice(at));
          if (tmp !== undefined) {
            result[prop] = tmp;
          }
        } else if (ch === '"') {
          prop = parseString();
        }
        if (ch === '}') {
          next();
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
