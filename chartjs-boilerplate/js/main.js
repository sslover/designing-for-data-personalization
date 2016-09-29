window.addEventListener('load',init);

function init(){
	// on page load, build the charts
	buildLineChart();
	buildBarChart();
	buildPieChart();
	buildDoughnutChart();
}

// see http://www.chartjs.org/docs/#line-chart-introduction
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
            backgroundColor: "rgba(75,192,192,0.1)",
            borderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "rgba(75,192,192,1)",
            pointRadius: 5,
            // the data values that actually get plotted
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        // dataset 2
        {
            label: "My Second dataset",
            backgroundColor: "rgba(107,185,240,0.2)",
            borderColor: "rgba(107,185,240,1)",
            pointBackgroundColor: "rgba(107,185,240,1)",
            pointRadius: 5,            
            // the data values that actually get plotted
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
	};	

	// create chart options (this is optional)
	// see list of options:
	// global: http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options
	// http://www.chartjs.org/docs/#line-chart-chart-options
	var options = {
       title: {
            display: true,
            text: 'My Line Chart'
       },
	    tooltips: {
	        backgroundColor: 'pink',
	    }       
   }

	// NOW, we actually create the chart
	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("lineChart").getContext("2d");
	
	// now, create the line chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myLineChart = new Chart(ctx, {
	    type: 'line',
	    data: data,
	    options: options
	});
}

// see http://www.chartjs.org/docs/#bar-chart-introduction
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
	            backgroundColor: "rgba(75,192,192,0.3)",
	            borderColor: "rgba(75,192,192,0.5)",
	            borderWidth: 1,
	            data: [65, 59, 80, 81, 56, 55, 40]
	        },
	        {
	            label: "My Second dataset",
	            backgroundColor: "rgba(107,185,240,0.2)",
	            borderColor: "rgba(107,185,240,0.5)",
	            borderWidth: 1,
	            data: [28, 48, 40, 19, 86, 27, 90]
	        }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#bar-chart-chart-options
	var options = {
    tooltips: {
        backgroundColor: 'pink',
    }
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("barChart").getContext("2d");
	
	// now, create the bar chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myBarChart = new Chart(ctx, {
	    type: 'bar',
	    // type: 'horizontalBar', // horizontal bards
	    data: data,
	    options: options
	});
}

// see http://www.chartjs.org/docs/#doughnut-pie-chart-introduction
function buildPieChart(){

	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var data = {
	    labels: [
	        "Red",
	        "Blue",
	        "Yellow"
	    ],
	    datasets: [
	        {
	            data: [300, 50, 100],
	            backgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#FFCE56"
	            ],
	            hoverBackgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#FFCE56"
	            ]
	        }]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
    tooltips: {
        backgroundColor: 'black',
    },		
    animation:{
        animateRotate:true
    }
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("pieChart").getContext("2d");
	
	// now, create the pie chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myPieChart = new Chart(ctx,{
	    type: 'pie',
	    data: data,
	    options: options
	});	

}

// see http://www.chartjs.org/docs/#doughnut-pie-chart

function buildDoughnutChart(){
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var data = {
	    labels: [
	        "Red",
	        "Blue",
	        "Yellow"
	    ],
	    datasets: [
	        {
	            data: [300, 50, 100],
	            backgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#FFCE56"
	            ],
	            hoverBackgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#FFCE56"
	            ]
	        }]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
    tooltips: {
        backgroundColor: 'black',
    },		
    animation:{
        animateScale:true
    }
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("doughnutChart").getContext("2d");
	
	// now, create the pie chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
	    data: data,
	    options: options
	});		
}