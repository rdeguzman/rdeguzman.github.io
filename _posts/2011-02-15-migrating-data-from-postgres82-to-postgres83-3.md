---
title: Migrating postgres/postgis data (updated)
author: rupert
layout: post
permalink: /2011/02/migrating-data-from-postgres82-to-postgres83-3/
categories:
  - postgis
  - postgres
tags:
  - postgis
  - postgres
---
One of my hurdles recently is migrating data from my Debian Lenny Desktop Box (Postgres8.2.7/Postgis1.3.1) to my new MacBookPro Leopard(Postgres8.3.1/Postgis1.3.3). I found it out the hard way by inspecting the dump files manually.

1. pg_dump is your friend.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">pg_dump <span style="color: #660033;">--help</span></pre>
      </td>
    </tr>
  </table>
</div>

2. I strongly suggest if you have a big dump file (mine is 500MB) to split the schema from the data. 

Add &#8220;-s&#8221; to create the schema:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">pg_dump <span style="color: #660033;">-C</span> <span style="color: #660033;">-s</span> <span style="color: #660033;">-h</span> 127.0.0.1 <span style="color: #660033;">-U</span> lbs <span style="color: #660033;">-W</span> beijing <span style="color: #000000; font-weight: bold;">&gt;</span> beijing_20080507_schema.sql</pre>
      </td>
    </tr>
  </table>
</div>

Add &#8220;-a&#8221; to dump the data only:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">pg_dump <span style="color: #660033;">-a</span> <span style="color: #660033;">-h</span> 127.0.0.1 <span style="color: #660033;">-U</span> lbs <span style="color: #660033;">-W</span> beijing <span style="color: #000000; font-weight: bold;">&gt;</span> beijing_20080507_schema.sql</pre>
      </td>
    </tr>
  </table>
</div>

3. pg\_dump from an 8.2 would have statically linked liblwgeom to /usr/lib/postgresql/8.2/liblwgeom. You should change that to whereever your liblwgeom resides, mine is on /usr/local/pgsql/lib/liblwgeom. Just do a simple search and replace using vim on your file\_schema.sql

4. After editing the schema, we can now restore the structure of the database. Check for errors and manually update the schema if needs be.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">psql <span style="color: #660033;">-h</span> 127.0.0.1 <span style="color: #660033;">-U</span> beijing_4326 <span style="color: #000000; font-weight: bold;">&lt;</span> beijing_20080507_schema.sql</pre>
      </td>
    </tr>
  </table>
</div>

5. Ok, so now we have the structure ready, we can also check this from pgAdmin3. Have a good look on the functions and table structures if they are fully restored. 

6. Let&#8217;s load the data.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">psql <span style="color: #660033;">-h</span> 127.0.0.1 <span style="color: #660033;">-U</span> beijing_4326 <span style="color: #000000; font-weight: bold;">&lt;</span> beijing_20080507_data.sql</pre>
      </td>
    </tr>
  </table>
</div>