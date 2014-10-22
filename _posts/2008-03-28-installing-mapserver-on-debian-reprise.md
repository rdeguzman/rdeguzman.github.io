---
title: Installing Mapserver on Debian (reprise)
author: rupert
layout: post
permalink: /2008/03/installing-mapserver-on-debian-reprise/
aktt_tweeted:
  - 1
categories:
  - debian
  - linux
  - mapserver
tags:
  - debian
  - linux
  - mapserver
---
As noted from my [previous blog post regarding Mapserver on Debian][1], you don&#8217;t get AGG with Mapserver when installing directly from Debian packages. Thus, it would be better to [install Mapserver by source.][2] However, debian still helps because it would install all the necessary libraries needed for compiling mapserver.<!--more-->

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">.<span style="color: #000000; font-weight: bold;">/</span>configure \
<span style="color: #660033;">--with-agg</span> \
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
<span style="color: #660033;">--enable-debug</span></pre>
      </td>
    </tr>
  </table>
</div>

When I started installing yesterday, I did not know which packages/libraries are installed in my box. I dove off immediately by running my configure.sh above and received an error: <font color="red"><code>Could not find gd.h or libgd.a/libgd.so in /usr/local..</code></font>

The best way to figure out if you&#8217;re ready is reading thru the *configure* output.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">checking <span style="color: #000000; font-weight: bold;">for</span> gcc... <span style="color: #c20cb9; font-weight: bold;">gcc</span>
checking <span style="color: #000000; font-weight: bold;">for</span> C compiler default output <span style="color: #c20cb9; font-weight: bold;">file</span> name... a.out
checking whether the C compiler works... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking whether we are cross compiling... no
checking <span style="color: #000000; font-weight: bold;">for</span> suffix of executables...
checking <span style="color: #000000; font-weight: bold;">for</span> suffix of object files... o
checking whether we are using the GNU C compiler... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking whether <span style="color: #c20cb9; font-weight: bold;">gcc</span> accepts -g... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #c20cb9; font-weight: bold;">gcc</span> option to accept ANSI C... none needed
checking <span style="color: #000000; font-weight: bold;">for</span> g++... <span style="color: #c20cb9; font-weight: bold;">g++</span>
checking whether we are using the GNU C++ compiler... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking whether <span style="color: #c20cb9; font-weight: bold;">g++</span> accepts -g... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> ranlib... ranlib
checking <span style="color: #000000; font-weight: bold;">for</span> flex... no
checking <span style="color: #000000; font-weight: bold;">for</span> lex... no
checking <span style="color: #000000; font-weight: bold;">for</span> yywrap <span style="color: #000000; font-weight: bold;">in</span> -lfl... no
checking <span style="color: #000000; font-weight: bold;">for</span> yywrap <span style="color: #000000; font-weight: bold;">in</span> -ll... no
checking <span style="color: #000000; font-weight: bold;">for</span> bison... no
checking <span style="color: #000000; font-weight: bold;">for</span> byacc... no
checking <span style="color: #000000; font-weight: bold;">if</span> compiler supports -R... no
checking <span style="color: #000000; font-weight: bold;">if</span> compiler supports -Wl,-rpath,... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> exp <span style="color: #000000; font-weight: bold;">in</span> -lm... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> __gxx_personality_v0 <span style="color: #000000; font-weight: bold;">in</span> -lstdc++... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking how to run the C preprocessor... <span style="color: #c20cb9; font-weight: bold;">gcc</span> <span style="color: #660033;">-E</span>
checking <span style="color: #000000; font-weight: bold;">for</span> egrep... <span style="color: #c20cb9; font-weight: bold;">grep</span> <span style="color: #660033;">-E</span>
checking <span style="color: #000000; font-weight: bold;">for</span> ANSI C header files... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> strcasecmp... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> strncasecmp... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> strdup... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> strlcat... no
checking <span style="color: #000000; font-weight: bold;">for</span> vsnprintf... <span style="color: #c20cb9; font-weight: bold;">yes</span>
MapServer Version from mapserver.h: <span style="color: #ff0000;">'5.0.2'</span>
configure: checking where FreeType <span style="color: #000000;">2</span>.x is installed...
checking <span style="color: #000000; font-weight: bold;">for</span> freetype-config... <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>freetype-config
        using libfreetype from <span style="color: #660033;">-lfreetype</span> <span style="color: #660033;">-lz</span>
