---
title: Installing Oracle11g x64 on CentOS5
author: rupert
layout: post
permalink: /2008/07/installing-oracle-x64-on-centos5/
aktt_tweeted:
  - 1
categories:
  - oracle
tags:
  - centos
  - linux
  - oracle
---
FOR EDITING.. This is just a couple of notes from my Oracle testing a few weeks back that I forgot to post..

**A. Installing **

1. Check for rpm packages:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rpm <span style="color: #660033;">-q</span> binutils compat-db control-center <span style="color: #c20cb9; font-weight: bold;">gcc</span> gcc-c++ glibc glibc-common gnome-libs libstdc++ libstdc++-devel <span style="color: #c20cb9; font-weight: bold;">make</span> pdksh sysstat xscreensaver libaio openmotif21 elfutils-libelf libaio-devel libgcc</pre>
      </td>
    </tr>
  </table>
</div>

*NOTE: For 10g, you need libXp.so.6 installed. It seems the oracle installer is messed up with some i386 modules pointing to x86? Anyway, I was able to resolve the problem by installing the libXp.i386.rpm version.*

2. install the necessary rpm packages:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rpm <span style="color: #660033;">-ivh</span> compat-db-4.2.52-<span style="color: #000000;">5.1</span>.x86_64.rpm 
rpm <span style="color: #660033;">-ivh</span> libgnome-2.16.0-<span style="color: #000000;">6</span>.el5.x86_64.rpm 
rpm <span style="color: #660033;">-ivh</span> sysstat-7.0.0-<span style="color: #000000;">3</span>.el5.x86_64.rpm 
rpm <span style="color: #660033;">-ivh</span> libaio-devel-0.3.106-<span style="color: #000000;">3.2</span>.x86_64.rpm 
rpm <span style="color: #660033;">-ivh</span> lm_sensors-2.10.0-<span style="color: #000000;">3.1</span>.x86_64.rpm
rpm <span style="color: #660033;">-ivh</span> beecrypt-devel-4.1.2-10.1.1.x86_64.rpm elfutils-devel-<span style="color: #000000;">0.125</span>-<span style="color: #000000;">3</span>.el5.x86_64.rpm net-snmp-devel-5.3.1-<span style="color: #000000;">19</span>.el5.x86_64.rpm elfutils-devel-static-<span style="color: #000000;">0.125</span>-<span style="color: #000000;">3</span>.el5.x86_64.rpm net-snmp-5.3.1-<span style="color: #000000;">19</span>.el5.x86_64.rpm net-snmp-libs-5.3.1-<span style="color: #000000;">19</span>.el5.x86_64.rpm</pre>
      </td>
    </tr>
  </table>
</div>

3. vim /etc/profile

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">ORACLE_BASE</span>=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product
<span style="color: #007800;">ORACLE_SID</span>=csdbora
<span style="color: #007800;">ORACLE_HOME</span>=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db_1
&nbsp;
<span style="color: #7a0874; font-weight: bold;">export</span> ORACLE_BASE ORACLE_SID ORACLE_HOME
&nbsp;
<span style="color: #007800;">PATH</span>=<span style="color: #007800;">$PATH</span>:<span style="color: #007800;">$ORACLE_HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">LD_LIBRARY_PATH</span>=<span style="color: #007800;">$LD_LIBRARY_PATH</span>:<span style="color: #007800;">$ORACLE_HOME</span><span style="color: #000000; font-weight: bold;">/</span>lib</pre>
      </td>
    </tr>
  </table>
</div>

4. Create oracle Account

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">groupadd oinstall
groupadd dba
useradd <span style="color: #660033;">-m</span> <span style="color: #660033;">-g</span> oinstall <span style="color: #660033;">-G</span> dba oracle
<span style="color: #c20cb9; font-weight: bold;">id</span> oracle</pre>
      </td>
    </tr>
  </table>
</div>

uid=501(oracle) gid=501(oinstall) groups=501(oinstall),502(dba)

5. Run modify_kernel.sh

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">cat</span> <span style="color: #000000; font-weight: bold;">&gt;&gt;</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>sysctl.conf <span style="color: #cc0000; font-style: italic;">&lt;&lt; EOF
kernel.shmall = 2097152
kernel.shmmax = 1073741824 
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
fs.file-max = 65536
net.ipv4.ip_local_port_range = 1025 65000
net.core.rmem_default = 262144
net.core.wmem_default = 262144
net.core.rmem_max = 262144
net.core.wmem_max = 262144
EOF</span></pre>
      </td>
    </tr>
  </table>
