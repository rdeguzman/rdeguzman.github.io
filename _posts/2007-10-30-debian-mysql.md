---
title: Debian MySQL
author: rupert
layout: post
permalink: /2007/10/debian-mysql/
categories:
  - debian
  - mysql
tags:
  - debian
  - mysql
---
A default install of mysql on debian would have bind-address set to 127.0.0.1. This is why you can&#8217;t accept remote connections to your mysql. In order to establish remote connections to mysql on debian servers, please comment the bind-address as shown below.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;"> 42 language    = /usr/share/mysql/english
 43 skip-external-locking
 44 #
 45 # Instead of skip-networking the default is now to listen only on
 46 # localhost which is more compatible and is not less secure.
 47 #bind-address = 127.0.0.1
 48 #</pre>
      </td>
    </tr>
  </table>
</div>