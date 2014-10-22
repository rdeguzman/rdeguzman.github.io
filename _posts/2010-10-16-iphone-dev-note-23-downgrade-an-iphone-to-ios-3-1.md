---
title: 'iPhone Dev Note #23: Downgrade an iPhone to iOS 3.1'
author: rupert
layout: post
permalink: /2010/10/iphone-dev-note-23-downgrade-an-iphone-to-ios-3-1/
categories:
  - iphone
tags:
  - iphone
---
One of the main reasons of downgrading the iOS version is for binary app testing. XCode3.2.3 allows you to compile with the latest iOS SDK using the **Base SDK** and set the targetiPhone version in the **iPhone OS Deployment Target**.

<img src="/images/2010/10/xcode-1.png" alt="xcode-1.png" border="0" width="808" height="115" />  
&#8230;  
<img src="/images/2010/10/xcode-2.png" alt="xcode-2.png" border="0" width="794" height="73" />

On the iPhone simulator, you could only test your application using 3.2 or 4.x. So, to test for devices > 3.1, we actually need a dedicated device for it. The iPhone3G that I passed on to my wife will suit the scenario.

Before doing anything, it is necessary to make backups.  
1. Currently the iPhone 3G is on 4.1. Let&#8217;s Backup/Sync. Just in case we need to go back to 4.1. (Note: you can&#8217;t use this backup when 3.1 is loaded, yeah it sucks, find out later on.)

2. Contacts. Sync the contacts with Google Contacts. From there, we could have them exported to CSV later on just in case something goes wrong.

**Below are the steps taken to downgrade iPhone 3G to iOS3.1:**

1. Download the firmware from <http://www.iclarified.com/entry/index.php?enid=750>. I downloaded [3.1.0 (3G): iPhone1,2\_3.1\_7C144_Restore.ipsw][1]

2. From XCode&#8217;s Organizer, choose the 3.1.0 and hit Restore.

3. During the restore process: &#8220;the baseband cannot be rolled back.&#8221;

<img src="/images/2010/10/baseband.gif" alt="baseband.gif" border="0" width="665" height="266" />

On the device, you will only see the Apple Logo and the progress bar to its full bar. Don&#8217;t panic.

<img src="/images/2010/10/device1.jpg" alt="device.jpg" border="0" width="480" height="640" />

4. Hit OK.

5. QUIT XCode. The device blacks out and you will see the connect to Itunes graphic.  
<img src="/images/2010/10/iTunes1.jpg" alt="iTunes.JPG" border="0" width="320" height="240" />

6. Install [iRecovery][2] and [libusb-package][3]. 

<img src="/images/2010/10/iRecovery-1.png" alt="iRecovery-1.png" border="0" width="404" height="595" />

***Now we need to tell the device to auto-boot again, save the settings. Enter the ff commands:***

<img src="/images/2010/10/iRecoverty-2.png" alt="iRecoverty-2.png" border="0" width="302" height="99" />

7. Disconnect the USB. Turn off the device (hold home+power button). Turn on device (power button). Open iTunes. We should be greeted with the Activation Screen.

<img src="/images/2010/10/activation.png" alt="activation.png" border="0" width="824" height="343" />

8. Restore from the last backup/sync doesn&#8217;t work.

<img src="/images/2010/10/backup-fail.png" alt="backup-fail.png" border="0" width="480" height="203" />

9. Restore contacts from Google Contacts or accept bashing from wife? I&#8217;ll go with the google contacts sync. :)

10. Check version from settings  
<img src="/images/2010/10/iphone-3.1.jpg" alt="iphone-3.1.jpg" border="0" width="320" height="480" />

References:  
<http://www.iclarified.com/entry/index.php?enid=750>  
<http://www.funkyspacemonkey.com/downgrade-iphone-os-40-313-mac-windows>

 [1]: http://appldnld.apple.com.edgesuite.net/content.info.apple.com/iPhone/061-6600.20090909.AwndZ/iPhone1,2_3.1_7C144_Restore.ipsw
 [2]: http://chronicdev.googlecode.com/files/iRecovery-Mac.zip
 [3]: http://www.ellert.se/PKGS/libusb-2009-09-10/10.6/libusb.pkg.tar.gz