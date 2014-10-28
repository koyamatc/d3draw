/**
  d3draws.js  v1.0.0
  functions to draw svg shapes with d3.js
**/

  // Point Object
  function Point(x, y){
    this.x = x;
    this.y = y;
    return this;
  };

  var pi = Math.PI;       //円周率
  var aDegree = pi/180;   //1°をラジアンに変換 
  var svgContainer;       //svg保管　　　　　
  var xScaleSv,yScaleSv;  //scale保管
 
  var originPoint = new Point(); // 原点
  var startPoint = new Point();　　// 始点
  var halfPoint = new Point();  　//　中間点
  var endPoint = new Point();　　  //　終点
 
  var x0 = y0 = 0;

  /* 直線　描画関数　*/
  function drawLine(svg,data,xScale,yScale){

    var lines = svg.selectAll(".line")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function(d,i){
            if(i==0){originPoint.x=d.x1;}
            startPoint.x = d.x1;
            return xScale? xScale(d.x1):d.x1;
          })
          .attr("y1", function(d,i){
            if(i==0){originPoint.y=d.y1;}  // 原点
            startPoint.y = d.y1;　　　　　　　　　　//　始点
            return yScale? yScale(d.y1):d.y1;
          })
          .attr("x2", function(d){
            endPoint.x = d.x2;
            halfPoint.x = (d.x2-d.x1)/2;
            return xScale? xScale(d.x2):d.x2;
          })
          .attr("y2", function(d){
            endPoint.y = d.y2;
            halfPoint.y = (d.y2-d.y1)/2;
            return yScale? yScale(d.y2):d.y2;
          })        
          .attr("id",function(d,i){
            return d.id?d.id:"line"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "line";
          })
          .each(setAttr);

  };

  /* ベクトル線　描画関数　*/
  function drawVectorA(svg,data,xScale,yScale){

    svgContainer = svg;

    var radians;

    var vectorsA = svg.selectAll(".vectorA")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function(d,i){
 
            if(i==0){originPoint.x=d.x1;}
            startPoint.x = d.x1;
            return xScale? xScale(d.x1):d.x1;
          })
          .attr("y1", function(d,i){
            if(i==0){originPoint.y=d.y1;}  // 原点
            startPoint.y = d.y1;　　　　　　　　　　//　始点
            return yScale? yScale(d.y1):d.y1;
          })
          .attr("x2", function(d){
            radians = d.angles?(d.angles * aDegree):0;
            endPoint.x = Math.cos(radians)*d.length+d.x1;
            halfPoint.x = (endPoint.x-d.x1)/2;
            return xScale? xScale(endPoint.x):endPoint.x;
          })
          .attr("y2", function(d){
            radians = d.angles?(d.angles * aDegree):0;
            endPoint.y = Math.sin(radians)*d.length+d.y1;
            halfPoint.y = (endPoint.y-d.y1)/2;
            return yScale? yScale(endPoint.y):endPoint.y;
          })        
          .attr("id",function(d,i){
            return d.id?d.id:"vectorA"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "vectorA";
          })
          .each(setAttr)
          .each(drawArrowHead);     
  };


  /** 
    draw vector line between points 
                                    */
  function drawVectorB(svg,data,xScale,yScale){

    svgContainer = svg;

    var vectorsB = svg.selectAll(".vectorB")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function(d,i){
            xScaleV = xScale;
            yScaleV = yScale;
            if(i==0){originPoint.x=d.x1;}
            startPoint.x = d.x1;
            return xScale? xScale(d.x1):d.x1;
          })
          .attr("y1", function(d,i){
            if(i==0){originPoint.y=d.y1;}  // 原点
            startPoint.y = d.y1;　　　　　　　　　　//　始点
            return yScale? yScale(d.y1):d.y1;
          })
          .attr("x2", function(d){
            endPoint.x = d.x2;
            halfPoint.x = (d.x2-d.x1)/2;
            return xScale? xScale(d.x2):d.x2;
          })
          .attr("y2", function(d){
            endPoint.y = d.y2;
            halfPoint.y = (d.y2-d.y1)/2;
            return yScale? yScale(d.y2):d.y2;
          })        
          .attr("id",function(d,i){
            return d.id?d.id:"vectorB"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "vectorB";
          })
          .each(setAttr)
          .each(drawArrowHead);     

  };

  /** 
    draw vector line between points
       with arrowHead and Tail
                                    */
  function drawVectorW(svg,data,xScale,yScale){

    svgContainer = svg;

    var vectorsW = svg.selectAll(".vectorW")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function(d,i){
            xScaleV = xScale;
            yScaleV = yScale;
            if(i==0){originPoint.x=d.x1;}
            startPoint.x = d.x1;
            return xScale? xScale(d.x1):d.x1;
          })
          .attr("y1", function(d,i){
            if(i==0){originPoint.y=d.y1;}  // 原点
            startPoint.y = d.y1;　　　　　　　　　　//　始点
            return yScale? yScale(d.y1):d.y1;
          })
          .attr("x2", function(d){
            endPoint.x = d.x2;
            halfPoint.x = (d.x2-d.x1)/2;
            return xScale? xScale(d.x2):d.x2;
          })
          .attr("y2", function(d){
            endPoint.y = d.y2;
            halfPoint.y = (d.y2-d.y1)/2;
            return yScale? yScale(d.y2):d.y2;
          })        
          .attr("id",function(d,i){
            return d.id?d.id:"vectorW"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "vectorW";
          })
          .each(setAttr)
          .each(drawArrowHead)
          .each(drawArrowTail);     

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

    svgContainer.append("path")
          .attr("d", vectorArrow(vectorData))
          .attr("stroke", function(){return stroke;})
          .attr("class","arrowHead")
          .attr("stroke-width", function(){return 2;})
          .attr("fill", "none");   

  };

  /** */
  function drawArrowTail(){

    var x1 = parseFloat(this.attributes.x1.value);
    var x2 = parseFloat(this.attributes.x2.value);
    var y1 = parseFloat(this.attributes.y1.value);
    var y2 = parseFloat(this.attributes.y2.value);

    var stroke = this.attributes.stroke.value;

    var vectorData = [];
    var radians = Math.atan2(y2-y1,x2-x1);
    var radians1 = radians + pi/6;
    var radians2 = radians - pi/6;
    //var arrowHead = 10/(xScaleV(1)-xScaleV(0)); // length of arrow head
    var arrowHead = 10;

    vectorData.push(new Point(
      x1 + Math.cos(radians1)*arrowHead,
      y1 + Math.sin(radians1)*arrowHead
      ));
    vectorData.push(new Point(x1,y1));
    vectorData.push(new Point(
      x1+Math.cos(radians2)*arrowHead,
      y1+Math.sin(radians2)*arrowHead
      ));

    var vectorArrow = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate("linear");

    svgContainer.append("path")
          .attr("d", vectorArrow(vectorData))
          .attr("stroke", function(){return stroke;})
          .attr("class","arrowTail")
          .attr("stroke-width", function(){return 2;})
          .attr("fill", "none");   

  };


  /* path　描画関数　*/
  function drawPath(svg,data,attrs,xScale,yScale){

    var stroke = stroke?stroke:"#000";
    var strokeWidth = strokeWidth?strokeWidth:2;
    var fillColor = fillColor?fillColor:"none";

    var path = d3.svg.line()
        .x(function(d) { return xScale?xScale(d.x):d.x; })
        .y(function(d) { return yScale?yScale(d.y):d.y; })
        .interpolate("linear");

    svg.append("path")
          .attr("d", path(data))
          .attr("stroke",function(){
            return attrs.stroke?attrs.stroke:"#000"})
          .attr("stroke-width", function(){
            return attrs.strokeWidth?attrs.strokeWidth:2
          })
          .attr("opacity", function(){
            return attrs.opacity?attrs.opacity:1
          })
          .style("fill", function(){
            return attrs.fillColor?attrs.fillColor:"none"
          })
          .attr("id", function(){
            return attrs.id?attrs.id:""
          });
 
  };

  /** draw circle */
  function drawCircle(svg,data,xScale,yScale){
    svg.selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",function(d){ 
      return xScale?xScale(d.cx):d.cx;
     })
    .attr("cy",function(d){ 
      return yScale?yScale(d.cy):d.cy;
     })
    .attr("r",function(d){ return d.r })
    .attr("id", function(d,i){
      return d.id?d.id:"circle"+i
    ;})
    .attr("class", function(d){
      return "circle"
    ;})
    .attr("class", function(d){
      return d.class?d.class:""
    ;})
    .each(setAttr);

  };



  /* arc　描画関数　*/
  function drawArc(svg,data,xScale,yScale){
    var arc = d3.svg.arc()
      .innerRadius(function(d){return d.innerRadius})
      .outerRadius(function(d) {return d.outerRadius})
      .startAngle(function(d){return d.startPos * aDegree;})
      .endAngle(function(d) { return d.endPos * aDegree;});       

    svg.selectAll(".arcs")
    .data(data)
    .enter()
    .append("path")
    .attr("transform", function(d){
      return xScale?"translate(" +
                        xScale(d.xTranslate?d.xTranslate:0) + "," + 
                        yScale(d.yTranslate?d.yTranslate:0) +")"
                      :"translate(" + 
                        d.xTranslate?d.xTranslate:0 + "," + 
                        d.yTranslate?d.yTranslate:0 + ")"
    ;})
    .attr("d", arc)
    .attr("stroke",function(d){
      return d.stroke?d.stroke:"#000";})
    .attr("stroke-width", function(d){
      return d.strokeWidth?d.strokeWidth:2;})
    .style("fill",function(d){
      return d.fillColor?d.fillColor:"#0f0";})
    .attr("id",function(d,i){
      return d.id?d.id:"arc"+i;
    })
    .attr("class",function(d){
      return "arcs"
    })
    .attr("class",function(d){
      return d.class?d.class:"";
    });

  };

  /** draw Ellipse */
  function drawEllipse(svg,data,xScale,yScale){
    svg.selectAll(".ellipse")
      .data(data)
      .enter()
      .append("ellipse")
      .attr("cx",function(d){
        return xScale?xScale(d.cx?d.cx:0):d.cx?d.cx:0;
      })
      .attr("cy",function(d){
        return yScale?yScale(d.cy?d.cy:0):d.cy?d.cy:0;
      })
      .attr("rx",function(d){
        return d.rx?d.rx:20;
      })
      .attr("ry",function(d){
        return d.ry?d.ry:10;
      })
      .attr("id",function(d,i){
        return d.id?d.id:"ellipse"+i;
      })
      .attr("class",function(d){
        return "ellipsee"
      })
      .attr("class",function(d){
        return d.class?d.class:"";
      })
      .each(setAttr);
      
  };


  /** draw Rectangle */
  function drawRect(svg,data,xScale,yScale){
    svg.selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x",function(d){
        return xScale?xScale(d.x?d.x:0):d.x?d.x:0;
      })
      .attr("y",function(d){
        return yScale?yScale(d.y?d.y:0):d.y?d.y:0;
      })
      .attr("width",function(d){
        return d.width?d.width:20;
      })
      .attr("height",function(d){
        return d.height?d.height:10;
      })
      .attr("id",function(d,i){
        return d.id?d.id:"rect"+i;
      })
      .attr("class",function(d){
        return "rect"
      })
      .attr("class",function(d){
        return d.class?d.class:"";
      })
      .each(setAttr);
      
  };

  /** 直角三角形 */
  function drawRTriangle(svg,data,xScale,yScale){
    
    svgContainer = svg;
    xScaleSv = xScale;
    yScaleSv = yScale;

    svg.selectAll(".rtriangle")
      .data(data)
      .enter()
      .append("line")
      .attr("x1",function(d){
        return xScale?xScale(d.x1):d.x1;
      })
      .attr("y1",function(d){
        return yScale?yScale(d.y1):d.y1;
      })
      .attr("x2",function(d){
        return xScale?xScale(d.x1):d.x1;
      })
      .attr("y2",function(d){
        return yScale?yScale(d.y1):d.y1;
      })
      .each(makeRTriangle);
  };

  function makeRTriangle(d){

    var stroke = d.stroke?d.stroke:"#000";
    var strokeWidth = d.strokeWidth?d.strokeWidth:2;
    var fillColor = d.fillColor?d.fillColor:"none";

    var pointsData = [];
    var x1,x2,x3,y1,y2,y3;
    var opposite; // length of opposite side
    var rightAngle = (d.theta >=0)?-pi/2:pi/2;
    var factor = (d.theta >=0)?1:-1;
    var radians = d.angle?(-d.angle * aDegree):0;
    // start point
    x1 = xScaleSv? xScaleSv(d.x1):d.x1;
    y1 = yScaleSv? yScaleSv(d.y1):d.y1;
    // end point of adjacent
    x2 = Math.cos(radians) * d.adjacent * factor + x1;
    y2 = Math.sin(radians) * d.adjacent * factor + y1;
    // end point of opposite
    opposite = d.adjacent * Math.tan(d.theta * aDegree);
    x3 = Math.cos(radians+rightAngle) * opposite + x2;
    y3 = Math.sin(radians+rightAngle) * opposite + y2;

    pointsData.push(new Point(x1,y1));
    pointsData.push(new Point(x2,y2));
    pointsData.push(new Point(x3,y3));

    var rightAngleLine = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate("linear");

    svgContainer.append("path")
        .attr("d", function(d) { 
        return rightAngleLine(pointsData) + "Z"; }) //<- Z コマンドで線を閉じる
        .attr("stroke", function(d){ return stroke; })
        .attr("stroke-width", function(d){ return strokeWidth; })
        .style("fill", function(d){ return fillColor; })     
        .attr("class","rightAngle")
        .attr("id", function(d,i){ return "rightAngle" + i;});

    d3.select(this).remove();
   
  };

  /** draw polygon */
  function drawPolygon(svg,data,xScale,yScale){
    
    svgContainer = svg;
    xScaleSv = xScale;
    yScaleSv = yScale;

    svg.selectAll(".polygon")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx",function(d){
        return xScale?xScale(d.cx):d.cx;
      })
      .attr("cy",function(d){
        return yScale?yScale(d.cy):d.cy;
      })
      .attr("r",function(d){
        return d.r;
      })
      .each(makePolygon);
  };

  function makePolygon(d,i){

    var stroke = d.stroke?d.stroke:"#000";
    var strokeWidth = d.strokeWidth?d.strokeWidth:2;
    var fillColor = d.fillColor?d.fillColor:"none";
    var radius = d.r;
    var sides = d.sides;
    var start = d.start?aDegree * d.start:0;
    var step = 2*pi / sides
    var xScale = xScaleSv;
    var yScale = yScaleSv;
    var classNm = d.class?d.class:"";
    var id = d.id?d.id:"polygon" + i;

    var pointsData = [];
    var x,y;
    for (var i = 0; i < sides; i++) {

      x = radius * Math.cos(step*i + start)+d.cx;
      y = radius * Math.sin(step*i + start)+d.cy;

      x = xScale?xScale(x):x;
      y = yScale?yScale(y):y;

      pointsData.push(new Point(x,y));

    };

//    console.log(pointsData);

    var polyLine = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate("linear");

    svgContainer.append("path")
        .attr("d", function(d) { 
        return polyLine(pointsData) + "Z"; }) //<- Z コマンドで線を閉じる
        .attr("stroke", function(){ return stroke; })
        .attr("stroke-width", function(d){ return strokeWidth; })
        .style("fill", function(){ return fillColor; })     
        .attr("class","polygon")
        .attr("class",function(){ return classNm;})
        .attr("id",function(){ return id;});

    // remove circle    
    d3.select(this).remove();
   
  };


  /** draw text */
  function drawText(svg,data,xScale,yScale){
      svg.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("x",function(d){
        return xScale?xScale(d.x):d.x;})
      .attr("y",function(d){
        return yScale?yScale(d.y):d.y;})
      .attr("text-anchor", function(d){
        return d.anchor?d.anchor:"none";})
      .text(function(d){return d.text})
      .attr("class",function(d){
        return d.color?d.class:"text";
      })
      .attr("id",function(d,i){
        return d.id?d.id:"text" + i;})
      .each(setAttr);
  }

  /** draw Mathjax */
  function drawMathjax(svg,data,xScale,yScale){
    svg.selectAll("foreignObject")
    .data(data)
    .enter()
    .append("foreignObject")
    .attr("x",function(d){ 
      return xScale?xScale(d.x):d.x; })
    .attr("y",function(d){ 
      return yScale?yScale(d.y):d.y; })
    .append("xhtml:body")
    .text(function(d){return d.text;})
    .style("position","fixed")
    .style("font-size",function(d){
      return d.fontSize?d.fontSize:20;});
  }


  /** set attributes */
  function setAttr(d){
    d3.select(this)
      .attr("stroke",function(d){
        return d.stroke?d.stroke:"#000";})
      .attr("stroke-width",function(d){
        return d.strokeWidth?d.strokeWidth:2;})
      .attr("font-size",function(d){
        return d.fontSize?d.fontSize:12;})
      .attr("font-family",function(d){
        return d.fontFamily?d.fontFamily:"sans-serif";})
      .style("fill",function(d){
        return d.fillColor?d.fillColor:"none";})
      .attr("transform",function(d){
        return d.rAngle?"rotate("+d.rAngle+")":"rotate(0)"});   

  };

  /** draw axes */
  function drawAxes(svg,data){
    
    var xOrient = data["xOrient"]?data["xOrient"]:["bottom"];
    var yOrient = data["yOrient"]?data["yOrient"]:["left"];
    var xTickPadding = data["xTickPadding"]?data["xTickPadding"]:5;
    var yTickPadding = data["yTickPadding"]?data["yTickPadding"]:5;
    var xFormat = data["xFormat"]?data["xFormat"]:"d";
    var yFormat = data["yFormat"]?data["yFormat"]:"d";
    var stroke = data["stroke"]?data["stroke"]:"#000";
    var strokeWidth = data["strokeWidth"]?data["strokeWidth"]:2;
    var fillColor = data["fillColor"]?data["fillColor"]:"none";
    // draw x-axis
    if (data["xAxis"]) {

      var xAxis = d3.svg.axis()
                  .scale(data["xScale"])
                  .orient(xOrient)
                  .tickValues(data["xTickValues"])
                  .tickPadding(xTickPadding)
                  .tickFormat(d3.format(xFormat));

      var xAxisGroup = svg.append("g")
                  .attr("transform",
                    "translate(0,"+data["yScale"](0)+")")
                  .attr("stroke",stroke)
                  .attr("stroke-width",strokeWidth)
                  .style("fill",fillColor)
                  .call(xAxis);       
    };

    
    // draw y-axis
    if (data["yAxis"]) {

      var yAxis = d3.svg.axis()
                  .scale(data["yScale"])
                  .orient(yOrient)
                  .tickValues(data["yTickValues"])
                  .tickPadding(yTickPadding)
                  .tickFormat(d3.format(yFormat));


      var yAxisGroup = svg.append("g")
                  .attr("transform",
                    "translate("+data["xScale"](0)+",0)")
                  .attr("stroke",stroke)
                  .attr("stroke-width",strokeWidth)
                  .style("fill",fillColor)
                  .call(yAxis);       
    };
                  
  };

  /** draw grid */
  function drawGrid(svg,data){
    var x0 = data["xScale"].domain()[0];
    var x1 = data["xScale"].domain()[1];
    var y0 = data["yScale"].domain()[0];
    var y1 = data["yScale"].domain()[1];

    /* bug fix 20141024 start 1.0.1 */
    if (x0 > x1) {
      var _x = x1;
      x1 = x0;
      x0 = _x;
    };
    if (y0 > y1) {
      var _y = y1;
      y1 = y0;
      y0 = _y;
    };
    /* bug fix 20141024 end*/

    var xStep = data["xStep"]?data["xStep"]:50;
    var yStep = data["yStep"]?data["yStep"]:50;
    var stroke = data["stroke"]?data["stroke"]:"#ccc";
    var strokeWidth = data["strokeWidth"]?data["strokeWidth"]:1;
    var opacity = data["opacity"]?data["opacity"]:0.5;

    var gridGroup = svg.append("g")
                      .attr("class","gridGroup");

    if (data["xGrid"]){

      for (var i = x0; i <= x1; i=i + xStep) {

        if (i!=0){

          gridGroup.append("line")
            .attr("x1",data["xScale"](i))
            .attr("y1",data["yScale"](y0))
           .attr("x2",data["xScale"](i))
           .attr("y2",data["yScale"](y1))
           .attr("class","grid")
           .attr("stroke",stroke)
           .attr("stroke-width",strokeWidth)
           .attr("opacity",opacity);
        }

      };                  
    };
    if (data["yGrid"]){

      for (var i = y0; i <= y1; i=i + yStep) {

        if (i!=0){

          gridGroup.append("line")
            .attr("x1",data["xScale"](x0))
            .attr("y1",data["yScale"](i))
           .attr("x2",data["xScale"](x1))
           .attr("y2",data["yScale"](i))
           .attr("class","grid")
           .attr("stroke",stroke)
           .attr("stroke-width",strokeWidth)
           .attr("opacity",opacity);
        }

      };                  
    };

    d3.selectAll(".grid")

  }

