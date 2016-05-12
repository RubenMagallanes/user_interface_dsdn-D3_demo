//-------DATA------------------------------------------
//temps are form : 0 - 50
//valid weather : cloud, sun, rain // EDIT LATER MAYBE
"use strict";
var wellington = {
    name: "wellington",
    d1: [12, 13, 19, 22, 18, 15],
    d2: [16, 17, 18, 18, 18, 15],
    d3: [13, 13, 10, 10, 10, 9],
    w1: ["cloud", "cloud", "sun"],
    w2: ["sun", "cloud", "cloud"],
    w3: ["cloud", "rain", "rain"]
};
var auckland = {
    name: "auckland",
    d1: [5, 8, 10, 20, 18, 15],
    d2: [16, 19, 23, 25, 26, 20],
    d3: [20, 19, 18, 17, 16, 13],
    w1: ["cloud", "sun", "sun"],
    w2: ["cloud", "sun", "cloud"],
    w3: ["cloud", "rain", "cloud"]
};
var christchurch = {
    name: "christchurch",
    d1: [17, 22, 20, 18, 10, 15],
    d2: [18, 15, 17, 18, 18, 15],
    d3: [13, 18, 15, 15, 15, 13],
    w1: ["cloud", "sun", "cloud"],
    w2: ["sun", "sun", "sun"],
    w3: ["rain", "cloud", "rain"]
};


//------------------SCRIPT----------------------------
//---VARIABLES-----
//changed by arrows
var curr_city = wellington; //obj
var curr_day = 1; //int from 1 - 3

//not changed initially
var curr_time = 2; //int from 1-6

//calculated from above
var curr_data = [15, 16, 17, 21, 18, 15]; // defaults to wellington day 1 
var curr_weather_data = ["cloud", "sun", "sun"]; // same
var curr_temp = 13; // worked out from curr time and day 
var curr_weather = "cloud"; //string from current time and day


//--------ARROWS + functions FOR CHANGING CITY/DAY-------------------
var tempchart_height = 100,
    tempchart_width = 250,
    barwidth = 35,
    baroffset = 8;
// draw 4 sides arrows 
//<rect x="0" y="0" width="50" height="400" style="fill: #6FB3CB" />
//           <rect x="0" y="0" width="800" height="50" style="fill: #6FB3CB" />
//           <rect x="750" y="0" width="50" height="400" style="fill: #6FB3CB" />
//          <rect x="0" y="350" width="800" height="50" style="fill: #6FB3CB" />

//increments or decrements the current day or city depending on what arrow was pressed
function updatedata(dir) {
    switch (dir) {
    case "up":
        if (curr_city.name === "auckland") {
            curr_city = wellington;
        } else if (curr_city.name === "christchurch") {
            curr_city = auckland;
        }
        break;

    case "down":
        if (curr_city.name === "auckland") {
            curr_city = christchurch;
        } else if (curr_city.name === "wellington") {
            curr_city = auckland;
        }
        break;
    case "left":
        if (curr_day === 2) {
            curr_day = 1;
        } else if (curr_day === 3) {
            curr_day = 2;
        }
        break;
    case "right":
        if (curr_day === 1) {
            curr_day = 2;
        } else if (curr_day === 2) {
            curr_day = 3;
        }
        break;
    }
}



//--------------UP-------------------
var uparrow = d3.select('svg')
    .append('svg').attr('id', 'up'); // uparrow is the svg ele

uparrow.append('rect')
    .attr('x', '50').attr('y', '0').attr('width', '700').attr('height', '50')
    .attr('rx', '20').attr('ry', '20')
    .style('fill', '#C7DCff');

uparrow.append('polygon')
    .attr('points', "400,0 425,43.3 375,43.3")
    .attr("title", "previous city")
    .style('fill', '#6FB3CB')
    .style('stroke', '#6FB3CB')
    .on('mouseover', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#66a300');

    })
    .on('mouseout', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#6FB3CB');
    });

$("#up").click(function () {

    updatedata("up");
    updateview();
});
//--------------LEFT-------------------
var leftarrow = d3.select('svg')
    .append('svg').attr('id', 'left');

leftarrow.append('rect')
    .attr('x', '0').attr('y', '50').attr('width', '50').attr('height', '300')
    .attr('rx', '20').attr('ry', '20')
    .style('fill', '#C7DCff');

leftarrow.append('polygon')
    .attr('points', "43.3,175 43.3,225 0,200")
    .style('fill', '#6FB3CB')
    .style('stroke', '#6FB3CB')
    .on('mouseover', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#66a300');
    })
    .on('mouseout', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#6FB3CB');
    });
$("#left").click(function () {

    updatedata("left");
    updateview();
});
//--------------RIGHT-------------------
var rightarrow = d3.select('svg')
    .append('svg').attr('id', 'right');

rightarrow.append('rect')
    .attr('x', '750').attr('y', '50').attr('width', '50').attr('height', '300')
    .attr('rx', '20').attr('ry', '20')
    .style('fill', '#C7DCff');

rightarrow.append('polygon')
    .attr('points', "750,175 750,225 793.3,200")
    .style('fill', '#6FB3CB')
    .style('stroke', '#6FB3CB')
    .on('mouseover', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#66a300');
    })
    .on('mouseout', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#6FB3CB');
    });
$("#right").click(function () {

    updatedata("right");
    updateview();
});
//--------------DOWN-------------------
var downarrow = d3.select('svg')
    .append('svg').attr('id', 'down'); // uparrow is the evg ele

downarrow.append('rect')
    .attr('x', '50').attr('y', '350').attr('width', '700').attr('height', '50')
    .attr('rx', '20').attr('ry', '20')
    .style('fill', '#C7DCff');

