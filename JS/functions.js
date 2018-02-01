
// define necessary lists
var line_data_x = []
var line_data_y = []

// define necessary variables
var currentvariable_scatter_y = "Vraagprijs"
var currentvariable_scatter_x = "woonoppervlak"

// function to determine moving average
function moving_average(data, neighbors) {
  return data.map((val, idx, arr) => {
    let start = Math.max(0, idx - neighbors),
        end = idx + neighbors
    let subset = arr.slice(start, end + 1)
    let sum = subset.reduce((a,b) => a + b)
    return sum / subset.length
  })
}

// prepare data to be converted to moving average line
function prepare_average_data(data){

    // empty current lists
    line_data_x.length = 0
    line_data_y.length = 0
    var line_data = []


    // determine the data for the line
    data.forEach(function(d){

        line_data.push({"x": d[currentvariable_scatter_x], "y":d[currentvariable_scatter_y]})
    })

    // sort data for the line
    line_data.sort(function(a, b) {
        return parseFloat(a.x) - parseFloat(b.x);
    });

    // add data of line to separate lists
    line_data.forEach(function(d){

        line_data_x.push(d.x)
        line_data_y.push(d.y)
    })

    // use moving average function
    var average_data = moving_average(line_data_y, 3)
    return average_data
}


// creates ability to insert string into string
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};


// function to colour the map
function colour_map(data){

    map.selectAll(".marker")
    .style("background-color", function(d){

        if (d == data)
        {
            return "red"
        }
        else if (d.searched_house == true)
        {
            return "yellow"
        }
        else if (barchart_data.indexOf(d) !== -1)
        {
            return "steelblue"
        }
    })
}

function colour_table(data){

    d3.selectAll("tr")
    .style("background-color", function(d){

        if (d == data)
        {
            return "red"
        }
        //else if (d.address1 == house[0].address1)
        //{
        //  return "yellow"
        //}
        else
        {
            return "white"
        }
    })
}

// function to colour the scatterplot
function colour_scatter(data){
    d3.selectAll(".scatter-circle")
        .style("fill", function(d){
            if (d == data)
            {
                return "red"
            }
            else if (d.searched_house == true)
            {
                return "yellow"
            }
            else if (barchart_data.indexOf(d) !== -1)
            {
                return "steelblue"
            }
        })
    }



// function to colour the barchart
function colour_barchart(data){

    d3.selectAll(".bar")
    .style("fill", function(d){

        if (d == data)
        {
            return "red"
        }
        else if (d.searched_house == true)
        {
            return "yellow"
        }
        else
        {
            return "steelblue"
        }
    })
}

// function to remove colours from the map
function remove_colour_map(data){
    map.selectAll(".marker")
    .style("background-color", function(d){

        if (d.searched_house == true)
        {
            return "yellow"
        }
        else if (barchart_data.indexOf(d) !== -1)
        {
            return "steelblue"
        }
    })
}

function remove_colour_table(data){

    d3.select("tbody").selectAll("tr")
    .style("background-color", "white")

}

// function to remove colours from the scatter
function remove_colour_scatter(data){

    d3.selectAll(".scatter-circle")
    .style("fill", function(d){

        if (d.searched_house == true)
        {
            return "yellow"
        }
        else if (barchart_data.indexOf(d) !== -1)
        {
            return "steelblue"
        }
    })
}

// function to remove colours from the barchart
function remove_colour_barchart(d){

    d3.selectAll(".bar")
    .style("fill", function(d){

        if (d.searched_house == true)
        {
            return "yellow"
        }
        else if (barchart_data.indexOf(d) !== -1)
        {
            return "steelblue"
        }
    })
}