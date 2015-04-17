// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // lets see if we can just traverse the entire dom.

  var element;
  if (!arguments[1]) {
    element = document.body;
  } else {
    element = arguments[1];
  }

  for (var i = 0; i < element.childNodes.length; i++) {
    console.log('ELEMENT: ', element);
    console.log('CHILD ELEMENT: ', element.childNodes[i]);
  }
};
