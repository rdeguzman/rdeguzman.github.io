---
title: Debian, Centos, Ubuntu
author: rupert
layout: post
permalink: /2007/07/debian-centos-ubuntu/
categories:
  - linux
tags:
  - centos
  - debian
  - linux
  - ubuntu
---
I didn&#8217;t have much time blogging for the past week. But since July 18, I am running Debian, Centos and Ubuntu on my desktop.

**1. Install CentOS 5. **

2. Manually partition as follows:  
`<br />
Device Boot      Start         End      Blocks   Id  System<br />
/dev/sda1   *           1          13      104391   83  Linux              (boot)<br />
/dev/sda2              14        3837    30716280   83  Linux            (/)<br />
/dev/sda3            3838        4090     2032222+  82  Linux swap<br />
```

3. Put bootloader grub on mbr.

4. Reboot.

**5. Install Ubuntu**

6. Manually partition.  
`<br />
/dev/sda4            4091       19457   123435427+   5  Extended<br />
/dev/sda5           19446       19457       96390   83  Linux<br />
/dev/sda6           19204       19444     1935801   82  Linux swap / Solaris<br />
/dev/sda7           15556       19202    29294496   83  Linux<br />
`

7. Install bootloader on /boot of /dev/sda4

8. Reboot.  
**  
9. Install Debian 7**

10. Manually partition as follows:  
`<br />
/dev/sda8            4091        4102       96327   83  Linux<br />
/dev/sda9            4103        4343     1935801   82  Linux swap / Solaris<br />
/dev/sda10           4344        7990    29294496   83  Linux<br />
`

11. Reboot.

Hurray! Key point here is to install the bootloader on mbr first then, installing successive loaders in /boot of other distros.