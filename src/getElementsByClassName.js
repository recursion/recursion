// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, result){

  if (result === undefined) {
    result = [];
  }

  var element;
  if (!arguments[2]) {
    element = document.body;
  } else {
    element = arguments[2];
  }

  if(element.classList) {
    if (element.classList.contains(className)) {
      result.push(element);
    }
  }

  for (var i = 0; i < element.childNodes.length; i++) {
    getElementsByClassName(className, result, element.childNodes[i]);
  }

  return result;

};
