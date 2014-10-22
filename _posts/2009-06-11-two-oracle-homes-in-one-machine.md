---
title: Two Oracle Homes in one Machine
author: rupert
layout: post
permalink: /2009/06/two-oracle-homes-in-one-machine/
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
categories:
  - oracle
tags:
  - oracle
---
I&#8217;ve been toggling back and forth two different oracle homes by editing the environment variables from the Control Panel in Windows which is a pain in the \***. What I did was, to create two different command prompt shells with different oracle home environments. I got this idea after a glimpse from FWTools.

1. Create a Command Prompt Shortcut and drag it to your oracle directory, i.e, E:\oracle\Oracle Shell Local

2. Edit the target as:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">C:\WINDOWS\system32\cmd.exe /K "E:\oracle\setlocal.bat"</pre>
      </td>
    </tr>
  </table>
</div>

3. Create &#8220;setlocal.bat&#8221;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bat" style="font-family:monospace;">@echo off
SET ORACLE_HOME=E:\oracle\product\10.2.0\db_2
set PATH=E:\oracle\product\10.2.0\db_2\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem</pre>
      </td>
    </tr>
  </table>
</div>

Do the same for your remote oracle but with a different bat file.  
1. Repeat steps 1 and 2 but name it &#8220;Oracle Shell Remote&#8221; and &#8220;E:\oracle\setremote.bat&#8221;

2. Create &#8220;setremote.bat&#8221;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bat" style="font-family:monospace;">@echo off
SET ORACLE_HOME=E:\oracle\product\10.2.0\client_1
set PATH=E:\oracle\product\10.2.0\client_1\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem</pre>
      </td>
    </tr>
  </table>
</div>

Note: This assumes that you have installed an Oracle Client on E:\oracle\product\10.2.0\client_1

Ok, now let&#8217;s test. I know that I have different record count for a table in my local and remote  
1. Fire up &#8220;Oracle Shell Local&#8221;. Run sqlplus  
>sqlplus username/password@instance\_name\_defined\_in\_local_tnsnames.ora

Note: E:\oracle\product\10.2.0\db_2\NETWORK\ADMIN\tnsnames.ora

2. Fire u p &#8220;Oracle Shell Remote&#8221;. Run sqlplus  
>sqlplus username/password@instance\_name\_defined\_in\_remote_tnsnames.ora

Note: E:\oracle\product\10.2.0\client_1\NETWORK\ADMIN\tnsnames.ora

So what? Well its very useful when doing export and imports. Say I want to export a table from my local and import it to my remote oracle. I&#8217;ll just fire up two shells, issue an export in my &#8220;Oracle Shell Local&#8221; and run an import command in my &#8220;Oracle Shell Remote&#8221;