---
title: Recaching single tiles in Tilecache
author: rupert
layout: post
permalink: /2008/09/recaching-single-tiles-in-tilecache/
aktt_tweeted:
  - 1
categories:
  - tilecache
tags:
  - tilecache
---
Got this one from IRC this morning.. In order to recache single tiles in TC, as long as it is not metatile (metatile=false), then we can simply append &#8220;FORCE=1&#8243; in the URL..

http://192.168.2.14/tilecache/tilecache.py?**FORCE=1**&#038;LAYERS=beijing\_900913\_wide\_en&#038;MAP=%2Fmyhome%2Fmap%2Fbeijing%2Fnew%2Fbeijing\_900913\_wide\_en%2Fbeijing.map&#038;FORMAT=jpg&#038;TRANSPARENT=true&#038;SERVICE=WMS&#038;VERSION=1.1.1&#038;REQUEST=GetMap&#038;STYLES=&#038;EXCEPTIONS=application%2Fvnd.ogc.se_inimage&#038;SRS=EPSG%3A900913&#038;BBOX=12951949.03168994,4852222.893873828,12952101.905746482,4852375.767930372&#038;WIDTH=256&#038;HEIGHT=256

<img src="/images/2008/09/picture-22.png" alt="Picture 2.png" border="0" width="531" height="275" />

Well for completeness, I gave my ofcmate a DELETE tool which wipes out everything in the /tilecache/map_dir directory..