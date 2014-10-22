---
title: Installing PostGres8.3 and Postgis1.3.2 on Windows
author: rupert
layout: post
permalink: /2008/03/installing-postgres83-and-postgis-on-windows/
categories:
  - postgis
  - postgres
tags:
  - postgis
  - postgres
---
It seems very nice for the new PostGres8.3 installer to bundle up third party libraries installation with the new *admin pack* feature. Using this feature, you can install PostGis, nPgsql, etc. The installation was painless and smooth this time. I have to backup all my data though using pg_dump.

To lessen the learning curve on installing PostGres + PostGis together, I made a [short flash movie][1] here. There is no audio in the tutorial. The idea was to introduce PostGres to my Chinese staff. I have to remove PostGreSQL 8.2 first before installing 8.3.

 [1]: http://www.gisnotes.com/wordpress/training/postgres-tut1.html "postgres-tut1.html"