---
title: Postgres PostGis PostInstall
author: rupert
layout: post
permalink: /2008/06/postgres-postgis-postinstall/
aktt_tweeted:
  - 1
categories:
  - postgis
  - postgres
tags:
  - postgis
  - postgres
---
1. Edit pg_hba.conf

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># "local" is for Unix domain socket connections only</span>
<span style="color: #7a0874; font-weight: bold;">local</span>   all         all                               trust
<span style="color: #666666; font-style: italic;"># IPv4 local connections:</span>
host    all         all         127.0.0.1<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">32</span>          md5
host    all         all         192.168.1.0 255.255.255.0       md5
<span style="color: #666666; font-style: italic;"># IPv6 local connections:</span>
<span style="color: #666666; font-style: italic;">#host    all         all         ::1/128               trust</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Edit postgres.conf

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000;">55</span>
<span style="color: #000000;">56</span> listen_addresses = <span style="color: #ff0000;">'*'</span> <span style="color: #666666; font-style: italic;"># what IP address(es) to listen on;</span>
<span style="color: #000000;">57</span> <span style="color: #666666; font-style: italic;"># comma-separated list of addresses;</span>
<span style="color: #000000;">58</span> <span style="color: #666666; font-style: italic;"># defaults to 'localhost', '*' = all</span>
<span style="color: #000000;">59</span> <span style="color: #666666; font-style: italic;"># (change requires restart)</span></pre>
      </td>
    </tr>
  </table>
</div>

4. For CentOS5.1, create symbolic links:  
ln -s /usr/local/lib/libproj.so.0 /usr/lib/libproj.so.0  
ln -s /usr/local/lib/libgeos\_c.so.1 /usr/lib/libgeos\_c.so.1  
ldconfig  
/etc/init.d/postgresql stop  
/etc/init.d/postgresql start

3. Postgis Post Install

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">createdb <span style="color: #660033;">-E</span> utf8 template_routing
createlang plpgsql template_routing
psql <span style="color: #660033;">-d</span> template_routing <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postgresql-<span style="color: #000000;">8.3</span>-postgis<span style="color: #000000; font-weight: bold;">/</span>lwpostgis.sql 
psql <span style="color: #660033;">-d</span> template_routing <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postgresql-<span style="color: #000000;">8.3</span>-postgis<span style="color: #000000; font-weight: bold;">/</span>spatial_ref_sys.sql 
psql <span style="color: #660033;">-d</span> template_routing <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postlbs<span style="color: #000000; font-weight: bold;">/</span>routing_core.sql 
psql <span style="color: #660033;">-d</span> template_routing <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postlbs<span style="color: #000000; font-weight: bold;">/</span>routing_core_wrappers.sql</pre>
      </td>
    </tr>
  </table>
</div>