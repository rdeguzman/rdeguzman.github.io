---
title: Postgres PostGIS CheatSheet v2
author: rupert
layout: post
permalink: /2010/11/postgres-postgis-cheatsheet-v2-2/
categories:
  - postgis
  - postgres
tags:
  - postgis
  - postgres
---
This is a quick-command list of Postres. If you want detailed instructions, please visit the Postgres Manual.

**How do I know the version of Postgis? **

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> POSTGIS_FULL_VERSION<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

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

**How do describe a table?**  
`\d schema_name.table_name or \d table_name (which references public)`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">test_db</span>=<span style="color: #666666; font-style: italic;"># \d dfms_4000.drivers</span>
                                         Table <span style="color: #ff0000;">"dfms_4000.drivers"</span>
   Column   <span style="color: #000000; font-weight: bold;">|</span>            Type             <span style="color: #000000; font-weight: bold;">|</span>                           Modifiers                            
------------+-----------------------------+----------------------------------------------------------------
 <span style="color: #c20cb9; font-weight: bold;">id</span>         <span style="color: #000000; font-weight: bold;">|</span> integer                     <span style="color: #000000; font-weight: bold;">|</span> not null default nextval<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #ff0000;">'dfms_4000.drivers_id_seq'</span>::regclass<span style="color: #7a0874; font-weight: bold;">&#41;</span>
 fleet_id   <span style="color: #000000; font-weight: bold;">|</span> smallint                    <span style="color: #000000; font-weight: bold;">|</span> not null default <span style="color: #000000;"></span>
 name       <span style="color: #000000; font-weight: bold;">|</span> character varying<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">32</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>       <span style="color: #000000; font-weight: bold;">|</span> default <span style="color: #ff0000;">''</span>::character varying
 tag_id     <span style="color: #000000; font-weight: bold;">|</span> character varying<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">32</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>       <span style="color: #000000; font-weight: bold;">|</span> default <span style="color: #ff0000;">''</span>::character varying
 created_at <span style="color: #000000; font-weight: bold;">|</span> timestamp without <span style="color: #000000; font-weight: bold;">time</span> zone <span style="color: #000000; font-weight: bold;">|</span> 
 updated_at <span style="color: #000000; font-weight: bold;">|</span> timestamp without <span style="color: #000000; font-weight: bold;">time</span> zone <span style="color: #000000; font-weight: bold;">|</span> 
 is_asset   <span style="color: #000000; font-weight: bold;">|</span> boolean                     <span style="color: #000000; font-weight: bold;">|</span> default <span style="color: #c20cb9; font-weight: bold;">false</span>
 pin        <span style="color: #000000; font-weight: bold;">|</span> integer                     <span style="color: #000000; font-weight: bold;">|</span> 
Indexes:
    <span style="color: #ff0000;">"drivers_pkey"</span> PRIMARY KEY, btree <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #c20cb9; font-weight: bold;">id</span><span style="color: #7a0874; font-weight: bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

**How do I run a script from the prompt?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">psql <span style="color: #660033;">-d</span> cybersoftbj <span style="color: #660033;">-u</span> user <span style="color: #660033;">-f</span> myfile.sql</pre>
      </td>
    </tr>
  </table>
</div>

Its very useful in reloading user-defined functions.

**How do I create a user/role?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">ROLE</span> lbs <span style="color: #993333; font-weight: bold;">WITH</span> LOGIN PASSWORD <span style="color: #ff0000;">'mypassword'</span> SUPERUSER INHERIT CREATEDB CREATEROLE;</pre>
      </td>
    </tr>
  </table>
</div>

**How do I change the password for a user/role?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">ROLE</span> lbs PASSWORD <span style="color: #ff0000;">'mynewpassword'</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**How to provide/restrict access privileges to tables?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">ON</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #993333; font-weight: bold;">TO</span> <span style="color: #993333; font-weight: bold;">USER</span>;
<span style="color: #993333; font-weight: bold;">REVOKE</span> <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">ON</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #993333; font-weight: bold;">FROM</span> <span style="color: #993333; font-weight: bold;">USER</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**How to dump database in a text file?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">pg_dump <span style="color: #660033;">-U</span> lbs <span style="color: #660033;">-d</span> cybersoftbjv1 <span style="color: #660033;">-h</span> 127.0.0.1 <span style="color: #660033;">-W</span> <span style="color: #000000; font-weight: bold;">&</span>gt; cybersoftbjv1.sql</pre>
      </td>
    </tr>
  </table>
</div>

