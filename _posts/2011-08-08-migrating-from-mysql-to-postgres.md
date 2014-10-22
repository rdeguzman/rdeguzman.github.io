---
title: how to use a schema name in mysql2psql
author: rupert
layout: post
permalink: /2011/08/migrating-from-mysql-to-postgres/
categories:
  - mysql
  - postgres
tags:
  - mysql
  - postgres
---
Below is a summary of my experiences with migrating from MySQL to Postgres using **mysql2psql &#8211; <https://github.com/maxlapshin/mysql2postgres>**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span>gem <span style="color: #c20cb9; font-weight: bold;">install</span> mysql2psql</pre>
      </td>
    </tr>
  </table>
</div>

To migrate a &#8220;tsa&#8221; database from mysql to postgres, create a tsa.yml

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="yml" style="font-family:monospace;">mysql:
 hostname: localhost
 port: 3306 
 socket: /tmp/mysql.sock
 username: dbadmin 
 password: password
 database: tsa
&nbsp;
destination:
 # if file is given, output goes to file, else postgres
 #file: tsa.dump
 postgres:
  hostname: localhost
  port: 5432 
  database: tsa:hotels #database_name:schema_name
  username: dbadmin
  password: password
&nbsp;
# if tables is given, only the listed tables will be converted.  leave empty to convert all tables.
#tables:
#- table1
#- table2
# if exclude_tables is given, exclude the listed tables from the conversion.
#exclude_tables:
#- table3
#- table4
&nbsp;
# if supress_data is true, only the schema definition will be exported/migrated, and not the data
supress_data: false
&nbsp;
# if supress_ddl is true, only the data will be exported/imported, and not the schema
supress_ddl: false
&nbsp;
# if force_truncate is true, forces a table truncate before table loading
force_truncate: false</pre>
      </td>
    </tr>
  </table>
</div>

Run.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span>mysql2psql tsa.yml</pre>
      </td>
    </tr>
  </table>
</div>

References:  
[http://en.wikibooks.org/wiki/Converting\_MySQL\_to_PostgreSQL][1]

 [1]: http://en.wikibooks.org/wiki/Converting_MySQL_to_PostgreSQL