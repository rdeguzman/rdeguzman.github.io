---
title: Debian Command CheatSheet
author: rupert
layout: post
permalink: /2008/03/debian-command-cheatsheet/
categories:
  - debian
  - linux
tags:
  - debian
---
If you need to setup/install Debian. Please follow this [post.][1]

**1. Removing a service from startup**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;"># update-rc.d -f samba remove</pre>
      </td>
    </tr>
  </table>
</div>

**2. Installing a service on boot**  
update-rc.d myServiceName start 80 2 3 4 5 . stop 15 0 1 6

**3. Specifying Debian Sources**  
#vim /etc/apt/sources.list  
#SID:  
deb http://debian.cn99.com/debian unstable main  
deb-src http://debian.cn99.com/debian unstable main

#LENNY:  
#deb http://debian.cn99.com/debian testing main  
#deb-src http://debian.cn99.com/debian testing main

#ETCH  
#deb http://debian.cn99.com/debian etch main  
#deb-src http://debian.cn99.com/debian etch main

**4. Searching for a package from the repository**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">apt-cache search [package name]</pre>
      </td>
    </tr>
  </table>
</div>

**5. Installing a package**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">apt-get install [package name]</pre>
      </td>
    </tr>
  </table>
</div>

**6. Purging an installed/configured package**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">aptitude purge [package name]</pre>
      </td>
    </tr>
  </table>
</div>

**7. Upgrade a debian distro**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">apt-get dist-upgrade</pre>
      </td>
    </tr>
  </table>
</div>

 [1]: /wordpress/index.php/2007/07/31/first-debian-howto/