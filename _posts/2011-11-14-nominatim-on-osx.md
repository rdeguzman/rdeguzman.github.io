---
title: Nominatim + homebrew on OSX + OSM data + PHP = open sourced reverse geocoder
author: rupert
layout: post
permalink: /2011/11/nominatim-on-osx/
dsq_needs_sync:
  - 1
categories:
  - postgis
  - postgres
tags:
  - osx
  - postgis
  - postgres
---
This installation guide (at the time of writing) was tested on SVN trunk of OSM2PGSQL and running on latest/stable Postgres/Postgis versions on OSX via homebrew.

**1. Summary**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">OSX Snow Leopard
&nbsp;
OSM2PGSQL: 
Head http://svn.openstreetmap.org/applications/utils/export/osm2pgsql Revision: 27034
Last Changed Author: frederik
Last Changed Rev: 27030
Last Changed Date: 2011-11-09 10:57:49 +1100 (Wed, 09 Nov 2011)
&nbsp;
POSTGRES: 9.0.4
&nbsp;
POSTGIS: "POSTGIS="1.5.3" GEOS="3.3.1-CAPI-1.7.1" PROJ="Rel. 4.7.1, 23 September 2009" LIBXML="2.7.3" USE_STATS" # SELECT POSTGIS_FULL_VERSION();
&nbsp;
PHP: 5.3.8 (cli) (built: Nov 14 2011 14:41:52) #php -v</pre>
      </td>
    </tr>
  </table>
</div>

