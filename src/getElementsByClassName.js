// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  //  traverse document.body.childNodes searching through classList for our className
  //  something like....
  //  for (var i = 0; i < document.body.childNodes.length; i++) {
  //    if (className in document.body.childNodes[i]) {
  //      return document.body.childNodes[i];
  //    }
  //  }
};
