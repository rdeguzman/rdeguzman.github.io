---
title: MBRFix – Removing Linux from Dual Boot
author: rupert
layout: post
permalink: /2007/03/mbrfix-removing-linux-from-dual-boot/
categories:
  - linux
tags:
  - linux
---
You have a dual boot notebook with Linux + XP, no floppy and just lazy using the Windows XP CD to do a fixmbr. Use the &#8216;mbrfix&#8217; from <http://www.ambience.sk/fdisk-master-boot-record-windows-linux-lilo-fixmbr.php>. Run this utility to wipe out GRUB or LILO from the mbr and restore the Windows Boot loader into MBR. Sweet.