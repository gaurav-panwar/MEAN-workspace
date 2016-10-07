  var svg = d3.select("svg"),
      margin = {top: 20, right: 80, bottom: 30, left: 50},
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  
  var x = d3.scaleOrdinal().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);


  var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return function(c) { return x(d[c].year); } })
    .y(function(d) { return function(c) { return y(d[c].count); } });
  

  d3.json("json/resultAssault2.json", function(error, data) {
      if (error) throw error;
  

      x.domain(d3.extent(data, function(d) { return function(c) { return x(d[c].year); } }));
      y.domain([ d3.min(data, function(c) { return d3.min(c, function(d) { return c[d].count; }); }),
      d3.max(data, function(c) { return d3.max(c, function(d) { return c[d].count; }); }) ]).nice();
      z.domain(function(d) { return data[d]; });
  

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "1em")
        .attr("fill", "#000")
        .text("Number of Instances");
  

      var assault = g.selectAll(".assault")
        .data(data)
        .enter().append("g")
        .attr("class", "assault");
  

      assault.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(function(c) { return d[c].count} ); })
        .style("stroke", function(d) { return z(function(c) { return d[c]; }); });
  

      assault.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.arrest) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function(d) { return function(c) { return d[c]; }; });
});