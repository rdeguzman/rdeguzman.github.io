---
title: freebsd + postgresql-server + plpython + postgis
author: rupert
layout: post
permalink: /2011/11/freebsd-postgresql9-0-3-2/
categories:
  - postgres
tags:
  - freebsd
  - postgis
  - postgres
---
**1. Install prerequisites**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>textproc<span style="color: #000000; font-weight: bold;">/</span>libxml2
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

**2. Install python**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>lang<span style="color: #000000; font-weight: bold;">/</span>python26
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> config <span style="color: #666666; font-style: italic;">#opens up blue terminal which allows to choose options</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

**3. Install**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>databases<span style="color: #000000; font-weight: bold;">/</span>postgresql90-server
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span> clean</pre>
      </td>
    </tr>
  </table>
</div>

**4. Initialize**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">% vim /etc/rc.conf
postgresql_enable=YES
postgresql_data=/var/db/pgsql
% mkdir /var/db/pgsql
% chown -Rf pgsql:pgsql /var/db/pgsql
% /usr/local/etc/rc.d/postgresql initdb -E utf8</pre>
      </td>
    </tr>
  </table>
</div>

**5. Configuration**  
Allow incoming connections and set the default timezone to &#8216;UTC&#8217;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">% vim /var/db/pgsql/postgresql.conf
listen_addresses = '*'     # what IP address(es) to listen on;
&nbsp;
timezone = 'UTC' #not necessary</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">% vim /var/db/pgsql/pg_hba.conf
# your network
host    all             all             192.168.10.0/24          trust</pre>
      </td>
    </tr>
  </table>
</div>

**6. Start/Stop**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rc.d<span style="color: #000000; font-weight: bold;">/</span>postgresql start
<span style="color: #000000; font-weight: bold;">%</span> telnet 127.0.0.1 <span style="color: #000000;">5432</span></pre>
      </td>
    </tr>
  </table>
</div>

**7. Create user. Login as root then switch to pgsql user**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% su - pgsql
[root@rupert ~]# su - pgsql
$ psql -d postgres
psql (9.0.6)
Type "help" for help.
&nbsp;
postgres=# CREATE ROLE rupert WITH LOGIN PASSWORD '**********' SUPERUSER INHERIT CREATEDB CREATEROLE;
CREATE ROLE
postgres=#</pre>
      </td>
    </tr>
  </table>
</div>

**8. Install plpython**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>databases<span style="color: #000000; font-weight: bold;">/</span>postgresql-plpython
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span> clean</pre>
      </td>
    </tr>
  </table>
</div>

*To test if plpython is working properly, we create a testdb and loadup plpythonu and call a plpython function.*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">OR</span> <span style="color: #993333; font-weight: bold;">REPLACE</span> <span style="color: #993333; font-weight: bold;">FUNCTION</span> pyver<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">RETURNS</span> text <span style="color: #993333; font-weight: bold;">AS</span>
$$
import sys
<span style="color: #993333; font-weight: bold;">RETURN</span> sys<span style="color: #66cc66;">.</span>version
$$ <span style="color: #993333; font-weight: bold;">LANGUAGE</span> <span style="color: #ff0000;">'plpythonu'</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> pyver<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">[root@rupert ~]# createdb -U rupert testdb
[root@rupert ~]# psql -d testdb -U rupert
psql (9.0.6)
Type "help" for help.
&nbsp;
testdb=# CREATE PROCEDURAL LANGUAGE 'plpythonu' HANDLER plpython_call_handler;
NOTICE:  using pg_pltemplate information instead of CREATE LANGUAGE parameters
CREATE LANGUAGE
testdb=# create or replace function pyver() returns text as
testdb-# $$
testdb$# import sys
testdb$# return sys.version
testdb$# $$ language 'plpythonu';
CREATE FUNCTION
testdb=# select pyver();
                   pyver                    
--------------------------------------------
 2.6.7 (r267:88850, Feb  6 2012, 13:10:39) +
 [GCC 4.2.1 20070831 patched [FreeBSD]]
(1 row)
&nbsp;
testdb=#</pre>
      </td>
    </tr>
  </table>
</div>

**9. Install postgis**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>databases<span style="color: #000000; font-weight: bold;">/</span>postgis
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

*Note that ports should install proj and geos.*

**10. Create template_postgis**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postgis
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">su</span> - pgsql
$ createdb <span style="color: #660033;">-E</span> utf8 template_postgis
$ psql <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> postgis.sql
$ psql <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> spatial_ref_sys.sql</pre>
      </td>
    </tr>
  </table>
</div>

**11. Install adminpack module**

*This will eliminate &#8220;servers instrument error&#8221; when pgAdmin loads up postgres (default) db*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>databases<span style="color: #000000; font-weight: bold;">/</span>postgresql90-contrib
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postgresql<span style="color: #000000; font-weight: bold;">/</span>contrib
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">su</span> - pgsql
$ psql <span style="color: #660033;">-U</span> pgsql <span style="color: #660033;">-d</span> postgres <span style="color: #660033;">-f</span> adminpack.sql</pre>
      </td>
    </tr>
  </table>
</div>