**How to dump database cleanly?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> pg_dump <span style="color: #660033;">-c</span>  <span style="color: #660033;">-d</span> <span style="color: #660033;">-E</span> UTF8 <span style="color: #660033;">-h</span> 127.0.0.1 <span style="color: #660033;">-U</span> lbs <span style="color: #660033;">-W</span> platform_v1 <span style="color: #000000; font-weight: bold;">&</span>gt; platform_v1.sql</pre>
      </td>
    </tr>
  </table>
</div>

**How to rename a database?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">DATABASE</span> beijing_app <span style="color: #993333; font-weight: bold;">RENAME</span> <span style="color: #993333; font-weight: bold;">TO</span> beijing_app_20080801;</pre>
      </td>
    </tr>
  </table>
</div>

**How to update using two tables?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">UPDATE</span> road_for_update u
<span style="color: #993333; font-weight: bold;">SET</span> the_geom <span style="color: #66cc66;">=</span> r<span style="color: #66cc66;">.</span>the_geom
<span style="color: #993333; font-weight: bold;">FROM</span> roads r
<span style="color: #993333; font-weight: bold;">WHERE</span> r<span style="color: #66cc66;">.</span>rd_id <span style="color: #66cc66;">=</span> u<span style="color: #66cc66;">.</span>rd_id;</pre>
      </td>
    </tr>
  </table>
</div>

**DROP TABLE**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">DROP</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #993333; font-weight: bold;">IF</span> <span style="color: #993333; font-weight: bold;">EXISTS</span> <span style="color: #ff0000;">"my_table"</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**How to change a column type with Cast?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span> roads <span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">COLUMN</span> class_new <span style="color: #993333; font-weight: bold;">TYPE</span> <span style="color: #993333; font-weight: bold;">INTEGER</span> <span style="color: #993333; font-weight: bold;">USING</span> class_new::<span style="color: #993333; font-weight: bold;">INTEGER</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**How to add a geometry column to a table?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> AddGeometryColumn<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'public'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'poi'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'the_geom'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">4326</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'POINT'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">2</span><span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

**Changing column names with spaces?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">ALTER TABLE class_aroundme RENAME <span style="color: #ff0000;">"level 1"</span> TO level_1;</pre>
      </td>
    </tr>
  </table>
</div>

**Setting kernel shmmax for postgres**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> sysctl <span style="color: #660033;">-w</span> kernel.shmmax=<span style="color: #000000;">134217728</span></pre>
      </td>
    </tr>
  </table>
</div>

Note: For permanent changes see /etc/sysctl.cfg

**11. How to backup table(s) from pg_dump?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> pg_dump poi_beijing <span style="color: #660033;">-t</span> class <span style="color: #660033;">-t</span> poi_class <span style="color: #660033;">-f</span> <span style="color: #007800;">$BACKUPDIR</span><span style="color: #000000; font-weight: bold;">/</span>test_<span style="color: #007800;">$MYDATE</span>.sql</pre>
      </td>
    </tr>
  </table>
</div>

**Change integer primary key to serial**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">SEQUENCE</span> seq_job_id <span style="color: #993333; font-weight: bold;">INCREMENT</span> <span style="color: #cc66cc;">1</span> MINVALUE <span style="color: #cc66cc;">1000</span> MAXVALUE <span style="color: #cc66cc;">2147483648</span> <span style="color: #993333; font-weight: bold;">START</span> <span style="color: #cc66cc;">1000</span> CACHE <span style="color: #cc66cc;">1</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span> job <span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">COLUMN</span> job_id <span style="color: #993333; font-weight: bold;">SET</span> <span style="color: #993333; font-weight: bold;">DEFAULT</span> <span style="color: #993333; font-weight: bold;">NEXTVAL</span><span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'seq_job_id'</span>::regclass<span style="color: #66cc66;">&#41;</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #66cc66;">*</span> <span style="color: #993333; font-weight: bold;">FROM</span> job
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">NEXTVAL</span><span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'seq_job_id'</span><span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