checking <span style="color: #000000; font-weight: bold;">for</span> FT_Init_FreeType <span style="color: #000000; font-weight: bold;">in</span> -lfreetype... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using libfreetype <span style="color: #660033;">-lfreetype</span> from system libs.
configure: checking where Zlib is installed...
checking <span style="color: #000000; font-weight: bold;">for</span> zlibVersion <span style="color: #000000; font-weight: bold;">in</span> -lz... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using libz from system libs <span style="color: #7a0874; font-weight: bold;">&#40;</span>-DUSE_ZLIB<span style="color: #7a0874; font-weight: bold;">&#41;</span>.
configure: checking where PNG is installed...
checking <span style="color: #000000; font-weight: bold;">for</span> png_init_io <span style="color: #000000; font-weight: bold;">in</span> -lpng... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using libpng from system libs.
configure: checking whether we should include JPEG support...
checking <span style="color: #000000; font-weight: bold;">for</span> jpeg_read_header <span style="color: #000000; font-weight: bold;">in</span> -ljpeg... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using libjpeg from system libs.
configure: checking where libXpm is installed...
checking <span style="color: #000000; font-weight: bold;">for</span> XpmFreeXpmImage <span style="color: #000000; font-weight: bold;">in</span> -lXpm... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using libXpm from system libs.
configure: checking where libiconv is installed...
checking <span style="color: #000000; font-weight: bold;">for</span> iconv_open <span style="color: #000000; font-weight: bold;">in</span> -lc... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> libiconv_open <span style="color: #000000; font-weight: bold;">in</span> -liconv... no
        using libiconv from system libs.
        libiconv found. Enabling internationalization <span style="color: #7a0874; font-weight: bold;">&#40;</span>-DUSE_ICONV<span style="color: #7a0874; font-weight: bold;">&#41;</span>
configure: checking <span style="color: #000000; font-weight: bold;">for</span> GD 2.0.16 or higher...
checking <span style="color: #000000; font-weight: bold;">for</span> gdFontCacheSetup <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using libgd 2.0.16 <span style="color: #7a0874; font-weight: bold;">&#40;</span>or higher<span style="color: #7a0874; font-weight: bold;">&#41;</span> from system libs <span style="color: #7a0874; font-weight: bold;">&#40;</span>-L<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>lib <span style="color: #660033;">-lgd</span> <span style="color: #660033;">-ljpeg</span> <span style="color: #660033;">-lfreetype</span> <span style="color: #660033;">-lpng</span> <span style="color: #660033;">-lz</span> <span style="color: #660033;">-lXpm</span> <span style="color: #660033;">-lX11</span> <span style="color: #7a0874; font-weight: bold;">&#41;</span>.
checking <span style="color: #000000; font-weight: bold;">for</span> gdImageCreate <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> gdImageGif <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> gdImagePng <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> gdImageJpeg <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> gdImageWBMP <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> gdImageStringFT <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> gdImageOpenPolygon <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> gdImageGifPtr <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> gdFontGetTiny <span style="color: #000000; font-weight: bold;">in</span> -lgd... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using GD <span style="color: #7a0874; font-weight: bold;">&#40;</span> -DUSE_GD_GIF -DUSE_GD_PNG -DUSE_GD_JPEG -DUSE_GD_WBMP -DUSE_GD_FT -DGD_HAS_FTEX_XSHOW -DGD_HAS_GDIMAGEGIFPTR -DGD_HAS_GETBITMAPFONTS<span style="color: #7a0874; font-weight: bold;">&#41;</span> from system libs.
configure: checking whether we should include PDF support...
checking <span style="color: #000000; font-weight: bold;">for</span> PDF_setlinewidth <span style="color: #000000; font-weight: bold;">in</span> -lpdf... no
checking <span style="color: #000000; font-weight: bold;">for</span> PDF_setrgbcolor <span style="color: #000000; font-weight: bold;">in</span> -lpdf... no
checking <span style="color: #000000; font-weight: bold;">for</span> PDF_moveto <span style="color: #000000; font-weight: bold;">in</span> -lpdf... no
checking <span style="color: #000000; font-weight: bold;">for</span> PDF_curveto <span style="color: #000000; font-weight: bold;">in</span> -lpdf... no
checking <span style="color: #000000; font-weight: bold;">for</span> PDF_show_xy <span style="color: #000000; font-weight: bold;">in</span> -lpdf... no
checking <span style="color: #000000; font-weight: bold;">for</span> PDF_load_font <span style="color: #000000; font-weight: bold;">in</span> -lpdf... no
        libpdf not found or too old... PDF support not included.
