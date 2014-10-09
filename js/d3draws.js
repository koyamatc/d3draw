  // Point Object
  function Point(x, y){
    this.x = x;
    this.y = y;
    return this;
  };

  var aDegree = pi/180;
  var pi = Math.PI;
  var svgVector;
  var xScaleV,yScaleV;

 
  var originPoint = new Point(); // 原点
  var startPoint = new Point();　　// 始点
  var halfPoint = new Point();  　//　中間点
  var endPoint = new Point();　　  //　終点
 
  var x0 = y0 = 0;

  /* 直線　描画関数　*/
  function drawLine(svg,data){

    var lines = svg.selectAll(".d3line")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function(d,i){
            if(i==0){originPoint.x=d.x1;}
            startPoint.x = d.x1;
            return d.xScale? d.xScale(d.x1):d.x1;
          })
          .attr("y1", function(d,i){
            if(i==0){originPoint.y=d.y1;}  // 原点
            startPoint.y = d.y1;　　　　　　　　　　//　始点
            return d.yScale? d.yScale(d.y1):d.y1;
          })
          .attr("x2", function(d){
            endPoint.x = d.x2;
            halfPoint.x = (d.x2-d.x1)/2;
            return d.xScale? d.xScale(d.x2):d.x2;
          })
          .attr("y2", function(d){
            endPoint.y = d.y2;
            halfPoint.y = (d.y2-d.y1)/2;
            return d.yScale? d.yScale(d.y2):d.y2;
          })        
          .attr("stroke", function(d){
            return d.stroke? d.stroke:"#000";
          })
          .attr("stroke-width",function(d){
            return d.strokeWidth?d.strokeWidth:2;
          })
          .attr("fill", function(d){
            return d.fillColor?d.fillColor:"none";
          })
          .attr("id",function(d,i){
            return d.id?d.id:"line"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "d3line";
          });

  };

  /* draw vector line */
  function drawVectorB(svg,data){

    svgVector = svg;

    var vectors = svg.selectAll(".d3vector")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function(d,i){
            xScaleV = d.xScale;
            yScaleV = d.yScale;
            if(i==0){originPoint.x=d.x1;}
            startPoint.x = d.x1;
            return d.xScale? d.xScale(d.x1):d.x1;
          })
          .attr("y1", function(d,i){
            if(i==0){originPoint.y=d.y1;}  // 原点
            startPoint.y = d.y1;　　　　　　　　　　//　始点
            return d.yScale? d.yScale(d.y1):d.y1;
          })
          .attr("x2", function(d){
            endPoint.x = d.x2;
            halfPoint.x = (d.x2-d.x1)/2;
            return d.xScale? d.xScale(d.x2):d.x2;
          })
          .attr("y2", function(d){
            endPoint.y = d.y2;
            halfPoint.y = (d.y2-d.y1)/2;
            return d.yScale? d.yScale(d.y2):d.y2;
          })        
          .attr("stroke", function(d){
            return d.stroke? d.stroke:"#000";
          })
          .attr("stroke-width",function(d){
            return d.strokeWidth?d.strokeWidth:2;
          })
          .attr("fill", function(d){
            return d.fillColor?d.fillColor:"none";
          })
          .attr("id",function(d,i){
            return d.id?d.id:"vector"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "d3vector";
          });

     vectors.each(drawArrowHead);     

  };

  /** */
  function drawArrowHead(){

    var x1 = parseFloat(this.attributes.x1.value);
    var x2 = parseFloat(this.attributes.x2.value);
    var y1 = parseFloat(this.attributes.y1.value);
    var y2 = parseFloat(this.attributes.y2.value);

    var stroke = this.attributes.stroke.value;

    var vectorData = [];
    var radians = Math.atan2(y2-y1,x2-x1);
    var radians1 = pi + radians + pi/6;
    var radians2 = pi + radians - pi/6;
    //var arrowHead = 10/(xScaleV(1)-xScaleV(0)); // length of arrow head
    var arrowHead = 10;

    vectorData.push(new Point(
      x2 + Math.cos(radians1)*arrowHead,
      y2 + Math.sin(radians1)*arrowHead
      ));
    vectorData.push(new Point(x2,y2));
    vectorData.push(new Point(
      x2+Math.cos(radians2)*arrowHead,
      y2+Math.sin(radians2)*arrowHead
      ));

    var vectorArrow = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate("linear");

    svgVector.append("path")
          .attr("d", vectorArrow(vectorData))
          .attr("stroke", function(){return stroke;})
          .attr("class","arrowHead")
          .attr("stroke-width", function(){return 2;})
          .attr("fill", "none");   

  };

  /* ベクトル線　描画関数　*/
  function drawVector(svg,x0,y0,angles,length,xScale,yScale,color){

    var vectorData = [];
    var radians = angles * aDegree;
    var radians1 = pi + radians + pi/6;
    var radians2 = pi + radians - pi/6;
    var arrowHead = 10/(xScale(1)-xScale(0));

    // 終点の座標
    endPoint.x = Math.cos(radians)*length+x0;
    endPoint.y = Math.sin(radians)*length+y0;
 

    vectorData.push(new Point(x0,y0));
    vectorData.push(new Point(endPoint.x,endPoint.y));
    vectorData.push(new Point(
      endPoint.x+Math.cos(radians1)*arrowHead,
      endPoint.y+Math.sin(radians1)*arrowHead
      ));
    vectorData.push(new Point(endPoint.x,endPoint.y));
    vectorData.push(new Point(
      endPoint.x+Math.cos(radians2)*arrowHead,
      endPoint.y+Math.sin(radians2)*arrowHead
      ));

    var vectorArrow = d3.svg.line()
        .x(function(d) { return xScale(d.x); })
        .y(function(d) { return yScale(d.y); })
        .interpolate("linear");

    svg.append("path")
          .attr("d", vectorArrow(vectorData))
          .attr("stroke", function(){return color})
          .attr("class","vector")
          .attr("stroke-width", 2)
          .attr("fill", "none");   

  };


  
  /* path　描画関数　*/
  function drawPath(svg,data,strokeWidth,xScale,yScale,color){

    var pathData = data;

    var path = d3.svg.line()
        .x(function(d) { return xScale(d.x); })
        .y(function(d) { return yScale(d.y); })
        .interpolate("llinear");

    svg.append("path")
          .attr("d", path(data))
          .attr("stroke", function(){return color})
          .attr("class","path")
          .attr("stroke-width", function(){return strokeWidth>0? strokeWidth:2})
          .attr("fill", "none");   
 
  };

  /* arc　描画関数　*/
  function drawArc(svg,startPos,endPos,innerRadius,outerRadius,strokeWidth,stroke,fillColor,xScale,yScale){

    var arc = d3.svg.arc()
      .innerRadius(function(){return innerRadius})
      .outerRadius(function() {return outerRadius})
      .startAngle(function(){return startPos * aDegree;})
      .endAngle(function() { return endPos * aDegree;});       

    svg.append("path")
    .attr("transform", "translate("+xScale(0)+","+yScale(0)+")")
    .attr("d", arc)
    .attr("stroke",function(){return stroke;})
    .attr("stroke-width", function(){return strokeWidth;})
    .attr("fill",function(){return fillColor;});

  };

  /** draw Mathjax */
  function drawMathjax(svg,data,xScale,yScale){
    svg.selectAll("foreignObject")
    .data(data)
    .enter()
    .append("foreignObject")
    .attr("x",function(d){ return xScale(d.x) })
    .attr("y",function(d){ return yScale(d.y) })
    .append("xhtml:body")
    .html(function(d){return d.text;})
    .attr("transform","rotate(45)")
    .style("position","fixed")
    .style("font-size",function(d){return d.fontSize;});

  }

  function drawText(svg,data,xScale,yScale){
      svg.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("x",function(d){return xScale(d.x)})
      .attr("y",function(d){return yScale(d.y)})
      .text(function(d){return d.text})
      .attr("class","text")
      .attr("stroke",function(d){return d.stroke})
      .attr("font-size",function(d){return d.fontSize})
      .style("fill",function(d){return d.stroke})
      .attr("transform",function(d){return d.rAngle?"rotate("+d.rAngle+")":"rotate(0)"});   
  }


  /** draw circle */
  function drawCircle(svg,data,xScale,yScale){
    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",function(d){ return xScale(d.cx) })
    .attr("cy",function(d){ return yScale(d.cy) })
    .attr("r",function(d){ return d.r })
    .attr("stroke",function(d){return d.stroke;})
    .attr("stroke-width", function(d){return d.strokeWidth;})
    .style("fill",function(d){return d.fillColor;});

  }
