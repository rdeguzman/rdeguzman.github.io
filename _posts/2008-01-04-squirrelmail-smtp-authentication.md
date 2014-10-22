---
title: SquirrelMail SMTP Authentication
author: rupert
layout: post
permalink: /2008/01/squirrelmail-smtp-authentication/
categories:
  - linux
tags:
  - centos
  - linux
  - qmail
---
Just a quick note to myself&#8230; A co-worker just notified me that they cannot send email using the web interface&#8211;squirrelmail.

`squirrelmail Server replied: 553 sorry, that domain isn't in my list of allowed rcpthosts (#5.5.3 - chkuser)`

[This qmailrocks forum thread gives a quick workaround.][1] Just set &#8220;SMTP AUTHENTICATION&#8221; to login as noted below.

`<br />
/usr/share/squirrelmail/config/config.php<br />
$no_list_for_subscribe = false;<br />
$smtp_auth_mech = 'login';<br />
$imap_auth_mech = 'login';<br />
$use_imap_tls = false;<br />
`

 [1]: http://forum.qmailrocks.org/archive/index.php/t-2547.html