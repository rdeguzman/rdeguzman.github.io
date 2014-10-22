---
title: Installing Mapserver on RedHat/CentOS Linux
author: rupert
layout: post
permalink: /2007/07/installing-mapserver/
aktt_tweeted:
  - 1
categories:
  - linux
  - mapserver
tags:
  - centos
  - linux
  - mapserver
---
Tested on: CentOS 5.0, 4.1  
vim /etc/ld.so.conf  
include /usr/lib64  
include /usr/local/lib  
include /usr/lib

Prerequisites:  
rpm -ivh $CENTOS/bzip2-devel-1.0.3-3.x86_64.rpm  
rpm -ivh $CENTOS/libidn-0.6.5-1.1.x86_64.rpm  
rpm -ivh $CENTOS/curl-7.15.5-2.el5.x86_64.rpm  
rpm -ivh $CENTOS/pkgconfig-0.21-1.fc6.x86_64.rpm  
rpm -ivh $CENTOS/libidn-devel-0.6.5-1.1.x86_64.rpm  
rpm -ivh $CENTOS/e2fsprogs-devel-1.39-10.el5.x86_64.rpm  
rpm -ivh $CENTOS/krb5-devel-1.6.1-17.el5.x86_64.rpm  
rpm -ivh $CENTOS/zlib-devel-1.2.3-3.x86_64.rpm  
rpm -ivh $CENTOS/openssl-devel-0.9.8b-8.3.el5\_0.2.x86\_64.rpm  
rpm -ivh $CENTOS/flex-2.5.4a-41.fc6.x86_64.rpm  
rpm -ivh $CENTOS/libstdc++-devel-4.1.2-14.el5.x86_64.rpm  
rpm -ivh $CENTOS/libxml2-devel-2.6.26-2.1.2.x86_64.rpm  
rpm -ivh $CENTOS/libxslt-devel-1.1.17-2.x86_64.rpm  
rpm -ivh $CENTOS/nmap-4.11-1.1.x86_64.rpm  
rpm -ivh $CENTOS/swig-1.3.29-2.el5.x86_64.rpm  
rpm -ivh $CENTOS/apr-1.2.7-11.x86_64.rpm  
rpm -ivh $CENTOS/apr-util-1.2.7-6.x86_64.rpm  
rpm -ivh $CENTOS/neon-0.25.5-5.1.x86_64.rpm  
rpm -ivh $CENTOS/perl-URI-1.35-3.noarch.rpm  
rpm -ivh $CENTOS/subversion-1.4.2-2.el5.x86_64.rpm  
rpm -ivh $CENTOS/libtool-ltdl-1.5.22-6.1.x86_64.rpm  
rpm -ivh $CENTOS/libtool-1.5.22-6.1.x86_64.rpm  
rpm -ivh $CENTOS/libtool-ltdl-devel-1.5.22-6.1.x86_64.rpm  
rpm -ivh $CENTOS/guile-1.8.0-8.20060831cvs.x86_64.rpm  
rpm -ivh $CENTOS/libX11-devel-1.0.3-8.0.1.el5.x86\_64.rpm $CENTOS/libXau-devel-1.0.1-3.1.x86\_64.rpm $CENTOS/xorg-x11-proto-devel-7.1-9.el5.centos.x86\_64.rpm $CENTOS/mesa-libGL-devel-6.5.1-7.5.el5.x86\_64.rpm $CENTOS/libXdmcp-devel-1.0.1-2.1.x86_64.rpm  
rpm -ivh $CENTOS/libjpeg-devel-6b-37.x86_64.rpm  
rpm -ivh $CENTOS/libpng-1.2.10-7.0.2.x86_64.rpm  
rpm -ivh $CENTOS/freetype-2.2.1-19.el5.x86_64.rpm  
rpm -ivh $CENTOS/freetype-devel-2.2.1-19.el5.x86_64.rpm  
rpm -ivh $CENTOS/gd-devel-2.0.33-9.3.fc6.x86\_64.rpm $CENTOS/fontconfig-devel-2.4.1-6.el5.x86\_64.rpm $CENTOS/libXpm-devel-3.5.5-3.x86\_64.rpm $CENTOS/libpng-devel-1.2.10-7.0.2.x86\_64.rpm $CENTOS/gd-2.0.33-9.3.fc6.x86_64.rpm

