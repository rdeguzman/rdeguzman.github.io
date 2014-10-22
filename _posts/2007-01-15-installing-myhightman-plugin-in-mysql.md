---
title: Installing myhightman plugin in MySQL
author: rupert
layout: post
permalink: /2007/01/installing-myhightman-plugin-in-mysql/
categories:
  - mysql
tags:
  - mysql
---
1. You need a fresh linux machine without mysql installed. You could follow the instructions from  
[here][1]

2. Download myhightman.tar.gz which I already compiled.  
[myhightman.tar.gz][2]

Extracting&#8230;  
<code lang="perl">&lt;br />
-rw-r--r--  1 root root       377 Jan 12 17:00 bash_profile&lt;br />
drwxr-xr-x  2 1001 wheel     4096 Sep 14 00:30 ft_hightman&lt;br />
-rw-r--r--  1 1001 wheel     4171 Sep 14 00:25 ft-hightman-M5-0.1.patch&lt;br />
-rw-r--r--  1 root root     17955 Jan 11 18:52 ft-hightman-M5-0.1.tgz&lt;br />
-rw-r--r--  1 root root      2051 Jan 12 17:00 install.sh&lt;br />
-rw-r--r--  1 root root       574 Jan 11 19:19 my.cnf&lt;br />
drwx--x--x  2 root root      4096 Jan 11 19:37 mysql&lt;br />
-rw-r--r--  1 root root  22265695 Jan 11 18:52 mysql-5.1.11-hi1.tgz&lt;br />
-rw-r--r--  1 1001 wheel     3450 Sep 14 00:31 README.hightman_parser&lt;br />
-rw-r--r--  1 root root         0 Jan 11 18:52 stopwords-gbk.txt&lt;br />
-rw-r--r--  1 root root         3 Jan 11 18:52 stopwords-utf8.txt&lt;br />
-rw-r--r--  1 root root   1466369 Jan 11 18:52 wordlist-gbk.txt&lt;br />
-rw-r--r--  1 root root   1907299 Jan 11 18:52 wordlist-utf8.txt&lt;br />
</code>

