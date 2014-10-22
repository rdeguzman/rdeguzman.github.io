---
title: Aptana Impressions
author: rupert
layout: post
permalink: /2008/03/aptana-impressions/
categories:
  - eclipse
  - ExtJS
  - javascript
tags:
  - aptana
  - eclipse
  - ExtJS
  - javascript
---
I recently downloaded Aptana Studio 1.1 Community Edition and have been using it mostly for my Javascript/ColdFusion development.

*   Intellisense for ExtJS by using [com.extjs.ext.2.0_1.0.0.00000.jar][1] from the [ExtJS blog.][2] Umm, I am hoping someday OpenLayers can provide a similar jar file to [provide code assist.][3]
*   I like the fact that it could clearly display an outline of my javascript objects but *sometimes* not for all.

But one of the major problems I encountered was the startup. Sometimes, for some unknown reason, Aptana cannot start using the executable it provided during the install. However, I was able to weed that problem out by instead launching it from startup.jar. All of these is documented from [Aptana&#8217;s JIRA ticket][4].

1. Downloaded and install [Aptana][5]

2. Watched [Aptana TV Overview][6]

3. Installed cfeclipse <http://www.cfeclipse.org/update>

4. Installed viPlugin <http://satokar.com/> (Note that the viPlugin would not work with files = *.html)

5. Added the extjs2.0 code assist

 [1]: http://orsox.mocis.at/download.php?view.1
 [2]: http://extjs.com/blog/2008/02/01/ides-plugins-and-tools-for-ext-js-20/
 [3]: http://www.aptana.com/docs/index.php/Displaying_Code_Assist
 [4]: http://support.aptana.com/asap/browse/STU-1303
 [5]: http://www.aptana.com/
 [6]: http://www.aptana.tv/movies/aptana_overview/Overview.html