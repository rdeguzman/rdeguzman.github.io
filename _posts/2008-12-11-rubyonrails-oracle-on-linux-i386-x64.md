---
title: 'Rails Note #13: RubyonRails + Oracle on Linux (i386 / x64)'
author: rupert
layout: post
permalink: /2008/12/rubyonrails-oracle-on-linux-i386-x64/
aktt_tweeted:
  - 1
categories:
  - debian
  - linux
  - oracle
  - rails
  - ruby
tags:
  - debian
  - linux
  - oracle
  - rails
---
In summary, install Oracle Instant Client and try to run sqlplus. If sqlplus connects to the oracle sid then go ahead and install the rails adapters for oracle. **What is important to note here, is to install the oracle-instantclient for the architecture of your machine.**. I have tested this on Debian Lenny (i386) and CentOS5 (x64)

1. Download from <http://www.oracle.com/technology/software/tech/oci/instantclient/>

a. oracle-instantclient-basic-10.2.0.4-1.i386  
b. oracle-instantclient-devel-10.2.0.4-1.i386  
c. oracle-instantclient-sqlplus-10.2.0.4-1.i386

2. Unzip everything to /opt/oracle/instantclient . You should have something like the ff:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>csapp1 instantclient<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># ls -la</span>
total <span style="color: #000000;">102704</span>
drwxr-xr-x <span style="color: #000000;">3</span> root root     <span style="color: #000000;">4096</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">54</span> .
drwxr-xr-x <span style="color: #000000;">3</span> root root     <span style="color: #000000;">4096</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">22</span>:03 ..
<span style="color: #660033;">-rw-r--r--</span> <span style="color: #000000;">1</span> root root      <span style="color: #000000;">228</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> BASIC_README
<span style="color: #660033;">-r--r--r--</span> <span style="color: #000000;">1</span> root root  <span style="color: #000000;">1609607</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> classes12.jar
<span style="color: #660033;">-rwxr-xr-x</span> <span style="color: #000000;">1</span> root root    <span style="color: #000000;">67542</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> genezi
<span style="color: #660033;">-r--r--r--</span> <span style="color: #000000;">1</span> root root     <span style="color: #000000;">1525</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> glogin.sql
lrwxrwxrwx <span style="color: #000000;">1</span> root root       <span style="color: #000000;">17</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">54</span> libclntsh.so -<span style="color: #000000; font-weight: bold;">&gt;</span> libclntsh.so.10.1
<span style="color: #660033;">-rwxr-xr-x</span> <span style="color: #000000;">1</span> root root <span style="color: #000000;">21038613</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> libclntsh.so.10.1
<span style="color: #660033;">-r-xr-xr-x</span> <span style="color: #000000;">1</span> root root  <span style="color: #000000;">3796601</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> libnnz10.so
<span style="color: #660033;">-rwxr-xr-x</span> <span style="color: #000000;">1</span> root root  <span style="color: #000000;">1664116</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> libocci.so.10.1
<span style="color: #660033;">-rwxr-xr-x</span> <span style="color: #000000;">1</span> root root <span style="color: #000000;">72674185</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> libociei.so
<span style="color: #660033;">-r-xr-xr-x</span> <span style="color: #000000;">1</span> root root   <span style="color: #000000;">138033</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> libocijdbc10.so
<span style="color: #660033;">-r-xr-xr-x</span> <span style="color: #000000;">1</span> root root  <span style="color: #000000;">1435561</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> libsqlplusic.so
<span style="color: #660033;">-r-xr-xr-x</span> <span style="color: #000000;">1</span> root root   <span style="color: #000000;">997409</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> libsqlplus.so
<span style="color: #660033;">-r--r--r--</span> <span style="color: #000000;">1</span> root root  <span style="color: #000000;">1555682</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> ojdbc14.jar
drwxr-xr-x <span style="color: #000000;">4</span> root root     <span style="color: #000000;">4096</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> sdk
<span style="color: #660033;">-r-xr-xr-x</span> <span style="color: #000000;">1</span> root root     <span style="color: #000000;">7773</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> sqlplus
<span style="color: #660033;">-rw-r--r--</span> <span style="color: #000000;">1</span> root root      <span style="color: #000000;">232</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">52</span> SQLPLUS_README
<span style="color: #660033;">-rw-r--r--</span> <span style="color: #000000;">1</span> root root      <span style="color: #000000;">516</span> Dec <span style="color: #000000;">10</span> <span style="color: #000000;">21</span>:<span style="color: #000000;">53</span> tnsnames.ora
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>csapp1 instantclient<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;">#</span></pre>
      </td>
    </tr>
  </table>
