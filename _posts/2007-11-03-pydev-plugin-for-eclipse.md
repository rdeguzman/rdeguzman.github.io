---
title: PyDev Plugin For Eclipse
author: rupert
layout: post
permalink: /2007/11/pydev-plugin-for-eclipse/
categories:
  - python
tags:
  - eclipse
  - python
---
<p>I had <em>&#8220;indentation&#8221;</em> problems a few times when I was doing Python using vim. Also, my chinese characters were not displaying correctly on VIM as well.  But when I open the file in IDLE, I can read the chinese characters fine.  Well I found a quick workaround for my indent problem by using the default Python Editor which is IDLE:</p>
<p>1. Edit -&gt; Select ALL<br />
2. Format -&gt; Untabify Region<br />
3. Specify &#8220;4&#8221; spaces for the tabs.<br />
4. To run your program, just press F5.</p>
<p>Well, just recently I managed some time and went to the ShowMeDo site for Python. There I found out about PyDev, please watch the <a href="pydevhttp://showmedo.com/videos/series?name=PyDevEclipseList">screencast</a>, its worth it! Firing Eclipse, I immediately added the plugin from the update site: <a href="http://pydev.sourceforge.net/updates/">http://pydev.sourceforge.net/updates/</a>.</p>
<p><a href="http://www.gisnotes.com/images/2007/11/python.png" title="PyDev Plugin For Eclipse"><img src="http://www.gisnotes.com/images/2007/11/python.thumbnail.png" alt="PyDev Plugin For Eclipse" /></a></p>
<p>Once you have PyDev set, you need to tell Eclipse where your PYTHON bin, PYTHONPATH and other settings.<br />
1. Go to Window -&gt; Preferences<br />
2. Collapse PyDev from left panel<br />
3. Select &#8220;Interpreter-Python&#8221;<br />
4. Click on <strong><em>&#8220;New&#8221;</em></strong> on the <strong>&#8220;Python Interpreters&#8221;</strong> Group.<br />
5. Specify where python.exe.</p>
<p>Note: It would automatically add the libraries in your PYTHONPATH. Again, I insist you watch the <a href="pydevhttp://showmedo.com/videos/series?name=PyDevEclipseList">screencast</a> from Fabio to guide you through. To run your program just hit &#8220;F9&#8243;.</p>
<p><a href="http://www.gisnotes.com/images/2007/11/pydev_config.png" title="Python Config"><img src="http://www.gisnotes.com/images/2007/11/pydev_config.thumbnail.png" alt="Python Config" /></a></p>
