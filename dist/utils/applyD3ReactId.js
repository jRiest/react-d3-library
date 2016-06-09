function applyD3ReactId(children, counter) {
  var count = -1;
  var length = 0;
  var childCount = 0;
  var parentCount = 0;
  var result = { state: {}, children: [] };

  function apply(parent) {
    count++;
    parent.forEach(function (child, i) {
      var d3Attributes = Object.keys(child);
      var id = child.localName + '.' + counter + '.' + parentCount + '.' + count;
      var currentNode = child['data-react-d3-id'] = id;
      var resultObj = result.state[id] = {};

      if (child.children.length) length = child.children.length;
      if (d3Attributes.length) d3Attributes.forEach(function (key) {
        resultObj[key] = child[key];
      });else resultObj['__data__'] = null;
      if (count === length) count = 0, parentCount++;

      return child.children.length ? [].slice.call(child.children).forEach(function (child) {
        return apply([child]);
      }) : [];
    });
  }

  apply(children);
  result.children = children;
  return result;
}

module.exports = applyD3ReactId;