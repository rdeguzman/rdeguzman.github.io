---
title: IBM DB2 Express C and Spatial Extender
author: rupert
layout: post
permalink: /2007/06/ibm-db2-express-c-and-spatial-extender/
categories:
  - Uncategorized
---
1. Download [DB2 Express C db2exc\_912\_WIN_x86.zip][1]

2. Download [DB2 Spatial Extender from the DB9 Fix Pack.][2] Choose your OS and browse over &#8220;DB2 Spatial Extender -> Language Independent&#8221;. There is a current problem installing the DB2 Spatial Extender from the main &#8220;Spatial Offering&#8221; Site with DB2 Express C because of the versions, DB2 Express C was made after FP2 (Fix Pack 2), while DB2 Spatial Extender was made before FP2. When installing the old DB2 Spatial Extender, it will prompt you with &#8220;No Action Available&#8221;, to resolve the problem, install the DB2 Spatial Extender FP2 (v9fp2\_win\_gse.exe).

3. [Leveraging MySQL skills to learn DB2 Express][3] contains comparison between MySQL and DB2. It also contains default installation instructions which make installing easier.

4. [New to DB2][4] from the [DB2 Wiki][5] is a good start in understanding DB2&#8217;s concepts.

5. Browse over the [User Guide of Spatial Extender][6] to understand the Spatial Extender capabilities.

6. Geoserver Integration? Read [Open Web Mapping from Penn State Univ.][7]

7. Manually starting DB2 Services on boot:

DB2 &#8211; DB2COPY &#8211; DB2 &#8211; Allows applications to create, update, control, and manage relational databases.

DB2 Management Service (DB2COPY1) &#8211; Manages DB2 registry entries for backward compatibility purposes for the DB2 Copy DB2COPY1

DB2 Remote Command Server (DB2COPY1) &#8211; Supports remote DB2 command execution for the DB2 copy named DB2COPY1.

DB2 Security Server (DB2COPY1) &#8211; Authenticates DB2 database users when the authentication is performed at the client computer for the DB2 copy named DB2COPY1.

DB2DAS &#8211; DB2DAS00 &#8211; Supports local and remote database administrative requests.

 [1]: http://www-306.ibm.com/software/data/db2/express/
 [2]: http://www-1.ibm.com/support/docview.wss?uid=swg21255572
 [3]: http://www-128.ibm.com/developerworks/db2/library/techarticle/dm-0602tham2/index.html
 [4]: http://www-03.ibm.com/developerworks/wikis/pages/viewpage.action?pageId=2658
 [5]: http://www-03.ibm.com/developerworks/wikis/display/DB2/DB2+wiki
 [6]: /wordpress/images/db2sbe90.pdf
 [7]: https://courseware.e-education.psu.edu/courses/geog585/content/home.html