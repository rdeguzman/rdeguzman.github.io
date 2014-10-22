---
title: Cron Revisited
author: rupert
layout: post
permalink: /2007/04/cron-revisited/
categories:
  - linux
tags:
  - cron
  - linux
---
Its been a long time i havent done schedule cronjobs in cron. Here&#8217;s a refresher..

A crontab file has five fields for specifying day , date and time followed by the command to be run at that interval.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">*</span>     <span style="color: #000000; font-weight: bold;">*</span>   <span style="color: #000000; font-weight: bold;">*</span>   <span style="color: #000000; font-weight: bold;">*</span>    <span style="color: #000000; font-weight: bold;">*</span>  <span style="color: #7a0874; font-weight: bold;">command</span> to be executed
-     -    -    -    -
<span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>
<span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     +----- day of week <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;"></span> - <span style="color: #000000;">6</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #007800;">Sunday</span>=<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     +------- month <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">1</span> - <span style="color: #000000;">12</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #000000; font-weight: bold;">|</span>     <span style="color: #000000; font-weight: bold;">|</span>     +--------- day of month <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">1</span> - <span style="color: #000000;">31</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #000000; font-weight: bold;">|</span>     +----------- hour <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;"></span> - <span style="color: #000000;">23</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
+------------- min <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;"></span> - <span style="color: #000000;">59</span><span style="color: #7a0874; font-weight: bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

cron invokes the command from the user&#8217;s HOME directory with the shell, (/usr/bin/sh).

cron supplies a default environment for every shell, defining:  
HOME=user&#8217;s-home-directory  
LOGNAME=user&#8217;s-login-id  
PATH=/usr/bin:/usr/sbin:.  
SHELL=/usr/bin/sh

Here is a cron scirpt which svn commits the database every 1am&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>dbserver1 ~<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># crontab -l</span>
<span style="color: #666666; font-style: italic;">#Cron check</span>
<span style="color: #666666; font-style: italic;">#* * * * *  /bin/date &gt;&gt; /root/date.log</span>
&nbsp;
<span style="color: #666666; font-style: italic;">#Every 1AM svn commit the database</span>
<span style="color: #000000;"></span> <span style="color: #000000;">1</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">sh</span> <span style="color: #000000; font-weight: bold;">/</span>root<span style="color: #000000; font-weight: bold;">/</span>dbbackup.sh <span style="color: #000000; font-weight: bold;">&</span>gt; <span style="color: #000000; font-weight: bold;">/</span>root<span style="color: #000000; font-weight: bold;">/</span>dbbackup.log
&nbsp;
<span style="color: #666666; font-style: italic;">#Every 6AM Update the date and time from ntpd</span>
<span style="color: #000000;"></span> <span style="color: #000000;">6</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span>ntpdate <span style="color: #000000;"></span>.asia.pool.ntp.org <span style="color: #000000; font-weight: bold;">&</span>gt; <span style="color: #000000; font-weight: bold;">/</span>root<span style="color: #000000; font-weight: bold;">/</span>dateupdate.log
&nbsp;
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>dbserver1 ~<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># more /root/dbbackup.sh</span>
<span style="color: #666666; font-style: italic;">#!/bin/sh</span>
<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">date</span> <span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt; <span style="color: #000000; font-weight: bold;">/</span>root<span style="color: #000000; font-weight: bold;">/</span>dbbackup.log
<span style="color: #007800;">dbfolder</span>=<span style="color: #000000; font-weight: bold;">/</span>data<span style="color: #000000; font-weight: bold;">/</span>mysqldata<span style="color: #000000; font-weight: bold;">/</span>cybersoftbj
<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">svn add</span> <span style="color: #007800;">$dbfolder</span><span style="color: #000000; font-weight: bold;">/*</span> <span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt; <span style="color: #000000; font-weight: bold;">/</span>root<span style="color: #000000; font-weight: bold;">/</span>dbbackup.log
<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">svn commit</span> <span style="color: #660033;">--non-interactive</span> <span style="color: #660033;">--username</span> <span style="color: #000000; font-weight: bold;">*****</span> <span style="color: #660033;">--password</span> <span style="color: #000000; font-weight: bold;">*****</span> <span style="color: #660033;">-m</span> <span style="color: #ff0000;">"committed by autosvn cron script"</span> <span style="color: #007800;">$dbfolder</span><span style="color: #000000; font-weight: bold;">/*</span> <span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt; <span style="color: #000000; font-weight: bold;">/</span>root<span style="color: #000000; font-weight: bold;">/</span>dbbackup.log
<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">chown</span> <span style="color: #660033;">-Rf</span> mysql:mysql <span style="color: #007800;">$dbfolder</span>
<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #660033;">-Rf</span> <span style="color: #000000;">755</span> <span style="color: #007800;">$dbfolder</span></pre>
      </td>
    </tr>
  </table>
</div>