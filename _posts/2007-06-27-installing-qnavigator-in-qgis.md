---
title: Installing QNavigator in QGIS
author: rupert
layout: post
permalink: /2007/06/installing-qnavigator-in-qgis/
categories:
  - GIS
tags:
  - qgis
  - routing
---
<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">[root@rupert-linux qnavigator]# mkdir build &amp;&amp; cd build
[root@rupert-linux build]# cmake -D QGIS_PREFIX=/usr/local/qgis ..
-- Check for working C compiler: /usr/bin/gcc
-- Check for working C compiler: /usr/bin/gcc -- works
-- Check size of void*
-- Check size of void* - done
-- Check for working CXX compiler: /usr/bin/c++
-- Check for working CXX compiler: /usr/bin/c++ -- works
-- Looking for Q_WS_X11
-- Looking for Q_WS_X11 - found
-- Looking for Q_WS_MAC
-- Looking for Q_WS_MAC - not found.
-- Looking for Q_WS_WIN
-- Looking for Q_WS_WIN - not found.
-- Found Qt-Version 4.2.3
-- Configuring done
-- Generating done
-- Build files have been written to: /home/install/qgis-svn/src/plugins/qnavigator/build
[root@rupert-linux build]# make
Scanning dependencies of target dglib
[  9%] Building CXX object dglib/CMakeFiles/dglib.dir/dgraph.o
[ 18%] Building CXX object dglib/CMakeFiles/dglib.dir/dijkstra.o
[ 27%] Building CXX object dglib/CMakeFiles/dglib.dir/fheap.o
[ 36%] Building CXX object dglib/CMakeFiles/dglib.dir/routing_core.o
Linking CXX static library libdglib.a
Creating makefiles...
[ 36%] Built target dglib
Scanning dependencies of target dgbuild
[ 45%] Building CXX object dglib/CMakeFiles/dgbuild.dir/dgbuild.o
Linking CXX executable dgbuild
[ 45%] Built target dgbuild
Scanning dependencies of target dgpath
[ 54%] Building CXX object dglib/CMakeFiles/dgpath.dir/dgpath.o
Linking CXX executable dgpath
[ 54%] Built target dgpath
[ 54%] Generating ../../python/ui/mainwindow_ui.py
[ 54%] Generating ../../python/ui/findstreetdialog_ui.py
[ 54%] Generating ../../python/ui/aboutdialog_ui.py
[ 54%] Generating ../../python/ui/roadinfodialog_ui.py
[ 54%] Generating ../../python/ui/qnavigator_rc.py
[100%] Built target ui
[root@rupert-linux build]#</pre>
      </td>
    </tr>
  </table>
</div>