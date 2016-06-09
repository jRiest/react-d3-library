Object.defineProperty(exports, "__esModule", {
	value: true
});

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createBarChart = function createBarChart(data) {

	// if user has defined colors for bars, designate fill colors
	if (data.fill) {
		data.dataSet.forEach(function (el, i) {
			return el.fill = data.fill[i];
		});
	}

	// create html element for d3 to work on
	var node = document.createElement('div');

	// establish margins based on user input
	var margin = data.margins,
	    width = data.width - margin.left - margin.right,
	    height = data.height - margin.top - margin.bottom;

	// ordinal scale for x-axis since not a numerical range
	var x = _d2.default.scale.ordinal().rangeRoundBands([0, width], 0.1);

	// linear scale for y-axis as it will entail numerical values
	var y = _d2.default.scale.linear().range([height, 0]);

	// scales x-axis based on user's defined width
	var xAxis = _d2.default.svg.axis().scale(x)
	// applies labels below x-axis
	.orient("bottom");

	// scales y-axis based on user's defined height
	var yAxis = _d2.default.svg.axis().scale(y).orient("left")
	// apply tick intervals based on user input
	.ticks(data.ticks);

	// select created html element and append svg
	// apply attributes to svg and append g elements
	var svg = _d2.default.select(node).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// scale x-axis based on amount of labels provided by user
	x.domain(data.dataSet.map(function (d) {
		return d.label;
	}));

	// scale y-axis based on range of values provided by user
	y.domain([0, _d2.default.max(data.dataSet, function (d) {
		return d.value;
	})]);

	// append g elements responsible for x-axis label properties
	svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", "-.55em").attr("transform", "rotate(-90)");

	// append g elements responsible for y-axis tick and label properties
	svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(data.yAxisLabel);

	// bind user data to rectangles that will be appended to svg
	svg.selectAll("bar").data(data.dataSet).enter().append("rect")
	// if user defined fill colors, they will be assigned here
	.style("fill", function (d) {
		return d.fill || "steelblue";
	}).attr("x", function (d) {
		return x(d.label);
	}).attr("width", x.rangeBand()).attr("y", function (d) {
		return y(d.value);
	}).attr("height", function (d) {
		return height - y(d.value);
	}).attr('fill', function (d) {
		return d.fill;
	});

	// return built up html tree to be compiled to react elements
	return node;
};

exports.default = createBarChart;
module.exports = exports['default'];