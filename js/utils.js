let getId = function(id) {
  let output = document.getElementById(id);
  return output;
}

let getValue = function(id) {
  let output = getId(id).value;
  return output;
}

let resetAnimation = function(element) {
  element.className = '';
}

let select = function(parent, child) {
  return parent.querySelector(child);
}

let selectAll = function(parent, children) {
  return parent.querySelectorAll(children);
}