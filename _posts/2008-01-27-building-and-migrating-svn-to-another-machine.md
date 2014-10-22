---
title: Installing Subversion on Debian
author: rupert
layout: post
permalink: /2008/01/building-and-migrating-svn-to-another-machine/
categories:
  - subversion
tags:
  - debian
  - svn
  - trac
---
I was greeted with &#8220;No space left on device&#8221; on my cron log. Turns out that my svn server obviously ran out of disk space. The old svn server was running on CentOS4.3, Subversion 1.3.2, Trac-0.11.devxxx. I decided to migrate the svn data to a new server, so I installed Debian4.01 on a small server with 72 GB HD, no partitions (just / and swap, so the svn have room to grow&#8230;). Here are the steps I took for the migration:

**A. A fresh start&#8230;**  
1. Installed Debian. Fixed network and ssh.  
2. apt-get install apache2  
3. apt-get install subversion  
4. apt-get install python python-setuptools python-mysqldb python-subversion  
5. apt-get install libapache2-svn libapache2-mod-python

**B. Making SVN work&#8230;**  
1. svnadmin create /repos &#8211;fs-type fsfs

2. Since I have a fresh apache configuration, I edited it accordingly from /etc/apache2/mods-available/dav_svn.conf:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">#SVN dir
&lt;location&gt;
  DAV svn
  SVNPath /repos
  SVNAutoversioning on
  AuthType Basic
  AuthName "SVN - Your Project"
  AuthUserFile /repos/svn-auth-file
  Require valid-user
&lt;/location&gt;</pre>
      </td>
    </tr>
  </table>
</div>

3. Restart apache

4. To test if svn is running, import a project inside the repository.  
`svn import -m "initial import" /tmp/project http://127.0.0.1/repos/project`

**C. Migrating the data**

After I got my fresh debian svn machine, I need to move the svn data and trac to the new server. <http://svnbook.red-bean.com/nightly/en/svn.reposadmin.html>

1. Transfer **/repos/svn-auth-file** and **/repos/svn-authorization-file** to the new server  
2. Transferred **trac.tar.gz** (/var/www/trac) to the new server

To move the svn data from one server to another, I tried the ff choices&#8230;  
1. `svnadmin dump /repos /reposbak`. *Will work if disk space is not an issue. My `/repos` is 25 GB, and my other 30 GB partition was wiped out, even though the dump was not finished yet.*

2. `svnadmin hotcopy --clean-logs /repos /repos2`. Accdg to the docs, this is exactly the same repository without the BdB logs. I then transferred the hotcopy from choice 2 above to the new server and works flawlessly to my surprise. So now, I still have all my revisions

<http://bealers.com/2008/01/01/installing-trac-on-debian-etch/>  
<http://trac.edgewall.org/wiki/TracOnDebianSarge>  
<http://trac.edgewall.org/wiki/TracUpgrade>  
<http://trac.edgewall.org/wiki/TracInstall>  
<http://trac.edgewall.org/wiki/TracModPython>