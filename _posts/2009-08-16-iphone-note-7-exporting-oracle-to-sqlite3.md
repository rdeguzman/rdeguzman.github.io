---
title: 'iPhone Note #8: Exporting Oracle to SQLite3'
author: Rupert
layout: post
permalink: /2009/08/iphone-note-7-exporting-oracle-to-sqlite3/
delicious:
  - 's:78:"a:3:{s:5:"count";s:1:"0";s:9:"post_tags";s:0:"";s:4:"time";s:10:"1250473650";}";'
reddit:
  - 's:55:"a:2:{s:5:"count";s:1:"0";s:4:"time";s:10:"1250473650";}";'
categories:
  - iphone
  - oracle
  - sqlite3
tags:
  - iphone
  - oracle
  - sqlite3
---
Since I&#8217;ve been working most of my time with iPhone Dev for the last couple of months, I thought it will be worthwile to post how to import files to SQLite3. In a nutshell, use [MesaSQLite&#8217;s][1] IMPORT function. It will save you a lot of time. Now it is up to you how to export into a CSV or TAB delimited file. For Oracle, I used [SQLDeveloper][2]. For other databases, such as MySQL or Postgres, I&#8217;ve used [Navicat.][3]<!--more-->

1. Using [SQLDeveloper][2] -> Right Click on the Table from the left pane -> Export

<img src="/images/2009/08/oracle-sqldeveloper-left.gif" alt="oracle-sqldeveloper-left.gif" border="0" width="278" height="377" />

<img src="/images/2009/08/oracle-sqldeveloper.gif" alt="oracle-sqldeveloper.gif" border="0" width="467" height="409" />

2. Choose TEXT since we are going to use that when importing using [MesaSQLite.][1] Note, SQLDeveloper does not export CLOB columns. You need to change your column from CLOB to VARCHAR. A workaround is to add a column and then update that column aferwards.

<pre>ALTER TABLE poi ADD en_desc VARCHAR(2000);
UPDATE poi SET en_desc = en_short_desc;
</pre>

3. In [MesaSQLite,][1] FILE -> IMPORT -> CSV/TAB

<img src="/images/2009/08/mesa-1.gif" alt="mesa-1.gif" border="0" width="274" height="127" />

4. Choose the table which you want to import.

5. Choose your exported TAB delimited file from SQLDeveloper.

6. Afterwards, map the corresponding fields to your database. Note, that I added an extra column &#8220;dummy&#8221; in the file because it seems I can only match n-1 columns, thus the extra column.

<img src="/images/2009/08/mesa-2.gif" alt="mesa-2.gif" border="0" width="344" height="349" />

 [1]: http://www.mesamysql.com/?realmesa_home
 [2]: http://www.oracle.com/technology/products/database/sql_developer/index.html
 [3]: http://www.navicat.com