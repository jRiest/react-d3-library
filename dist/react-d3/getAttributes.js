var _toCamelCase = require('./../utils/toCamelCase');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (attributesObject, node) {
  var attributes = {};
  for (var key in attributesObject) {
    if (!isNaN(key)) {
      if (attributesObject[key].localName === 'class') {
        attributes['className'] = attributesObject[key].nodeValue;
      } else if (attributesObject[key].localName.indexOf('-') > -1) {
        var reactKey = (0, _toCamelCase2.default)(attributesObject[key].localName);
        attributes[reactKey] = attributesObject[key].nodeValue;
      } else attributes[attributesObject[key].localName] = attributesObject[key].nodeValue;
    }
  }

  if (node['data-react-d3-id']) {
    attributes['data-react-d3-id'] = node['data-react-d3-id'];
  }

  if (node['__transition__']) {
    attributes['__transition__'] = node['__transition__'];
  }

  for (var _key in node) {
    if (_key.slice(0, 2) === '__') attributes[_key] = node[_key];
  }

  return attributes;
};