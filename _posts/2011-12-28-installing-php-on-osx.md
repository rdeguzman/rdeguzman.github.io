---
title: Installing PHP on OSX
author: rupert
layout: post
permalink: /2011/12/installing-php-on-osx/
categories:
  - Uncategorized
tags:
  - apache
  - php
---
I need wordpress + nominatim running on OSX and since it uses php&#8230;

<http://www.php.net/manual/en/install.unix.apache2.php>

**1. Installation**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">./configure --prefix=/usr/local/php-5.3.8 --with-mysql --with-pgsql=/usr/local/postgresql --with-apxs2=/usr/local/apache2/bin/apxs
make
sudo make install</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">rupert-mbp~/Desktop/php-5.3.8% sudo make install
Password:
Installing PHP SAPI module:       apache2handler
/usr/local/apache2.2.14/build/instdso.sh SH_LIBTOOL='/usr/local/apache2.2.14/build/libtool' libs/libphp5.so /usr/local/apache2.2.14/modules
/usr/local/apache2.2.14/build/libtool --mode=install cp libs/libphp5.so /usr/local/apache2.2.14/modules/
cp libs/libphp5.so /usr/local/apache2.2.14/modules/libphp5.so
Warning!  dlname not found in /usr/local/apache2.2.14/modules/libphp5.so.
Assuming installing a .so rather than a libtool archive.
chmod 755 /usr/local/apache2.2.14/modules/libphp5.so
[activating module `php5' in /usr/local/apache2.2.14/conf/httpd.conf]
Installing PHP CLI binary:        /usr/local/php-5.3.8/bin/
Installing PHP CLI man page:      /usr/local/php-5.3.8/man/man1/
Installing build environment:     /usr/local/php-5.3.8/lib/php/build/
Installing header files:          /usr/local/php-5.3.8/include/php/
Installing helper programs:       /usr/local/php-5.3.8/bin/
  program: phpize
  program: php-config
Installing man pages:             /usr/local/php-5.3.8/man/man1/
  page: phpize.1
  page: php-config.1
Installing PEAR environment:      /usr/local/php-5.3.8/lib/php/
[PEAR] Archive_Tar    - installed: 1.3.7
[PEAR] Console_Getopt - installed: 1.3.0
[PEAR] Structures_Graph- installed: 1.0.4
[PEAR] XML_Util       - installed: 1.2.1
[PEAR] PEAR           - installed: 1.9.4
Wrote PEAR system config file at: /usr/local/php-5.3.8/etc/pear.conf
You may want to add: /usr/local/php-5.3.8/lib/php to your php.ini include_path
/Users/rupert/Desktop/php-5.3.8/build/shtool install -c ext/phar/phar.phar /usr/local/php-5.3.8/bin
ln -s -f /usr/local/php-5.3.8/bin/phar.phar /usr/local/php-5.3.8/bin/phar
Installing PDO headers:          /usr/local/php-5.3.8/include/php/ext/pdo/
sudo make install  5.52s user 9.35s system 79% cpu 18.819 total</pre>
      </td>
    </tr>
  </table>
</div>

**2. Configuration**  
Specify php.ini per virtualhost  
<VirtualHost 127.0.0.1:80>  
PHPINIDir /etc  
</VirtualHost>