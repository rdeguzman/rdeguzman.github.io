---
title: homebrew + python
author: rupert
layout: post
permalink: /2011/12/homebrew-python/
categories:
  - homebrew
  - python
  - Uncategorized
tags:
  - homebrew
  - python
---
Read <http://docs.python-guide.org/en/latest/starting/installation/>

**Installation**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/usr/local/Cellar% brew install python --framework
==&gt; Downloading http://www.python.org/ftp/python/2.7.2/Python-2.7.2.tar.bz2
File already downloaded in /Users/rupert/Library/Caches/Homebrew
==&gt; Patching
patching file Lib/whichdb.py
Hunk #1 succeeded at 91 with fuzz 1.
==&gt; ./configure --prefix=/usr/local/Cellar/python/2.7.2 --enable-framework=/usr/local/Cellar/python/2.7.2/Frameworks
==&gt; make
==&gt; make install
==&gt; Downloading http://pypi.python.org/packages/source/d/distribute/distribute-0.6.24.tar.gz
File already downloaded in /Users/rupert/Library/Caches/Homebrew
==&gt; /usr/local/Cellar/python/2.7.2/bin/python setup.py install
==&gt; Caveats
A "distutils.cfg" has been written to:
  /usr/local/Cellar/python/2.7.2/Frameworks/Python.framework/Versions/2.7/lib/python2.7/distutils
specifing the install-scripts folder as:
  /usr/local/share/python
&nbsp;
If you install Python packages via "python setup.py install", easy_install, pip,
any provided scripts will go into the install-scripts folder above, so you may
want to add it to your PATH.
&nbsp;
Distribute has been installed, so easy_install is available.
To update distribute itself outside of Homebrew:
    /usr/local/share/python/easy_install pip
    /usr/local/share/python/pip install --upgrade distribute
&nbsp;
See: https://github.com/mxcl/homebrew/wiki/Homebrew-and-Python
&nbsp;
Framework Python was installed to:
  /usr/local/Cellar/python/2.7.2/Frameworks/Python.framework
&nbsp;
You may want to symlink this Framework to a standard OS X location,
such as:
    mkdir ~/Frameworks
    ln -s "/usr/local/Cellar/python/2.7.2/Frameworks/Python.framework" ~/Frameworks
==&gt; Summary
/usr/local/Cellar/python/2.7.2: 4808 files, 77M, built in 86 seconds
brew install python --framework  76.78s user 21.49s system 112% cpu 1:27.00 total</pre>
      </td>
    </tr>
  </table>
</div>

**Symlinks**

The following links were created below to ensure that 2.7 is the latest Python picked up during installation of other software (i.e postgresql)

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">sudo ln -s /usr/local/Cellar/python/2.7.2/Frameworks/Python.framework/Versions/2.7 /System/Library/Frameworks/Python.framework/Versions/2.7
sudo ln -s /usr/local/share/python/easy_install /usr/bin/easy_install
sudo ln -s /usr/local/share/python/easy_install-2.7 /usr/bin/easy_install-2.7
sudo ln -s /System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7 /usr/bin/python2.7
sudo ln -s /System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7-config /usr/bin/python2.7-config
sudo ln -s /System/Library/Frameworks/Python.framework/Versions/2.7/bin/pydoc2.7 /usr/bin/pydoc2.7
sudo ln -s /usr/bin/python2.7 /usr/bin/python
sudo ln -s /System/Library/Frameworks/Python.framework/Versions/2.7 /System/Library/Frameworks/Python.framework/Versions/Current
mkdir -p /Library/Python/2.7
ln -s /usr/local/lib/python2.7/site-packages /Library/Python/2.7/site-packages</pre>
      </td>
    </tr>
  </table>
</div>

**Site-Packages. Where?**

Note that **site-packages** will be installed in

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/usr/local/lib/python2.7/site-packages</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% ls -la /Library/Python/2.6/site-packages
total 136
drwxrwxr-x  14 root    admin    476 30 Dec 18:13 ./
drwxrwxr-x   4 root    admin    136 30 Dec 18:11 ../
-rw-r--r--@  1 rupert  admin   6148 30 Dec 18:13 .DS_Store
-rw-rw-r--   1 root    admin    119 11 Feb  2010 README
-rw-r--r--   1 rupert  admin    241 30 Dec 18:01 easy-install.pth
-rw-r--r--   1 rupert  admin   3129 30 Dec 18:02 googlemaps-1.0.2-py2.6.egg-info
-rw-r--r--   1 rupert  admin  19703 16 Oct  2009 googlemaps.py
-rw-r--r--   1 rupert  admin  19153 30 Dec 18:02 googlemaps.pyc
drwxr-xr-x  39 root    admin   1326  7 Feb  2010 mod_python/
-rw-r--r--   1 root    admin    267  7 Feb  2010 mod_python-3.3.2_dev_20080819-py2.6.egg-info
drwxr-xr-x   8 rupert  admin    272 30 Dec 18:13 nominatim/
-rw-r--r--   1 rupert  admin   4462 30 Dec 18:08 nominatim-0.90-py2.6.egg
drwxr-xr-x  15 rupert  admin    510 30 Dec 18:01 simplejson/
drwxr-xr-x   4 rupert  admin    136 30 Dec 18:13 simplejson-2.3.1-py2.6.egg/
~% ls -la /Library/Python/2.7/site-packages
lrwxr-xr-x  1 root  admin  38 30 Dec 18:23 /Library/Python/2.7/site-packages@ -&gt; /usr/local/lib/python2.7/site-packages</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% which python
/usr/local/bin/python
~% python --version
Python 2.7.2</pre>
      </td>
    </tr>
  </table>
</div>