</div>

3. Make a symbolic link for libclntsh.so.10.1 as shown above.

4. Create the Oracle Environment variables

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">ORACLE_HOME</span>=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>instantclient
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">TNS_ADMIN</span>=<span style="color: #007800;">$ORACLE_HOME</span>
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">LD_LIBRARY_PATH</span>=<span style="color: #007800;">$ORACLE_HOME</span>:<span style="color: #007800;">$LD_LIBRARY_PATH</span>
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">DYLD_LIBRARY_PATH</span>=<span style="color: #007800;">$ORACLE_HOME</span>
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">PATH</span>=<span style="color: #007800;">$PATH</span>:<span style="color: #007800;">$ORACLE_HOME</span></pre>
      </td>
    </tr>
  </table>
</div>

5. At this point, you should have oracle-instantclient properly installed. You can test by running **sqlplus**.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>csapp1 instantclient<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># sqlplus</span>
&nbsp;
SQL<span style="color: #000000; font-weight: bold;">*</span>Plus: Release 10.2.0.4.0 - Production on Thu Dec <span style="color: #000000;">11</span> <span style="color: #000000;">11</span>:<span style="color: #000000;">47</span>:<span style="color: #000000;">40</span> <span style="color: #000000;">2008</span>
&nbsp;
Copyright <span style="color: #7a0874; font-weight: bold;">&#40;</span>c<span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #000000;">1982</span>, <span style="color: #000000;">2007</span>, Oracle.  All Rights Reserved.</pre>
      </td>
    </tr>
  </table>
</div>

NOTE: Sometimes you will get a SEGMENTATION FAULT. If so, try to open a new shell with the environment variables loaded and do an **sqlplus** in a directory which is not */opt/oracle/instantclient*.

6. Install the oracle adapter for rails

7. gem install ruby-oci8

8. gem install oracle_enhanced-adapter &#8211;source=&#8221;http://gems.rubyonrails.org/&#8221;

activerecord-oracle-adapter (1.0.0.9250)  
activerecord-oracle_enhanced-adapter (1.1.8)

NOTE: Try to look for the latest gems, the source above is at the time of this writing so it might change.

9. Test using **irb**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>csapp1 instantclient<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># irb</span>
irb<span style="color: #7a0874; font-weight: bold;">&#40;</span>main<span style="color: #7a0874; font-weight: bold;">&#41;</span>:001:<span style="color: #000000;"></span><span style="color: #000000; font-weight: bold;">&gt;</span> require <span style="color: #ff0000;">'rubygems'</span>
=<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #c20cb9; font-weight: bold;">true</span>
irb<span style="color: #7a0874; font-weight: bold;">&#40;</span>main<span style="color: #7a0874; font-weight: bold;">&#41;</span>:002:<span style="color: #000000;"></span><span style="color: #000000; font-weight: bold;">&gt;</span> require <span style="color: #ff0000;">'oci8'</span>
=<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #c20cb9; font-weight: bold;">true</span>
irb<span style="color: #7a0874; font-weight: bold;">&#40;</span>main<span style="color: #7a0874; font-weight: bold;">&#41;</span>:003:<span style="color: #000000;"></span><span style="color: #000000; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>