**Date and Time Function Helper: date_add**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">OR</span> <span style="color: #993333; font-weight: bold;">REPLACE</span> <span style="color: #993333; font-weight: bold;">FUNCTION</span> date_add<span style="color: #66cc66;">&#40;</span>diffType <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">15</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> incrementValue <span style="color: #993333; font-weight: bold;">BIGINT</span><span style="color: #66cc66;">,</span> inputDateTime <span style="color: #993333; font-weight: bold;">TIMESTAMP</span> <span style="color: #993333; font-weight: bold;">WITHOUT</span> <span style="color: #993333; font-weight: bold;">TIME</span> zone<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">RETURNS</span> <span style="color: #993333; font-weight: bold;">TIMESTAMP</span> <span style="color: #993333; font-weight: bold;">AS</span> $$
<span style="color: #993333; font-weight: bold;">DECLARE</span>
   YEAR_CONST <span style="color: #993333; font-weight: bold;">CHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">15</span><span style="color: #66cc66;">&#41;</span> :<span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'year'</span>;
   MONTH_CONST <span style="color: #993333; font-weight: bold;">CHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">15</span><span style="color: #66cc66;">&#41;</span> :<span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'month'</span>;
   DAY_CONST <span style="color: #993333; font-weight: bold;">CHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">15</span><span style="color: #66cc66;">&#41;</span> :<span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'day'</span>;
   HOUR_CONST <span style="color: #993333; font-weight: bold;">CHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">15</span><span style="color: #66cc66;">&#41;</span> :<span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'hour'</span>;
   MIN_CONST <span style="color: #993333; font-weight: bold;">CHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">15</span><span style="color: #66cc66;">&#41;</span> :<span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'minute'</span>;
   SEC_CONST <span style="color: #993333; font-weight: bold;">CHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">15</span><span style="color: #66cc66;">&#41;</span> :<span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'second'</span>;
&nbsp;
   dateTemp <span style="color: #993333; font-weight: bold;">TIMESTAMP</span> <span style="color: #993333; font-weight: bold;">WITHOUT</span> <span style="color: #993333; font-weight: bold;">TIME</span> zone;
   intervals <span style="color: #993333; font-weight: bold;">INTERVAL</span>;
<span style="color: #993333; font-weight: bold;">BEGIN</span>
   <span style="color: #993333; font-weight: bold;">IF</span> <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>$1<span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">=</span> <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>YEAR_CONST<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">THEN</span>
       <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span>incrementvalue <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">' year'</span> <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">INTERVAL</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">INTO</span> intervals;
   ELSEIF <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>$1<span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">=</span> <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>MONTH_CONST<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">THEN</span>
       <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span>incrementvalue <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">' months'</span> <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">INTERVAL</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">INTO</span> intervals;
   ELSEIF <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>$1<span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">=</span> <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>DAY_CONST<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">THEN</span>
       <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span>incrementvalue <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">' day'</span> <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">INTERVAL</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">INTO</span> intervals;
   ELSEIF <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>$1<span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">=</span> <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>HOUR_CONST<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">THEN</span>
       <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span>incrementvalue <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">' hours'</span> <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">INTERVAL</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">INTO</span> intervals;
   ELSEIF <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>$1<span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">=</span> <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>MIN_CONST<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">THEN</span>
       <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span>incrementvalue <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">' minutes'</span> <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">INTERVAL</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">INTO</span> intervals;
   ELSEIF <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>$1<span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">=</span> <span style="color: #993333; font-weight: bold;">LOWER</span><span style="color: #66cc66;">&#40;</span>SEC_CONST<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">THEN</span>
       <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">CAST</span><span style="color: #66cc66;">&#40;</span>incrementvalue <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">' seconds'</span> <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">INTERVAL</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">INTO</span> intervals;            
   <span style="color: #993333; font-weight: bold;">END</span> <span style="color: #993333; font-weight: bold;">IF</span>;
&nbsp;
   dateTemp:<span style="color: #66cc66;">=</span> inputDateTime <span style="color: #66cc66;">+</span> intervals;
&nbsp;
   <span style="color: #993333; font-weight: bold;">RETURN</span> dateTemp;
<span style="color: #993333; font-weight: bold;">END</span>;
$$ <span style="color: #993333; font-weight: bold;">LANGUAGE</span> plpgsql;</pre>
      </td>
    </tr>
  </table>
</div>

**How to set the current timezone in postgres?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"># <span style="color: #993333; font-weight: bold;">SESSION</span> based <span style="color: #993333; font-weight: bold;">ONLY</span>
<span style="color: #993333; font-weight: bold;">SET</span> <span style="color: #993333; font-weight: bold;">TIME</span> zone <span style="color: #ff0000;">'utc'</span>;
<span style="color: #993333; font-weight: bold;">SELECT</span>  current_setting<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'TIMEZONE'</span><span style="color: #66cc66;">&#41;</span>;
# Permanent
# Edit <span style="color: #66cc66;">/</span>usr<span style="color: #66cc66;">/</span><span style="color: #993333; font-weight: bold;">LOCAL</span><span style="color: #66cc66;">/</span>var<span style="color: #66cc66;">/</span>postgres<span style="color: #66cc66;">/</span>postgresql<span style="color: #66cc66;">.</span>conf <span style="color: #66cc66;">&#40;</span>#postgres installed via homebrew<span style="color: #66cc66;">&#41;</span>
timezone <span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'UTC'</span></pre>
      </td>
    </tr>
  </table>
</div>

