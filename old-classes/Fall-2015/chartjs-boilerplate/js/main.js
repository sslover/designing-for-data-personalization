window.addEventListener('onload',init());

function init(){
	// on page load, build the charts
	buildLineChart();
	buildBarChart();
	buildPieChart();
	buildDoughnutChart();
}

// see http://www.chartjs.org/docs/#line-chart-introduction
// 
function buildLineChart(){
	
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var data = {
		// chart labels
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    // an array of datasets to plot
    datasets: [
    		// dataset 1
        {
            label: "My First dataset",
	            fillColor: "rgba(107,185,240,0.2)",
	            strokeColor: "rgba(107,185,240,1)",
	            pointColor: "rgba(107,185,240,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            // the data values that actually get plotted
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        // dataset 2
        {
            label: "My Second dataset",
	            fillColor: "rgba(107,185,240,0.2)",
	            strokeColor: "rgba(107,185,240,1)",
	            pointColor: "rgba(107,185,240,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            // the data values that actually get plotted
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
	};	

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#line-chart-chart-options
	var options = {
		datasetStrokeWidth : 5
	}

	// NOW, we actually create the chart
	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("lineChart").getContext("2d");
	
	// now, create the line chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myLineChart = new Chart(ctx).Line(data, options);

}

// see http://www.chartjs.org/docs/#bar-chart
function buildBarChart(){

	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var data = {
	    // chart labels
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: [65, 59, 80, 81, 56, 55, 40]
	        },
	        {
	            label: "My Second dataset",
	            fillColor: "rgba(151,187,205,0.5)",
	            strokeColor: "rgba(151,187,205,0.8)",
	            highlightFill: "rgba(151,187,205,0.75)",
	            highlightStroke: "rgba(151,187,205,1)",
	            data: [28, 48, 40, 19, 86, 27, 90]
	        }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#bar-chart-chart-options
	var options = {
		barShowStroke : false
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("barChart").getContext("2d");
	
	// now, create the bar chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myBarChart = new Chart(ctx).Bar(data, options);		
}

// see http://www.chartjs.org/docs/#doughnut-pie-chart

function buildPieChart(){

	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	// data is an array of objects
	// each holds the value and color of a segment of the chart
	var data = [
	    {
	        value: 300,
	        color:"#F7464A",
	        highlight: "#FF5A5E",
	        label: "Red"
	    },
	    {
	        value: 50,
	        color: "#46BFBD",
	        highlight: "#5AD3D1",
	        label: "Green"
	    },
	    {
	        value: 100,
	        color: "#FDB45C",
	        highlight: "#FFC870",
	        label: "Yellow"
	    }
	]

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
		 segmentStrokeWidth : 2,
		 animationSteps : 50,
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("pieChart").getContext("2d");
	
	// now, create the pie chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myPieChart = new Chart(ctx).Pie(data,options);

}

// see http://www.chartjs.org/docs/#doughnut-pie-chart

function buildDoughnutChart(){
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	// data is an array of objects
	// each holds the value and color of a segment of the chart
	var data = [
	    {
	        value: 300,
	        color:"#F7464A",
	        highlight: "#FF5A5E",
	        label: "Red"
	    },
	    {
	        value: 50,
	        color: "#46BFBD",
	        highlight: "#5AD3D1",
	        label: "Green"
	    },
	    {
	        value: 100,
	        color: "#FDB45C",
	        highlight: "#FFC870",
	        label: "Yellow"
	    }
	]

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
		 segmentStrokeWidth : 1,
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("doughnutChart").getContext("2d");
	
	// now, create the donought chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myDoughnutChart = new Chart(ctx).Doughnut(data,options);	
}