checking <span style="color: #000000; font-weight: bold;">if</span> AGG support requested... looking <span style="color: #000000; font-weight: bold;">for</span> agg libs <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>usr
using libagg from <span style="color: #000000; font-weight: bold;">/</span>usr
using libaggfontfreetype from <span style="color: #000000; font-weight: bold;">/</span>usr
configure: checking whether we should include EPPL7 support...
        including EPPL7 support.
configure: checking whether we should include PROJ.4 support...
checking <span style="color: #000000; font-weight: bold;">for</span> pj_init <span style="color: #000000; font-weight: bold;">in</span> -lproj... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> pj_transform <span style="color: #000000; font-weight: bold;">in</span> -lproj... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using PROJ.4 from system libs.
configure: checking whether we should include thread safe support...
checking <span style="color: #000000; font-weight: bold;">for</span> pthread_create <span style="color: #000000; font-weight: bold;">in</span> -lpthread... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using <span style="color: #660033;">-lpthread</span> from system libs.
configure: checking whether we should include ESRI SDE support...
        ESRI SDE support not requested.
checking <span style="color: #000000; font-weight: bold;">if</span> GEOS support requested... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> geos-config... <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>geos-config
checking <span style="color: #000000; font-weight: bold;">for</span> GEOS version <span style="color: #000000; font-weight: bold;">&</span>gt;= 2.2.2... yes. Found version 2.2.3
configure: checking whether we should include OGR support...
checking <span style="color: #000000; font-weight: bold;">for</span> gdal-config... <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>gdal-config
        OGR enabled <span style="color: #7a0874; font-weight: bold;">&#40;</span>-DUSE_OGR<span style="color: #7a0874; font-weight: bold;">&#41;</span>.
checking <span style="color: #000000; font-weight: bold;">if</span> GDAL support requested... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking checking ms JPEG output... no we, have GDAL available.
configure: checking whether we should include TIFF support...
checking <span style="color: #000000; font-weight: bold;">for</span> TIFFOpen <span style="color: #000000; font-weight: bold;">in</span> -ltiff... <span style="color: #c20cb9; font-weight: bold;">yes</span>
        using libtiff from system libs.
checking <span style="color: #000000; font-weight: bold;">if</span> PostGIS support requested... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">for</span> pg_config... <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>pg_config
<span style="color: #c20cb9; font-weight: bold;">yes</span>, user supplied pg_config
checking <span style="color: #000000; font-weight: bold;">if</span> MyGIS support requested... no
checking <span style="color: #000000; font-weight: bold;">if</span> OracleSpatial support requested... no
checking <span style="color: #000000; font-weight: bold;">if</span> MING<span style="color: #000000; font-weight: bold;">/</span>Flash support requested... no
configure: checking whether we should include WMS Server support...
        OGC WMS compatibility enabled <span style="color: #7a0874; font-weight: bold;">&#40;</span>-DUSE_WMS_SVR<span style="color: #7a0874; font-weight: bold;">&#41;</span>.
configure: checking whether we should include WFS Server support...
        OGC WFS Server support enabled <span style="color: #7a0874; font-weight: bold;">&#40;</span>-DUSE_WFS_SVR<span style="color: #7a0874; font-weight: bold;">&#41;</span>.
configure: checking whether we should include WCS Server support...
        OGC WCS Server support enabled <span style="color: #7a0874; font-weight: bold;">&#40;</span>-DUSE_WCS_SVR<span style="color: #7a0874; font-weight: bold;">&#41;</span>.
