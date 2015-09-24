// CUSTOM JS FILE //
$.ajax({
    url: 'data/data.json',
    type: 'GET',
    failure: function(err){
    	return console.log ("Could not get the data");
    },
    success: function(data) {
    	console.log(data);
    	buildLineChart(data);
    	buildBarChart(data);
    	buildDonutChart(data);
    }
});

// see http://www.chartjs.org/docs/#line-chart-introduction
// 
function buildLineChart(data){
	
	// need to get the count for how often each occurs
	var cookedArray = getCount(data,"cooked");
	var boughtArray = getCount(data,"bought")

	// chart data
	// see http://www.chartjs.org/docs/#line-chart-data-structure
	var data = {
			// the labels we want on our chart
	    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    datasets: [
	    		// dataset/line 1.
	        {
	            label: "Cooked",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: cookedArray
	        },
	        // dataset/line 2
	        {
	            label: "Bought",
	            fillColor: "rgba(151,187,205,0.2)",
	            strokeColor: "rgba(151,187,205,1)",
	            pointColor: "rgba(151,187,205,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: boughtArray
	        }
	    ]
	};

	// optional chart options
	var options = {};

	// get the context of the canvas we're putting the chart in
	var ctx = document.getElementById("lineChart").getContext("2d");
	// creates the line chat
	var myLineChart = new Chart(ctx).Line(data, options);

}

function getCount(data,value){
	// need to return an array where we track
	// how many occurrences of the value happen on any day
	// Sunday will be 0 in array, Saturday is 6 in array

	var countArray = [0,0,0,0,0,0,0]; // empty array to hold counts

	// loop through the data
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

function buildBarChart(data){
	
}

function buildDonutChart(data){
	
}