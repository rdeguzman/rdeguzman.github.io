---
title: Upgrading MS4W
author: rupert
layout: post
permalink: /2007/08/upgrading-ms4w/
categories:
  - mapserver
tags:
  - mapserver
---
Here&#8217;s a quick overview of how I upgraded my custom MS4W binded with ColdFusion..

1. Extract the new ms4w\_new.zip to E:\ms4w\_new

2. diff E:\ms4w_new\Apache\conf\httpd.conf E:\ms4w\Apache\conf\httpd.conf

If the changes is minimal, then proceed.

3. Uninstall ColdFusion connector from Apache.  
`<br />
D:\CFusionMX\bin\connectors\Remove_ALL_connectors.bat<br />
`

4. Uninstall Apache from services.msc. Run  
`<br />
E:\ms4w\apache-uninstall.bat<br />
`

5. Move  
`<br />
mv E:\ms4w E:\ms4w_old<br />
mv E:\ms4w_new E:\ms4w<br />
`

6. Install Apache as a windows services to services.msc  
`<br />
E:\ms4w\apache-install.bat<br />
`

7. Bind ColdFusion again to Apache  
`<br />
D:\CFusionMX\bin\connectors\Apache_connector.bat<br />
`