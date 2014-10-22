---
title: Buffering points
author: rupert
layout: post
permalink: /2007/07/buffering-points/
categories:
  - postgis
  - postgres
tags:
  - postgis
  - postgres
---
<p>Here is a post in buffering points and combining them using GeomUnion. Works in GEOS3.0.0, so note that your POSTGIS installation in windows contains a lower version of GEOS.</p>
<p><a href="http://www.gisnotes.com/images/2007/07/buffer_points.png" title="Buffered Points"><img src="http://www.gisnotes.com/images/2007/07/buffer_points.thumbnail.png" alt="Buffered Points" /></a></p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">DROP</span> <span style="color: #993333; font-weight: bold;">FUNCTION</span> combineGeometry<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">FUNCTION</span> combineGeometry<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">RETURNS</span> Void <span style="color: #993333; font-weight: bold;">AS</span><span style="color: #ff0000;">'
DECLARE
	--define datatypes here
	updateCount integer DEFAULT 0;
	geom_record RECORD;
	geom_current RECORD;
	geom_final RECORD;
	mytotal integer DEFAULT 0;
&nbsp;
BEGIN
&nbsp;
	--get the total
	SELECT count(*) as mycount FROM busstopv1_buffer_20_temp INTO mytotal;
&nbsp;
	-- 1,2,3,4,5
	FOR geom_record IN SELECT * FROM busstopv1_buffer_20 LOOP
&nbsp;
		--get the current geom of the record
		SELECT *
		FROM 		busstopv1_buffer_20_temp b
		WHERE 		b.gid = geom_record.gid INTO geom_current;
&nbsp;
		RAISE INFO '</span><span style="color: #ff0000;">'RECORD GID: %'</span><span style="color: #ff0000;">', geom_record.gid;
		RAISE INFO '</span><span style="color: #ff0000;">'===========TOTAL COUNT: %=============='</span><span style="color: #ff0000;">', mytotal;
&nbsp;
		--find the intersection of the current geom with other spatial entities
		--and loop through that. For each loop, update the geom.
&nbsp;
		IF geom_current IS NULL THEN
			CONTINUE;
		END IF;
		FOR geom_final IN
			SELECT GeomUnion(b0.the_geom, geom_current.the_geom ) AS geom_current_union, b0.gid
			FROM busstopv1_buffer_20_temp b0
			WHERE b0.gid &amp;lt;&amp;gt; geom_current.gid
			AND Intersects(b0.the_geom, geom_current.the_geom) = '</span><span style="color: #ff0000;">'t'</span><span style="color: #ff0000;">'
			ORDER BY gid ASC LOOP
&nbsp;
			--geom_current.gid = geom_record.gid
			UPDATE busstopv1_buffer_20_temp
			SET the_geom = GeomUnion( the_geom, geom_final.geom_current_union )
			WHERE gid = geom_current.gid;
			RAISE INFO '</span><span style="color: #ff0000;">'UPDATED GID:%'</span><span style="color: #ff0000;">', geom_current.gid;
&nbsp;
			DELETE FROM busstopv1_buffer_20_temp WHERE gid = geom_final.gid;
			RAISE INFO '</span><span style="color: #ff0000;">'DELETED GID:%'</span><span style="color: #ff0000;">', geom_final.gid;
&nbsp;
			mytotal = mytotal - 1;
&nbsp;
		END LOOP;
&nbsp;
	END LOOP;
END;'</span>
<span style="color: #993333; font-weight: bold;">LANGUAGE</span> plpgsql;
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> combineGeometry<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span>;</pre></td></tr></table></div>

<p>Next step.. trying out <a href="http://www.cgal.org/">CGAL.</a></p>
