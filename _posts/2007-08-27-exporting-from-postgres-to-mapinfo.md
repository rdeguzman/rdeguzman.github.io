---
title: Exporting from Postgres to Mapinfo
author: rupert
layout: post
permalink: /2007/08/exporting-from-postgres-to-mapinfo/
categories:
  - postgis
  - postgres
tags:
  - mapinfo
  - ogr2ogr
  - postgres
---
I had a problem when using ogr2ogr and converting a postgres table to a road table. My postgres table containa a utf-8 road name which is all in chinese. The mapinfo road table created by ogr2ogr seems to contain the correct geometry and other fields that is in utf-8. However, all my chinese characters is all messed up. So, I have to export the file and open it to mapinfo.

1. In Postgres, to export to a file..  
`<br />
cybersoftbjv1=# set client_encoding = gbk;<br />
SET<br />
cybersoftbjv1=# \o road.txt;<br />
cybersoftbjv1=# select rd_id, cn_name from roads where cn_name <> '';<br />
cybersoftbjv1=# \q<br />
`

2. Open the file in vim, and do a &#8220;%s/ //g&#8221;. This would replace all &#8221; &#8221; to &#8220;&#8221;.  
Note: This is reasonable for chinese since chinese dont have spaces. However english prases and sentences differ.

3. Open the file in mapinfo and replace the other columns using Table -> Update.

If anybody has any other way to specify the client encoding in ogr2ogr that would be perfect&#8230;