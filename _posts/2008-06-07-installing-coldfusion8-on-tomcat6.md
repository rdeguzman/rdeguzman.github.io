---
title: Installing ColdFusion8 on Tomcat6
author: rupert
layout: post
permalink: /2008/06/installing-coldfusion8-on-tomcat6/
aktt_tweeted:
  - 1
categories:
  - tomcat
tags:
  - cf
  - tomcat
---
**Tomcat Install:**  
<http://neilang.com/entries/how-to-install-tomcat-on-mac-os-x/>

1. download tomcat http://tomcat.apache.org/

2. By default, MacOSX already has java in /Library/Java/Home

3. extract apache-tomcat-6.0.16.tar.gz

4. mv apache-tomcat-6.0.16 /usr/local/tomcat

5. cd /Library/StartupItems

6. sudo mkdir Tomcat

7. sudo vim tomcat

**Deploying coldfusion as a war  
[<span style="font-weight: normal;">http://www.adobe.com/support/coldfusion/j2ee/cfmx7j2ee_tomcat_deploy.html</span>][1]**

8. When prompeted: Select J2EE configuration/WAR file

9. Copy cfusion.war to /usr/local/tomcat/webapps/

It should be automatically deployed, if not, then stop start tomcat

10. move tools.jar tools.old

11. Download the jce security and replace the files from your jdk directory

 [1]: http://www.adobe.com/support/coldfusion/j2ee/cfmx7j2ee_tomcat_deploy.html