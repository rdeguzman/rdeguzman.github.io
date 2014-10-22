---
title: homebrew + php
author: rupert
layout: post
permalink: /2011/11/homebrew-php/
categories:
  - Uncategorized
tags:
  - homebrew
  - php
---
**Update**  
This is now been depracated and used as reference only. I opted to install php via source [here][1]

**1. Cleanup existing PHP**  
So by default, OSX Leopard/Snow Leopard?, comes with apache2 and php installed.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">mv</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>include<span style="color: #000000; font-weight: bold;">/</span>php <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>include<span style="color: #000000; font-weight: bold;">/</span>php.old
<span style="color: #c20cb9; font-weight: bold;">mv</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>php <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>php.old</pre>
      </td>
    </tr>
  </table>
</div>

2. Install PHP

<http://notfornoone.com/2010/07/install-php53-homebrew-snow-leopard/>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">~<span style="color: #000000; font-weight: bold;">/</span>Desktop<span style="color: #000000; font-weight: bold;">%</span> brew <span style="color: #c20cb9; font-weight: bold;">install</span> php <span style="color: #660033;">--with-apache</span> <span style="color: #660033;">--with-mysql</span> <span style="color: #660033;">--with-pgsql</span>
==<span style="color: #000000; font-weight: bold;">&gt;</span> Installing php dependency: jpeg
==<span style="color: #000000; font-weight: bold;">&gt;</span> Installing php dependency: mcrypt
==<span style="color: #000000; font-weight: bold;">&gt;</span> Installing php dependency: <span style="color: #c20cb9; font-weight: bold;">gettext</span>
==<span style="color: #000000; font-weight: bold;">&gt;</span> Installing php
....
==<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #c20cb9; font-weight: bold;">cp</span> .<span style="color: #000000; font-weight: bold;">/</span>php.ini-production <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>Cellar<span style="color: #000000; font-weight: bold;">/</span>php<span style="color: #000000; font-weight: bold;">/</span>5.3.8<span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>php.ini
==<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #000000;">644</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>Cellar<span style="color: #000000; font-weight: bold;">/</span>php<span style="color: #000000; font-weight: bold;">/</span>5.3.8<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>php<span style="color: #000000; font-weight: bold;">/</span>.lock
==<span style="color: #000000; font-weight: bold;">&gt;</span> Caveats
   To <span style="color: #7a0874; font-weight: bold;">enable</span> PHP <span style="color: #000000; font-weight: bold;">in</span> Apache add the following to httpd.conf and restart Apache:
    LoadModule php5_module    <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>Cellar<span style="color: #000000; font-weight: bold;">/</span>php<span style="color: #000000; font-weight: bold;">/</span>5.3.8<span style="color: #000000; font-weight: bold;">/</span>libexec<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>libphp5.so
&nbsp;
    The php.ini <span style="color: #c20cb9; font-weight: bold;">file</span> can be found in:
      <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>Cellar<span style="color: #000000; font-weight: bold;">/</span>php<span style="color: #000000; font-weight: bold;">/</span>5.3.8<span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>php.ini
brew <span style="color: #c20cb9; font-weight: bold;">install</span> php <span style="color: #660033;">--with-apache</span> <span style="color: #660033;">--with-mysql</span> <span style="color: #660033;">--with-pgsql</span> 452.56s user 272.47s system <span style="color: #000000;">126</span><span style="color: #000000; font-weight: bold;">%</span> cpu <span style="color: #000000;">9</span>:<span style="color: #000000;">31.75</span> total</pre>
      </td>
    </tr>
  </table>
</div>

The most important here is the compiled libphp5.so which we will hook into apache2.

**3. Hookup Apache2 to libphp5**  
Depending on your installation, edit httpd.conf and make sure you have this line

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">LoadModule php5_module    /usr/local/Cellar/php/5.3.8/libexec/apache2/libphp5.so</pre>
      </td>
    </tr>
  </table>
</div>

