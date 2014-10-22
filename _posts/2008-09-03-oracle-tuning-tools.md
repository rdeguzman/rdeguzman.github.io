---
title: Oracle Tuning Tools
author: rupert
layout: post
permalink: /2008/09/oracle-tuning-tools/
aktt_tweeted:
  - 1
categories:
  - oracle
tags:
  - oracle
---
**EXPLAIN PLAN**

1. Create the PLAN_TABLE  
SQL> $ORACLE_HOME/rdbms/admin/utlxplan.sql

2. Run EXPLAIN PLAN for an SQL  
SQL> EXPLAIN PLAN  
2 SET STATEMENT_ID = &#8216;example&#8217; FOR  
3 SELECT ename,dname  
4 FROM emp inner join dept  
5 ON ( emp.deptno = dept.deptno )  
6 /  
Explained.

3. DISPLAY Results  
SQL> $ORACLE_HOME/rdbms/admin/utlxpls.sql

**AUTOTRACE** is a SQL*Plus facility that may be enabled in your database. To get this up and running you need to have administration rights to the system and perform the following steps:

\* Log into SQL\*Plus as SYSDBA

* Run the script $ORACLE_HOME/sqlplus/admin/plustrce

* Grant PLUSTRACE to SPATIAL (or to specific users/roles)

To Use:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;">SQL<span style="color: #66cc66;">&gt;</span> <span style="color: #993333; font-weight: bold;">SET</span> autotrace <span style="color: #993333; font-weight: bold;">ON</span>
&nbsp;
SQL<span style="color: #66cc66;">&gt;</span> <span style="color: #993333; font-weight: bold;">SELECT</span> ename<span style="color: #66cc66;">,</span>dname
  <span style="color: #cc66cc;">2</span>    <span style="color: #993333; font-weight: bold;">FROM</span> emp  <span style="color: #993333; font-weight: bold;">INNER</span> <span style="color: #993333; font-weight: bold;">JOIN</span> dept
  <span style="color: #cc66cc;">3</span>      <span style="color: #993333; font-weight: bold;">ON</span> <span style="color: #66cc66;">&#40;</span> emp<span style="color: #66cc66;">.</span>deptno <span style="color: #66cc66;">=</span> dept<span style="color: #66cc66;">.</span>deptno <span style="color: #66cc66;">&#41;</span>
  <span style="color: #cc66cc;">4</span>  <span style="color: #66cc66;">/</span>
&nbsp;
ENAME      DNAME
<span style="color: #808080; font-style: italic;">---------- --------------</span>
SMITH      RESEARCH
ALLEN      SALES
WARD       SALES
JONES      RESEARCH
MARTIN     SALES
BLAKE      SALES
CLARK      ACCOUNTING
SCOTT      RESEARCH
KING       ACCOUNTING
TURNER     SALES
ADAMS      RESEARCH
JAMES      SALES
FORD       RESEARCH
MILLER     ACCOUNTING
&nbsp;
<span style="color: #cc66cc;">14</span> <span style="color: #993333; font-weight: bold;">ROWS</span> selected<span style="color: #66cc66;">.</span>
&nbsp;
Execution Plan
<span style="color: #808080; font-style: italic;">----------------------------------------------------------</span>
   <span style="color: #cc66cc;"></span>      <span style="color: #993333; font-weight: bold;">SELECT</span> STATEMENT Optimizer<span style="color: #66cc66;">=</span>CHOOSE <span style="color: #66cc66;">&#40;</span>Cost<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">3</span> Card<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">14</span> Bytes<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">252</span><span style="color: #66cc66;">&#41;</span>
   <span style="color: #cc66cc;">1</span>    <span style="color: #cc66cc;"></span>   HASH <span style="color: #993333; font-weight: bold;">JOIN</span> <span style="color: #66cc66;">&#40;</span>Cost<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">3</span> Card<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">14</span> Bytes<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">252</span><span style="color: #66cc66;">&#41;</span>
   <span style="color: #cc66cc;">2</span>    <span style="color: #cc66cc;">1</span>     <span style="color: #993333; font-weight: bold;">TABLE</span> ACCESS <span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">FULL</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">OF</span> <span style="color: #ff0000;">'DEPT'</span> <span style="color: #66cc66;">&#40;</span>Cost<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">1</span> Card<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">4</span> Bytes<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">44</span><span style="color: #66cc66;">&#41;</span>
   <span style="color: #cc66cc;">3</span>    <span style="color: #cc66cc;">1</span>     <span style="color: #993333; font-weight: bold;">TABLE</span> ACCESS <span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">FULL</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">OF</span> <span style="color: #ff0000;">'EMP'</span> <span style="color: #66cc66;">&#40;</span>Cost<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">1</span> Card<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">14</span> Bytes<span style="color: #66cc66;">=</span><span style="color: #cc66cc;">98</span><span style="color: #66cc66;">&#41;</span>
&nbsp;
Statistics
<span style="color: #808080; font-style: italic;">----------------------------------------------------------</span>
          <span style="color: #cc66cc;"></span>  recursive calls
          <span style="color: #cc66cc;">4</span>  db block gets
          <span style="color: #cc66cc;">3</span>  consistent gets
          <span style="color: #cc66cc;"></span>  physical reads
          <span style="color: #cc66cc;"></span>  redo <span style="color: #993333; font-weight: bold;">SIZE</span>
       <span style="color: #cc66cc;">1132</span>  bytes sent via <span style="color: #993333; font-weight: bold;">SQL</span><span style="color: #66cc66;">*</span>Net <span style="color: #993333; font-weight: bold;">TO</span> client
        <span style="color: #cc66cc;">503</span>  bytes received via <span style="color: #993333; font-weight: bold;">SQL</span><span style="color: #66cc66;">*</span>Net <span style="color: #993333; font-weight: bold;">FROM</span> client
          <span style="color: #cc66cc;">2</span>  <span style="color: #993333; font-weight: bold;">SQL</span><span style="color: #66cc66;">*</span>Net roundtrips <span style="color: #993333; font-weight: bold;">TO</span><span style="color: #66cc66;">/</span><span style="color: #993333; font-weight: bold;">FROM</span> client
          <span style="color: #cc66cc;"></span>  sorts <span style="color: #66cc66;">&#40;</span>memory<span style="color: #66cc66;">&#41;</span>
          <span style="color: #cc66cc;"></span>  sorts <span style="color: #66cc66;">&#40;</span>disk<span style="color: #66cc66;">&#41;</span>
         <span style="color: #cc66cc;">14</span>  <span style="color: #993333; font-weight: bold;">ROWS</span> processed</pre>
      </td>
    </tr>
  </table>
</div>

Courtesy of Beginning Oracle Programming by Sean Dillon et al

<!--more-->

  
<img src="/images/2008/09/picture-14.png" alt="Picture 1.png" border="0" width="595" height="748" />  
<img src="/images/2008/09/picture-21.png" alt="Picture 2.png" border="0" width="593" height="666" />