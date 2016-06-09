Object.defineProperty(exports, "__esModule", {
	value: true
});

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPieChart = function createPieChart(data) {

	var node = document.createElement('div');

	var radius = Math.min(data.width, data.height) / 2;

	var color = _d2.default.scale.ordinal().range(data.colors);

	var arc = _d2.default.svg.arc().outerRadius(radius - 10).innerRadius(0);

	var labelArc = _d2.default.svg.arc().outerRadius(radius - 40).innerRadius(radius - 40);

	var pie = _d2.default.layout.pie().sort(null).value(function (d) {
		return d.quantity;
	});

	var svg = _d2.default.select(node).append("svg").attr("width", data.width).attr("height", data.height).append("g").attr("transform", "translate(" + data.width / 2 + "," + data.height / 2 + ")");

	var g = svg.selectAll(".arc").data(pie(data.dataSet)).enter().append("g").attr("class", data.arcClass);

	g.append("path").attr("d", arc).style("fill", function (d) {
		return color(d.data.label);
	});

	g.append("text").attr("transform", function (d) {
		return "translate(" + labelArc.centroid(d) + ")";
	}).attr("dy", ".35em").text(function (d) {
		return d.data.label;
	});

	var type = function type(d) {
		d.quantity = +d.quantity;
		return d;
	};

	return node;
};

exports.default = createPieChart;
module.exports = exports['default'];