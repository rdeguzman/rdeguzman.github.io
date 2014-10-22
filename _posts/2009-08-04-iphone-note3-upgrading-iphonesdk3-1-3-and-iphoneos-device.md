---
title: 'iPhone Note #4: Upgrading iPhoneSDK3.1.3 and iPhoneOS Device'
author: rupert
layout: post
permalink: /2009/08/iphone-note3-upgrading-iphonesdk3-1-3-and-iphoneos-device/
delicious:
  - 's:78:"a:3:{s:5:"count";s:1:"0";s:9:"post_tags";s:0:"";s:4:"time";s:10:"1249425273";}";'
reddit:
  - 's:55:"a:2:{s:5:"count";s:1:"0";s:4:"time";s:10:"1249425274";}";'
categories:
  - iphone
tags:
  - iphone
---
Apple has been releasing incremental betas in a short span of time. The ff steps would help me in documenting how to upgrade the SDK and iPhoneOS.

**Part 1: iPhone SDK**

1. For upgrading, we are going to choose &#8220;Custom install&#8221; into a directory &#8220;XCode3.1.3&#8243; which I installed a few weeks ago. If you don&#8217;t change this, it will be installed in a default directory &#8220;Developer&#8221;.

<img src="/images/2009/08/picture-21.png" alt="Picture 2.png" border="0" width="322" height="227" />

<!--more-->

**Part 2: iPhone OS**

1. Sync in iTunes. I deleted all videos and music so it would sync and backup faster. Tick the checkbox:

&#8211; &#8220;Sync only checked songs and videos&#8221;

&#8211; &#8220;Manually manage music and videos&#8221;

2. To backup, right click on &#8220;rupert&#8217;s iPhone&#8221; on the left panel -> Backup.

3. If you want to remove previous backups:

iTunes -> Preferences -> Devices

4. Eject the device and we will handle the restore from Organizer.

5. Unpack the ipsw and transfer it to your desktop.

<img src="/images/2009/08/picture-51.png" alt="Picture 5.png" border="0" width="300" height="175" />

6. XCode -> Organizer -> Software Images. Drag the ipsw from your desktop to Organizer. You should see your new OS Version listed.

7. Plug the iPhone device. Organizer detects it. Restore.

<img src="/images/2009/08/picture-71.png" alt="Picture 5.png" border="0" width="500" height="150" />

8. &#8220;Restoring this iPhone will erase all of its data. Are you sure ou want to continue?&#8221; &#8211; No worries, we made a backup earlier.

9. Messages from Organizer:  
Restoring image..  
Checking Filesystems..  
Mounting Filesystem..  
Flashing NOR..  
Updating baseband..  
The device is not currently connected. (DO NOT PANIC)

<img src="/images/2009/08/photo.jpg" alt="photo.jpg" border="0" width="200" height="267" />

10. Sync it in iTunes. Congratulations! Your iPhone is activated.

11. Restore from your backup. Take a break.

12. Sync and Restore is done.

<img src="/images/2009/08/picture-3.png" alt="Picture-3.png" border="0" width="492" height="176" />

13. Afterwards iTunes detect its as usual, eject it from the &#8220;Devices&#8221; in the left panel. We will use XCode instead:

Xcode -> Organizer -> Devices

13. Notice the gray ball beside it? Click &#8220;Use for Development&#8221; and it would change from yellow to green. Your provisioning profile should still be there.

14. Test by deploying an application. Ensure that you choose &#8220;iPhone Device 3.1&#8243; from the Active SDK.