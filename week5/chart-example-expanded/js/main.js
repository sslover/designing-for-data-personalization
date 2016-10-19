window.addEventListener('load',init);

var myDoughnutChart;

myDoughnutChart.datasets = [];

function init(){
	$.ajax({
	    url: 'data/data.json',
	    type: 'GET',
	    failure: function(err){
	    	console.log ("Could not get the data");
	    	return alert("Something went wrong");
	    },
	    success: function(data) {
	    	console.log(data);
	    	updateCustomChart(data);
	    	setChartDefaults();
	    	buildDoughnutChart(data);
	    	buildBarChart(data);
	    	buildLineChart(data);
	    }
	});
}

function updateCustomChart(data){
	// set the chart's width equal to the live stats
	document.getElementById('hillarySection').style.width = data.overall.hillary+'%';
	document.getElementById('trumpSection').style.width = data.overall.trump+'%';
}

// set default options for ALL charts
// see 
function setChartDefaults(){
	// make it responsive
	Chart.defaults.global.responsive = true;
	// set the font color
	Chart.defaults.global.defaultFontColor = '#222';
	// set the font family
	Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
}


function buildDoughnutChart(data){

	// first, let's just render the overall counts on the page 
	document.getElementById('hillaryCount').innerHTML = data.overall.hillary + '%';
	document.getElementById('trumpCount').innerHTML = data.overall.trump + '%';

	// now, let's make the chart
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var data = {
	    labels: [
	        "Hillary Clinton",
	        "Donald Trump",
	    ],
	    datasets: [
	        {
	            data: [data.overall.hillary, data.overall.trump],
	            backgroundColor: [
	                "#179ee0",
	                "#ff5d40",
	            ],
	            hoverBackgroundColor: [
	                "#1594d2",
	                "#f0563a",
	            ]
	        }]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
		legend: {
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20
			},
		},
    tooltips: {
        backgroundColor: '#222',
    },		
    animation:{
        animateScale:false
    }
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("doughnutChart").getContext("2d");
	
	// now, create the doughnut chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	myDoughnutChart = new Chart(ctx,{
	    type: 'doughnut',
	    data: data,
	    options: options
	});		
}

// see http://www.chartjs.org/docs/#bar-chart-introduction
function buildBarChart(data){

	// first, let's prepare the data
	// let's pull out the labels we need; i.e. the state names
	var labelsArray = [];
	data.swingStates.forEach(function(e){
		labelsArray.push(e.state)
	});

	//let's pull out the hillary stats we need
	var hillaryArray = [];
	data.swingStates.forEach(function(e){
		hillaryArray.push(e.hillary);
	})

	//let's pull out the trump stats we need
	var trumpArray = [];
	data.swingStates.forEach(function(e){
		trumpArray.push(e.trump);
	})

	// now, let's make the chart
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)
	var data = {
	    // chart labels
	    labels: labelsArray,
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset
	    datasets: [
	        {
	            label: "Hillary Clinton",
	            backgroundColor: "#179ee0",
	            data: hillaryArray
	        },
	        {
	            label: "Donald Trump",
	            backgroundColor: "#ff5d40",
	            data: trumpArray
	        }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#bar-chart-chart-options
	var options = {
		legend: {
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20
			},
		},
    tooltips: {
        backgroundColor: '#222',
    },
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

// see http://www.chartjs.org/docs/#line-chart-introduction
function buildLineChart(data){
	
	// first, let's prepare the data
	// let's pull out the labels we need; i.e. the dates
	var datesArray = [];
	data.timeline.forEach(function(e){
		datesArray.push(e.date)
	});	

	//let's pull out the hillary stats we need
	var hillaryArray = [];
	data.timeline.forEach(function(e){
		hillaryArray.push(e.hillary);
	})

	//let's pull out the trump stats we need
	var trumpArray = [];
	data.timeline.forEach(function(e){
		trumpArray.push(e.trump);
	})


	// now, let's make the chart
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var data = {
		// chart labels
    labels: datesArray,
    // an array of datasets to plot
    datasets: [
    		// dataset 1
        {
            label: "Hillary Clinton",
            borderColor: "#179ee0",
            pointBackgroundColor: "#179ee0",
            backgroundColor: 'transparent',
            pointRadius: 3,
            // the data values that actually get plotted
            data: hillaryArray
        },
        // dataset 2
        {
            label: "Donald Trump",
            borderColor: "#ff5d40",
            pointBackgroundColor: "#ff5d40",
            backgroundColor: 'transparent',
            pointRadius: 3,          
            // the data values that actually get plotted
            data: trumpArray
        }
    ]
	};	

	// create chart options (this is optional)
	// see list of options:
	// global: http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options
	// http://www.chartjs.org/docs/#line-chart-chart-options
	var options = {
		legend: {
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20,
			},
		},
    tooltips: {
        backgroundColor: '#222',
    },
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

