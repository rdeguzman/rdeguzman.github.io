---
title: Too many authentication failures for user
author: rupert
layout: post
permalink: /2007/11/too-many-authentication-failures-for-user/
aktt_tweeted:
  - 1
categories:
  - linux
tags:
  - linux
  - ssh
---
Found this finally.. <http://netthink.com/archives/191>. On a quick note, edit *ssh_config* not *sshd_config*.

You could also try debugging ssh while connecting, through &#8220;-v&#8221; switch. For example:

`<br />
ssh -v rupert@192.168.1.12<br />
`