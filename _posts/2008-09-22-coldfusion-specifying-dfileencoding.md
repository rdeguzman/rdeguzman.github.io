---
title: 'ColdFusion: Specifying -Dfile.encoding'
author: rupert
layout: post
permalink: /2008/09/coldfusion-specifying-dfileencoding/
aktt_tweeted:
  - 1
categories:
  - coldfusion
tags:
  - cf
  - coldfusion
  - SMS
---
I have a small project to use a jar file for sending/receiving SMS in chinese. I could send the SMS fine from Eclipse, so I thought creating a Java Class wrapper to be used by ColdFusion so it can be called from HTTP could do the trick.

After a few minutes, I have the class up and running and fully tested within Eclipse. 

1. I dropped the class, dll and its jar in C:\ColdFusion8\lib. Take note its a Windows box, since the Jar is using a dll to talk to the Wavecom modem using AT commands.

GSMModem.jar  
GSMMultiPort.dll  
GSMMultiPortForJ.dll

2. The crux was to specify the file.encoding for Java as an argument from the CFIDE Administrator. After specifying GB18030, a quick restart.. voila.. 

<pre>Java Version  	 1.6.0_01  
Java Vendor 	Sun Microsystems Inc.  
Java Vendor URL 	http://java.sun.com/  
Java Home 	C:\ColdFusion8\runtime\jre  
Java File Encoding 	GB18030  
Java Default Locale 	en_US  
File Separator 	\  
Path Separator 	;  
Line Separator 	Chr(13)  
User Name 	SYSTEM  
User Home 	C:\   
</pre>

Files:  
[CFSend.java][1]

 [1]: /images/2008/09/cfsendjava.txt "CFSend.java.txt"