window.addEventListener('onload',init());

function init(){
	// on page load, build the charts
	buildDoughnutChart();
}

function buildDoughnutChart(){

var data = [
    {
        value: 8,
        color:"#F7464A",
        label: "No Glasses"
    },
    {
        value: 9,
        color: "#46BFBD",
        label: "Glasses"
    }
]

 var options = {
 		 animationSteps : 100,
 		 percentageInnerCutout : 80
 };	
	
	// Get the context of the canvas element we want to select
	var ctx = document.getElementById("doughnutChart").getContext("2d");
	
	// And for a doughnut chart
	var myDoughnutChart = new Chart(ctx).Doughnut(data,options);
}




