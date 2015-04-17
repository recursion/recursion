// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // lets see if we can just traverse the entire dom.

  var result = [];

  var element;
  if (!arguments[1]) {
    element = document.body;
  } else {
    element = arguments[1];
  }

  if (element.classList.contains(className)) {
    result.push(element);
  }
  for (var i = 0; i < element.childNodes.length; i++) {
    if (element.childNodes[i].classList) {
      if (element.childNodes[i].classList.contains(className)) {
        console.log(element.childNodes[i]);
        result.push(element.childNodes[i]);
      }
    }
  }
  console.log('RESULT: ', result);
  return result;
};
