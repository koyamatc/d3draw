<<!DOCTYPE html>
<html lang="jp">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
  	<meta http-equiv="X-UA-Compatible" CONTENT="IE=EmulateIE7" />

	<title>d3Draw Development</title>
	<link href="css/jklmain.css" rel="stylesheet">
  	<link href="css/monokai.css" rel="stylesheet">

</head>
<body>
	
	<div id="svg01"></div>

	<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script src="js/d3draws.js" charset="utf-8"></script>
	<script type="text/javascript">

		var height = 500;
		var width  = 500;

		// svg container 
		var svg01 = d3.select("#svg01")
				.append("svg")
				.attr("height",height)
				.attr("width",width)
				.style("background","#ccc");
		
		// scale definition
		var xScale01 = d3.scale.linear()
                       .domain([0,1])
                       .range([100,300]);
  
  		var yScale01 = d3.scale.linear()
                       .domain([1,0])
                       .range([100,300]);       		

		var lineData01 = [
			{"x1":100,"y1":100,"x2":300,"y2":100},
			{"x1":100,"y1":150,"x2":300,"y2":150,"stroke":"#f00","strokeWidth":5},
			{"x1":0,"y1":0.5,"x2":1,"y2":0.5,"stroke":"#ff0","strokeWidth":15,
			"xScale":xScale01,"yScale":yScale01}
		];		

		drawLine(svg01,lineData01)
	</script>
</body>
</html>
