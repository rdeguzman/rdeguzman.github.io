---
title: freebsd + git server + gitweb
author: rupert
layout: post
permalink: /2011/11/freebsd-git-server/
categories:
  - freebsd
tags:
  - freebsd
  - git
---
**1. install git server**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>devel<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">git</span>
$ <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span> clean</pre>
      </td>
    </tr>
  </table>
</div>

Note: Include gitweb as an option

**2. Modify /etc/rc.conf**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">git_daemon_enable</span>=<span style="color: #ff0000;">"YES"</span>
<span style="color: #007800;">git_daemon_directory</span>=<span style="color: #ff0000;">"/var/db/git/repo"</span>
<span style="color: #007800;">git_daemon_flags</span>=<span style="color: #ff0000;">"--export-all --syslog --enable=receive-pack --listen=ip_address --verbose"</span></pre>
      </td>
    </tr>
  </table>
</div>

**3. Create git user**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ pw user add <span style="color: #c20cb9; font-weight: bold;">git</span>
$ <span style="color: #c20cb9; font-weight: bold;">passwd</span> <span style="color: #c20cb9; font-weight: bold;">git</span>
$ <span style="color: #c20cb9; font-weight: bold;">chsh</span> <span style="color: #c20cb9; font-weight: bold;">git</span>
Login: <span style="color: #c20cb9; font-weight: bold;">git</span>
Password: <span style="color: #000000; font-weight: bold;">*******************</span>
Uid <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #666666; font-style: italic;">#]: 1002</span>
Gid <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #666666; font-style: italic;"># or name]: 1002</span>
Change <span style="color: #7a0874; font-weight: bold;">&#91;</span>month day year<span style="color: #7a0874; font-weight: bold;">&#93;</span>:
Expire <span style="color: #7a0874; font-weight: bold;">&#91;</span>month day year<span style="color: #7a0874; font-weight: bold;">&#93;</span>:
Class:
Home directory: <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>db<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">git</span>
Shell: <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">git-shell</span>
Full Name: User <span style="color: #000000; font-weight: bold;">&</span>
Office Location:
Office Phone:
Home Phone:
Other information:</pre>
      </td>
    </tr>
  </table>
</div>

&#8220;git&#8221; user would create repositories. We could also add &#8220;rupert&#8221; to the git group.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">pw user mod rupert <span style="color: #660033;">-G</span> <span style="color: #c20cb9; font-weight: bold;">git</span></pre>
      </td>
    </tr>
  </table>
</div>

**4. Let&#8217;s create a repository**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>db<span style="color: #000000; font-weight: bold;">/</span>git<span style="color: #000000; font-weight: bold;">/</span>repo
$ <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">mkdir</span> cws-rails.git
$ <span style="color: #7a0874; font-weight: bold;">cd</span> cws-rails.git<span style="color: #000000; font-weight: bold;">/</span>
$ <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">git</span> <span style="color: #660033;">--bare</span> init
Initialized empty Git repository <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>db<span style="color: #000000; font-weight: bold;">/</span>git<span style="color: #000000; font-weight: bold;">/</span>repo<span style="color: #000000; font-weight: bold;">/</span>cws-rails.git<span style="color: #000000; font-weight: bold;">/</span>
$ <span style="color: #7a0874; font-weight: bold;">cd</span> ..
$ <span style="color: #c20cb9; font-weight: bold;">ls</span> <span style="color: #660033;">-l</span>
total <span style="color: #000000;">4</span>
drwxr-xr-x  <span style="color: #000000;">7</span> root  <span style="color: #c20cb9; font-weight: bold;">git</span>  <span style="color: #000000;">512</span> Nov <span style="color: #000000;">16</span> <span style="color: #000000;">12</span>:<span style="color: #000000;">54</span> cws-rails.git
drwxrwxr-x  <span style="color: #000000;">7</span> <span style="color: #c20cb9; font-weight: bold;">git</span>   <span style="color: #c20cb9; font-weight: bold;">git</span>  <span style="color: #000000;">512</span> Nov <span style="color: #000000;">16</span> <span style="color: #000000;">11</span>:<span style="color: #000000;">52</span> myproject.git
$ <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">chown</span> <span style="color: #660033;">-Rf</span> git:git cws-rails.git
$ <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #660033;">-Rf</span> <span style="color: #000000;">775</span> cws-rails.git</pre>
      </td>
    </tr>
  </table>
