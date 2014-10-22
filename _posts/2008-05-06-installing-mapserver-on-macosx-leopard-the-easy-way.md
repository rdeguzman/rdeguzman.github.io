---
title: Installing Mapserver on MacOSX Leopard (the easy way)
author: rupert
layout: post
permalink: /2008/05/installing-mapserver-on-macosx-leopard-the-easy-way/
aktt_tweeted:
  - 1
categories:
  - mac
  - mapserver
tags:
  - leopard
  - mapserver
---
The easiest way to install mapserver on your Leopard is by downloading and installing dmg files from [www.kyngchaos.com (courtesy of William Kyngesburye)][1]. These binaries were also noted from [Mapserver&#8217;s Download Page.][2]

1. Download the ff binaries in order (please note the version numbers at the time of writing):

1. [UnixImageIO_Framework-1.0.22a.dmg][3]  
2. [FreeType_Framework-2.3.5-3.dmg][4]  
3. [GEOS_Framework-3.0.0-2.dmg][5]  
4. [PROJ_Framework-4.6.0-1.dmg][6]  
5. [SQLite3_Framework-3.5.7-1.dmg][7]  
6. [MapServer-5.0.2-2.dmg][8]

2. Once installed, you can copy the mapserv binaries to your apache cgi-bin

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">cp</span> <span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>WebServer<span style="color: #000000; font-weight: bold;">/</span>CGI-Executables<span style="color: #000000; font-weight: bold;">/</span>mapserv <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>cgi-bin<span style="color: #000000; font-weight: bold;">/</span></pre>
      </td>
    </tr>
  </table>
</div>

3. Check the mapserv output

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:~ rupert$ <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>cgi-bin<span style="color: #000000; font-weight: bold;">/</span>mapserv <span style="color: #660033;">-v</span>
MapServer version 5.0.2 <span style="color: #007800;">OUTPUT</span>=GIF <span style="color: #007800;">OUTPUT</span>=PNG <span style="color: #007800;">OUTPUT</span>=JPEG <span style="color: #007800;">OUTPUT</span>=WBMP <span style="color: #007800;">OUTPUT</span>=SWF <span style="color: #007800;">OUTPUT</span>=SVG <span style="color: #007800;">SUPPORTS</span>=PROJ <span style="color: #007800;">SUPPORTS</span>=AGG <span style="color: #007800;">SUPPORTS</span>=FREETYPE <span style="color: #007800;">SUPPORTS</span>=WMS_SERVER <span style="color: #007800;">SUPPORTS</span>=WMS_CLIENT <span style="color: #007800;">SUPPORTS</span>=WFS_SERVER <span style="color: #007800;">SUPPORTS</span>=WFS_CLIENT <span style="color: #007800;">SUPPORTS</span>=WCS_SERVER <span style="color: #007800;">SUPPORTS</span>=SOS_SERVER <span style="color: #007800;">SUPPORTS</span>=FASTCGI <span style="color: #007800;">SUPPORTS</span>=GEOS <span style="color: #007800;">INPUT</span>=EPPL7 <span style="color: #007800;">INPUT</span>=POSTGIS <span style="color: #007800;">INPUT</span>=OGR <span style="color: #007800;">INPUT</span>=GDAL <span style="color: #007800;">INPUT</span>=SHAPEFILE</pre>
      </td>
    </tr>
  </table>
</div>

This is actually the first time I was able to install mapserver NOT BY SOURCE and still achieve the same binaries that I wanted (with AGG support). Full credit should be given to William.

 [1]: http://http://www.kyngchaos.com/wiki/software:mapserver
 [2]: http://mapserver.gis.umn.edu/download/current
 [3]: http://www.kyngchaos.com/files/software/unixport/UnixImageIO_Framework-1.0.22a.dmg
 [4]: http://www.kyngchaos.com/files/software/unixport/FreeType_Framework-2.3.5-3.dmg
 [5]: http://www.kyngchaos.com/files/software/unixport/GEOS_Framework-3.0.0-2.dmg
 [6]: http://www.kyngchaos.com/files/software/unixport/PROJ_Framework-4.6.0-1.dmg
 [7]: http://www.kyngchaos.com/files/software/unixport/SQLite3_Framework-3.5.7-1.dmg
 [8]: http://www.kyngchaos.com/files/software/unixport/MapServer-5.0.2-2.dmg