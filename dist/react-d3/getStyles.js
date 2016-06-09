var _toCamelCase = require('./../utils/toCamelCase');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (styleObject) {

	var styles = {};

	if (typeof styleObject === 'string') {
		var styleArray = styleObject.split(';');
		styleArray.pop();
		styleArray.forEach(function (style) {
			var indexOfColon = style.indexOf(':');
			var key = (0, _toCamelCase2.default)(style.slice(0, indexOfColon));
			var value = style.slice(indexOfColon + 1);
			value = isNaN(value) ? value.trim() : Number(value);
			styles[key.trim()] = value;
		});
	} else {
		for (var key in styleObject) {
			if (!isNaN(key)) {
				styles[styleObject[key]] = styleObject[styleObject[key]];
			}
		}
	}
	return styles;
};