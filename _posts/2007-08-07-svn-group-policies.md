---
title: SVN Group Policies
author: rupert
layout: post
permalink: /2007/08/svn-group-policies/
categories:
  - linux
tags:
  - svn
---
httpd.conf:  
++++++++++++++++++++++++++++++++++++++  
<location>  
DAV svn  
SVNPath /repos</location>

AuthzSVNAccessFile /repos/svn-authorization-file

AuthType Basic  
AuthName &#8220;Subversion repository&#8221;  
AuthUserFile /repos/svn-auth-file  
Require valid-user  
/repos/svn-authorization-file:  
++++++++++++++++++++++++++++++++++++++  
[repos:/]  
rupert=rw  
andrew=rw  
tony=rw

[repos:/web/cybersoftjs/trunk]  
anonymous=r

[repos:/web/poimgr]  
jake=r