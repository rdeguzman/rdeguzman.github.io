---
title: Passing Parameters to Mapserver
author: rupert
layout: post
permalink: /2008/01/passing-parameters-to-mapserver/
categories:
  - mapserver
tags:
  - mapserver
---
I was bitten 4 hours searching for this in the mailing list. I have a postgis layer defined in mapserver map file as follows:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">LAYER
        NAME "pois"
        STATUS DEFAULT
		GROUP "pois"
        TYPE POINT
&nbsp;
		CONNECTIONTYPE postgis
		PROCESSING "CLOSE_CONNECTION=DEFER"
		CONNECTION "user=lbs password=xtlme15n dbname=beijing_stat host=192.168.1.211 port=5432"
		#DATA "the_geom from (SELECT poi_id, the_geom FROM poi WHERE new_block_id = 7) as foo USING UNIQUE poi_id USING SRID=4326"
		DATA "the_geom from poi as foo USING UNIQUE poi_id USING SRID=4326"
&nbsp;
		FILTER "new_block_id=%myid%"
&nbsp;
		CLASS
			NAME "block-pois"
    		        STYLE
				SYMBOL "circle"
     			        COLOR 255 0 0
				SIZE 10
   			END
  		END
END</pre>
      </td>
    </tr>
  </table>
</div>

Traditionally, I could append and change the FILTER attribute by passing it to the Mapserver CGI as follows:  
`map.pois.filter=new_block_id%3D700`.

Apparently, this changed with Mapserver 5.0. Please see [MapServer 4.10 to 5.0 Migration Guide][1]. Thanks to this mailing list [thread][2], it turned out that **we need to pass a value to a custom variable set in the mapfile for *security reasons***. Hope this one, goes in to the docs. I was hoping to comment out in the Mapserver Documentation but registration is holding me off with a &#8216;Connection Refused&#8217;.

 [1]: http://trac.osgeo.org/mapserver/browser/branches/branch-5-0/mapserver/MIGRATION_GUIDE.TXT
 [2]: http://www.nabble.com/Changing-map-file-parameters-via-URL-td12932745.html#a12972957