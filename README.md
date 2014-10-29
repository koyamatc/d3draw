d3draw
======

# JavaScript to draw svg shapes with d3.js 

###d3.jsを使ってsvgの図形を描画する関数__d3draws.js__を作ってみました。

自分がよく使う機能を入れてあります。[デモ](http://koyamatch.com/d3/svg/shapes/d3drawsjs.html)

## 機能 v1.1.0

 + 直線 drawLine 

 + ベクトル線（角度と長さ指定） drawVectorA 

 + ベクトル線（始点・終点指定） drawVectorB 

 + 両端矢印線 drawVectorW 

 + 円 drawCircle 

 + 円弧 drawArc 

 + 楕円 drawEllipse 

 + 長方形 drawRect 

 + 直角三角形 drawRTriangle 

 + 多角形 drawPolygon 

 + 文字 drawText 

 + Mathjax drawMathjax 

 + 軸　drawAxes

 + グリッド drawGrid
 
 +　path drawPath 
 

更新情報
2014.10.24　- 1.0.1

1 グリッド描画バグ修正

	+ スケールの定義でdomainとrangeで+-が反転しているとき、グリッド線を描画しない。

2014.10.28 - 1.1.0

1 drawPath（） 属性設定方法を変更

	+ 属性パラメータをjson形式で受け渡すように変更。

2014.10.29 - 1.2.0

1 drawRTriangle() 直角マーク描画機能追加　

	+ 属性 rightMark: false/true 