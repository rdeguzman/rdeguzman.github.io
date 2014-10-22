---
title: SQLite3 Cheatsheet
author: rupert
layout: post
permalink: /2009/08/sqlite3-cheatsheet-2/
categories:
  - sqlite3
tags:
  - sqlite3
---
## **Tools**

1. MesaSQLite for MacOSX.

## **SQL**

**1. Getting the current time**

MySQL = Now();

SQLite3 = CURRENT_TIMESTAMP;

<pre>insert into jobstemp(full_address, datecreated, dateupdated)
VALUES("9 Bishop Street", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
</pre>

**2. Getting the local current time**

<pre>SELECT datetime(dateupdated, 'localtime')
</pre>

**3. Trim**

<pre>SELECT trim(name) FROM table
</pre>

**4. Vacuum**

<pre>rupert:Desktop rupert$ sqlite3 photos-2.0.0.db 
SQLite version 3.6.12
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite> vacuum;
sqlite> .quit;
</pre>

**5. Quit**

<pre>rupert:Desktop rupert$ sqlite3 photos-2.0.0.db 
SQLite version 3.6.12
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite> .quit;
</pre>