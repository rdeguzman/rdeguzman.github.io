---
title: Dual Booting WindowsXP+CentOS4.4 on Compaq Presario V3000T
author: rupert
layout: post
permalink: /2007/01/compaq-presario-v3000t/
categories:
  - linux
tags:
  - linux
---
I recently bought a Presario V3009T for Y6800=$871=P42,717. Specs are below:  
&#8211; Core Duo T2050 1.60GHz  
&#8211; 60 GB Hard Disk  
&#8211; 512 MB PC4000 (I think) 533 MHz (tried installing a 400 MHZ 512 MB.. got a dreaded double beep.. means..it didnt worked obviously)  
&#8211; Video: Intel 945GM Express Chipset  
&#8211; Network:  
LAN: Intel PRO/100 VE Network Connection  
WIRELESS: Intel PRO/Wireless 3945ABG Network Connection

1. Chinese Windows XP Home was installed so I have to reinstall an English Version. 

2. On Boot, press F10, Disable SATA Support.

3. Install Windows XP SlipStream. Leave at least 10GB partition for Linux. No need for QuickPlay, don&#8217;t create a 1 GB partition. Updated the drivers, update the chipset first, HDD, Network, etc.. Enable SATA Support. Install other drivers as needed.

4. To patch WGA, use WPatcherP5575987.zip. Follow steps on [http://www.mydigitallife.info/2006/12/03/permanent-method-to-crack-wga-and-patch-windows-xp-inc-mce-or-2003-as-genuine][1]

5. Create a restore point just in case any mishap happens. I named the restore point &#8220;FULLY FUNCTIONAL&#8221; on Jan 13, 2007.

6. Install CentOS4.4. Create three partitions /boot, swap, /. 

7. Reboot. CentOS was installed successfully, however, audio was not detected. You would only get &#8220;Initializing hardware&#8230; network storage.. &#8221; then system hangs..

8. Reboot and insert the CentOS4.4 Installer. Run &#8220;linux rescue&#8221; from the prompt. 

9. Edit /etc/rc.d/sysinit to comment out AUDIO. Disable kudzu from startup &#8220;/etc/init.d/&#8221;.  
#chkconfig kudzu off

10. Reboot.

I still need to get the adsl, wireless and usb-optical mouse working on CentOS. If this causes too much pain, might as well install FC5.

 [1]: http://www.mydigitallife.info/2006/12/03/permanent-method-to-crack-wga-and-patch-windows-xp-inc-mce-or-2003-as-<br />
genuine