1. Install proj4  
-tar -zxvf proj-4.4.9.tar.gz  
-./configure  
-make  
-make install

2. Install geos  
-bzip2 -d geos-3.0.0.tar.bz2  
-tar -xvf geos-3.0.0.tar  
-./configure &#8211;enable-python  
-make  
-make install

3. install postgres and postgis  
rpm -ivh postgresql-libs-8.3.1-1PGDG.rhel5.x86_64.rpm  
rpm -ivh postgresql-8.3.1-1PGDG.rhel5.x86_64.rpm  
rpm -ivh postgresql-devel-8.3.1-1PGDG.rhel5.x86_64.rpm  
rpm -ivh postgresql-server-8.3.1-1PGDG.rhel5.x86_64.rpm  
rpm -ivh postgresql-contrib-8.3.1-1PGDG.rhel5.x86_64.rpm  
rpm -ivh postgresql-plperl-8.3.1-1PGDG.rhel5.x86_64.rpm  
rpm -ivh postgresql-plpython-8.3.1-1PGDG.rhel5.x86_64.rpm 

\# tar -zxvf postgis-1.3.3.tar.gz  
\# cd postgis-1.3.3  
\# ./configure &#8211;with-pgsql=/usr/bin/pg_config  
\# make  
\# make install

If you need to put the postgres data for mapserver, then:  
initdb -E utf8 -D /var/lib/pgsql/data

3. install gdal  
./configure &#8211;with-png &#8211;with-libtiff &#8211;with-static-proj4=/usr/local/bin &#8211;with-python &#8211;with-perl &#8211;with-geos &#8211;with-pg=/usr/bin/pg_config

*Note: If there is an error regarding libxpat.so because of 64 bit libraries, then edit GDALmake.opt and change /usr/lib to /usr/lib64*  
<http://www.nabble.com/GDAL-v1.5.1-compile-error-on-RHEL5.-td17428872.html>

GDAL is now configured for i686-pc-linux-gnu

Installation directory: /usr/local  
C compiler: gcc -O2  
C++ compiler: g++ -O2

LIBTOOL support: yes

LIBZ support: external  
GRASS support: no  
CFITSIO support: no  
PCRaster support: internal  
NETCDF support: no  
LIBPNG support: external  
LIBTIFF support: external  
LIBGEOTIFF support: internal  
LIBJPEG support: external  
LIBGIF support: external  
OGDI support: no  
HDF4 support: no  
HDF5 support: no  
KAKADU support: no  
JASPER support: no  
ECW support: no  
MrSID support: no  
CURL support (wcs): yes  
POSTGRESQL support: yes  
MySQL support: yes  
XERCES support: no  
ODBC support: no  
PGEO support: no  
OCI support: no  
SDE support: no  
DODS support: no  
SQLite support: no  
DWGdirect support no  
PANORAMA GIS support: no  
INFORMIX DataBlade support:no  
GEOS support: yes

Statically link PROJ.4: yes

Traditional Python: yes  
NG SWIG Bindings: perl

enable OGR building: yes

make  
make install

4. Remove any existing apache from rpm then install apache2 by source.  
rpm -e httpd-2.2.3-11.el5.centos gnome-user-share-0.10-6.el5.x86_64  
./configure &#8211;prefix=/usr/local/apache2 &#8211;enable-rewrite &#8211;enable-so &#8211;with-mpm=prefork  
make  
make install

