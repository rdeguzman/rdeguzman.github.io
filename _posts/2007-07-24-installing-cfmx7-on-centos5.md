---
title: Installing CFMX7 on CentOS5
author: rupert
layout: post
permalink: /2007/07/installing-cfmx7-on-centos5/
categories:
  - coldfusion
tags:
  - centos
  - cf
  - coldfusion
---
1. You need to install libXpm beforehand to save time in the Graphing Service Error Problems.

`<br />
rpm -ivh libXpm-3.5.5-3.i386.rpm<br />
`

2. Modify the installer.  
cat coldfusion-702-linux.bin.backup | sed &#8220;s/export LD\_ASSUME/#xport LD\_ASSUME/&#8221; > coldfusion-702-linux.bin

**Reference:** <http://www.billmitchell.org/coldfusion/centos5/mx7_apache.php>

POST-INSTALL

1. Disable Verity search if you don&#8217;t use it.  
`<br />
chkconfig cfmx7search off<br />
`