downarrow.append('polygon')
    .attr('points', "400,400 425,356.7 375,356.7")
    .style('fill', '#6FB3CB')
    .style('stroke', '#6FB3CB')
    .on('mouseover', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#66a300');
    })
    .on('mouseout', function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#6FB3CB');
    });
$("#down").click(function () {

    updatedata("down");
    updateview();
});

//------------DRAWING CURRENT DATA TO BE DISPLAYD-------------
function updateview() { // updates current data then binds svgs to it 

    //update data

    if (curr_day === 1) {
        curr_data = curr_city.d1;
        curr_weather_data = curr_city.w1;
        curr_weather = curr_city.w1[Math.floor(curr_time / 2)];
    } else if (curr_day === 2) {
        curr_data = curr_city.d2;
        curr_weather_data = curr_city.w2;
        curr_weather = curr_city.w2[Math.floor(curr_time / 2)];
    } else if (curr_day === 3) {
        curr_data = curr_city.d3;
        curr_weather_data = curr_city.w3;
        curr_weather = curr_city.w3[Math.floor(curr_time / 2)];
    }

    curr_temp = curr_data[curr_time];


    //draw city name
    var curr_cit_name = [curr_city.name];

    //console.log(curr_cit_name + curr_temp)
    var city_title = d3.select('#city')
        .selectAll('text').data(curr_cit_name);

    city_title.transition()
        .text(function (d) {
            return d;
        });

    city_title.enter().append('text')
        .style('fill', '#888888')
        .attr('x', '23').attr('y', '20')
        .attr('font-size', '20').attr('font-weight', 'bold')
        .text(function (d) {
            return d;
        });

    //draw curr temp
    var crnttemp = [curr_temp];
    var temp = d3.select('#temp').selectAll('text').data(crnttemp);

    temp.transition()
        .text(function (d) {
            return d;
        });

    temp.enter().append('text')
        .style('fill', '#666666')
        .attr('x', '32').attr('y', '75')
        .attr('font-size', '80').attr('font-weight', 'bold')
        .text(function (d) {
            return d;
        });

    //current day text
    var day = d3.select('#current_day')
        .selectAll('text').data([curr_day]);

    day.transition()
        .text(function (d) {
            if (d === 1) {
                return "today";
            } else if (d === 2) {
                return "tomorrow";
            } else if (d === 3) {
                return "day after tomorrow";
            }
        });

    day.enter().append('text')
        .style('fill', '#888888')
        .attr('x', '0').attr('y', '30')
        .attr('font-size', '20').attr('font-weight', 'bold')
        .text(function (d) {
            if (d === 1) {
                return "today";
            } else if (d === 2) {
                return "tomorrow";
            } else if (d === 3) {
                return "day after tomorrow";
            }
        });

    //current weather icon - can use curr weather variable
    var weathericon = d3.select('#current_weather')
        .selectAll('image').data([curr_weather]); // either sun rain or cloud

    weathericon.transition()
        .attr('xlink:href', function (d) {
            if (d === 'cloud') {
                return 'cloud.png';
            } else if (d === 'sun') {
                return 'sun.png';
            } else if (d === 'rain') {
                return 'rain.png';
            }
        });
    weathericon.enter().append('image')
        .attr('class', 'png')
        .attr('x', '0').attr('y', '0')
        .attr("width", "150")
        .attr("height", "100")
        .attr('xlink:href', function (d) {
            if (d === 'cloud') {
                return 'cloud.png';
            } else if (d === 'sun') {
                return 'sun.png';
            } else if (d === 'rain') {
                return 'rain.png';
            }
        });

    //update bar chart
    var chart = d3.select('svg#temps_bar')
        .selectAll('rect').data(curr_data);

    chart.transition()
        .attr('height', function (d) {
            return d * 2;
        }).attr('y', function (d) {
            return tempchart_height - d * 2;
        });

    chart.enter().append('rect')
        .style('fill', '#c61c6f')
        .attr('width', barwidth)
        .attr('height', function (d) {
            return d * 2;
        })
        .attr('x', function (d, i) { // also passes index
            return i * (barwidth + baroffset);
        })
        .attr('y', function (d) {
            return tempchart_height - ((d * 2) + 1);
        })
        .on('click', function (d, i) {
            curr_time = i;
            updateview();
        });

    //txt labels above boxes
    var txt = d3.select('svg#temps_bar')
        .selectAll('text').data(curr_data);

    txt.transition()
        .text(function (d) {
            return d;
        })
        .attr('y', function (d) {
            return tempchart_height - (d * 2) - (10);
        });

    txt.enter().append('text')
        .style('fill', '#888888')
        .attr('x', function (d, i) { // also passes index
            return i * (barwidth + baroffset);
        })
        .attr('y', function (d) {
            return tempchart_height - (d * 2) - (10);
        })
        .attr('font-size', '10').attr('font-weight', 'bold')
        .text(function (d) {
            return d;
        });


    //3 curr weather icons
    var wthricons = d3.select('#icon_bar')
        .selectAll('image').data(curr_weather_data);

    wthricons.transition()
        .attr('xlink:href', function (d) {
            if (d === 'cloud') {
                return 'cloud.png';
            } else if (d === 'sun') {
                return 'sun.png';
            } else if (d === 'rain') {
                return 'rain.png';
            }
        });

    wthricons.enter().append('image')
        .attr('class', 'png')
        .attr('x',function (d, i) {
            return (i * 83);
        })
        .attr('y', '0')
        .attr("width", "80")
        .attr("height", "80")
        .attr('xlink:href', function (d) {
            if (d === 'cloud') {
                return 'cloud.png';
            } else if (d === 'sun') {
                return 'sun.png';
            } else if (d === 'rain') {
                return 'rain.png';
            }
        });
    
    
}

updateview();