configure: checking whether we should include WMS Client Connections support...
configure: checking whether we should include WFS Client Connections support...
configure: checking whether we should include OGC SOS Server support...
configure: checking <span style="color: #000000; font-weight: bold;">for</span> curl-config...
checking <span style="color: #000000; font-weight: bold;">for</span> curl-config... <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>curl-config
        found libcurl version 7.18.0
        OGC WMS Client Connections enabled <span style="color: #7a0874; font-weight: bold;">&#40;</span>-DUSE_WMS_LYR<span style="color: #7a0874; font-weight: bold;">&#41;</span>.
        OGC WFS Client Connections enabled <span style="color: #7a0874; font-weight: bold;">&#40;</span>-DUSE_WFS_LYR<span style="color: #7a0874; font-weight: bold;">&#41;</span>.
configure: checking <span style="color: #000000; font-weight: bold;">for</span> xml2-config...
configure: checking whether FastCGI support should be enabled...
        FastCGI support not enabled.
configure: checking HTTPD server <span style="color: #7a0874; font-weight: bold;">&#40;</span>Apache<span style="color: #7a0874; font-weight: bold;">&#41;</span> version...
        using user-supplied httpd <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #7a0874; font-weight: bold;">&#41;</span>
        <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span>apache2 version is Apache<span style="color: #000000; font-weight: bold;">/</span>2.2.8 <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">2002008</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>.
        Your system is apparently running Apache<span style="color: #000000; font-weight: bold;">/</span>2.2.8.  Setting stderr to non-blocking <span style="color: #000000; font-weight: bold;">for</span> msDebug<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> due to Apache <span style="color: #000000;">2</span>.x bug <span style="color: #7a0874; font-weight: bold;">&#40;</span>see MapServer bug <span style="color: #000000;">458</span> or Apache bug <span style="color: #000000;">22030</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>.
Compiling with fast MS_NINT
checking compiler warnings... basic
configure: checking whether we should <span style="color: #7a0874; font-weight: bold;">enable</span> debug features...
        Enabling debug features: <span style="color: #660033;">-g</span> <span style="color: #000000; font-weight: bold;">in</span> CFLAGS.
configure: checking <span style="color: #000000; font-weight: bold;">for</span> PHP<span style="color: #000000; font-weight: bold;">/</span>MapScript module options...
        PHP<span style="color: #000000; font-weight: bold;">/</span>MapScript module not configured.
checking <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #c20cb9; font-weight: bold;">g++</span> <span style="color: #660033;">-shared</span> ... <span style="color: #c20cb9; font-weight: bold;">yes</span>
checking <span style="color: #000000; font-weight: bold;">if</span> <span style="color: #660033;">--enable-runpath</span> requested... no
checking <span style="color: #000000; font-weight: bold;">if</span> <span style="color: #660033;">--with-java-include-os-name</span> specified... no, autodetected linux
configure: creating .<span style="color: #000000; font-weight: bold;">/</span>config.status
config.status: creating Makefile
config.status: creating mapscript<span style="color: #000000; font-weight: bold;">/</span>java<span style="color: #000000; font-weight: bold;">/</span>Makefile
config.status: creating mapscript<span style="color: #000000; font-weight: bold;">/</span>csharp<span style="color: #000000; font-weight: bold;">/</span>Makefile
&nbsp;
MapServer is now configured <span style="color: #000000; font-weight: bold;">for</span>
&nbsp;
 <span style="color: #660033;">--------------</span> Compiler Info <span style="color: #660033;">-------------</span>
  C compiler:                <span style="color: #c20cb9; font-weight: bold;">gcc</span> <span style="color: #660033;">-g</span> <span style="color: #660033;">-O2</span> <span style="color: #660033;">-fPIC</span> <span style="color: #660033;">-Wall</span>
  C++ compiler:              <span style="color: #c20cb9; font-weight: bold;">g++</span> <span style="color: #660033;">-g</span> <span style="color: #660033;">-O2</span> <span style="color: #660033;">-fPIC</span> <span style="color: #660033;">-Wall</span>
  Debug:                     <span style="color: #660033;">-g</span>  -DNEED_NONBLOCKING_STDERR
  Generic NINT:
  Threading support:         -DUSE_THREAD
