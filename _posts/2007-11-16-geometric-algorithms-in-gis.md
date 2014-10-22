---
title: Geometric Algorithms in GIS
author: rupert
layout: post
permalink: /2007/11/geometric-algorithms-in-gis/
categories:
  - GIS
tags:
  - Algorithms
  - gis
---
<p>Here is a couple of Geometric Algorithms used in GIS.</p>
<blockquote>
<ul>
<li><strong>Convex hull</strong> problem: for a set of points, determine the smallest convex set that contains all.</li>
<li><strong>Line segment intersection</strong>: for a set of line segments, determine all intersections.</li>
<li><strong>Voronoi diagram</strong> computation: for a set of points, determine the subdivision of the plane into cells such that inside some cell, one and the same point of the set is closest.</li>
<li><strong>Delaunay triangulation</strong>: for a set of points, determine a planar subdivision by creating edges between the input points in such a way that no two edges intersect, all faces are triangles, no more edges can be added with the given constraints, and no circumcircle of any triangle contains an input point in its interior.</li>
<li><strong>Minkowski sum</strong>: for two simple polygons P and Q, compute the shape that consist exactly of the sum of all points of P and all points of Q, where sum is interpreted as the vector sum.</li>
<li><strong>Rectangular range search</strong>: for a set of points in the plane, design a data structure on those points, such that for every axis-parallel query rectangle, all points in the data structure that lie in the query rectangle can be reported efficiently. Algorithms are needed for the construction of the data structure and for the execution of a query.</li>
</ul>
</blockquote>
<p><a href="http://www.gisnotes.com/images/2007/11/2007-11-16_062422.png" title="2007-11-16_062422.png"><img src="http://www.gisnotes.com/images/2007/11/2007-11-16_062422.png" alt="2007-11-16_062422.png" /></a></p>
<p>Reference:<br />
M Kreveld, <a href="http://www.gisnotes.com/images/2007/11/kreveldcggis.pdf" title="Computational Geometry: Its objectives and relation to GIS">Computational Geometry: Its objectives and relation to GIS</a>, Institute of Information and Computing Sciences, Utrecht University</p>
