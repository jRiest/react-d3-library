Object.defineProperty(exports, "__esModule", {
	value: true
});

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAreaChart = function createAreaChart(data) {

	var node = document.createElement('div');

	var margin = { top: 20, right: 20, bottom: 30, left: 50 },
	    width = data.width - margin.left - margin.right,
	    height = data.height - margin.top - margin.bottom;

	var x = _d2.default.scale.linear().range([0, width]);

	var y = _d2.default.scale.linear().range([height, 0]);

	var xAxis = _d2.default.svg.axis().scale(x).orient("bottom");

	var yAxis = _d2.default.svg.axis().scale(y).orient("left");

	var area = _d2.default.svg.area().x(function (d) {
		return x(d.xValue);
	}).y0(height).y1(function (d) {
		return y(d.yValue);
	});

	var svg = _d2.default.select(node).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	data.dataSet.forEach(function (d) {
		d.xValue = +d.xValue;
		d.yValue = +d.yValue;
	});

	x.domain(_d2.default.extent(data.dataSet, function (d) {
		return d.xValue;
	}));
	y.domain([0, _d2.default.max(data.dataSet, function (d) {
		return d.yValue;
	})]);

	svg.append("path").datum(data.dataSet).attr("class", data.area_class).attr("d", area);

	svg.append("g").attr("class", "x " + data.axisLine_class).attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("y", 20).attr("dy", ".71em").style("text-anchor", "middle").text(data.x_display_name);

	svg.append("g").attr("class", "y " + data.axisLine_class).call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(data.y_display_name);

	return node;
};

exports.default = createAreaChart;
module.exports = exports['default'];