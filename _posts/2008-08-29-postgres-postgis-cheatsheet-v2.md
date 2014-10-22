---
title: Postgres PostGIS CheatSheet v2
author: rupert
layout: post
permalink: /2008/08/postgres-postgis-cheatsheet-v2/
aktt_tweeted:
  - 1
categories:
  - postgis
  - postgres
tags:
  - postgis
  - postgres
---
This is a quick-command list of Postres. If you want detailed instructions, please visit the Postgres Manual.

**How do I Show all databases? **  
1. Using &#8220;psql -l&#8221;

2. Using

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">postgres</span>=<span style="color: #666666; font-style: italic;"># \l</span>
List of databases
Name       <span style="color: #000000; font-weight: bold;">|</span>  Owner   <span style="color: #000000; font-weight: bold;">|</span> Encoding
------------------+----------+----------
postgis          <span style="color: #000000; font-weight: bold;">|</span> postgres <span style="color: #000000; font-weight: bold;">|</span> UTF8
postgres         <span style="color: #000000; font-weight: bold;">|</span> postgres <span style="color: #000000; font-weight: bold;">|</span> UTF8
template0        <span style="color: #000000; font-weight: bold;">|</span> postgres <span style="color: #000000; font-weight: bold;">|</span> UTF8
template1        <span style="color: #000000; font-weight: bold;">|</span> postgres <span style="color: #000000; font-weight: bold;">|</span> UTF8
template_postgis <span style="color: #000000; font-weight: bold;">|</span> postgres <span style="color: #000000; font-weight: bold;">|</span> UTF8
<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">5</span> rows<span style="color: #7a0874; font-weight: bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

Note: Do not drop template databases if not necessary.

**How do I run a script from the prompt?**  
`psql -d cybersoftbj -u user -f myfile.sql`

Its very useful in reloading user-defined functions.

**How do I create a user/role?**  
`<br />
CREATE ROLE lbs WITH LOGIN PASSWORD 'mypassword' SUPERUSER INHERIT CREATEDB CREATEROLE;<br />
`

**How do I change the password for a user/role?**  
`<br />
ALTER ROLE lbs PASSWORD 'mynewpassword';<br />
`

**How to provide/restrict access privileges to tables?**  
`<br />
GRANT SELECT ON TABLE table TO user;<br />
REVOKE SELECT ON TABLE table FROM user;<br />
`

**How to dump database in a text file?**  
`<br />
pg_dump -U lbs -d cybersoftbjv1 -h 127.0.0.1 -W > cybersoftbjv1.sql<br />
`

**How to dump database cleanly?**  
`<br />
pg_dump -c  -d -E UTF8 -h 127.0.0.1 -U lbs -W platform_v1 > platform_v1.sql<br />
`

**How to rename a database?**  
`<br />
ALTER DATABASE beijing_app RENAME TO beijing_app_20080801;<br />
`

**How to update using two tables?**  
`<br />
UPDATE road_for_update u<br />
SET the_geom = r.the_geom<br />
FROM roads r<br />
WHERE r.rd_id = u.rd_id;<br />
`

**How to change a column type with Cast?**  
`<br />
ALTER TABLE roads ALTER COLUMN class_new TYPE integer USING class_new::integer;<br />
`

**How to add a geometry column to a table?**  
EXAMPLE: SELECT AddGeometryColumn(&#8216;public&#8217;, &#8216;poi&#8217;, &#8216;the_geom&#8217;, 4326, &#8216;POINT&#8217;, 2)

**Changing column names with spaces?**  
`ALTER TABLE class_aroundme RENAME "level 1" TO level_1;` 

**Setting kernel shmmax for postgres**  
`sysctl -w kernel.shmmax=134217728`  
Note: For permanent changes see /etc/sysctl.cfg**11. How to backup table(s) from pg_dump?**  
pg\_dump poi\_beijing -t class -t poi\_class -f $BACKUPDIR/test\_$MYDATE.sql