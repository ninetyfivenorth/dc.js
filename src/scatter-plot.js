dc.scatterPlot = function (parent, chartGroup) {
    var _chart = dc.coordinateGridChart({});

    var _locator = function (d) {
        return "translate(" + _chart.x()(_chart.keyAccessor()(d)) + "," + _chart.y()(_chart.valueAccessor()(d)) + ")";
    };

    var _symbolSize = 3;

    _chart.plotData = function () {
        var symbols = _chart.chartBodyG().selectAll("circle.symbol")
            .data(_chart.data());

        symbols
            .enter()
        .append("circle")
            .attr("class", "symbol")
            .attr("transform", _locator);

        dc.transition(symbols, _chart.transitionDuration(), function (symbols) {
            symbols.attr("transform", _locator)
                .attr("r", _symbolSize);
        });

        dc.transition(symbols.exit(), _chart.transitionDuration(), function (symbols) {
            symbols.attr("r", 0).remove();
        });
    };

    /**
    #### .symbolSize([radius])
    Set or get radius for symbols, default: 3.

    **/
    _chart.symbolSize = function(s){
        if(!arguments.length) return _symbolSize;
        _symbolSize = s;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};
