---
title: Spatial Databases
author: rupert
layout: post
permalink: /2007/06/spatial-databases/
categories:
  - GIS
---
Enterprise SDMS (Spatial Database Management Systems) such as Oracle and IBM (Oracle XE and IBM DB2 Express C) moved their flagship database products with free versions just like MS SQL Server Express (MS SQL Server 2008 Spatial to be released on 2008).

[GIM International made a product survey comparing Spatial Databases IBM DB2, MySQL, Oracle and Postgres here.][1]. Although subconciously, postgis would fit most of my purposes such as integration with Mapserver and Routing (pgRouting), I am still hopeful that Oracle Spatial or IBM DB2 Spatial Extender might give other advantages that I might overlooked.

IBM made significant efforts to tie up DB2 Spatial Extender with other opensource products such as Geoserver. And DB2 is not as limiting as Oracle XE. Currently, DB2 can be installed upto dual (2) CPUS, 4 GB of Memory and unlimited number of databases which quickly topple Oracle XE&#8217;s limit of single (1) CPU and upto 1 GB of Memory.

 [1]: /wordpress/images/geodatabase_product_survey.pdf