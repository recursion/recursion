// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  //  traverse document.body.childNodes searching through classList for our className
  //  something like....
  var baseNode;
  if (!arguments[1]) {
    baseNode = document.body;
  } else {
    baseNode = arguments[1];
  }
  for (var i = 0; i < baseNode.childNodes.length; i++) {
    if (baseNode.classList.contains(className)) {
      return baseNode;
    }
    getElementsByClassName(className, baseNode.childNodes[i]);
  }
};