</div>

6. vim /etc/sysctl.conf and comment kernel.shmall and kernel.shmmax because if  
you don&#8217;t then we will have double results

7. /sbin/sysctl -p

8. Create Directories:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #660033;">-p</span> <span style="color: #000000; font-weight: bold;">/</span>u01
<span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #660033;">-p</span> <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle
<span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #660033;">-p</span> <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product
<span style="color: #c20cb9; font-weight: bold;">chown</span> <span style="color: #660033;">-R</span> oracle:oinstall <span style="color: #000000; font-weight: bold;">/</span>u01
<span style="color: #c20cb9; font-weight: bold;">chown</span> <span style="color: #660033;">-R</span> oracle:oinstall <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle
<span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #660033;">-R</span> <span style="color: #000000;">755</span> <span style="color: #000000; font-weight: bold;">/</span>u01
<span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #660033;">-R</span> <span style="color: #000000;">755</span> <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle
<span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #660033;">-R</span> <span style="color: #000000;">755</span> <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product</pre>
      </td>
    </tr>
  </table>
</div>

9. Run sh -v modify_shelllimits.sh

10. Add the ff lines in /etc/pam.d/login  
session required /lib/security/pam_limits.so  
session required pam_limits.so

11. cp -rf /home/installers/linux.x64\_11gR1\_database.zip /opt/oracle

12. chown oracle:oinstall /opt/oracle/linux.x64\_11gR1\_database.zip

13. Clost all terminals and logout as root from desktop.

14. Login as oracle

15. Follow tutorial until installing oracle  
[Installing Oracle 11g on CentOS under VMWare on a Macbook.doc][1]

To extract: cpio -idmv < 10201\_database\_linux\_x86\_64.cpio

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>redhat-release
Redhat <span style="color: #000000;">4</span></pre>
      </td>
    </tr>
  </table>
</div>

16. Run the 2 scripts after the dialog:

[root@cs5ora11g db1]# sh root.sh  
Running Oracle 11g root.sh script&#8230;

The following environment variables are set as:  
ORACLE_OWNER= oracle  
ORACLE_HOME= /opt/oracle/product/11.1.0/db1

Enter the full pathname of the local bin directory: [/usr/local/bin]:  
Copying dbhome to /usr/local/bin &#8230;  
Copying oraenv to /usr/local/bin &#8230;  
Copying coraenv to /usr/local/bin &#8230;

Creating /etc/oratab file&#8230;  
Entries will be added to the /etc/oratab file as needed by  
Database Configuration Assistant when a database is created  
Finished running generic part of root.sh script.  
Now product-specific root actions will be performed.  
Finished product-specific root actions.

17. Open your firewall to 1158

18. Go to https://192.168.1.155:1158/em 

&#8211; Login as SYSMAN:\[password\] (nickname+wife)

19. Install Oracle Instant Client for your distro [MacOS]

http://www.oracle.com/technology/software/tech/oci/instantclient/index.html

a. Add exports to runsqlplus.sh  
b. copy tnsnames.ora from centos to mac  
c. add in firewall: 1521  
d. sh runsqlplus.sh

20. do sqlplus  
Enter user-name: SYSMAN@cybersof  
Enter password: 

Connected to:  
Oracle Database 11g Enterprise Edition Release 11.1.0.6.0 &#8211; 64bit Production  
With the Partitioning, OLAP, Data Mining and Real Application Testing options  
SQL> 

You are now connected successfully.

