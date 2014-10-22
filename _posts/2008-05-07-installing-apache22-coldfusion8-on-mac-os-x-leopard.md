---
title: Installing Apache2.2 ColdFusion8 on Mac OS X Leopard
author: rupert
layout: post
permalink: /2008/05/installing-apache22-coldfusion8-on-mac-os-x-leopard/
aktt_tweeted:
  - 1
categories:
  - osx
tags:
  - apache
  - cf
  - leopard
  - osx
---
Ok so this post is a bit late as I saw it in my drafts, but better late than never. I did these even before I wrote the [PostGres8.3/Postgis/pgRouting post.][1]

1. Apache  
reference: http://httpd.apache.org/

./configure &#8211;prefix=/usr/local/apache2 &#8211;with-m2m=prefork  
make  
sudo make install

&#8211; To start on boot, download [apache2startup.tar.gz][2] and extract to your /Library/StartupItems/

2. ColdFusion  
&#8211; run the installer as you would normally do in any windows/linux installation. I would suggest you put your installation in /opt and not ~ (home) because Leopard might wipe it out when upgrading to a higher OS version.  
&#8211; should automatically start on boot  
&#8211; bind coldfusion to apache

&#8211; Just in case you need to start it on boot, download [coldfusion8Startup.tar.gz][3]

3. Installing mod_python on Apache  
$ ./configure &#8211;with-apxs=/usr/local/apache2/bin/apxs  
$ make  
$ sudo make install

 [1]: /wordpress/index.php/2008/05/01/installing-postgres83-postgis133-pgrouting-on-macosx-leopard/
 [2]: http://www.gisnotes.com/images/2008/05/apache2startuptar.gz
 [3]: /images/2008/05/coldfusion8tar.gz