&nbsp;
 <span style="color: #660033;">--------------</span> Renderer Settings <span style="color: #660033;">---------</span>
  zlib support:              -DUSE_ZLIB
  png support:
  jpeg support:
  iconv support:             -DUSE_ICONV
  AGG support:               -DUSE_AGG
  AGG Freetype support:      <span style="color: #660033;">-laggfontfreetype</span>
  Ming<span style="color: #7a0874; font-weight: bold;">&#40;</span>flash<span style="color: #7a0874; font-weight: bold;">&#41;</span> support:
  PDFLib support:
&nbsp;
 <span style="color: #660033;">--------------</span> Data Format Drivers <span style="color: #660033;">-------</span>
  native tiff support:       -DUSE_TIFF
  PostGIS support:           -DUSE_POSTGIS
  Proj.4 support:            -DUSE_PROJ
  EPPL7 support:             -DUSE_EPPL
  ArcSDE support:
  OGR support:               -DUSE_OGR
  GDAL support:              -DUSE_GDAL
  GEOS support:              -DUSE_GEOS
  Oracle Spatial support:
  FastCGI support:
&nbsp;
 <span style="color: #660033;">--------------</span> OGC Services <span style="color: #660033;">--------------</span>
  WMS Server:                -DUSE_WMS_SVR
  WMS Client:                -DUSE_WMS_LYR
  WFS Server:                -DUSE_WFS_SVR
  WFS Client:                -DUSE_WMS_LYR
  WCS Server:                -DUSE_WCS_SVR
  SOS Server:
&nbsp;
 <span style="color: #660033;">--------------</span> MapScript <span style="color: #660033;">-----------------</span>
  PHP MapScript:             no</pre>
      </td>
    </tr>
  </table>
</div>

I was able to weed out the problem above by checking on the libraries noted with &#8220;yes&#8221; above if they are installed or not. To overcome this, I needed to install the ff debian packages on &#8216;lenny(testing)':

`libagg-dev libgd2-xpm libgd2-xpm-dev libtiff4 libtiff4-dev libpng libpng-dev libxpm4 libxpm4-dev libfreetype6-dev libapache2-mod-python python-imaging `

Results:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">debsexy:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>cgi-bin<span style="color: #666666; font-style: italic;"># ./mapserv -v</span>
MapServer version 5.0.2 <span style="color: #007800;">OUTPUT</span>=GIF <span style="color: #007800;">OUTPUT</span>=PNG <span style="color: #007800;">OUTPUT</span>=JPEG <span style="color: #007800;">OUTPUT</span>=WBMP <span style="color: #007800;">OUTPUT</span>=SVG <span style="color: #007800;">SUPPORTS</span>=PROJ <span style="color: #007800;">SUPPORTS</span>=AGG <span style="color: #007800;">SUPPORTS</span>=FREETYPE <span style="color: #007800;">SUPPORTS</span>=WMS_SERVER <span style="color: #007800;">SUPPORTS</span>=WMS_CLIENT <span style="color: #007800;">SUPPORTS</span>=WFS_SERVER <span style="color: #007800;">SUPPORTS</span>=WFS_CLIENT <span style="color: #007800;">SUPPORTS</span>=WCS_SERVER <span style="color: #007800;">SUPPORTS</span>=THREADS <span style="color: #007800;">SUPPORTS</span>=GEOS <span style="color: #007800;">INPUT</span>=TIFF <span style="color: #007800;">INPUT</span>=EPPL7 <span style="color: #007800;">INPUT</span>=POSTGIS <span style="color: #007800;">INPUT</span>=OGR <span style="color: #007800;">INPUT</span>=GDAL <span style="color: #007800;">INPUT</span>=SHAPEFILE</pre>
      </td>
    </tr>
  </table>
</div>

 [1]: /wordpress/index.php/2007/08/01/debian-howto-installing-mapserver/
 [2]: http://mapserver.gis.umn.edu/download/current