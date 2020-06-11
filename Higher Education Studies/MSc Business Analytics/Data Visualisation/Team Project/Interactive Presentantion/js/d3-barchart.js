//D3.js Bar Chart with fade in
//Main reference: https://gist.github.com/hrecht/f84012ee860cb4da66331f18d588eee3
// Secondary reference (fade in): https://stackoverflow.com/a/21988334
// Step by step each var is explained with comments

var data = [{                 //We define our Dataset
              "name": "Small",
              "value": 5324,
      },
          {
              "name": "Large",
              "value": 6419,
      }];

      var margin = {   //define margins, to adjust inner svg borders of the plot
          top: 40,
          right: 50,
          bottom: 15,
          left: 60
      };

      var width = 600 - margin.left - margin.right,  //width-height of the actual plot (not the whole svg)
          height = 400 - margin.top - margin.bottom;

      var svg = d3.select("#graphic").append("svg")                   //create a base svg for our plot
          .attr("width", width + margin.left + margin.right)                  //the total svg
          .attr("height", height + margin.top + margin.bottom)
          .append("g")                                                          //group to keep all elements together
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")  //We have seen transform attribute to be used widely in several plots, transform actual matches the inner-plot with the whole svg (as they belong to the same group) 
      .style("font-size", "20px")  //font size
      .attr("font-family", "Serif") //Set font
      ;
    
    
      var x = d3.scale.linear()
          .range([0, width])        //we set the actual range of the xaxis
          .domain([0, d3.max(data, function (d) {     // get the complete set of values / with d3.max we get the maximum value of the data
              return d.value;
          })]);

      var y = d3.scale.ordinal()
          .rangeRoundBands([height, 0], .3)       //Arranges the x-bars, the second argument defines the pad between the bars
          .domain(data.map(function (d) {       // get the complete set of values / with d3.map we get the labels from our data.name
              return d.name;
          }));

      var yAxis = d3.svg.axis()       //  show labels on yaxis
          .scale(y)
          //no tick marks
          .tickSize(0)
          .orient("left");

      var gy = svg.append("g")       //We append to our group the y axis labels
          .attr("class", "y axis")
          .call(yAxis);
      

      var bars = svg.selectAll(".D3bar")     //we enter the data to our svg object
          .data(data)
          .enter()
          .append("g")
      

  //we append rectangles 
      bars.append("rect")
          .attr("class", "D3bar")       //we fill the bar with arguments from CSS (colour)
          .attr("y", function (d) {                                           
              return y(d.name);
          })
          .attr("height", y.rangeBand()) 
          .attr("x", 0)
          .attr("width", function (d) {   //we get width based on our actual values
              return x(d.value)
          })
            .attr('opacity', 0)
          .transition()           //AMENDMENT; fade in transtion of the bars
              .delay(function(d,i){return i *400;})
              .duration(4000)
              .attr("opacity", 1)
    ;


          // annotations
      bars.append("text")
          .attr("class", "label")    //add a value label to the right of each bar
          //y position of the label is halfway down the bar
          .attr("y", function (d) {
              return y(d.name) + y.rangeBand()/2 + 10 //first find the mid position, then add 10 pixels
          })
          //x position is 3 pixels to the right of the bar
          .attr("x", function (d) {
              return x(d.value) - 50;
          })
          .text(function (d) {
              return d.value;
          }).attr("font-family", "Arial")
        .attr( "fill-opacity", 0 )   //AMENDMENT; fade in text
        .transition().delay( 2000 )
        .duration(4000)
        .attr( "fill-opacity", 1 )
    ;

    svg.append("text")    //AMENDMENT; Title
      .attr("x", 5 )             
      .attr("y", margin.top-30)
      .style("font-size", "20px") 
      .text("Number of Responders per Different Size of Data Team")
     .attr("font-family", "Serif") //Set font
    ;