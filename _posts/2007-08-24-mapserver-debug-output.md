---
title: Mapserver Debug Output
author: rupert
layout: post
permalink: /2007/08/mapserver-debug-output/
categories:
  - mapserver
tags:
  - apache
  - mapserver
---
Grabbing the latest [ms4w-2.2.6][1], I was now able to get debugging output by specifying below in my mapfile.

`<br />
CONFIG MS_ERRORFILE "stderr"<br />
`

This would log all requests to your Apache error log. I can now play with different debugging modes as described from [RFC28][2]. Here is a simple output of my error.log with a ***DEBUG 2*** set..

`<br />
[error] [client 127.0.0.1] CGI Request 1 on process 4136<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 0 (district), 0.172s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 1 (water_200k), 0.187s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 2 (greens_200k), 0.454s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 6 (roads_150_01), 0.906s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 9 (roads_270_01), 0.515s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 10 (roads_180_01), 0.563s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 11 (roads_280_01), 0.531s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 12 (roads_400_01), 0.516s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 13 (roads_140_03), 0.547s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 14 (roads_140_04), 1.297s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 15 (roads_141_02), 0.703s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 16 (roads_150_02), 0.890s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 17 (roads_boundary_160_170_270), 0.953s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 18 (roads_160_02), 0.829s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 19 (roads_170_02), 0.640s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 20 (roads_270_02), 0.531s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 22 (roads_180_02), 0.563s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 23 (roads_280_02), 0.516s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 24 (roads_400_02), 0.531s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 26 (subway), 0.109s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 27 (subwaystops), 0.125s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 28 (subway_transfer_stops), 0.110s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 29 (district_boundary), 0.156s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 33 (400_280_180_170_160_150_labels_01), 4.859s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 35 (subwaystops_labels), 0.125s<br />
[error] [client 127.0.0.1] msDrawMap(): Layer 36 (district_labels), 0.125s<br />
[error] [client 127.0.0.1] msDrawMap(): Drawing Label Cache, 5.860s<br />
[error] [client 127.0.0.1] msDrawMap() total time: 23.329s<br />
`

 [1]: http://dl.maptools.org/dl/ms4w/
 [2]: http://mapserver.gis.umn.edu/development/rfc/ms-rfc-28