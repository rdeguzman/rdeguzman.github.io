---
title: Installing R on Windows and Debian
author: rupert
layout: post
permalink: /2007/11/installing-r-on-windows-and-debian/
categories:
  - debian
  - postgis
  - postgres
tags:
  - debian
  - R
---
**&#8216;R&#8217;** is a statistical package. For an overview, please go to <www.r-project.org>  
My intention was to remove the point outliers from a given set of point geometries.

I just recently installed R both on my Windows XP and Debian. Regina&#8217;s [www.bostongis.com ][1] is an excellent tutorial in getting involved with **R**. I do suggest you head first to [PLR Part 1: Up and Running with PL/R (PLR) in PostgreSQL: An almost Idiot&#8217;s Guide ][2] to get you started.

The install instructions for Windows works flawlessly. I have to hold back to R-2.5 though as I plan to use RPy (Python for R), see details below. To install **&#8216;R&#8217;** in Debian, there&#8217;s a couple of settings that we need to take care of&#8230;

1. Install r-base  
`sudo apt-get install r-base`

2. Install plr on postgres  
`sudo apt-get install postgresql-8.2-plr`

3. Using R in a database  
`psql -d beijing -U lbs -h 127.0.0.1 < /usr/share/postgresql/8.2/plr.sql`

4. Set the R_HOME environment variable  
`/etc/postgresql/8.2/main/environment`  
`R_HOME='/usr/lib/R'`

5. Restart Debian.

**RPy**, R for Python, is another alternative to use R in Python. I installed it both in Windows and Debian. Note that I reverted to R-2.5 on Windows to be compatible with RPy. For Debian, Im currently using R-2.6.

For the Windows Binary Installation,

1. Read the [RPy Main Site][3]

2. Install prerequisites:

&#8211; [NumPy][4]  
&#8211; [Win32 Extensions Download][5]

3. Afterwards, install the main package, [RPy Download][6]

In Debian, its a straight forward&#8230;`sudo apt-get install python-rpy`

 [1]: www.bostongis.com
 [2]: http://www.bostongis.com/PrinterFriendly.aspx?content_name=postgresql_plr_tut01
 [3]: http://rpy.sourceforge.net/rpy/README
 [4]: http://jaist.dl.sourceforge.net/sourceforge/numpy/numpy-1.0.4.win32-py2.5.msi
 [5]: http://sourceforge.net/project/showfiles.php?group_id=78018
 [6]: http://nchc.dl.sourceforge.net/sourceforge/rpy/rpy-1.0-RC3.win32-R2.0.0-R-2.5.1-py2.5.exe