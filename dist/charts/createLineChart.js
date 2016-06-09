Object.defineProperty(exports, "__esModule", {
    value: true
});

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLineChart = function createLineChart(data) {

    var node = document.createElement('div');

    var margin = data.margins,
        width = data.width - margin.left - margin.right,
        height = data.height - margin.top - margin.bottom;

    var formatDate = _d2.default.time.format("%d-%b-%y");

    var x = _d2.default.time.scale().range([0, width]);

    var y = _d2.default.scale.linear().range([height, 0]);

    var xAxis = _d2.default.svg.axis().scale(x).orient(data.orientXTicks);

    var yAxis = _d2.default.svg.axis().scale(y).orient(data.orientYTicks);

    var line = _d2.default.svg.line().x(function (d) {
        return x(d.time);
    }).y(function (d) {
        return y(d.value);
    });

    var svg = _d2.default.select(node).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.dataset.map(function (el) {
        if (typeof el.time === 'string') {
            el.time = formatDate.parse(el.time);
            el.value = +el.value;
        }
    });

    var lineChartParse = function lineChartParse(data) {
        data.time = formatDate.parse(data.time);
        data.value = +data.value;
        return data;
    };

    var setLineChartData = function setLineChartData(error, dataset) {
        if (error) throw error;

        x.domain(_d2.default.extent(dataset, function (d) {
            return d.time;
        }));
        y.domain(_d2.default.extent(dataset, function (d) {
            return d.value;
        }));

        svg.append("g").attr("class", data.XAxisClasses).attr("transform", "translate(0," + height + ")").call(xAxis);

        svg.append("g").attr("class", data.YAxisClasses).call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(data.YAxisLabel);

        svg.append("path").datum(dataset).attr("class", data.lineClass).attr("d", line);

        return node;
    };

    return data.tsvFileName !== '' ? _d2.default.tsv(data.tsvFileName, lineChartParse, setLineChartData) : data.csvFileName !== '' ? _d2.default.csv(data.csvFileName, lineChartParse, setLineChartData) : setLineChartData(false, data.dataset, data);
};

exports.default = createLineChart;
module.exports = exports['default'];