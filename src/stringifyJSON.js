// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var result;
  if (Array.isArray(obj)) {
    result = "[";
    for (var i = 0; i < obj.length; i++) {
      if (obj[i] !== undefined) {
        result += stringifyJSON(obj[i]);
      } else {
        result += null;
      }
      if (i < obj.length - 1) {
        result += ",";
      }
    }
    result += "]";
  } else if (obj === null) {
    return "null";
  } else if (typeof obj === 'object') {
    result = "{";
    var objPropertyCount = Object.keys(obj).length;
    var propCount = 0;
    for (var prop in obj) {
      if (typeof obj[prop] !== 'undefined' && typeof obj[prop] !== 'function') {
        result += "\"" + prop + "\"" + ":" + stringifyJSON(obj[prop]);
        if (propCount < objPropertyCount - 1) {
          result += ",";
        }
      }
      propCount++;
    }
    result += "}";
  } else if (typeof obj === 'string') {
    result =  "\"" + obj + "\"";
  } else if (typeof obj === 'number') {
    result = obj.toString();
  } else if (obj === true) {
    result = 'true';
  } else if (obj === false) {
    result = 'false';
  }
  return result;
};