**Date/Time Functions**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> current_setting<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'TIMEZONE'</span><span style="color: #66cc66;">&#41;</span>; 
<span style="color: #808080; font-style: italic;">--"Australia/Victoria"</span>
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> Now<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> 
timezone<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'UTC'</span><span style="color: #66cc66;">,</span> now<span style="color: #66cc66;">&#40;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> 
<span style="color: #993333; font-weight: bold;">EXTRACT</span><span style="color: #66cc66;">&#40;</span>EPOCH <span style="color: #993333; font-weight: bold;">FROM</span> <span style="color: #993333; font-weight: bold;">CURRENT_TIMESTAMP</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;"></span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
to_timestamp<span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">EXTRACT</span><span style="color: #66cc66;">&#40;</span>EPOCH <span style="color: #993333; font-weight: bold;">FROM</span> <span style="color: #993333; font-weight: bold;">CURRENT_TIMESTAMP</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;"></span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
to_timestamp<span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">EXTRACT</span><span style="color: #66cc66;">&#40;</span>EPOCH <span style="color: #993333; font-weight: bold;">FROM</span> <span style="color: #993333; font-weight: bold;">CURRENT_TIMESTAMP</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;"></span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span>::<span style="color: #993333; font-weight: bold;">TIMESTAMP</span>
&nbsp;
<span style="color: #808080; font-style: italic;">--"2011-11-14 09:29:14.249427+11" </span>
<span style="color: #808080; font-style: italic;">--"2011-11-13 22:29:14.249427"</span>
<span style="color: #808080; font-style: italic;">--1321223354</span>
<span style="color: #808080; font-style: italic;">--"2011-11-14 09:29:14+11"</span>
<span style="color: #808080; font-style: italic;">--"2011-11-14 09:29:14"</span></pre>
      </td>
    </tr>
  </table>
</div>

**How to specify the id of a sequence to prevent SQL Error: PGRES\_FATAL\_ERROR:ERROR: duplicate key value violates unique constraint &#8220;gps\_histories\_pkey&#8221;?**  
This happens when the maximum number of records in gps_histories is not in sync with the sequence id.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">SETVAL</span><span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'dfms_4000.gps_histories_id_seq'</span><span style="color: #66cc66;">,</span> <span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #993333; font-weight: bold;">MAX</span><span style="color: #66cc66;">&#40;</span>id<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> dfms_4000<span style="color: #66cc66;">.</span>gps_histories<span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">+</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

**How to show the bytea_output for a client connection?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SHOW</span> bytea_output</pre>
      </td>
    </tr>
  </table>
</div>

**How to kill client connection for a database?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #66cc66;">*</span> <span style="color: #993333; font-weight: bold;">FROM</span> pg_stat_activity;
<span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #66cc66;">*</span> <span style="color: #993333; font-weight: bold;">FROM</span> pg_stat_activity <span style="color: #993333; font-weight: bold;">WHERE</span> datname <span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'sample_database'</span>;
<span style="color: #993333; font-weight: bold;">SELECT</span> pg_terminate_backend<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">23240</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> pg_stat_activity <span style="color: #993333; font-weight: bold;">WHERE</span> datname <span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'sample_database'</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**Show the biggest tables in MB**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> 
  table_schema<span style="color: #66cc66;">,</span> 
  <span style="color: #993333; font-weight: bold;">TABLE_NAME</span><span style="color: #66cc66;">,</span> 
  pg_size_pretty<span style="color: #66cc66;">&#40;</span>pg_relation_size<span style="color: #66cc66;">&#40;</span>table_schema <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">'.'</span> <span style="color: #66cc66;">||</span> <span style="color: #993333; font-weight: bold;">TABLE_NAME</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> size_in_mb<span style="color: #66cc66;">,</span> 
  pg_relation_size<span style="color: #66cc66;">&#40;</span>table_schema <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">'.'</span> <span style="color: #66cc66;">||</span> <span style="color: #993333; font-weight: bold;">TABLE_NAME</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">SIZE</span>
<span style="color: #993333; font-weight: bold;">FROM</span> information_schema<span style="color: #66cc66;">.</span><span style="color: #993333; font-weight: bold;">TABLES</span>
<span style="color: #993333; font-weight: bold;">WHERE</span> table_schema <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">IN</span> <span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'information_schema'</span><span style="color: #66cc66;">,</span><span style="color: #ff0000;">'pg_catalog'</span><span style="color: #66cc66;">&#41;</span> 
<span style="color: #993333; font-weight: bold;">ORDER</span> <span style="color: #993333; font-weight: bold;">BY</span> <span style="color: #993333; font-weight: bold;">SIZE</span> <span style="color: #993333; font-weight: bold;">DESC</span>;</pre>
      </td>
    </tr>
  </table>
</div>