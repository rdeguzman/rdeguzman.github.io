---
title: PostgresSQL / PostGIS CheatSheat
author: rupert
layout: post
permalink: /2007/07/postgressql-commands/
categories:
  - postgis
  - postgres
tags:
  - postgis
  - postgres
---
This is a quick-command list of Postres. If you want detailed instructions, please visit the Postgres Manual.

**1. How do I Show all databases? **  
`<br />
postgres=# \l<br />
List of databases<br />
Name       |  Owner   | Encoding<br />
------------------+----------+----------<br />
postgis          | postgres | UTF8<br />
postgres         | postgres | UTF8<br />
template0        | postgres | UTF8<br />
template1        | postgres | UTF8<br />
template_postgis | postgres | UTF8<br />
(5 rows)<br />
`

Note: Do not drop template databases if not necessary.

**2. How do I run a script from the prompt?**  
`\i <sqlfile></sqlfile>`  
OR  
`psql -d cybersoftbj -u user < myfile.sql`

Its very usuful in reloading user-defined functions.

**3. How do I create a user?**  
`<br />
CREATE ROLE lbs WITH LOGIN PASSWORD 'tracking' SUPERUSER INHERIT CREATEDB CREATEROLE;<br />
`

**4. How to dump database in a text file?**  
`<br />
pg_dump -U lbs -d cybersoftbjv1 -h 127.0.0.1 -W > cybersoftbjv1.sql<br />
`

**4. How to dump database cleanly?**  
`<br />
pg_dump -c  -d -E UTF8 -h 127.0.0.1 -U lbs -W platform_v1 > platform_v1.sql<br />
`

**5. How to update using two tables?**  
`<br />
UPDATE road_for_update u<br />
SET the_geom = r.the_geom<br />
FROM roads r<br />
WHERE r.rd_id = u.rd_id;<br />
`

**6. How to change a column type with Cast?**  
`<br />
ALTER TABLE roads ALTER COLUMN class_new TYPE integer USING class_new::integer;<br />
`

**7. How to provide/restrict access privileges to tables?**  
`<br />
GRANT SELECT ON TABLE table TO user;<br />
REVOKE SELECT ON TABLE table FROM user;<br />
`

**8. How to add a geometry column to a table?**  
`<br />
SYNTAX: AddGeometryColumn(`<table_name>,

  
<column_name>, <srid>, <type>, <dimension>)  
EXAMPLE: SELECT AddGeometryColumn(&#8216;public&#8217;, &#8216;poi&#8217;, &#8216;the_geom&#8217;, 4326, &#8216;POINT&#8217;, 2)  
</dimension></type></srid></column_name></table_name>**9. Changing column names with spaces?**  
`ALTER TABLE class_aroundme RENAME "level 1" TO level_1;` **10. Setting kernel shmmax for postgres**  
`sysctl -w kernel.shmmax=134217728`  
Note: For permanent changes see /etc/sysctl.cfg**11. How to backup table(s) from pg_dump?**  
pg\_dump poi\_beijing -t class -t poi\_class -f $BACKUPDIR/test\_$MYDATE.sql</p>