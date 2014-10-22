---
title: 'Debian Howto: Installing Mapserver'
author: rupert
layout: post
permalink: /2007/08/debian-howto-installing-mapserver/
categories:
  - debian
  - linux
  - mapserver
tags:
  - debian
  - mapserver
---
By default, we can install mapserver using *etch* stable from a debian mirror using ***apt-get***. Final results were almost close as expected, however, I need mapserver with TIFF support to be able to display my satellite images. Thus, recompilation is necessary. Below is the binary version difference for both installation procedures.

Nevertheless, it is worth noting that &#8216;apt-get&#8217; significantly boost the installation of mapserver. I highly suggest to install mapserver using apt-get and use source compilation only if necessary.

a) mapserver installed using apt-get

`<br />
rupert-debian:/usr/lib/cgi-bin# ./mapserv -v<br />
MapServer version 4.10.2 OUTPUT=GIF OUTPUT=PNG OUTPUT=JPEG OUTPUT=WBMP OUTPUT=SVG SUPPORTS=PROJ SUPPORTS=FREETYPE SUPPORTS=WMS_SERVER SUPPORTS=WMS_CLIENT SUPPORTS=WFS_SERVER SUPPORTS=WFS_CLIENT SUPPORTS=WCS_SERVER SUPPORTS=THREADS SUPPORTS=GEOS INPUT=TIFF INPUT=EPPL7 INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE DEBUG=MSDEBUG<br />
`

Installation instructions for a:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000;">1</span>. <span style="color: #c20cb9; font-weight: bold;">apt-get install</span> <span style="color: #c20cb9; font-weight: bold;">g++</span> libgd2-xpm libgd2-xpm-dev libcurl3 zlib1g-dev libgd-dev libtiff4 libtiff4-dev  libapache2-mod-python python-imaging  
&nbsp;
<span style="color: #000000;">2</span>. <span style="color: #c20cb9; font-weight: bold;">apt-get install</span> php5-cgi php5-common php5-curl php5-dev php5-gd php5-mysql php5-pgsql php5-sqlite php5-xsl libapache2-mod-php5
&nbsp;
<span style="color: #000000;">3</span>. <span style="color: #c20cb9; font-weight: bold;">apt-get install</span> python2.5 python2.5-dev python2.5-examples
&nbsp;
<span style="color: #000000;">4</span>. <span style="color: #c20cb9; font-weight: bold;">apt-get install</span> mysql-client-<span style="color: #000000;">5.0</span> mysql-server-<span style="color: #000000;">5.0</span> mytop mysql-admin mysql-admin-common libmysqlclient15-dev libdbd-mysql-perl libdbd-mysql-ruby mtop
&nbsp;
<span style="color: #000000;">5</span>. <span style="color: #c20cb9; font-weight: bold;">apt-get install</span> postgresql-common postgresql-<span style="color: #000000;">8.2</span> postgresql-client-<span style="color: #000000;">8.2</span> postgresql-contrib-<span style="color: #000000;">8.2</span> postgresql-<span style="color: #000000;">8.2</span>-plr postgresql-<span style="color: #000000;">8.2</span>-plruby postgresql-<span style="color: #000000;">8.2</span>-postgis postgresql-plperl-<span style="color: #000000;">8.2</span> postgresql-plpython-<span style="color: #000000;">8.2</span> postgresql-pltcl-<span style="color: #000000;">8.2</span> libpq4 
&nbsp;
<span style="color: #000000;">6</span>.  <span style="color: #c20cb9; font-weight: bold;">apt-get install</span> gdal-bin cgi-mapserver mapserver-bin mapserver-doc perl-mapscript php5-mapscript python-mapscript</pre>
      </td>
    </tr>
  </table>
</div>

b. mapserver compiled

`<br />
rupert-debian:/usr/lib/cgi-bin# ./mapserv_default -v<br />
MapServer version 4.10.0 OUTPUT=GIF OUTPUT=PNG OUTPUT=JPEG OUTPUT=WBMP OUTPUT=SVG SUPPORTS=PROJ SUPPORTS=FREETYPE SUPPORTS=WMS_SERVER SUPPORTS=WMS_CLIENT SUPPORTS=WFS_SERVER SUPPORTS=WFS_CLIENT SUPPORTS=WCS_SERVER SUPPORTS=THREADS SUPPORTS=GEOS INPUT=EPPL7 INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE DEBUG=MSDEBUG<br />
`

Installation instructions for b:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#tar -zxvf geos-3.0.0rc4</span>
<span style="color: #666666; font-style: italic;">#./configure</span>
<span style="color: #666666; font-style: italic;">#make</span>
<span style="color: #666666; font-style: italic;">#make install</span>
&nbsp;
<span style="color: #666666; font-style: italic;">#modify /etc/apt/sources.list and uncomment testing</span>
deb http:<span style="color: #000000; font-weight: bold;">//</span>mirrors.geekbone.org<span style="color: #000000; font-weight: bold;">/</span>debian testing main
deb-src  http:<span style="color: #000000; font-weight: bold;">//</span>mirrors.geekbone.org<span style="color: #000000; font-weight: bold;">/</span>debian testing main
&nbsp;
deb http:<span style="color: #000000; font-weight: bold;">//</span>mirrors.geekbone.org<span style="color: #000000; font-weight: bold;">/</span>debian etch main
deb-src  http:<span style="color: #000000; font-weight: bold;">//</span>mirrors.geekbone.org<span style="color: #000000; font-weight: bold;">/</span>debian etch main
&nbsp;
deb http:<span style="color: #000000; font-weight: bold;">//</span>security.debian.org<span style="color: #000000; font-weight: bold;">/</span> etch<span style="color: #000000; font-weight: bold;">/</span>updates main contrib
deb-src http:<span style="color: #000000; font-weight: bold;">//</span>security.debian.org<span style="color: #000000; font-weight: bold;">/</span> etch<span style="color: #000000; font-weight: bold;">/</span>updates main contrib
&nbsp;
<span style="color: #666666; font-style: italic;">#apt-get update</span>
&nbsp;
<span style="color: #666666; font-style: italic;">#apt-get install postgresql-8.2-postgis</span>
&nbsp;
<span style="color: #666666; font-style: italic;">#tar -zxvf mapserver-4.10.2.tar.gz</span>
<span style="color: #666666; font-style: italic;">#./configure \</span>
<span style="color: #660033;">--with-jpeg</span> \
<span style="color: #660033;">--with-gd</span> \
<span style="color: #660033;">--with-freetype</span> \
<span style="color: #660033;">--with-png</span> \
<span style="color: #660033;">--with-ogr</span> \
<span style="color: #660033;">--with-proj</span> \
<span style="color: #660033;">--with-gdal</span> \
<span style="color: #660033;">--with-httpd</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span>apache2 \
<span style="color: #660033;">--with-tiff</span> \
<span style="color: #660033;">--with-wfs</span> \
<span style="color: #660033;">--with-wcs</span> \
<span style="color: #660033;">--with-threads</span> \
<span style="color: #660033;">--with-wmsclient</span> \
<span style="color: #660033;">--with-wfsclient</span> \
<span style="color: #660033;">--with-geos</span> \
<span style="color: #660033;">--with-postgis</span> \
<span style="color: #660033;">--enable-debug</span>
<span style="color: #666666; font-style: italic;">#make</span>
<span style="color: #666666; font-style: italic;">#make install</span>
<span style="color: #666666; font-style: italic;">#cp -Rf mapserv /usr/local/cgi-bin/</span></pre>
      </td>
    </tr>
  </table>
</div>