</div>

Make sure to change the ownership to git. We also make it writable to the group so users like rupert will have write access.

**5. Let&#8217;s clone, commit and push**  
So now in my MBP, i will clone myproject.git, change some file and push.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ <span style="color: #c20cb9; font-weight: bold;">git clone</span> rupert<span style="color: #000000; font-weight: bold;">@</span>rupert-bsd:<span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>db<span style="color: #000000; font-weight: bold;">/</span>git<span style="color: #000000; font-weight: bold;">/</span>repo<span style="color: #000000; font-weight: bold;">/</span>myproject.git
Cloning into myproject...
Password:
remote: Counting objects: <span style="color: #000000;">12</span>, done.
remote: Compressing objects: <span style="color: #000000;">100</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">9</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">9</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, done.
remote: Total <span style="color: #000000;">12</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>delta <span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, reused <span style="color: #000000;"></span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>delta <span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
Receiving objects: <span style="color: #000000;">100</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">12</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">12</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, done.</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">~<span style="color: #000000; font-weight: bold;">/</span>Desktop<span style="color: #000000; font-weight: bold;">/</span>myproject<span style="color: #7a0874; font-weight: bold;">&#91;</span>master<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">gc</span> <span style="color: #660033;">-m</span> <span style="color: #ff0000;">"Updated CHANGELOG"</span> CHANGELOG 
<span style="color: #7a0874; font-weight: bold;">&#91;</span>master d9fd0f7<span style="color: #7a0874; font-weight: bold;">&#93;</span> Updated CHANGELOG
 <span style="color: #000000;">1</span> files changed, <span style="color: #000000;">1</span> insertions<span style="color: #7a0874; font-weight: bold;">&#40;</span>+<span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #000000;"></span> deletions<span style="color: #7a0874; font-weight: bold;">&#40;</span>-<span style="color: #7a0874; font-weight: bold;">&#41;</span>
~<span style="color: #000000; font-weight: bold;">/</span>Desktop<span style="color: #000000; font-weight: bold;">/</span>myproject<span style="color: #7a0874; font-weight: bold;">&#91;</span>master<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">git push</span>
Password:
Counting objects: <span style="color: #000000;">5</span>, done.
Delta compression using up to <span style="color: #000000;">2</span> threads.
Compressing objects: <span style="color: #000000;">100</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">3</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">3</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, done.
Writing objects: <span style="color: #000000;">100</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">3</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">3</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #000000;">332</span> bytes, done.
Total <span style="color: #000000;">3</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>delta <span style="color: #000000;">1</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, reused <span style="color: #000000;"></span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>delta <span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
To rupert<span style="color: #000000; font-weight: bold;">@</span>rupert-bsd:<span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>db<span style="color: #000000; font-weight: bold;">/</span>git<span style="color: #000000; font-weight: bold;">/</span>repo<span style="color: #000000; font-weight: bold;">/</span>myproject.git
   5d16498..d9fd0f7  master -<span style="color: #000000; font-weight: bold;">&gt;</span> master</pre>
      </td>
    </tr>
  </table>
</div>

Note: So that we don&#8217;t need to specify the password all the time, generate an ssh-keygen -t rsa for id\_rsa.pub and append it to rupert@rupert-bsd:/home/rupert/.ssh/authorized\_keys

**6. Setup Git, Configure and Restart Apache2**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># Copy the gitweb directory to your apache22 directory
$ sudo cp -Rf /usr/local/share/examples/git/gitweb /usr/local/www/apache22/data/
&nbsp;
# Edit gitweb.cgi to point to your repo
$ vim /usr/local/www/apache22/data/gitweb/gitweb.cgi
our $projectroot = "/var/db/git/repo";</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;"># Allow apache to execute gitweb.cgi
Alias /gitweb /usr/local/www/apache22/data/gitweb
&nbsp;
&lt;Directory /usr/local/www/apache22/data/gitweb&gt;
  Options FollowSymLinks +ExecCGI
  AddHandler cgi-script .cgi
&lt;/Directory&gt;</pre>
      </td>
    </tr>
  </table>
</div>

Browse http://servername/gitweb/gitweb.cgi