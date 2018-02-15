// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
    .range([0, width]) //set range of width
    .padding(0.1); // offset between bars
var y = d3.scaleLinear()
    .range([height, 0]); //reach down to bottom from the top

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("sales.csv", function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.low = +d.low;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.recruiter; }));
    y.domain([0, d3.max(data, function(d) { return parseInt(d.low) + parseInt(d.middle) + parseInt(d.high); })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "low")
        .attr("x", function(d) { return x(d.recruiter); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.low); })
        .attr("height", function(d) { return height - y(d.low); });

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "middle")
        .attr("x", function(d) { return x(d.recruiter); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(parseInt(d.low) + parseInt(d.middle)); })
        .attr("height", function(d) { return height - y(d.middle); });

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "high")
        .attr("x", function(d) { return x(d.recruiter); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(parseInt(d.low) + parseInt(d.middle) + parseInt(d.high)); })
        .attr("height", function(d) { return height - y(d.high); });

    /*
    svg.selectAll("bar")
        .data(d3.stack().keys(keys)(data))
        .enter().append("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
            .attr("class", "high")
            .attr("x", function(d) { return x(d.recruiter); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth());

            */

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

});