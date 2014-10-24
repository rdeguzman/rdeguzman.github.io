---
title: Buffering Lines
author: rupert
layout: post
permalink: /2007/07/buffering-lines/
categories:
  - postgis
tags:
  - postgis
  - postgres
---
<p><a href="http://www.gisnotes.com/images/2007/07/buffer_example.png" title="Line Buffering in Postgis"><img src="http://www.gisnotes.com/images/2007/07/buffer_example.png" alt="Line Buffering in Postgis" /></a></p>
<p>Here is a sample script in using buffer in Postgis. I buffered the line by 10 and 20 meters. Take note that I have to transform the geometry to the corresponding EPSG, so I could specify &#8220;meters&#8221;.</p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">DROP</span> <span style="color: #993333; font-weight: bold;">TABLE</span> busline_buffer1;
<span style="color: #993333; font-weight: bold;">DELETE</span> <span style="color: #993333; font-weight: bold;">FROM</span> geometry_columns <span style="color: #993333; font-weight: bold;">WHERE</span> f_table_name <span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'busline_buffer1'</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">TABLE</span> busline_buffer1<span style="color: #66cc66;">&#40;</span> gid serial<span style="color: #66cc66;">,</span> <span style="color: #993333; font-weight: bold;">CONSTRAINT</span> pk_buffer1 <span style="color: #993333; font-weight: bold;">PRIMARY</span> <span style="color: #993333; font-weight: bold;">KEY</span><span style="color: #66cc66;">&#40;</span>gid<span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span>;
<span style="color: #993333; font-weight: bold;">SELECT</span>  AddGeometryColumn<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'public'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'busline_buffer1'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'the_geom'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">4326</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'POLYGON'</span><span style="color: #66cc66;">,</span><span style="color: #cc66cc;">2</span><span style="color: #66cc66;">&#41;</span>;
&nbsp;
<span style="color: #66cc66;">//</span> This would display what the output <span style="color: #993333; font-weight: bold;">OF</span> the geometry <span style="color: #993333; font-weight: bold;">IS</span><span style="color: #66cc66;">...</span>
<span style="color: #993333; font-weight: bold;">SELECT</span> AsText<span style="color: #66cc66;">&#40;</span> transform<span style="color: #66cc66;">&#40;</span> ST_BUFFER<span style="color: #66cc66;">&#40;</span> transform<span style="color: #66cc66;">&#40;</span>v1<span style="color: #66cc66;">.</span>the_geom<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">32650</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">10</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">4326</span> <span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> buslinev1 v1;
&nbsp;
<span style="color: #993333; font-weight: bold;">INSERT</span> <span style="color: #993333; font-weight: bold;">INTO</span> busline_buffer1<span style="color: #66cc66;">&#40;</span>the_geom<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">SELECT</span> transform<span style="color: #66cc66;">&#40;</span> ST_BUFFER<span style="color: #66cc66;">&#40;</span> transform<span style="color: #66cc66;">&#40;</span>v1<span style="color: #66cc66;">.</span>the_geom<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">32650</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">10</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">4326</span> <span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> buslinev1 v1;
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> gid<span style="color: #66cc66;">,</span> AsText<span style="color: #66cc66;">&#40;</span>the_geom<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> busline_buffer1;
<span style="color: #66cc66;">========================================</span>
<span style="color: #993333; font-weight: bold;">DROP</span> <span style="color: #993333; font-weight: bold;">TABLE</span> busline_buffer2;
<span style="color: #993333; font-weight: bold;">DELETE</span> <span style="color: #993333; font-weight: bold;">FROM</span> geometry_columns <span style="color: #993333; font-weight: bold;">WHERE</span> f_table_name <span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'busline_buffer2'</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">TABLE</span> busline_buffer2<span style="color: #66cc66;">&#40;</span> gid serial<span style="color: #66cc66;">,</span> <span style="color: #993333; font-weight: bold;">CONSTRAINT</span> pk_buffer2 <span style="color: #993333; font-weight: bold;">PRIMARY</span> <span style="color: #993333; font-weight: bold;">KEY</span><span style="color: #66cc66;">&#40;</span>gid<span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span>;
<span style="color: #993333; font-weight: bold;">SELECT</span>  AddGeometryColumn<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'public'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'busline_buffer2'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'the_geom'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">4326</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'POLYGON'</span><span style="color: #66cc66;">,</span><span style="color: #cc66cc;">2</span><span style="color: #66cc66;">&#41;</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> AsText<span style="color: #66cc66;">&#40;</span> transform<span style="color: #66cc66;">&#40;</span> ST_BUFFER<span style="color: #66cc66;">&#40;</span> transform<span style="color: #66cc66;">&#40;</span>v1<span style="color: #66cc66;">.</span>the_geom<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">32650</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">20</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">4326</span> <span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> buslinev1 v1;
&nbsp;
<span style="color: #993333; font-weight: bold;">INSERT</span> <span style="color: #993333; font-weight: bold;">INTO</span> busline_buffer2<span style="color: #66cc66;">&#40;</span>the_geom<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">SELECT</span> transform<span style="color: #66cc66;">&#40;</span> ST_BUFFER<span style="color: #66cc66;">&#40;</span> transform<span style="color: #66cc66;">&#40;</span>v1<span style="color: #66cc66;">.</span>the_geom<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">32650</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">20</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">4326</span> <span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> buslinev1 v1;
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> gid<span style="color: #66cc66;">,</span> AsText<span style="color: #66cc66;">&#40;</span>the_geom<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> busline_buffer2;</pre></td></tr></table></div>
