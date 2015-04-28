// thats is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  console.log(json);
  var parsedResult; // parse result
  var at = 0;
  var ch = json[at];

  var next = function next(c) {
    if (at < json.length) {
      at++;
      ch = json.charAt(at);
      return ch;
    } else {
      throw 'Error: Invalid Syntax -> End of String.';
    }
  };
  var parseArray = function parseArray() {
      var result = [];
      if (ch === '[') {
        while (at < json.length) {
          next();
          if (ch === ']') {
            return result;
          } else {
            result.push(parseJSON(json.slice(at)));
          }
        }
      }
      throw 'Error: Invalid Array syntax: Expected ]'
  };
  var parseString = function parseString() {
    var result = '';

  };

  var parseObject = function parseObject() {
    var result = {};
    if (ch === '{') {
      while (at < json.length) {
        next();
        if (ch === '}') {
          return result;
        } else if (ch === '"') {
          // Parse property here
          var str = parseString();
        }
      };
    }
  };

  while (at < json.length) {
    if (ch === '[') {
      parseArray();
    } else if (ch === '{') {
      parseObject();
    }
    next();
  }

  return parsedResult;
};