5. rpm -ivh alsa-lib-devel-1.0.14-1.rc4.el5.x86\_64.rpm esound-0.2.36-3.x86\_64.rpm esound-devel-0.2.36-3.x86\_64.rpm audiofile-0.2.6-5.x86\_64.rpm mesa-libGLU-6.5.1-7.5.el5.x86\_64.rpm mesa-libGLU-devel-6.5.1-7.5.el5.x86\_64.rpm libXext-1.0.1-2.1.x86\_64.rpm libXext-devel-1.0.1-2.1.x86\_64.rpm libXrandr-devel-1.1.1-3.1.x86\_64.rpm libXrender-devel-0.9.1-3.1.x86\_64.rpm libXt-devel-1.0.2-3.1.fc6.x86\_64.rpm audiofile-devel-0.2.6-5.x86\_64.rpm libSM-devel-1.0.1-3.1.x86\_64.rpm libICE-devel-1.0.1-2.1.x86\_64.rpm

6. rpm -ivh SDL-1.2.10-8.el5.x86\_64.rpm SDL-devel-1.2.10-8.el5.x86\_64.rpm

7. Dont use agg-2.4! PLEASE read this post from [mapserver trac ticket.][1] Instead, download the packages form http://dag.wieers.com/rpm/packages/agg/

Note: For 64-bit packages:  
&#8211; http://dag.wieers.com/rpm/packages/agg/agg-2.5-1.el5.rf.x86_64.rpm  
&#8211; http://dag.wieers.com/rpm/packages/agg/agg-devel-2.5-1.el5.rf.x86_64.rpm

8. install mapserver. This assumes you have PHP, APACHE, POSTGRES, POSTGIS,  
MYSQL already installed.

./configure \  
&#8211;with-agg \  
&#8211;with-jpeg \  
&#8211;with-gd \  
&#8211;with-freetype \  
&#8211;with-png \  
&#8211;with-ogr \  
&#8211;with-proj \  
&#8211;with-gdal \  
&#8211;with-httpd=/usr/local/apache2/bin/httpd \  
&#8211;with-tiff \  
&#8211;with-wfs \  
&#8211;with-wcs \  
&#8211;with-sos \  
&#8211;with-wmsclient \  
&#8211;with-wfsclient \  
&#8211;with-geos=/usr/local/bin/geos-config \  
&#8211;with-gdal=/usr/local/bin/gdal-config \  
&#8211;with-postgis=/usr/bin/pg_config 

-make  
-make install

9. Post Install Considerations:  
ln -s /usr/local/lib/libproj.so.0 /usr/lib/libproj.so.0  
ln -s /usr/local/lib/libgdal.so.1 /usr/lib/libgdal.so.1  
ln -s /usr/local/lib/libgeos\_c.so.1 /usr/lib/libgeos\_c.so.1  
ldconfig

10. cp -rf mapserv /usr/local/apache2/cgi-bin/  
check mapserv  
./mapserv -v  
MapServer version 5.0.3 OUTPUT=GIF OUTPUT=PNG OUTPUT=JPEG OUTPUT=WBMP OUTPUT=SVG SUPPORTS=PROJ SUPPORTS=AGG SUPPORTS=FREETYPE SUPPORTS=WMS\_SERVER SUPPORTS=WMS\_CLIENT SUPPORTS=WFS\_SERVER SUPPORTS=WFS\_CLIENT SUPPORTS=WCS\_SERVER SUPPORTS=SOS\_SERVER SUPPORTS=GEOS INPUT=EPPL7 INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE

11. cp the ff:  
cp legend scalebar shp2img shp2pdf shptree shptreetst shptreevis sortshp  
tile4ms /usr/local/apache2/cgi-bin/

12. cp $mapserver\_install\_dir/mapscript/php3/php_mapscript.so /usr/local/apache2/modules/

######################################  
11. edit httpd.conf  
setenv LD\_LIBRARY\_PATH /usr/local/lib

12. vi /etc/ld.so.conf  
Add the following lines:  
/usr/local/include  
/usr/local/lib  
run:  
13 ldconfig

 [1]: http://trac.osgeo.org/mapserver/ticket/2224