---
title: homebrew + mysql = installed but access denied for root
author: rupert
layout: post
permalink: /2011/11/homebrew-mysql-access-denied-for-root/
categories:
  - homebrew
  - mysql
  - osx
tags:
  - homebrew
  - mysql
  - osx
---
**1. Cleanup**  
I have an existing mysql @ /usr/local/mysql, so we remove that.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% sudo rm -rf mysql-5.1.43-osx10.6-x86_64</pre>
      </td>
    </tr>
  </table>
</div>

Note: I suggest you backup your mysql data by doing mysqldump prior to removing the old mysql.

**2. Install mysql**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">#brew install mysql
Set up databases to run AS YOUR USER ACCOUNT with:
    unset TMPDIR
    mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
&nbsp;
To set up base tables in another folder, or use a different user to run
mysqld, view the help for mysqld_install_db:
    mysql_install_db --help
&nbsp;
and view the MySQL documentation:
  * http://dev.mysql.com/doc/refman/5.5/en/mysql-install-db.html
  * http://dev.mysql.com/doc/refman/5.5/en/default-privileges.html
&nbsp;
To run as, for instance, user "mysql", you may need to `sudo`:
    sudo mysql_install_db ...options...
&nbsp;
Start mysqld manually with:
    mysql.server start
&nbsp;
    Note: if this fails, you probably forgot to run the first two steps up above
&nbsp;
A "/etc/my.cnf" from another install may interfere with a Homebrew-built
server starting up correctly.
&nbsp;
To connect:
    mysql -uroot
&nbsp;
To launch on startup:
* if this is your first install:
    mkdir -p ~/Library/LaunchAgents
    cp /usr/local/Cellar/mysql/5.5.15/com.mysql.mysqld.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/com.mysql.mysqld.plist
&nbsp;
* if this is an upgrade and you already have the com.mysql.mysqld.plist loaded:
    launchctl unload -w ~/Library/LaunchAgents/com.mysql.mysqld.plist
    cp /usr/local/Cellar/mysql/5.5.15/com.mysql.mysqld.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/com.mysql.mysqld.plist
&nbsp;
You may also need to edit the plist to use the correct "UserName".
&nbsp;
Warning: m4 macros were installed to "share/aclocal".
Homebrew does not append "/usr/local/share/aclocal"
to "/usr/share/aclocal/dirlist". If an autoconf script you use
requires these m4 macros, you'll need to add this path manually.
==&gt; Summary
/usr/local/Cellar/mysql/5.5.15: 6277 files, 217M, built in 4.9 minutes
brew install mysql  498.39s user 83.40s system 135% cpu 7:08.37 total</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~/Desktop% unset TMPDIR
~/Desktop% echo $TMPDIR
&nbsp;
~/Desktop% mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
Installing MySQL system tables...
OK
Filling help tables...
OK
&nbsp;
To start mysqld at boot time you have to copy
support-files/mysql.server to the right place for your system
&nbsp;
PLEASE REMEMBER TO SET A PASSWORD FOR THE MySQL root USER !
To do so, start the server, then issue the following commands:
&nbsp;
/usr/local/Cellar/mysql/5.5.15/bin/mysqladmin -u root password 'new-password'
/usr/local/Cellar/mysql/5.5.15/bin/mysqladmin -u root -h rupert-imac password 'new-password'
&nbsp;
Alternatively you can run:
/usr/local/Cellar/mysql/5.5.15/bin/mysql_secure_installation
&nbsp;
which will also give you the option of removing the test
databases and anonymous user created by default.  This is
strongly recommended for production servers.
&nbsp;
See the manual for more instructions.
&nbsp;
You can start the MySQL daemon with:
cd /usr/local/Cellar/mysql/5.5.15 ; /usr/local/Cellar/mysql/5.5.15/bin/mysqld_safe &
&nbsp;
You can test the MySQL daemon with mysql-test-run.pl
cd /usr/local/Cellar/mysql/5.5.15/mysql-test ; perl mysql-test-run.pl
&nbsp;
Please report any problems with the /usr/local/Cellar/mysql/5.5.15/scripts/mysqlbug script!</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~/Desktop% which mysql.server
/usr/local/bin/mysql.server
~/Desktop% ls -la `which mysql.server`
lrwxr-xr-x  1 rupert  admin  39 30 Dec 11:20 /usr/local/bin/mysql.server@ -&gt; ../Cellar/mysql/5.5.15/bin/mysql.server
~/Desktop% mysql.server start
Starting MySQL
.. SUCCESS!</pre>
      </td>
    </tr>
  </table>
</div>

**3. That&#8217;s it? No.** 

At the time of writing this, mysql is at 5.5 and was installed successfully by homebrew. However, I cannot login using the root account. Have a read of this [stackoverflow: brew install mysql on mac os][1].

To fix this, stop mysql

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">launchctl unload -w ~/Library/LaunchAgents/com.mysql.mysqld.plist</pre>
      </td>
    </tr>
  </table>
</div>

and start mysql by skipping the grant tables.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">mysqld_safe --skip-grant-tables</pre>
      </td>
    </tr>
  </table>
</div>

Depending if you have a record in mysql.user (select * from mysql.user), then you can either create or update the user.

create:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #993333; font-weight: bold;">ALL</span> PRIVILEGES <span style="color: #993333; font-weight: bold;">ON</span> <span style="color: #66cc66;">.</span> <span style="color: #993333; font-weight: bold;">TO</span> <span style="color: #ff0000;">'root'</span>@<span style="color: #ff0000;">'localhost'</span> <span style="color: #993333; font-weight: bold;">IDENTIFIED</span> <span style="color: #993333; font-weight: bold;">BY</span> <span style="color: #ff0000;">'whatever'</span> <span style="color: #993333; font-weight: bold;">WITH</span> <span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #993333; font-weight: bold;">OPTION</span>;
<span style="color: #993333; font-weight: bold;">FLUSH</span> PRIVILEGES;</pre>
      </td>
    </tr>
  </table>
</div>

update:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">UPDATE</span> mysql<span style="color: #66cc66;">.</span><span style="color: #993333; font-weight: bold;">USER</span> <span style="color: #993333; font-weight: bold;">SET</span> Password <span style="color: #66cc66;">=</span> PASSWORD<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'NewPassword'</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">WHERE</span> <span style="color: #993333; font-weight: bold;">USER</span><span style="color: #66cc66;">=</span><span style="color: #ff0000;">'root'</span>;
<span style="color: #993333; font-weight: bold;">FLUSH</span> PRIVILEGES;</pre>
      </td>
    </tr>
  </table>
</div>

**4. Cleanup paths**  
This is just removing the pgsql and mysql from the current path

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">PATH</span>=<span style="color: #007800;">$PATH</span>:<span style="color: #007800;">$ORACLE_HOME</span>:<span style="color: #007800;">$MYSQL_HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #007800;">$CLANG_HOME</span>:<span style="color: #007800;">$ANDROID_HOME</span><span style="color: #000000; font-weight: bold;">/</span>tools:<span style="color: #007800;">$APACHE2_HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #007800;">$MAGICK_HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #007800;">$SPHINX_HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #007800;">$PGSQL_HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin</pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://stackoverflow.com/questions/4359131/brew-install-mysql-on-mac-os