21. Check for oracle processes: ps -ef | grep ora

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">SQLPLUS DBINSTANCE:
oraclecybersof <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #007800;">LOCAL</span>=NO<span style="color: #7a0874; font-weight: bold;">&#41;</span>
&nbsp;
&nbsp;
ORACLE LISTENER:
<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>tnslsnr LISTENER <span style="color: #660033;">-inherit</span>
&nbsp;
ORACLE ENTERPRISE MANAGER:
oracle   <span style="color: #000000;">14487</span>     <span style="color: #000000;">1</span>  <span style="color: #000000;"></span> <span style="color: #000000;">15</span>:<span style="color: #000000;">37</span> ?        00:00:00
<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>perl<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">perl</span>
<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>emwd.pl dbconsole
<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>cs5ora11g_csmlcc<span style="color: #000000; font-weight: bold;">/</span>sysman<span style="color: #000000; font-weight: bold;">/</span>log<span style="color: #000000; font-weight: bold;">/</span>emdb.nohup
oracle   <span style="color: #000000;">14511</span> <span style="color: #000000;">14487</span>  <span style="color: #000000;">2</span> <span style="color: #000000;">15</span>:<span style="color: #000000;">37</span> ?        00:00:<span style="color: #000000;">36</span>
<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>jdk<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>java <span style="color: #660033;">-server</span> <span style="color: #660033;">-Xmx512M</span>
-XX:<span style="color: #007800;">MaxPermSize</span>=1024M -XX:<span style="color: #007800;">MinHeapFreeRatio</span>=<span style="color: #000000;">20</span> -XX:<span style="color: #007800;">MaxHeapFreeRatio</span>=<span style="color: #000000;">40</span>
-DORACLE_HOME=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1
-Doracle.home=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>oc4j
-Doracle.oc4j.localhome=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>cs5ora11g_csmlcc<span style="color: #000000; font-weight: bold;">/</span>sysman
<span style="color: #660033;">-DEMSTATE</span>=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>cs5ora11g_csmlcc
-Doracle.j2ee.dont.use.memory.archive=<span style="color: #c20cb9; font-weight: bold;">true</span>
-Djava.protocol.handler.pkgs=HTTPClient
-Doracle.security.jazn.config=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>oc4j<span style="color: #000000; font-weight: bold;">/</span>j2ee<span style="color: #000000; font-weight: bold;">/</span>OC4J_DBConsole_cs5ora11g_csmlcc<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>jazn.xml
-Djava.security.policy=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>oc4j<span style="color: #000000; font-weight: bold;">/</span>j2ee<span style="color: #000000; font-weight: bold;">/</span>OC4J_DBConsole_cs5ora11g_csmlcc<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>java2.policy
-Djavax.net.ssl.KeyStore=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>sysman<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>OCMTrustedCerts.txt-Djava.security.properties=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>oc4j<span style="color: #000000; font-weight: bold;">/</span>j2ee<span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>jazn.security.props
<span style="color: #660033;">-DEMDROOT</span>=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>cs5ora11g_csmlcc
-Dsysman.md5<span style="color: #007800;">password</span>=<span style="color: #c20cb9; font-weight: bold;">true</span> -Drepapi.oracle.home=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1
-Ddisable.checkForUpdate=<span style="color: #c20cb9; font-weight: bold;">true</span>
-Doracle.sysman.ccr.ocmSDK.websvc.keystore=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>jlib<span style="color: #000000; font-weight: bold;">/</span>emocmclnt.ks
-Dice.pilots.html4.ignoreNonGenericFonts=<span style="color: #c20cb9; font-weight: bold;">true</span> -Djava.awt.headless=<span style="color: #c20cb9; font-weight: bold;">true</span> <span style="color: #660033;">-jar</span>
<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>oc4j<span style="color: #000000; font-weight: bold;">/</span>j2ee<span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span>oc4j.jar <span style="color: #660033;">-config</span>
<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1<span style="color: #000000; font-weight: bold;">/</span>oc4j<span style="color: #000000; font-weight: bold;">/</span>j2ee<span style="color: #000000; font-weight: bold;">/</span>OC4J_DBConsole_cs5ora11g_csmlcc<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>server.xml</pre>
      </td>
    </tr>
  </table>
</div>

22. Set Oracle Environment

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># su - oracle</span>
<span style="color: #666666; font-style: italic;"># vim ~/.bash_profile</span>
<span style="color: #007800;">ORACLE_BASE</span>=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product
<span style="color: #007800;">ORACLE_SID</span>=cybersof
<span style="color: #007800;">ORACLE_HOME</span>=<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>oracle<span style="color: #000000; font-weight: bold;">/</span>product<span style="color: #000000; font-weight: bold;">/</span>11.1.0<span style="color: #000000; font-weight: bold;">/</span>db1
<span style="color: #7a0874; font-weight: bold;">export</span> ORACLE_BASE ORACLE_SID ORACLE_HOME
&nbsp;
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">LD_LIBRARY_PATH</span>=<span style="color: #007800;">$LD_LIBRARY_PATH</span>:<span style="color: #007800;">$ORACLE_HOME</span><span style="color: #000000; font-weight: bold;">/</span>lib</pre>
      </td>
    </tr>
  </table>
</div>

