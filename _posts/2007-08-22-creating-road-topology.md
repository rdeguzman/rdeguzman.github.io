---
title: Creating Road Topology
author: rupert
layout: post
permalink: /2007/08/creating-road-topology/
categories:
  - postgis
  - postgres
  - routing
tags:
  - routing
---
Im trying out ways to create a topology of edges and vertices for a road network. Currently, there are three ways I know of:  
**  
1. Using ArcGIS build coverage line.**  
&#8212; This includes the use of ArcGIS. Exporting the feature into tics, arcs and nodes, then afterwards assembling them all together. Its functional but have not fully tested the quality of the road topology. Also, assembling them back together through the spatial objects comparison will take some time. It would be better **\*If\*** ArcGIS could create the nodes wrt to the base table.

**2. Using PostGres, postlbs functions.**  
&#8212; Use of SELECT ASSIGN\_VERTEX\_ID(&#8216;table\_name&#8217;, double\_precision_distance. So far this bails on me on my first test on my win-xp laptop. We can test this on Linux if the response is the same.

**3. Using Mapinfo Basic Scripts provided by J.**  
&#8212; Haven&#8217;t gone indepth with these for now, but looking forward to it.

**4. Using Grass**  
&#8212; As documented in <pgrouting.postlbs.org> site&#8217;s [Topology Creation][1]

 [1]: http://pgrouting.postlbs.org/wiki/TopologyCreation