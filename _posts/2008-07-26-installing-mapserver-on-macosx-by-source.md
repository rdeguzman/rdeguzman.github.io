---
title: Installing Mapserver on MacOSX (by source)
author: rupert
layout: post
permalink: /2008/07/installing-mapserver-on-macosx-by-source/
aktt_tweeted:
  - 1
categories:
  - mac
  - mapserver
  - osx
tags:
  - leopard
  - mapserver
  - osx
---
Just noticed that [William of kyngchaos has updated the mapserver binary][1] for MacOSX.

But right now, I need to tile these images bought from GeoEye, so I need TIFF support. Below is a summary of getting Mapserver installed by source. Note that I have the necessary GEOS, GDAL from kyngchaos as well from this ealier post.

1. Download the ff files:  
`-rw-r--r--@ 1 rupert  admin   564313 Jul 26 10:32 agg-2.5.tar.gz<br />
-rw-r--r--@ 1 rupert  admin  1345700 Jul 26 10:22 gd-2.0.35.tar.gz<br />
-rw-r--r--@ 1 rupert  admin   613261 Jul 26 10:22 jpegsrc.v6b.tar.gz<br />
-rw-r--r--@ 1 rupert  admin   796551 Jul 26 10:22 libpng-1.2.29.tar.gz<br />
-rw-r--r--@ 1 rupert  admin  1948751 Jul 26 09:55 mapserver-5.2.0.tar.gz<br />
-rw-r--r--@ 1 rupert  admin  1336295 Jul 26 11:11 tiff-3.8.2.tar.gz`

2. Install in the ff order:

&#8211; [jpegsrc][2]  
&#8211; [libpng][3]  
&#8211; [gd][4] (if you have trouble installing gd, then follow this pdf:[installing\_gd2\_on\_os\_x_server][5])  
&#8211; [agg][6] (*make* only)  
&#8211; [tiff][7]  
&#8211; mapserver

3. For mapserver, please install using the ff configure switches:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">.<span style="color: #000000; font-weight: bold;">/</span>configure \
<span style="color: #660033;">--with-agg</span>=<span style="color: #000000; font-weight: bold;">/</span>myhome<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>mapserver<span style="color: #000000; font-weight: bold;">/</span>agg-<span style="color: #000000;">2.5</span> \
<span style="color: #660033;">--with-jpeg</span> \
<span style="color: #660033;">--with-gd</span> \
<span style="color: #660033;">--with-freetype</span> \
<span style="color: #660033;">--with-png</span> \
<span style="color: #660033;">--with-ogr</span> \
<span style="color: #660033;">--with-proj</span> \
<span style="color: #660033;">--with-gd</span> \
<span style="color: #660033;">--with-httpd</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>httpd \
<span style="color: #660033;">--with-tiff</span> \
<span style="color: #660033;">--with-wfs</span> \
<span style="color: #660033;">--with-wcs</span> \
<span style="color: #660033;">--with-sos</span> \
<span style="color: #660033;">--with-wmsclient</span> \
<span style="color: #660033;">--with-wfsclient</span> \
<span style="color: #660033;">--with-tiff</span> \
<span style="color: #660033;">--with-gdal</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>gdal<span style="color: #000000; font-weight: bold;">/</span>gdal-config \
<span style="color: #660033;">--with-geos</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>geos-config \
<span style="color: #660033;">--with-postgis</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>pg_config</pre>
      </td>
    </tr>
  </table>
</div>

4. Mapserver output

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:mapserver-5.2.0 rupert$ .<span style="color: #000000; font-weight: bold;">/</span>mapserv <span style="color: #660033;">-v</span>
MapServer version 5.2.0 <span style="color: #007800;">OUTPUT</span>=GIF <span style="color: #007800;">OUTPUT</span>=PNG <span style="color: #007800;">OUTPUT</span>=JPEG <span style="color: #007800;">OUTPUT</span>=WBMP <span style="color: #007800;">OUTPUT</span>=SVG <span style="color: #007800;">SUPPORTS</span>=PROJ <span style="color: #007800;">SUPPORTS</span>=AGG <span style="color: #007800;">SUPPORTS</span>=FREETYPE <span style="color: #007800;">SUPPORTS</span>=ICONV <span style="color: #007800;">SUPPORTS</span>=WMS_SERVER <span style="color: #007800;">SUPPORTS</span>=WMS_CLIENT <span style="color: #007800;">SUPPORTS</span>=WFS_SERVER <span style="color: #007800;">SUPPORTS</span>=WFS_CLIENT <span style="color: #007800;">SUPPORTS</span>=WCS_SERVER <span style="color: #007800;">SUPPORTS</span>=SOS_SERVER <span style="color: #007800;">SUPPORTS</span>=GEOS <span style="color: #007800;">INPUT</span>=TIFF <span style="color: #007800;">INPUT</span>=EPPL7 <span style="color: #007800;">INPUT</span>=POSTGIS <span style="color: #007800;">INPUT</span>=OGR <span style="color: #007800;">INPUT</span>=GDAL <span style="color: #007800;">INPUT</span>=SHAPEFILE</pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://www.kyngchaos.com/wiki/software:mapserver
 [2]: http://www.sfr-fresh.com/unix/misc/jpegsrc.v6b.tar.gz
 [3]: http://libpng.sourceforge.net/
 [4]: http://www.libgd.org/Downloads
 [5]: /images/2008/07/installing_gd2_on_os_x_server.pdf
 [6]: http://www.antigrain.com/agg-2.5.tar.gz
 [7]: http://www.libtiff.org/