**4. Test**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% php -m #List all php modules
mysql
mysqli
pdo_mysql
pdo_pgsql
pgsql
/usr/local/bin% l php #brew makes the symlinks
lrwxr-xr-x  1 rupert  admin    27B 14 Nov 14:42 php@ -&gt; ../Cellar/php/5.3.8/bin/php</pre>
      </td>
    </tr>
  </table>
</div>

Well if you have a wordpress site, you can test if the whole thing works.

**5. Restart Apache**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>StartupItems<span style="color: #000000; font-weight: bold;">/</span>Apache2<span style="color: #000000; font-weight: bold;">/</span>Apache2 restart</pre>
      </td>
    </tr>
  </table>
</div>

**UPDATE: Dec 19, 2011**  
Maintaining php installations via homebrew is such a pain. I reverted back via source.  
1. Download php from source  
2. Configure

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">./configure --prefix=/usr/local/php5.3.8 \
  --mandir=/usr/share/man \
  --infodir=/usr/share/info \
  --sysconfdir=/etc \
  --with-config-file-path=/etc \
  --with-zlib \
  --with-zlib-dir=/usr \
  --with-openssl \
  --without-iconv \
  --enable-exif \
  --enable-ftp \
  --enable-mbstring \
  --enable-mbregex \
  --enable-sockets \
  --with-mysql=/usr/local/mysql \
  --with-pdo-mysql=/usr/local/mysql \
  --with-mysqli=/usr/local/mysql/bin/mysql_config \
  --with-apxs2=/usr/local/apache2/bin/apxs</pre>
      </td>
    </tr>
  </table>
</div>

3. Make and Make Install

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~/Desktop/php-5.3.8% sudo make install
Password:
Installing PHP SAPI module:       apache2handler
/usr/local/apache2.2.14/build/instdso.sh SH_LIBTOOL='/usr/local/apache2.2.14/build/libtool' libs/libphp5.so /usr/local/apache2.2.14/modules
/usr/local/apache2.2.14/build/libtool --mode=install cp libs/libphp5.so /usr/local/apache2.2.14/modules/
cp libs/libphp5.so /usr/local/apache2.2.14/modules/libphp5.so
Warning!  dlname not found in /usr/local/apache2.2.14/modules/libphp5.so.
Assuming installing a .so rather than a libtool archive.
chmod 755 /usr/local/apache2.2.14/modules/libphp5.so
[activating module `php5' in /usr/local/apache2.2.14/conf/httpd.conf]
Installing PHP CLI binary:        /usr/local/php5.3.8/bin/
Installing PHP CLI man page:      /usr/share/man/man1/
Installing build environment:     /usr/local/php5.3.8/lib/php/build/
Installing header files:          /usr/local/php5.3.8/include/php/
Installing helper programs:       /usr/local/php5.3.8/bin/
  program: phpize
  program: php-config
Installing man pages:             /usr/share/man/man1/
  page: phpize.1
  page: php-config.1
Installing PEAR environment:      /usr/local/php5.3.8/lib/php/
[PEAR] Archive_Tar    - installed: 1.3.7
[PEAR] Console_Getopt - installed: 1.3.0
[PEAR] Structures_Graph- installed: 1.0.4
[PEAR] XML_Util: upgrade to a newer version (1.2.1 is not newer than 1.2.1)
[PEAR] PEAR           - installed: 1.9.4
Wrote PEAR system config file at: /etc/pear.conf
You may want to add: /usr/local/php5.3.8/lib/php to your php.ini include_path
/Users/rupert/Desktop/php-5.3.8/build/shtool install -c ext/phar/phar.phar /usr/local/php5.3.8/bin
ln -s -f /usr/local/php5.3.8/bin/phar.phar /usr/local/php5.3.8/bin/phar
Installing PDO headers:          /usr/local/php5.3.8/include/php/ext/pdo/
sudo make install  6.84s user 11.50s system 80% cpu 22.843 total</pre>
      </td>
    </tr>
  </table>
</div>

 [1]: /wordpress/2011/12/installing-php-on-osx/