**2. Installation**  
Most of the software is installed via [homebrew.][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># Install homebrew</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>ruby <span style="color: #660033;">-e</span> <span style="color: #ff0000;">"<span style="color: #007800;">$(curl -fsSL https://raw.github.com/gist/323731)</span>"</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># Install postgresql</span>
<span style="color: #000000; font-weight: bold;">%</span> brew <span style="color: #c20cb9; font-weight: bold;">install</span> postgresql
<span style="color: #000000; font-weight: bold;">%</span> initdb <span style="color: #660033;">-E</span> utf8 <span style="color: #660033;">-D</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>postgres
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">cp</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>Cellar<span style="color: #000000; font-weight: bold;">/</span>postgresql<span style="color: #000000; font-weight: bold;">/</span>9.0.4<span style="color: #000000; font-weight: bold;">/</span>org.postgresql.postgres.plist ~<span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>LaunchAgents<span style="color: #000000; font-weight: bold;">/</span>
<span style="color: #000000; font-weight: bold;">%</span> launchctl load <span style="color: #660033;">-w</span> ~<span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>LaunchAgents<span style="color: #000000; font-weight: bold;">/</span>org.postgresql.postgres.plist
<span style="color: #000000; font-weight: bold;">%</span> psql <span style="color: #660033;">-d</span> postgres <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>Cellar<span style="color: #000000; font-weight: bold;">/</span>postgresql<span style="color: #000000; font-weight: bold;">/</span>9.0.4<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postgresql<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>adminpack.sql
&nbsp;
<span style="color: #666666; font-style: italic;"># Install postgis</span>
<span style="color: #000000; font-weight: bold;">%</span> brew <span style="color: #c20cb9; font-weight: bold;">install</span> proj
<span style="color: #000000; font-weight: bold;">%</span> brew <span style="color: #c20cb9; font-weight: bold;">install</span> geos
<span style="color: #000000; font-weight: bold;">%</span> brew <span style="color: #c20cb9; font-weight: bold;">install</span> postgis
&nbsp;
<span style="color: #666666; font-style: italic;"># Create template_postgis_osm</span>
<span style="color: #000000; font-weight: bold;">%</span> createdb <span style="color: #660033;">-E</span> utf8 template_postgis_osm
<span style="color: #000000; font-weight: bold;">%</span> psql <span style="color: #660033;">-d</span> template_postgis_osm <span style="color: #660033;">-f</span> <span style="color: #ff0000;">"/usr/local/Cellar/postgresql/9.0.4/share/postgresql/contrib/pg_trgm.sql"</span>
<span style="color: #000000; font-weight: bold;">%</span> psql <span style="color: #660033;">-d</span> template_postgis_osm <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>Cellar<span style="color: #000000; font-weight: bold;">/</span>postgis<span style="color: #000000; font-weight: bold;">/</span>1.5.3<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postgis<span style="color: #000000; font-weight: bold;">/</span>postgis.sql
<span style="color: #000000; font-weight: bold;">%</span> psql <span style="color: #660033;">-d</span> template_postgis_osm <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>Cellar<span style="color: #000000; font-weight: bold;">/</span>postgis<span style="color: #000000; font-weight: bold;">/</span>1.5.3<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postgis<span style="color: #000000; font-weight: bold;">/</span>spatial_ref_sys.sql
&nbsp;
<span style="color: #666666; font-style: italic;"># Install osm2pgsql. Can skip this.</span>
<span style="color: #666666; font-style: italic;"># % brew install osm2pgsql</span></pre>
      </td>
    </tr>
  </table>
</div>

For detail instructions on installing Postgres/Postgis via Homebrew, read this [homebrew + postgresql9.0.4 + postgis.1.5.3 + proj4 + geos3.3.1 + osm2pgsql][2]. If you are having problems installing GEOS, then read that link as it shows you how to upgrade GEOS to 3.3.1.

OSM2PGSQL needs GEOS as well. Note that brew only install the osm2pgsql binary. Don&#8217;t worry, we will compile this via source later. 

**3. More Installation.**

We need to get PHP installed to run gazetteer <http://svn.openstreetmap.org/applications/utils/export/osm2pgsql/gazetteer/website/>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># Install PHP</span>
<span style="color: #000000; font-weight: bold;">%</span> brew <span style="color: #c20cb9; font-weight: bold;">install</span> php <span style="color: #660033;">--with-mysql</span> <span style="color: #660033;">--with-pgsql</span> <span style="color: #660033;">--with-apache</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># Hookup with Apache</span>
<span style="color: #666666; font-style: italic;"># Edit httpd.conf to LoadModule</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># Install PEAR DB</span>
<span style="color: #000000; font-weight: bold;">%</span> pear <span style="color: #c20cb9; font-weight: bold;">install</span> db</pre>
      </td>
    </tr>
  </table>
</div>

**4. OSM2PGSQL**  
Read this wiki: <http://wiki.openstreetmap.org/wiki/Osm2pgsql>. Well, we eventually need the whole OSM2PGSQL source as it contains the website (gazetteer).

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">svn co</span> http:<span style="color: #000000; font-weight: bold;">//</span>svn.openstreetmap.org<span style="color: #000000; font-weight: bold;">/</span>applications<span style="color: #000000; font-weight: bold;">/</span>utils<span style="color: #000000; font-weight: bold;">/</span>export<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql osm2pgsql
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> osm2pgsql
<span style="color: #000000; font-weight: bold;">%</span> .<span style="color: #000000; font-weight: bold;">/</span>autogen.sh
<span style="color: #000000; font-weight: bold;">%</span> .<span style="color: #000000; font-weight: bold;">/</span>configure
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># At this point there should be an osm2pgsql binary.</span></pre>
      </td>
    </tr>
  </table>
</div>

*We need to compile gazetteer for gazetteer.so which is used by gazetteer-functions.sql*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">gis<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql<span style="color: #000000; font-weight: bold;">/</span>gazetteer<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> clean
gis<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql<span style="color: #000000; font-weight: bold;">/</span>gazetteer<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> 
gis<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql<span style="color: #000000; font-weight: bold;">/</span>gazetteer<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span>
<span style="color: #7a0874; font-weight: bold;">test</span> <span style="color: #660033;">-z</span> <span style="color: #ff0000;">"/usr/local/lib/osm2pgsql"</span> <span style="color: #000000; font-weight: bold;">||</span> ..<span style="color: #000000; font-weight: bold;">/</span>.<span style="color: #000000; font-weight: bold;">/</span>install-sh <span style="color: #660033;">-c</span> <span style="color: #660033;">-d</span> <span style="color: #ff0000;">"/usr/local/lib/osm2pgsql"</span>
 <span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">sh</span> ..<span style="color: #000000; font-weight: bold;">/</span>libtool <span style="color: #660033;">--mode</span>=<span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span>  <span style="color: #ff0000;">'gazetteer.la'</span> <span style="color: #ff0000;">'/usr/local/lib/osm2pgsql/gazetteer.la'</span>
libtool: install: <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> .libs<span style="color: #000000; font-weight: bold;">/</span>gazetteer.so <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql<span style="color: #000000; font-weight: bold;">/</span>gazetteer.so
libtool: install: <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> .libs<span style="color: #000000; font-weight: bold;">/</span>gazetteer.lai <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql<span style="color: #000000; font-weight: bold;">/</span>gazetteer.la
<span style="color: #660033;">----------------------------------------------------------------------</span>
Libraries have been installed in:
   <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql
&nbsp;
If you ever happen to want to <span style="color: #c20cb9; font-weight: bold;">link</span> against installed libraries
<span style="color: #000000; font-weight: bold;">in</span> a given directory, LIBDIR, you must either use libtool, and
specify the full pathname of the library, or use the <span style="color: #000000; font-weight: bold;">`</span>-LLIBDIR<span style="color: #ff0000;">'
flag during linking and do at least one of the following:
   - add LIBDIR to the `DYLD_LIBRARY_PATH'</span> environment variable
     during execution
&nbsp;
See any operating system documentation about shared libraries <span style="color: #000000; font-weight: bold;">for</span>
<span style="color: #c20cb9; font-weight: bold;">more</span> information, such <span style="color: #c20cb9; font-weight: bold;">as</span> the <span style="color: #c20cb9; font-weight: bold;">ld</span><span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">1</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> and ld.so<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">8</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> manual pages.
<span style="color: #660033;">----------------------------------------------------------------------</span>
<span style="color: #7a0874; font-weight: bold;">test</span> <span style="color: #660033;">-z</span> <span style="color: #ff0000;">"/usr/local/share/gazetteer"</span> <span style="color: #000000; font-weight: bold;">||</span> ..<span style="color: #000000; font-weight: bold;">/</span>.<span style="color: #000000; font-weight: bold;">/</span>install-sh <span style="color: #660033;">-c</span> <span style="color: #660033;">-d</span> <span style="color: #ff0000;">"/usr/local/share/gazetteer"</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'extract_countrynames.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/extract_countrynames.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'gazetteer-index.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/gazetteer-index.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'gazetteer-loaddata.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/gazetteer-loaddata.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'gazetteer-tables.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/gazetteer-tables.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'import_country_name.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/import_country_name.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'import_country_osm_grid.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/import_country_osm_grid.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'import_gb_postcodearea.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/import_gb_postcodearea.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'import_gb_postcode.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/import_gb_postcode.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'import_specialwords.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/import_specialwords.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'import_us_statecounty.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/import_us_statecounty.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'import_us_state.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/import_us_state.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'import_worldboundaries.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/import_worldboundaries.sql'</span>
 <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> <span style="color: #ff0000;">'gazetteer-functions.sql'</span> <span style="color: #ff0000;">'/usr/local/share/gazetteer/gazetteer-functions.sql'</span></pre>
      </td>
    </tr>
  </table>
</div>

**5. Download Data**  
You can get some regional OSM data from cloudmade. [http://downloads.cloudmade.com/oceania/australia\_and\_new_zealand/australia/victoria][3] 

I suggest you download a regional extract prior to downloading/testing with the whole planet-osm. If you don&#8217;t believe me that it will take long, you can read <http://wiki.openstreetmap.org/wiki/Nominatim/Installation>

**6. Load and Index Data**  
Basically, this is the summary of commands taken from <http://wiki.openstreetmap.org/wiki/Nominatim/Installation> At the time of writing this, I had issues such as &#8220;planet\_osm\_ways&#8221; (and several tables) does not exist. So I did a pg_dump and restored the tables afterwards. Be very careful with using the script below, you can comment the indexing part just to speed up on loading and see if you have errors, etc.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">DATABASE_NAME</span>=gazetteer_vic
<span style="color: #007800;">OSM2PGSQL_HOME</span>=<span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>gis<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql
<span style="color: #007800;">SOURCE_DATA</span>=<span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>Desktop<span style="color: #000000; font-weight: bold;">/</span>australia<span style="color: #000000; font-weight: bold;">/</span>victoria.osm
<span style="color: #007800;">DUMP_DIR</span>=<span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>Desktop<span style="color: #000000; font-weight: bold;">/</span>pg_dumps<span style="color: #000000; font-weight: bold;">/</span>streetlookup
&nbsp;
dropdb <span style="color: #007800;">$DATABASE_NAME</span> 
<span style="color: #666666; font-style: italic;">#dropuser www-data</span>
&nbsp;
createdb <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-E</span> UTF8 <span style="color: #660033;">-T</span> template_postgis_osm
createuser <span style="color: #660033;">-SDR</span> www-data
&nbsp;
<span style="color: #666666; font-style: italic;"># This will create the planet_osm_ways, etc</span>
<span style="color: #007800;">$OSM2PGSQL_HOME</span><span style="color: #000000; font-weight: bold;">/</span>osm2pgsql <span style="color: #660033;">--create</span> <span style="color: #660033;">--latlong</span> <span style="color: #660033;">--database</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">--username</span> rupert <span style="color: #660033;">--slim</span> <span style="color: #660033;">--prefix</span> planet_osm <span style="color: #660033;">--cache</span> <span style="color: #000000;">2048</span> <span style="color: #007800;">$SOURCE_DATA</span>
&nbsp;
pg_dump <span style="color: #660033;">--host</span> 127.0.0.1 <span style="color: #660033;">--port</span> <span style="color: #000000;">5432</span> <span style="color: #660033;">--username</span> rupert <span style="color: #660033;">--format</span> custom <span style="color: #660033;">--file</span> <span style="color: #ff0000;">"<span style="color: #007800;">$DUMP_DIR</span>/planet_osm_ways.backup"</span> <span style="color: #660033;">--table</span> public.planet_osm_ways <span style="color: #007800;">$DATABASE_NAME</span>
pg_dump <span style="color: #660033;">--host</span> 127.0.0.1 <span style="color: #660033;">--port</span> <span style="color: #000000;">5432</span> <span style="color: #660033;">--username</span> rupert <span style="color: #660033;">--format</span> custom <span style="color: #660033;">--file</span> <span style="color: #ff0000;">"<span style="color: #007800;">$DUMP_DIR</span>/planet_osm_nodes.backup"</span> <span style="color: #660033;">--table</span> public.planet_osm_nodes <span style="color: #007800;">$DATABASE_NAME</span>
pg_dump <span style="color: #660033;">--host</span> 127.0.0.1 <span style="color: #660033;">--port</span> <span style="color: #000000;">5432</span> <span style="color: #660033;">--username</span> rupert <span style="color: #660033;">--format</span> custom <span style="color: #660033;">--file</span> <span style="color: #ff0000;">"<span style="color: #007800;">$DUMP_DIR</span>/planet_osm_rels.backup"</span> <span style="color: #660033;">--table</span> public.planet_osm_rels <span style="color: #007800;">$DATABASE_NAME</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># This will create the place table</span>
<span style="color: #007800;">$OSM2PGSQL_HOME</span><span style="color: #000000; font-weight: bold;">/</span>osm2pgsql <span style="color: #660033;">--latlong</span> <span style="color: #660033;">-O</span> gazetteer <span style="color: #660033;">--database</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">--username</span> rupert <span style="color: #660033;">--slim</span> <span style="color: #660033;">--prefix</span> planet_osm <span style="color: #660033;">--cache</span> <span style="color: #000000;">2048</span> <span style="color: #007800;">$SOURCE_DATA</span>
&nbsp;
pg_restore <span style="color: #660033;">--host</span> 127.0.0.1 <span style="color: #660033;">--port</span> <span style="color: #000000;">5432</span> <span style="color: #660033;">--username</span> rupert <span style="color: #660033;">--dbname</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #ff0000;">"<span style="color: #007800;">$DUMP_DIR</span>/planet_osm_ways.backup"</span>
pg_restore <span style="color: #660033;">--host</span> 127.0.0.1 <span style="color: #660033;">--port</span> <span style="color: #000000;">5432</span> <span style="color: #660033;">--username</span> rupert <span style="color: #660033;">--dbname</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #ff0000;">"<span style="color: #007800;">$DUMP_DIR</span>/planet_osm_nodes.backup"</span>
pg_restore <span style="color: #660033;">--host</span> 127.0.0.1 <span style="color: #660033;">--port</span> <span style="color: #000000;">5432</span> <span style="color: #660033;">--username</span> rupert <span style="color: #660033;">--dbname</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #ff0000;">"<span style="color: #007800;">$DUMP_DIR</span>/planet_osm_rels.backup"</span>
&nbsp;
<span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-Rf</span> <span style="color: #007800;">$DUMP_DIR</span><span style="color: #000000; font-weight: bold;">/*</span>.backup
&nbsp;
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-q</span> <span style="color: #660033;">-f</span> import_country_osm_grid.sql
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-q</span> <span style="color: #660033;">-f</span> import_worldboundaries.sql
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-q</span> <span style="color: #660033;">-f</span> import_country_name.sql
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-q</span> <span style="color: #660033;">-f</span> import_gb_postcode.sql
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-q</span> <span style="color: #660033;">-f</span> import_gb_postcodearea.sql
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-q</span> <span style="color: #660033;">-f</span> import_us_state.sql
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-q</span> <span style="color: #660033;">-f</span> import_us_statecounty.sql
&nbsp;
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-f</span> gazetteer-functions.sql
&nbsp;
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-f</span> gazetteer-tables.sql
&nbsp;
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-f</span> gazetteer-functions.sql
&nbsp;
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-f</span> gazetteer-loaddata.sql
&nbsp;
<span style="color: #666666; font-style: italic;">#Indexing</span>
psql <span style="color: #660033;">-d</span> <span style="color: #007800;">$DATABASE_NAME</span> <span style="color: #660033;">-f</span> gazetteer-index.sql</pre>
      </td>
    </tr>
  </table>
</div>

Save this as run.sh in `/Users/rupert/projects/gis/osm2pgsql/gazetteer`

Where do you run this?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>gis<span style="color: #000000; font-weight: bold;">/</span>osm2pgsql<span style="color: #000000; font-weight: bold;">/</span>gazetteer
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">sh</span> run.sh</pre>
      </td>
    </tr>
  </table>
</div>

**6. Test**  
If you are successful, **you should have a &#8220;placex&#8221; table.** Now that we have a postgis database running, you can now run spatial statements thru pgadmin. See the guts of [reverse.php][4]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #66cc66;">*</span> 
<span style="color: #993333; font-weight: bold;">FROM</span> placex
<span style="color: #993333; font-weight: bold;">WHERE</span> ST_DWithin<span style="color: #66cc66;">&#40;</span> ST_SetSRID<span style="color: #66cc66;">&#40;</span>ST_Point<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">145.234377</span><span style="color: #66cc66;">,</span> <span style="color: #66cc66;">-</span><span style="color: #cc66cc;">37.856320</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span><span style="color: #cc66cc;">4326</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> geometry<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">0.0001</span><span style="color: #66cc66;">&#41;</span>
<span style="color: #993333; font-weight: bold;">AND</span> ST_GeometryType<span style="color: #66cc66;">&#40;</span>geometry<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">IN</span> <span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'ST_Polygon'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'ST_MultiPolygon'</span><span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

This one took only 21 ms.

**7. Website**

Make sure `www-data` have permissions to the tables. Rememeber to replace gazetteer\_vic with your DATABASE\_NAME.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">for</span> tbl <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">`</span>psql <span style="color: #660033;">-qAt</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">"select tablename from pg_tables where schemaname = 'public';"</span> gazetteer_vic<span style="color: #000000; font-weight: bold;">`</span> ; <span style="color: #000000; font-weight: bold;">do</span> psql <span style="color: #660033;">-c</span> <span style="color: #ff0000;">"alter table <span style="color: #007800;">$tbl</span> owner to <span style="color: #000099; font-weight: bold;">\"</span>www-data<span style="color: #000099; font-weight: bold;">\"</span>"</span> gazetteer_vic; <span style="color: #000000; font-weight: bold;">done</span></pre>
      </td>
    </tr>
  </table>
</div>

Assuming you have PHP and PEAR DB installed. Then update the data connection settings found in <http://svn.openstreetmap.org/applications/utils/export/osm2pgsql/gazetteer/website/.htlib/settings.php>

Run the same query but using reverse.php.

<http://127.0.0.1/nominatim/reverse.php?format=xml&#038;lat=-37.856320&#038;lon=145.234377&#038;zoom=18&#038;addressdetails=1>

<img src="/images/2011/11/reverse.png" alt="reverse.png" border="0" width="920" height="343" />

 [1]: https://github.com/mxcl/homebrew
 [2]: /wordpress/2011/11/homebrew-postgresql9-0-4-postgis-1-5-3/
 [3]: http://downloads.cloudmade.com/oceania/australia_and_new_zealand/australia/victoria
 [4]: http://svn.openstreetmap.org/applications/utils/export/osm2pgsql/gazetteer/website/reverse.php