3. install.sh:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="perl" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#!/bin/sh</span>
mysql_install_dir<span style="color: #339933;">=</span><span style="color: #ff0000;">"./mysql-5.1.11-hi1"</span>
mysql_base_dir<span style="color: #339933;">=</span><span style="color: #ff0000;">"/usr/local/mysql"</span>
hightman_patch<span style="color: #339933;">=</span><span style="color: #ff0000;">"./ft-hightman-M5-0.1.patch"</span>
stopword<span style="color: #339933;">=</span><span style="color: #ff0000;">"stopwords-utf8.txt"</span>
wordlist<span style="color: #339933;">=</span><span style="color: #ff0000;">"wordlist-utf8.txt"</span>
data_dir<span style="color: #339933;">=</span><span style="color: #ff0000;">"/data/mysqldata"</span>
temp_dir<span style="color: #339933;">=</span><span style="color: #ff0000;">"/data/temp_dir"</span>
&nbsp;
echo <span style="color: #ff0000;">"removing previous installation"</span>
rm <span style="color: #339933;">-</span>rf <span style="color: #0000ff;">$mysql_install_dir</span>
&nbsp;
echo <span style="color: #ff0000;">"unpacking $mysql_install_dir"</span>
tar <span style="color: #339933;">-</span>zxvf <span style="color: #0000ff;">$mysql_install_dir</span><span style="color: #339933;">.</span>tar<span style="color: #339933;">.</span>gz
&nbsp;
echo <span style="color: #ff0000;">"copying ft_hightman to $mysql_install_dir/plugin"</span>
cp <span style="color: #339933;">-</span>Rf ft_hightman <span style="color: #0000ff;">$mysql_install_dir</span><span style="color: #339933;">/</span>plugin<span style="color: #339933;">/</span>
&nbsp;
echo <span style="color: #ff0000;">"copying $hightman_patch to $mysql_install_dir"</span>
cp <span style="color: #0000ff;">$hightman_patch</span> <span style="color: #0000ff;">$mysql_install_dir</span><span style="color: #339933;">/</span>
&nbsp;
echo <span style="color: #ff0000;">"patching please answer y to all..."</span>
cd <span style="color: #0000ff;">$mysql_install_dir</span>
patch <span style="color: #339933;">-</span>p1 <span style="color: #339933;">&</span><span style="color: #b1b100;">lt</span><span style="color: #339933;">;</span> <span style="color: #0000ff;">$hightman_patch</span>
&nbsp;
echo <span style="color: #ff0000;">"patching again..."</span>
patch <span style="color: #339933;">-</span>p1 <span style="color: #339933;">&</span><span style="color: #b1b100;">lt</span><span style="color: #339933;">;</span> <span style="color: #0000ff;">$hightman_patch</span>
&nbsp;
echo <span style="color: #ff0000;">"processing......."</span>
&nbsp;
echo <span style="color: #ff0000;">"aclocal......."</span>
aclocal
&nbsp;
echo <span style="color: #ff0000;">"automake......."</span>
automake
&nbsp;
echo <span style="color: #ff0000;">"autoconf......."</span>
autoconf
&nbsp;
echo <span style="color: #ff0000;">"configuring..."</span>
<span style="color: #339933;">./</span>configure <span style="color: #339933;">--</span>prefix<span style="color: #339933;">=</span><span style="color: #0000ff;">$mysql_base_dir</span> <span style="color: #339933;">--</span>with<span style="color: #339933;">-</span>charset<span style="color: #339933;">=</span>utf8 <span style="color: #339933;">--</span>with<span style="color: #339933;">-</span>extra<span style="color: #339933;">-</span>charsets<span style="color: #339933;">=</span>all <span style="color: #339933;">--</span>with<span style="color: #339933;">-</span>plugins<span style="color: #339933;">=</span>fthightman
&nbsp;
echo <span style="color: #ff0000;">"make..."</span>
make
&nbsp;
echo <span style="color: #ff0000;">"make install..."</span>
make install
&nbsp;
echo <span style="color: #ff0000;">"copying wordlist and stoplist to $mysql_base_dir/share/mysql"</span>
cd <span style="color: #339933;">..</span>
cp <span style="color: #339933;">-</span>Rf <span style="color: #0000ff;">$stopword</span> <span style="color: #0000ff;">$mysql_base_dir</span><span style="color: #339933;">/</span>share<span style="color: #339933;">/</span>mysql<span style="color: #339933;">/</span>
cp <span style="color: #339933;">-</span>Rf <span style="color: #0000ff;">$wordlist</span> <span style="color: #0000ff;">$mysql_base_dir</span><span style="color: #339933;">/</span>share<span style="color: #339933;">/</span>mysql<span style="color: #339933;">/</span>
&nbsp;
echo <span style="color: #ff0000;">"making mysql datadir on $data_dir"</span>
rm <span style="color: #339933;">-</span>rf <span style="color: #0000ff;">$data_dir</span>
rm <span style="color: #339933;">-</span>rf <span style="color: #0000ff;">$temp_dir</span>
<span style="color: #000066;">mkdir</span> <span style="color: #339933;">-</span>p <span style="color: #0000ff;">$data_dir</span>
<span style="color: #000066;">mkdir</span> <span style="color: #339933;">-</span>p <span style="color: #0000ff;">$temp_dir</span>
&nbsp;
echo <span style="color: #ff0000;">"copying my.cnf default file to /etc"</span>
cp <span style="color: #339933;">-</span>Rf <span style="color: #b1b100;">my</span><span style="color: #339933;">.</span>cnf <span style="color: #339933;">/</span>etc<span style="color: #339933;">/</span><span style="color: #b1b100;">my</span><span style="color: #339933;">.</span>cnf
&nbsp;
echo <span style="color: #ff0000;">"copying custom mysql database to $data_dir"</span>
cp <span style="color: #339933;">-</span>Rf mysql <span style="color: #0000ff;">$data_dir</span>
&nbsp;
echo <span style="color: #ff0000;">"changing ownership..."</span>
useradd mysql
useradd <span style="color: #339933;">-</span>g mysql mysql
<span style="color: #000066;">chown</span> <span style="color: #339933;">-</span>Rf mysql<span style="color: #339933;">:</span>mysql <span style="color: #0000ff;">$data_dir</span>
<span style="color: #000066;">chown</span> <span style="color: #339933;">-</span>Rf mysql<span style="color: #339933;">:</span>mysql <span style="color: #0000ff;">$temp_dir</span>
&nbsp;
echo <span style="color: #ff0000;">"linking myhightman.so..."</span>
ln <span style="color: #339933;">-</span><span style="color: #000066;">s</span> <span style="color: #339933;">/</span>usr<span style="color: #339933;">/</span><span style="color: #000066;">local</span><span style="color: #339933;">/</span>mysql<span style="color: #339933;">/</span>lib<span style="color: #339933;">/</span>mysql<span style="color: #339933;">/</span>myhightman<span style="color: #339933;">.</span>so <span style="color: #339933;">/</span>usr<span style="color: #339933;">/</span>lib<span style="color: #339933;">/</span>myhightman<span style="color: #339933;">.</span>so
&nbsp;
echo <span style="color: #ff0000;">"creating startup scripts..."</span>
cp <span style="color: #339933;">-</span>rf <span style="color: #0000ff;">$mysql_base_dir</span><span style="color: #339933;">/</span>share<span style="color: #339933;">/</span>mysql<span style="color: #339933;">/</span>mysql<span style="color: #339933;">.</span>server <span style="color: #339933;">/</span>etc<span style="color: #339933;">/</span>init<span style="color: #339933;">.</span>d<span style="color: #339933;">/</span>mysql
<span style="color: #000066;">chmod</span> <span style="color: #339933;">+</span>x <span style="color: #339933;">/</span>etc<span style="color: #339933;">/</span>init<span style="color: #339933;">.</span>d<span style="color: #339933;">/</span>mysql
<span style="color: #339933;">/</span>sbin<span style="color: #339933;">/</span>chkconfig <span style="color: #339933;">--</span>add mysql
<span style="color: #339933;">/</span>sbin<span style="color: #339933;">/</span>chkconfig <span style="color: #339933;">--</span>level <span style="color: #cc66cc;">345</span> mysql on
<span style="color: #339933;">/</span>etc<span style="color: #339933;">/</span>init<span style="color: #339933;">.</span>d<span style="color: #339933;">/</span>mysql start
&nbsp;
echo <span style="color: #ff0000;">"YOU HAVE SUCCESSFULLY INSTALLED mysql5 with HIGHTMAN. please add this to your path..."</span>
echo <span style="color: #ff0000;">"export PATH=$PATH:$mysql_base_dir/bin"</span></pre>
      </td>
    </tr>
  </table>
</div>

4. CREATE FUNCTION segment RETURNS STRING SONAME &#8216;myhightman.so';

5. SET NAMES &#8216;utf8&#8242;;

 [1]: /wordpress/?p=17
 [2]: http://222.128.19.19/installers/mysql/5/myhightman.tar.gz