---
title: Firefox crashes on my Mac caused by Java Applet VM
author: rupert
layout: post
permalink: /2008/12/firefox-crashes-on-my-mac-caused-by-java-applet-vm/
aktt_tweeted:
  - 1
categories:
  - mac
tags:
  - mac
---
After manually updating to Java MacOSX10.5 Update 2 two months ago, I noticed something weird with my Firefox. At first, I ignored it, &#8220;heh must be a screwed-up page Im trying to open&#8230;&#8221; But lately, I noticed that most of the pages I am opening with Java applets crashes consistently. So here is the culprit, try to delete java caches if there are any&#8230;

Trying to figure out which version of the java applet being used by FF  
<img src="/images/2008/12/picture-12.png" alt="Picture 1.png" border="0" width="616" height="523" />

<img src="/images/2008/12/picture-21.png" alt="Picture 2.png" border="0" width="524" height="380" />

Deleting the cache.. Go to  
/Application/Utilities/Java/ and launch Java Preferences.app or you could seach for &#8220;java preferences&#8221; in spotlight.

<img src="/images/2008/12/picture-3.png" alt="Picture 3.png" border="0" width="673" height="457" />

If the problem still persist, I bet we can trim down which java versions to use&#8230;

<img src="/images/2008/12/picture-4.png" alt="Picture 4.png" border="0" width="675" height="456" />