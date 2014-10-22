---
title: How to make Oracle start on boot
author: rupert
layout: post
permalink: /2008/09/how-to-make-oracle-start-on-boot/
aktt_tweeted:
  - 1
categories:
  - oracle
tags:
  - centos
  - oracle
---
1. Login as root and edit /etc/oratab to reflect &#8220;Y&#8221;

<pre>orcl:/opt/oracle/product/11.1.0/db_1:Y
</pre>

2. oracle startup script:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#!/bin/bash</span>
<span style="color: #666666; font-style: italic;">#</span>
<span style="color: #666666; font-style: italic;"># oracle Init file for starting and stopping</span>
<span style="color: #666666; font-style: italic;"># Oracle Database. Script is valid for 10g and 11g versions.</span>
<span style="color: #666666; font-style: italic;">#</span>
<span style="color: #666666; font-style: italic;"># chkconfig: 35 80 30</span>
<span style="color: #666666; font-style: italic;"># description: Oracle Database startup script</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># Source function library.</span>
&nbsp;
. <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rc.d<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>functions
&nbsp;
<span style="color: #007800;">ORACLE_OWNER</span>=<span style="color: #ff0000;">"oracle"</span>
<span style="color: #007800;">ORACLE_HOME</span>=<span style="color: #ff0000;">"/opt/oracle/product/11.1.0/db_1"</span>
&nbsp;
<span style="color: #000000; font-weight: bold;">case</span> <span style="color: #ff0000;">"$1"</span> <span style="color: #000000; font-weight: bold;">in</span>
start<span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #660033;">-n</span> $<span style="color: #ff0000;">"Starting Oracle DB:"</span>
<span style="color: #c20cb9; font-weight: bold;">su</span> - <span style="color: #007800;">$ORACLE_OWNER</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">"<span style="color: #007800;">$ORACLE_HOME</span>/bin/dbstart <span style="color: #007800;">$ORACLE_HOME</span>"</span>
<span style="color: #c20cb9; font-weight: bold;">su</span> - <span style="color: #007800;">$ORACLE_OWNER</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">"<span style="color: #007800;">$ORACLE_HOME</span>/bin/lsnrctl start"</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #ff0000;">"OK"</span>
<span style="color: #000000; font-weight: bold;">;;</span>
stop<span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #660033;">-n</span> $<span style="color: #ff0000;">"Stopping Oracle DB:"</span>
<span style="color: #c20cb9; font-weight: bold;">su</span> - <span style="color: #007800;">$ORACLE_OWNER</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">"<span style="color: #007800;">$ORACLE_HOME</span>/bin/dbshut <span style="color: #007800;">$ORACLE_HOME</span>"</span>
<span style="color: #c20cb9; font-weight: bold;">su</span> - <span style="color: #007800;">$ORACLE_OWNER</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">"<span style="color: #007800;">$ORACLE_HOME</span>/bin/lsnrctl stop"</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #ff0000;">"OK"</span>
<span style="color: #000000; font-weight: bold;">;;</span>
<span style="color: #000000; font-weight: bold;">*</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> $<span style="color: #ff0000;">"Usage: $0 {start|stop}"</span>
<span style="color: #000000; font-weight: bold;">esac</span></pre>
      </td>
    </tr>
  </table>
</div>

3. Oracle EMCTL

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#!/bin/bash</span>
<span style="color: #666666; font-style: italic;">#</span>
<span style="color: #666666; font-style: italic;"># oraemctl Starting and stopping Oracle Enterprise Manager Database Control.</span>
<span style="color: #666666; font-style: italic;"># Script is valid for 10g and 11g versions.</span>
<span style="color: #666666; font-style: italic;">#</span>
<span style="color: #666666; font-style: italic;"># chkconfig: 35 80 30</span>
<span style="color: #666666; font-style: italic;"># description: Enterprise Manager DB Control startup script</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># Source function library.</span>
&nbsp;
. <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rc.d<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>functions
&nbsp;
<span style="color: #007800;">ORACLE_OWNER</span>=<span style="color: #ff0000;">"oracle"</span>
<span style="color: #007800;">ORACLE_HOME</span>=<span style="color: #ff0000;">"/opt/oracle/product/11.1.0/db_1"</span>
&nbsp;
<span style="color: #000000; font-weight: bold;">case</span> <span style="color: #ff0000;">"$1"</span> <span style="color: #000000; font-weight: bold;">in</span>
start<span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #660033;">-n</span> $<span style="color: #ff0000;">"Starting Oracle EM DB Console:"</span>
<span style="color: #c20cb9; font-weight: bold;">su</span> - <span style="color: #007800;">$ORACLE_OWNER</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">"<span style="color: #007800;">$ORACLE_HOME</span>/bin/emctl start dbconsole"</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #ff0000;">"OK"</span>
<span style="color: #000000; font-weight: bold;">;;</span>
stop<span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #660033;">-n</span> $<span style="color: #ff0000;">"Stopping Oracle EM DB Console:"</span>
<span style="color: #c20cb9; font-weight: bold;">su</span> - <span style="color: #007800;">$ORACLE_OWNER</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">"<span style="color: #007800;">$ORACLE_HOME</span>/bin/emctl stop dbconsole"</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #ff0000;">"OK"</span>
<span style="color: #000000; font-weight: bold;">;;</span>
<span style="color: #000000; font-weight: bold;">*</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> $<span style="color: #ff0000;">"Usage: $0 {start|stop}"</span>
<span style="color: #000000; font-weight: bold;">esac</span></pre>
      </td>
    </tr>
  </table>
</div>

4. chkconfig &#8211;add /etc/init.d/oracle  
5. chkconfig &#8211;add /etc/init.d/oraemctl