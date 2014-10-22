---
title: Subversion
author: rupert
layout: post
permalink: /2009/11/subversion/
categories:
  - subversion
tags:
  - subversion
---
This post will contain a summary of information regarding subversion scattered from old posts.

### Installation on Debian

1. Packages

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">#apt-get install subversion
#apt-get install libapache2-svn</pre>
      </td>
    </tr>
  </table>
</div>

2. Login as root then create the repository.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">#cd /data
#svnadmin create /repos --fs-type fsfs</pre>
      </td>
    </tr>
  </table>
</div>

3. Set the permissions

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">#groupadd subversion
#addgroup rupert subversion
#addgroup www-data subversion
&nbsp;
#chown -Rf www-data:subversion /data/repos
#chmod -Rf 770 repos</pre>
      </td>
    </tr>
  </table>
</div>

It&#8217;s better to set the necessary users and groups that would use subversion now. Later on, if we need to checkout using svn+ssh and setup a passwordless svn, then we won&#8217;t get permission issues.

4. In /etc/apache2/sites-available/2rmobile, add this to the configuration.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">        &lt;Location /repos&gt;
        DAV svn
        SVNPath /data/repos
        SVNAutoversioning on
        AuthType Basic
        AuthName "SVN - Your Project"
        AuthUserFile /data/svn-auth-file
        Require valid-user
        &lt;/Location&gt;</pre>
      </td>
    </tr>
  </table>
</div>

5. Enable the webdav module then restart apache.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">#a2enmod dav
#a2enmod dav_svn
#/etc/init.d/apache2 restart</pre>
      </td>
    </tr>
  </table>
</div>

### Passwordless SVN

On your local macbook pro (mbp), we need to generate the ssh keys from the local machine, upload it to the remote machine and append it in the authorized_keys.

*On the local machine:*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">#ssh-keygen -t rsa
...
#cd /Users/rupert/.ssh
#scp -r id_rsa.pub rupert@2rmobile.com:/home/rupert/.ssh/id_rsa_mbp.pub</pre>
      </td>
    </tr>
  </table>
</div>

*On the remote machine:*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">#cd ~/.ssh
#touch authorized_keys
#cat id_rsa_mbp.pub &gt;&gt; authorized_keys</pre>
      </td>
    </tr>
  </table>
</div>

Test on the local machine by doing

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">ssh rupert@2rmobile.com</pre>
      </td>
    </tr>
  </table>
</div>

. In my mbp, a dialog box from keychain is asking for the password. To circumvent this, we can add the passphrase to our identities.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">#ssh-add -K
... enter the passphrase twice...
#ssh-add -k (adds it to the identities)
#ssh-add -l (lists the identities)</pre>
      </td>
    </tr>
  </table>
</div>

Now the benefits of having a passwordless svn:  
&#8211; ofcourse it saves us a lot of time  
&#8211; rails capistrano deployment

References:  
[http://www.howtoforge.com/debian\_subversion\_websvn][1]

### Subversion Tips and Tricks

<http://subversion.tigris.org/faq.html#ssh-authorized-keys-trick>

**1. Checking out using svn+ssh and having passwordless ssh authentication. My personal favorite when working with personal projects since I have full control. **

<pre>svn co svn+ssh://www.2rmobile.com/data/repos/web/rails/halalan2010 halalan2010
</pre>

But for work projects, I normally use webdav

<pre>svn co "http://www.2rmobile.com/repos/web/halalan2010" halalan2010
</pre>

**2. svn+ssh on a custom or different port other than 22. I have my ssh on 2210, so we need to tell svn+ssh to use 2210**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">vim ~/.subversion/config
 41 [tunnels]
 42 ### Configure svn protocol tunnel schemes here.  By default, only
....
 53 ### built-in ssh scheme were not predefined, it could be defined
 54 ### as:
 55 ssh = $SVN_SSH ssh -p 2210</pre>
      </td>
    </tr>
  </table>
</div>

<http://www.techper.net/2009/01/11/changing-port-number-of-svnssh-subversion-protocol/>

**3. svn diff** &#8211; shows you the changes in a directory. This is useful for creating patches.

<pre>svn diff -r HEAD
svn st -q
</pre>

**3. svn switch oldURL to newURL **- very useful when I&#8217;m working at home or in the office, since the svn server has a public/private IP.

**4. svn log** &#8211; shows you who committed and why (from the messages)

**5. ignoring specific set of files in a directory. **

<pre>svn propset svn:ignore "*.log" log</pre>

**6. ignoring a whole directory.**

<pre>svn propset svn:ignore dirname .</pre>

**7. ignoring using an ignore file (.ignore.txt) in a directory (sample.xcodeproj).**

<pre>*.pbxuser
*.mode1v3
xcuserdata
</pre>

<pre>svn propset svn:ignore - F .ignore.txt .</pre>

 [1]: http://www.howtoforge.com/debian_subversion_websvn