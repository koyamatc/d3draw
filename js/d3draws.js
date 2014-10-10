  // Point Object
  function Point(x, y){
    this.x = x;
    this.y = y;
    return this;
  };

  var pi = Math.PI;
  var aDegree = pi/180;
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

  /* ベクトル線　描画関数　*/
  function drawVectorA(svg,data){

    svgVector = svg;
    var radians;

    var vectorsA = svg.selectAll(".d3vectorA")
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
            radians = d.angles?(d.angles * aDegree):0;
            endPoint.x = Math.cos(radians)*d.length+d.x1;
            halfPoint.x = (endPoint.x-d.x1)/2;
            return d.xScale? d.xScale(endPoint.x):endPoint.x;
          })
          .attr("y2", function(d){
            radians = d.angles?(d.angles * aDegree):0;
            endPoint.y = Math.sin(radians)*d.length+d.y1;
            halfPoint.y = (endPoint.y-d.y1)/2;
            return d.yScale? d.yScale(endPoint.y):endPoint.y;
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
            return d.id?d.id:"vectorA"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "d3vectorA";
          })
          .each(drawArrowHead);     


  };


  /** 
    draw vector line between points 
                                    */
  function drawVectorB(svg,data){

    svgVector = svg;

    var vectorsB = svg.selectAll(".d3vectorB")
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
            return d.id?d.id:"vectorB"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "d3vectorB";
          })
          .each(drawArrowHead);     

  };

  /** 
    draw vector line between points
       with arrowHead and Tail
                                    */
  function drawVectorW(svg,data){

    svgVector = svg;

    var vectorsW = svg.selectAll(".d3vectorW")
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
            return d.id?d.id:"vectorW"+i;
          })
          .attr("class",function(d){
            return d.class?d.class:"";
          })
          .attr("class",function(d){
            return "d3vectorW";
          })
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

    svgVector.append("path")
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

    svgVector.append("path")
          .attr("d", vectorArrow(vectorData))
          .attr("stroke", function(){return stroke;})
          .attr("class","arrowTail")
          .attr("stroke-width", function(){return 2;})
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

  /** draw circle */
  function drawCircle(svg,data){
    svg.selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",function(d){ 
      return d.xScale?d.xScale(d.cx):d.cx;
     })
    .attr("cy",function(d){ 
      return d.yScale?d.yScale(d.cy):d.cy;
     })
    .attr("r",function(d){ return d.r })
    .attr("stroke",function(d){
      return d.stroke?d.stroke:"#000"
    ;})
    .attr("stroke-width", function(d){
      return d.strokeWidth?d.strokeWidth:2
    ;})
    .style("fill",function(d){
      return d.fillColor?d.fillColor:"none";
    })
    .attr("id", function(d,i){
      return d.id?d.id:"circle"+i
    ;})
    .attr("class", function(d){
      return "circle"
    ;})
    .attr("class", function(d){
      return d.class?d.class:""
    ;})

  }



  /* arc　描画関数　*/
  //function drawArc(svg,startPos,endPos,innerRadius,outerRadius,strokeWidth,stroke,fillColor,xScale,yScale){
  function drawArc(svg,data){
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
      return d.xScale?"translate(" +
                        d.xScale(d.xTranslate?d.xTranslate:0) + "," + 
                        d.yScale(d.yTranslate?d.yTranslate:0) +")"
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
  function drawEllipse(svg,data){
    svg.selectAll(".ellipse")
      .data(data)
      .enter()
      .append("ellipse")
      .attr("cx",function(d){
        return d.xScale?d.xScale(d.cx?d.cx:0):d.cx?d.cx:0;
      })
      .attr("cy",function(d){
        return d.yScale?d.yScale(d.cy?d.cy:0):d.cy?d.cy:0;
      })
      .attr("rx",function(d){
        return d.rx?d.rx:20;
      })
      .attr("ry",function(d){
        return d.ry?d.ry:10;
      })
      .attr("stroke",function(d){
        return d.stroke?d.stroke:"#000";
      })
      .attr("stroke-width", function(d){
        return d.strokeWidth?d.strokeWidth:2;
      })
      .style("fill",function(d){
       return d.fillColor?d.fillColor:"none";
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
      .attr("transform",function(d){
        return d.rAngle?"rotate("+d.rAngle+")":"rotate(0)"
      });
      
  };


  /** draw Rectangle */
  function drawRect(svg,data){
    svg.selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x",function(d){
        return d.xScale?d.xScale(d.x?d.x:0):d.x?d.x:0;
      })
      .attr("y",function(d){
        return d.yScale?d.yScale(d.y?d.y:0):d.y?d.y:0;
      })
      .attr("width",function(d){
        return d.width?d.width:20;
      })
      .attr("height",function(d){
        return d.height?d.height:10;
      })
      .attr("stroke",function(d){
        return d.stroke?d.stroke:"#000";
      })
      .attr("stroke-width", function(d){
        return d.strokeWidth?d.strokeWidth:2;
      })
      .style("fill",function(d){
       return d.fillColor?d.fillColor:"none";
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
      .attr("transform",function(d){
        return d.rAngle?"rotate("+d.rAngle+")":"rotate(0)"
      });
      
  };

  /** 直角三角形 */
  function drawRTriangle(svg,data){
    svg.selectAll(".rtriangle")
      .data(data)
      .enter()
      .append("line")
      .attr("x1",function(d){
        return d.xScale?d.xScale(d.x1):d.x1;
      })
      .attr("y1",function(d){
        return d.yScale?d.yScale(d.y1):d.y1;
      })
      .attr("x2",function(d){
        return d.xScale?d.xScale(d.x1):d.x1;
      })
      .attr("y2",function(d){
        return d.yScale?d.yScale(d.y1):d.y1;
      })
      .each(test);
  };

  function test(d){

    d3.select(this)
      .attr("x2",function(d){
        return d.xScale?d.xScale(d.x2):d.x2
      })
      .attr("y2",function(d){
        return d.xScale?d.yScale(d.y2):d.y2
      })
      .attr("stroke",function(d){
        return d.stroke?d.stroke:"#000"
      })
      .attr("stroke-width",function(d){
        return d.strokeWidth?d.strokeWidth:2
      })
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


