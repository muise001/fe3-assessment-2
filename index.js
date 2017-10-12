// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
///////////////////

var buttons = document.querySelectorAll('button');
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(){
      document.querySelector("div").innerHTML = '';
      var waarde = event.target.value
      var audio = new Audio('sirene.mp3');
      audio.play();
      document.querySelector('h2').innerHTML = waarde


// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("div").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("class", 'svgclass')
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("geweld-buurt-csv.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    if (waarde == 'totaal') {
        var grafiek = d.totaal
    }
    if (waarde == 'bedrijging') {
        var grafiek = d.bedrijging
    }
    if (waarde == 'mishandeling') {
        var grafiek = d.mishandeling
    }
    if (waarde == 'openlijkGeweld') {
        var grafiek = d.openlijkGeweld
    }
    if (waarde == 'overval') {
        var grafiek = d.overval
    }
    if (waarde == 'straatroof') {
        var grafiek = d.straatroof
    }
    if (waarde == 'zedenmisdrijf') {
        var grafiek = d.zedenmisdrijf
    }
    if (waarde == 'overig') {
        var grafiek = d.overig
    }
    d.totaal = 0
    d.totaal = +grafiek;
    console.log(grafiek);
    console.log(d.straatroof)
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.locatie; }));
  y.domain([0, d3.max(data, function(d) { return d.totaal; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr('class', 'bar')
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.totaal); })
      .on("click", function(d) {
        document.getElementById("locatie").innerHTML = d.locatie;
        document.getElementById("totaal").innerHTML = waarde + " " + d.totaal;
      })
      .transition() //
      .duration(500) //
      .attr("x", function(d) { return x(d.locatie); })
      .transition()
      .duration(1000)
      .attr("y", function(d) { return y(d.totaal); })
      .attr('class', 'bar')







  // add the x Axis
  svg.append("g")
  .transition()
  .duration(1000)
      .attr("transform", "translate(0," + height + ")")
      .attr('class', 'text')
      .call(d3.axisBottom(x));


  // add the y Axis
  svg.append("g")
  .transition()
  .duration(1000)
      .call(d3.axisLeft(y));

});
})
}