23. Shutdown and Startup of Oracle

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ . oraenv
<span style="color: #000000; font-weight: bold;">&lt;</span>enter your SID<span style="color: #000000; font-weight: bold;">&gt;</span>
&nbsp;
$ sqlplus <span style="color: #ff0000;">"/ as sysdba"</span>
SQL<span style="color: #000000; font-weight: bold;">&gt;</span> startup
SQL<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #7a0874; font-weight: bold;">exit</span>
&nbsp;
$ lsnrctl
LSNRCTL<span style="color: #000000; font-weight: bold;">&gt;</span> start
LSNRCTL<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #7a0874; font-weight: bold;">exit</span>
&nbsp;
$ <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #007800;">$ORACLE_HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin
.<span style="color: #000000; font-weight: bold;">/</span>emctl start dbconsole</pre>
      </td>
    </tr>
  </table>
</div>

**B. Creating Users**

Login to https://192.168.1.155:1158/em  
username:sysman  
password: [nickname+wifey]  
connect as &#8220;sysdba&#8221;

1. Creating admin user: 

[http://download.oracle.com/docs/cd/B28359\_01/server.111/b28301/admqs\_administer_users.htm#CHDBDBGI][2]

em > Setup > Administrators > Create

2. Create appdev user:  
em > Server > Roles

[http://download.oracle.com/docs/cd/B28359\_01/server.111/b28301/admqs\_administer_users.htm][3]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">USER</span> <span style="color: #ff0000;">"APPDEV"</span> PROFILE <span style="color: #ff0000;">"DEFAULT"</span> <span style="color: #993333; font-weight: bold;">IDENTIFIED</span> <span style="color: #993333; font-weight: bold;">BY</span> <span style="color: #ff0000;">"*******"</span> <span style="color: #993333; font-weight: bold;">DEFAULT</span> TABLESPACE <span style="color: #ff0000;">"USERS"</span> <span style="color: #993333; font-weight: bold;">TEMPORARY</span> TABLESPACE <span style="color: #ff0000;">"TEMP"</span> ACCOUNT <span style="color: #993333; font-weight: bold;">UNLOCK</span>
<span style="color: #993333; font-weight: bold;">GRANT</span> UNLIMITED TABLESPACE <span style="color: #993333; font-weight: bold;">TO</span> <span style="color: #ff0000;">"APPDEV"</span>;
<span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #ff0000;">"CONNECT"</span> <span style="color: #993333; font-weight: bold;">TO</span> <span style="color: #ff0000;">"APPDEV"</span>;
<span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #ff0000;">"RESOURCE"</span> <span style="color: #993333; font-weight: bold;">TO</span> <span style="color: #ff0000;">"APPDEV"</span>;</pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2008/09/picture-13.png" alt="Picture 1.png" border="0" width="360" height="833" />

**Part II. Installing Oracle10g on CentOS5**

1. Choose Advanced Installation&#8221;

<img src="/images/2008/09/picture-1.png" alt="Picture 1.png" border="0" width="600" height="507" />

2. If its just network prerequisite.. ignore it. It&#8217;s not a big deal.

<img src="/images/2008/09/picture-2.png" alt="Picture 2.png" border="0" width="600" height="510" />

3. ORACLE\_HOME: /opt/oracle/product/10.2.0/db\_1

<img src="/images/2008/09/picture-3.png" alt="Picture 3.png" border="0" width="600" height="509" />

4. ORACLE_SID: orcl, CHARSET: utf8

<img src="/images/2008/09/picture-4.png" alt="Picture 4.png" border="0" width="600" height="511" />

5. EM Installed&#8230;

<img src="/images/2008/09/picture-6.png" alt="Picture 6.png" border="0" width="551" height="374" />

6. ISQLPLUS

<img src="/images/2008/09/picture-7.png" alt="Picture 7.png" border="0" width="655" height="511" />

7. Run root.sh

<img src="/images/2008/09/picture-9.png" alt="Picture 9.png" border="0" width="553" height="390" />

output&#8230;

<img src="/images/2008/09/picture-8.png" alt="Picture 8.png" border="0" width="668" height="461" />

8. Other settings

<img src="/images/2008/09/picture-10.png" alt="Picture 10.png" border="0" width="649" height="507" />

9. Oracle Environment Variables

<img src="/images/2008/09/picture-12.png" alt="Picture 12.png" border="0" width="669" height="466" />

 [1]: /images/2008/08/installing-oracle-11g-on-centos-under-vmware-on-a-macbook.doc "Installing Oracle 11g on CentOS under VMWare on a Macbook.doc"
 [2]: http://download.oracle.com/docs/cd/B28359_01/server.111/b28301/admqs_administer_users.htm#CHDBDBGI
 [3]: http://download.oracle.com/docs/cd/B28359_01/server.111/b28301/admqs_administer_users.htm