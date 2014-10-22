---
title: homebrew + postgresql9.0.4 + postgis.1.5.3 + proj4 + geos3.3.1 + osm2pgsql
author: rupert
layout: post
permalink: /2011/11/homebrew-postgresql9-0-4-postgis-1-5-3/
categories:
  - homebrew
  - osx
  - postgis
  - postgres
tags:
  - homebrew
  - osx
  - postgis
  - postgres
---
**For the impatient**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% /usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"
% brew install postgresql
% initdb -E utf8 -D /usr/local/var/postgres
% cp /usr/local/Cellar/postgresql/9.0.4/org.postgresql.postgres.plist ~/Library/LaunchAgents/
% launchctl load -w ~/Library/LaunchAgents/org.postgresql.postgres.plist
% psql -d postgres -f /usr/local/Cellar/postgresql/9.0.4/share/postgresql/contrib/adminpack.sql
% brew install proj
% brew install geos %you should really read below before running this
% brew install postgis or brew install --HEAD postgis to install postgis2 from svn
% createdb -E utf8 template_postgis
% psql -d template_postgis -f /usr/local/Cellar/postgis/1.5.3/share/postgis/postgis.sql
% psql -d template_postgis -f /usr/local/Cellar/postgis/1.5.3/share/postgis/spatial_ref_sys.sql</pre>
      </td>
    </tr>
  </table>
</div>

**1. Install homebrew**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">%open https://github.com/mxcl/homebrew
%open https://github.com/mxcl/homebrew/wiki/Installation
%/usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"</pre>
      </td>
    </tr>
  </table>
</div>

**2. Install Postgres**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">%brew install postgresql
....
If builds of PostgreSQL 9 are failing and you have version 8.x installed,
you may need to remove the previous version first. See:
  https://github.com/mxcl/homebrew/issues/issue/2510
&nbsp;
To build plpython against a specific Python, set PYTHON prior to brewing:
  PYTHON=/usr/local/bin/python  brew install postgresql
See:
  http://www.postgresql.org/docs/9.0/static/install-procedure.html
&nbsp;
&nbsp;
If this is your first install, create a database with:
  initdb /usr/local/var/postgres
&nbsp;
If this is your first install, automatically load on login with:
  mkdir -p ~/Library/LaunchAgents
  cp /usr/local/Cellar/postgresql/9.0.4/org.postgresql.postgres.plist ~/Library/LaunchAgents/
  launchctl load -w ~/Library/LaunchAgents/org.postgresql.postgres.plist
&nbsp;
If this is an upgrade and you already have the org.postgresql.postgres.plist loaded:
  launchctl unload -w ~/Library/LaunchAgents/org.postgresql.postgres.plist
  cp /usr/local/Cellar/postgresql/9.0.4/org.postgresql.postgres.plist ~/Library/LaunchAgents/
  launchctl load -w ~/Library/LaunchAgents/org.postgresql.postgres.plist
&nbsp;
Or start manually with:
  pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
&nbsp;
And stop with:
  pg_ctl -D /usr/local/var/postgres stop -s -m fast
&nbsp;
&nbsp;
Some machines may require provisioning of shared memory:
  http://www.postgresql.org/docs/current/static/kernel-resources.html%SYSVIPC
&nbsp;
If you want to install the postgres gem, including ARCHFLAGS is recommended:
    env ARCHFLAGS="-arch x86_64" gem install pg
&nbsp;
To install gems without sudo, see the Homebrew wiki.
==&gt; Summary
/usr/local/Cellar/postgresql/9.0.4: 2577 files, 35M, built in 3.1 minutes
brew install postgresql  188.73s user 62.38s system 106% cpu 3:55.06 total</pre>
      </td>
    </tr>
  </table>
</div>

**3. Postgres Post Installation. Initialize DB.**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% initdb -E utf8 -D /usr/local/var/postgres
The files belonging to this database system will be owned by user "rupert".
This user must also own the server process.
&nbsp;
The database cluster will be initialized with locale en_AU.UTF-8.
The default text search configuration will be set to "english".
&nbsp;
creating directory /usr/local/var/postgres ... ok
creating subdirectories ... ok
selecting default max_connections ... 20
selecting default shared_buffers ... 2400kB
creating configuration files ... ok
creating template1 database in /usr/local/var/postgres/base/1 ... ok
initializing pg_authid ... ok
initializing dependencies ... ok
creating system views ... ok
loading system objects' descriptions ... ok
creating conversions ... ok
creating dictionaries ... ok
setting privileges on built-in objects ... ok
creating information schema ... ok
loading PL/pgSQL server-side language ... ok
vacuuming database template1 ... ok
copying template1 to template0 ... ok
copying template1 to postgres ... ok
&nbsp;
WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the -A option the
next time you run initdb.
&nbsp;
Success. You can now start the database server using:
&nbsp;
    postgres -D /usr/local/var/postgres
or
    pg_ctl -D /usr/local/var/postgres -l logfile start</pre>
      </td>
    </tr>
  </table>
</div>

**4. Postgres Startup**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% cp /usr/local/Cellar/postgresql/9.0.4/org.postgresql.postgres.plist ~/Library/LaunchAgents/
% launchctl load -w ~/Library/LaunchAgents/org.postgresql.postgres.plist
%telnet 127.0.0.1 5432
Trying 127.0.0.1...
Connected to rupert-mbp.
Escape character is '^]'.
% psql -d postgres -f /usr/local/Cellar/postgresql/9.0.4/share/postgresql/contrib/adminpack.sql</pre>
      </td>
    </tr>
  </table>
</div>

**5. Postgis**  
Note this will install dependencies, PROJ4 and GEOS. At the time of writing this, we have a problem with GEOS. Need to update GEOS formula to 3.3.1. For more info read:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% open https://github.com/mxcl/homebrew/issues/8151
% open https://gist.github.com/1306088
% brew edit geos</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% brew install proj
% brew install geos
% brew install postgis OR brew install --HEAD postgis
% createdb -E utf8 template_postgis
% psql -d template_postgis -f /usr/local/Cellar/postgis/1.5.3/share/postgis/postgis.sql
% psql -d template_postgis -f /usr/local/Cellar/postgis/1.5.3/share/postgis/spatial_ref_sys.sql</pre>
      </td>
    </tr>
  </table>
</div>

**6. osm2pgsql**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% brew install osm2pgsql
==&gt; Checking out http://svn.openstreetmap.org/applications/utils/export/osm2pgsql/
==&gt; ./autogen.sh
==&gt; ./configure
==&gt; make
/usr/local/Cellar/osm2pgsql/HEAD: 6 files, 328K, built in 70 seconds</pre>
      </td>
    </tr>
  </table>
</div>

Ok.