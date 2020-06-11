//Donut chart in plotly javascript
//Main ref: https://plotly.com/javascript/pie-charts/#donut-chart
var ultimateColors =  ['#153EED', '#E18DF7' ] //set colours for each observation of the donut

var data = [{   //define data (percentage)
values: [84,16],
labels: ['Male', 'Female'],
domain: {column: 0},
name: 'Large',
hoverinfo: 'label+percent+name',
hole: .4,
type: 'pie',
marker: {
colors: ultimateColors[0]}
},{
values: [86,14],
labels: ['Male', 'Female'],
text: 'Small',
textposition: 'inside',
domain: {column: 1},
name: 'Small',
hoverinfo: 'label+percent+name',
hole: .4,
type: 'pie',
marker: {
colors: ultimateColors}
}];


var layout = {    //layout attributes
title: 'Total Responders per Team Size',
annotations: [
{
font: {
size: 20
},
showarrow: false,
text: 'Large',
x: 0.17,
y: 0.5
},
{
font: {
size: 20
},
showarrow: false,
text: 'Small',
x: 0.82,
y: 0.5,
}
],
paper_bgcolor: '#FDF4DC',
height: 400,
width: 600,
showlegend: false,
grid: {rows: 1, columns: 2}
};

Plotly.newPlot('donut-chart', data, layout);  //produce the plot
