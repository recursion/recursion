// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, result){
  //  traverse document.body.childNodes searching through classList for our className
  //  something like....

  if (result === undefined) {
    result = [];
  }

  var baseNode;

console.log(arguments[2]);
  if (!arguments[2]) {
    baseNode = document.body;
  } else {
    baseNode = arguments[2];
  }
  for (var i = 0; i < baseNode.childNodes.length; i++) {
    if (baseNode.classList.contains(className)) {
      console.log('Chunka: ' + i, baseNode);
      result.push(baseNode);
    }

    getElementsByClassName(className, result, baseNode.childNodes[i]);
  }
    return result;
};
