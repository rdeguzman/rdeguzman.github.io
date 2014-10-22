---
title: 'Oracle: Creating a MultiLingual Database'
author: rupert
layout: post
permalink: /2008/08/oracle-creating-a-multilingual-database/
aktt_tweeted:
  - 1
categories:
  - oracle
tags:
  - oracle
---
Notes on to create a multilingual database in UTF8 in Oracle10g.

1. Run the Oracle Database Configuration Assistant (DBCA)

<img src="/images/2008/08/picture-2.png" alt="Picture 2.png" border="0" width="600" height="335" />

2. Choose Create Database

<img src="/images/2008/08/picture-3.png" alt="Picture 3.png" border="0" width="656" height="434" />

3. Choose &#8220;General Purpose&#8221;. 

4. Then specify the **GLOBAL DATABASE NAME** or **ORACLE SID** (orcl4)

<img src="/images/2008/08/picture-5.png" alt="Picture 5.png" border="0" width="652" height="434" />

5. Click Next on Management Options.

6. On &#8220;Database Credentials&#8221;, use the same passwords so we would not forget them for now&#8230;

<img src="/images/2008/08/picture-7.png" alt="Picture 7.png" border="0" width="655" height="432" />

7. On &#8220;Storage Options&#8221;. Default options is FILE STORAGE. Next.

8. On &#8220;Database File Locations&#8221;, hit Next as well.

9. On &#8220;Recover Options&#8221;, same goes here.. Next.

10. On &#8220;Database Content&#8221;, install the sample schemas for practice.  
<img src="/images/2008/08/picture-111.png" alt="Picture 11.png" border="0" width="653" height="431" />

11. On &#8220;Initialization Parameters&#8221;, click on the &#8220;Character Sets&#8221; tab. Note that we chose the 2nd option which is &#8220;Use Unicode&#8221; (ALT32UTF8) in order to support chinese. On the National Character Set, please choose &#8220;UTF8&#8243; (the 2nd option in the drop-down list&#8221;) also.

<img src="/images/2008/08/picture-12.png" alt="Picture 12.png" border="0" width="652" height="432" /> 

12. Hit Next until we create the database.

13. To check you should have the Oracle Services installed in your Services.

<img src="/images/2008/08/picture-14.png" alt="Picture 14.png" border="0" width="367" height="85" />