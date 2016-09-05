window.addEventListener('onload',init())

function init(){
	$.ajax({
	    url: 'data/data.json',
	    type: 'GET',
	    failure: function(err){
	    	return console.log ("Could not get the data");
	    },
	    success: function(data) {
	    	console.log(data);
	    	// set charts defaults
	    	setChartDefaults();
	    	buildLineChart(data);
	    	buildBarChart(data);
	    	buildDoughnutChart(data);
	    }
	});
}

// set default options for ALL charts
function setChartDefaults(){
	// set the default line
	Chart.defaults.global.scaleLineColor = '#fff';
	// set the font family
	Chart.defaults.global.scaleFontFamily = "'Quattrocento Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
	// set the font color
	Chart.defaults.global.scaleFontColor = "#fff";
}

// see http://www.chartjs.org/docs/#line-chart-introduction
// 
function buildLineChart(data){
	
	// need 3 arrays:
	// 1. one that holds the day values for cooked
	// 2. one that holds the day values for bought
	// 3. one that holds the labels
	var chartData = computeLineValues(data);

	// now, can use that data to build the line chart
	var data = {
		// chart labels; we created them above
    labels: chartData.labelArray,
    // an array of datasets to plot
    datasets: [
    		// dataset 1
        {
            label: "Cooked",
            strokeColor: "#d7db0a",
            pointColor: "#d7db0a",
            pointStrokeColor: "#fff",
            pointHighlightStroke: "#d7db0a",
            // the data values that actually get plotted
            data: chartData.cookedArray
        },
        // dataset 2
        {
            label: "Bought",
            strokeColor: "#fe6e6e",
            pointColor: "#fe6e6e",
            pointStrokeColor: "#fff",
            pointHighlightStroke: "#fe6e6e",
            // the data values that actually get plotted
            data: chartData.boughtArray
        }
    ],
	  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"    
	};	

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#line-chart-chart-options
	var options = {
		datasetStroke : false,
		datasetFill : false
	}

	// NOW, we actually create the chart
	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("lineChart").getContext("2d");
	
	// now, create the line chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myLineChart = new Chart(ctx).Line(data, options);	
	// create the legend
	var chartLegend = myLineChart.generateLegend();
	// append it above the chart
	$('#lineChartLegend').append(chartLegend);
}

// see http://www.chartjs.org/docs/#bar-chart-introduction 
function buildBarChart(data){
	
	// need to get the count for how often each occurs on each day
	var cookedArray = getBarCount(data,"cooked");
	var boughtArray = getBarCount(data,"bought")

	// chart data
	// see http://www.chartjs.org/docs/#line-chart-data-structure
	var data = {
			// the labels we want on our chart
	    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    datasets: [
	    		// dataset/bar 1
	        {
	            label: "Cooked",
	            fillColor: "#d7db0a",
	            data: cookedArray
	        },
	        // dataset/bar 2
	        {
	            label: "Bought",
	            fillColor: "#fe6e6e",
	            data: boughtArray
	        }
	    ],
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	};

	// optional chart options
	var options = {
		barShowStroke : false // set the stroke to 0
	};

	// get the context of the canvas we're putting the chart in
	var ctx = document.getElementById("barChart").getContext("2d");
	// creates the line chat
	var myBarChart = new Chart(ctx).Bar(data, options);
	// create the legend
	var chartLegend = myBarChart.generateLegend();
	// append it above the chart
	$('#barChartLegend').append(chartLegend);

}

// see http://www.chartjs.org/docs/#doughnut-pie-chart

function buildDoughnutChart(data){

	// need to get the total count of each value
	var cookedTotal = 0;
	var boughtTotal = 0;
	
	for(var i=0;i<data.length;i++){
		if(data[i].status=='cooked') cookedTotal++;
		else if (data[i].status=='bought') boughtTotal++;
	}	

	// let's call a function to render these counts on the page
	renderCounts(cookedTotal,boughtTotal);

	// data is an array of objects
	// each holds the value and color of a segment of the chart
	var data = [
	    {
	        value: cookedTotal,
	        color:"#d7db0a",
	        label: "Cooked"
	    },
	    {
	        value: boughtTotal,
	        color: "#fe6e6e",
	        label: "Bought"
	    }	
	]

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
		 segmentShowStroke : false,
     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"		 
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("doughnutChart").getContext("2d");
	
	// now, create the donought chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myDoughnutChart = new Chart(ctx).Doughnut(data,options);	
	// create the legend
	var chartLegend = myDoughnutChart.generateLegend();
	// append it above the chart
	$('#doughnutChartLegend').append(chartLegend);
}

function computeLineValues(data){

	// object that holds 3 empty arrays
	// we will add to the arrays as we loop through the data
	var obj = {
		cookedArray: [],
		boughtArray: [],
		labelArray: []
	}


	for (var i=0;i<data.length;i++){

		var currentStatus = data[i].status;
		if(currentStatus=='cooked') {
			// for that day, set the array values
			obj.cookedArray[i] = 1;
			obj.boughtArray[i] = 0;
		}
		else if(currentStatus=='bought') {
			// for that day, set the array values
			obj.cookedArray[i] = 0;
			obj.boughtArray[i] = 1;
		}

		obj.labelArray[i] = data[i].date;

	}

	// return the object that holds the arrays
	return obj;
}


function getBarCount(data,value){
	// need to return an array where we track how many occurrences of the value happen on any day
	// Sunday will be [0] in array, Saturday is [6] in array

	// empty array to hold counts; each initiall set to 0
	var countArray = [0,0,0,0,0,0,0]; 

	// loop through the data; value will either be cooked or bought
	for(var i=0;i<data.length;i++){
		var currentStatus = data[i].status;

		// if the currentStatus is not equal to the value we're looking for, can continue to next element
		if(currentStatus!=value) continue; 
		
		var currentDay = data[i].day;
		// else let's check what day it happened on
		switch(currentDay){
			case("Sunday"):
				// increment the Sunday field in countArray
				countArray[0] = countArray[0]+1;
				break;
			case("Monday"):
				// increment the Monday field in countArray
				countArray[1] = countArray[1]+1;
				break;
			case("Tuesday"):
				// increment the Tuesday field in countArray
				countArray[2] = countArray[2]+1;
				break;
			case("Wednesday"):
				// increment the Wednesday field in countArray
				countArray[3] = countArray[3]+1;
				break;
			case("Thursday"):
				// increment the Thursday field in countArray
				countArray[4] = countArray[4]+1;
				break;
			case("Friday"):
				// increment the Sunday field in countArray
				countArray[5] = countArray[5]+1;
				break;
			case("Saturday"):
				// increment the Saturday field in countArray
				countArray[6] = countArray[6]+1;
				break;																								
		}
	}

	return countArray;
}

function renderCounts(cookedCount,boughtCount){
	document.getElementById('cookedCount').innerHTML = cookedCount;
	document.getElementById('boughtCount').innerHTML = boughtCount;

}
