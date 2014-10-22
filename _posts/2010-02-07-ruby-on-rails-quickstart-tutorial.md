---
title: 'Rails Note #14: QuickStart Tutorial'
author: rupert
layout: post
permalink: /2010/02/ruby-on-rails-quickstart-tutorial/
categories:
  - rails
  - ruby
tags:
  - rails
  - rails3
---
If you haven&#8217;t installed ruby, follow this [post][1]

**Part 1: Installation and Configuration (Rails and Passenger)**

1. Upgrade existing ruby gems

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> gem list
<span style="color: #c20cb9; font-weight: bold;">sudo</span> gem update <span style="color: #660033;">--system</span></pre>
      </td>
    </tr>
  </table>
</div>

UPDATE: Took me 4 hours figuring this out. There was a problem when i run script/console that it will say the &#8220;gem&#8221; detected was 1.0.1 although the current gem version is 1.3.5 after gem update &#8211;system. Google didn&#8217;t helped out. But I was able to nail down the problem from this post:

[https://wincent.com/wiki/Upgrading\_to\_RubyGems\_1.0.1\_on\_Mac\_OS\_X\_10.5.1][2]  
In the post above, notice that rubygems 1.0.1 was installed in /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin. I guess this gem was being referenced first before the actual /usr/local/bin/gem. So I deleted this directory /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr.

Possible sources of gem installations:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.gem<span style="color: #000000; font-weight: bold;">/</span>ruby<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1.8</span><span style="color: #000000; font-weight: bold;">/</span>gems
<span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>Ruby<span style="color: #000000; font-weight: bold;">/</span>Gems<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1.8</span><span style="color: #000000; font-weight: bold;">/</span>gems</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:<span style="color: #000000;">1.8</span> rupert$ gem <span style="color: #c20cb9; font-weight: bold;">env</span>
RubyGems Environment:
  - RUBYGEMS VERSION: 1.3.5
  - RUBY VERSION: 1.8.6 <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">2008</span>-08-08 patchlevel <span style="color: #000000;">286</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>i686-darwin9.5.0<span style="color: #7a0874; font-weight: bold;">&#93;</span>
  - INSTALLATION DIRECTORY: <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>ruby<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1.8</span>
  - RUBY EXECUTABLE: <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>ruby
  - EXECUTABLE DIRECTORY: <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin
  - RUBYGEMS PLATFORMS:
    - ruby
    - x86-darwin-<span style="color: #000000;">9</span>
  - GEM PATHS:
     - <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>ruby<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1.8</span>
     - <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.gem<span style="color: #000000; font-weight: bold;">/</span>ruby<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1.8</span>
  - GEM CONFIGURATION:
     - :update_sources =<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #c20cb9; font-weight: bold;">true</span>
     - :verbose =<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #c20cb9; font-weight: bold;">true</span>
     - :benchmark =<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #c20cb9; font-weight: bold;">false</span>
     - :backtrace =<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #c20cb9; font-weight: bold;">false</span>
     - :bulk_threshold =<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #000000;">1000</span>
  - REMOTE SOURCES:
     - http:<span style="color: #000000; font-weight: bold;">//</span>gems.rubyforge.org<span style="color: #000000; font-weight: bold;">/</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Install rails. Download from ruby-forge. Link?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">gem <span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-V</span> rails-2.3.3.gem
gem <span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-V</span> mysql</pre>
      </td>
    </tr>
  </table>
</div>

3. Install and configure passenger for Apache2

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">gem <span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-V</span> passenger
<span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.gem<span style="color: #000000; font-weight: bold;">/</span>ruby<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1.8</span><span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>passenger-2.2.5<span style="color: #000000; font-weight: bold;">/</span>bin
passenger-install-apache2-module</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">469 LoadModule passenger_module /Users/rupert/.gem/ruby/1.8/gems/passenger-2.2.5/ext/apache2/mod_passenger.so
470 PassengerRoot /Users/rupert/.gem/ruby/1.8/gems/passenger-2.2.5
471 PassengerRuby /usr/local/bin/ruby
472 
473 &lt;VirtualHost *:80&gt;
474   RailsBaseURI /rails/travelsiteph
475 &lt;/VirtualHost&gt;</pre>
      </td>
    </tr>
  </table>
</div>

4. Create a sample rails project (&#8220;travelsiteph&#8221;) in your project directory (&#8220;/Users/rupert/projects/rails&#8221;).

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>rails
$ rails travelisteph
      create  
      create  app<span style="color: #000000; font-weight: bold;">/</span>controllers
      create  app<span style="color: #000000; font-weight: bold;">/</span>helpers
      create  app<span style="color: #000000; font-weight: bold;">/</span>models
      create  app<span style="color: #000000; font-weight: bold;">/</span>views<span style="color: #000000; font-weight: bold;">/</span>layouts
      create  config<span style="color: #000000; font-weight: bold;">/</span>environments
	.....
$ <span style="color: #c20cb9; font-weight: bold;">ls</span> <span style="color: #660033;">-la</span> travelsiteph
drwxr-xr-x  <span style="color: #000000;">15</span> rupert  admin    <span style="color: #000000;">510</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> .
drwxr-xr-x   <span style="color: #000000;">5</span> rupert  admin    <span style="color: #000000;">170</span> <span style="color: #000000;">30</span> Sep <span style="color: #000000;">16</span>:<span style="color: #000000;">31</span> ..
<span style="color: #660033;">-rw-r--r--</span>   <span style="color: #000000;">1</span> rupert  admin  <span style="color: #000000;">10011</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> README
<span style="color: #660033;">-rw-r--r--</span>   <span style="color: #000000;">1</span> rupert  admin    <span style="color: #000000;">307</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> Rakefile
drwxr-xr-x   <span style="color: #000000;">6</span> rupert  admin    <span style="color: #000000;">204</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> app
drwxr-xr-x   <span style="color: #000000;">9</span> rupert  admin    <span style="color: #000000;">306</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> config
drwxr-xr-x   <span style="color: #000000;">4</span> rupert  admin    <span style="color: #000000;">136</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">18</span> db
drwxr-xr-x   <span style="color: #000000;">3</span> rupert  admin    <span style="color: #000000;">102</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> doc
drwxr-xr-x   <span style="color: #000000;">3</span> rupert  admin    <span style="color: #000000;">102</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> lib
drwxr-xr-x   <span style="color: #000000;">6</span> rupert  admin    <span style="color: #000000;">204</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> log
drwxr-xr-x  <span style="color: #000000;">11</span> rupert  admin    <span style="color: #000000;">374</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> public
drwxr-xr-x  <span style="color: #000000;">11</span> rupert  admin    <span style="color: #000000;">374</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> script
drwxr-xr-x   <span style="color: #000000;">8</span> rupert  admin    <span style="color: #000000;">272</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">55</span> <span style="color: #7a0874; font-weight: bold;">test</span>
drwxr-xr-x   <span style="color: #000000;">6</span> rupert  admin    <span style="color: #000000;">204</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">22</span>:07 tmp
drwxr-xr-x   <span style="color: #000000;">3</span> rupert  admin    <span style="color: #000000;">102</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">21</span>:<span style="color: #000000;">14</span> vendor</pre>
      </td>
    </tr>
  </table>
</div>

I have /wwwroot as my document WebRoot. Its running cf, php and mapserv (cgi-bin). Since I want to mix it with rails development, I&#8217;ll just make a rails subdirectory. Inside the rails subdirectory, I can create symbolic links to my rails applications located in my projects directory. This way, rails configuration is not exposed from Apache.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>wwwroot
<span style="color: #c20cb9; font-weight: bold;">mkdir</span> rails
<span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>rails<span style="color: #000000; font-weight: bold;">/</span>travelsiteph<span style="color: #000000; font-weight: bold;">/</span>public travelsiteph
&nbsp;
$ <span style="color: #c20cb9; font-weight: bold;">ls</span> <span style="color: #660033;">-la</span>
total <span style="color: #000000;">8</span>
drwxr-xr-x   <span style="color: #000000;">3</span> rupert  admin   <span style="color: #000000;">102</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">14</span>:09 .
drwxrwxr-x  <span style="color: #000000;">60</span> root    admin  <span style="color: #000000;">2040</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">14</span>:08 ..
lrwxr-xr-x   <span style="color: #000000;">1</span> rupert  admin    <span style="color: #000000;">42</span>  <span style="color: #000000;">2</span> Sep <span style="color: #000000;">14</span>:09 travelsiteph -<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>rails<span style="color: #000000; font-weight: bold;">/</span>travelsiteph<span style="color: #000000; font-weight: bold;">/</span>public</pre>
      </td>
    </tr>
  </table>
</div>

5. Restart Apache to take the new configuration

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>StartupItems<span style="color: #000000; font-weight: bold;">/</span>Apache2<span style="color: #000000; font-weight: bold;">/</span>Apache2 restart</pre>
      </td>
    </tr>
  </table>
</div>

6. Open http://127.0.0.1/rails/travelsiteph/

*But for development purposes, it is better to use http://127.0.0.1:3000/ to see immediately any changes in code.* 

<img src="/images/2009/09/rails.png" alt="rails.png" border="0" width="150" height="108" />

**Part 2: Rails Development**  
MySQL Prerequisites:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #993333; font-weight: bold;">ALL</span> PRIVILEGES <span style="color: #993333; font-weight: bold;">ON</span> <span style="color: #66cc66;">*.*</span> <span style="color: #993333; font-weight: bold;">TO</span> rupert@<span style="color: #ff0000;">'%'</span> <span style="color: #993333; font-weight: bold;">IDENTIFIED</span> <span style="color: #993333; font-weight: bold;">BY</span> <span style="color: #ff0000;">'*************'</span> <span style="color: #993333; font-weight: bold;">WITH</span> <span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #993333; font-weight: bold;">OPTION</span>;
$ mysql <span style="color: #66cc66;">-</span>u rupert <span style="color: #66cc66;">-</span>p</pre>
      </td>
    </tr>
  </table>
</div>

1. Create three databases:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;">mysql<span style="color: #66cc66;">&gt;</span> <span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">DATABASE</span> travelsiteph_development;
Query OK<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span> <span style="color: #993333; font-weight: bold;">ROW</span> affected <span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">0.00</span> sec<span style="color: #66cc66;">&#41;</span>
&nbsp;
mysql<span style="color: #66cc66;">&gt;</span> <span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">DATABASE</span> travelsiteph_test;
Query OK<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span> <span style="color: #993333; font-weight: bold;">ROW</span> affected <span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">0.00</span> sec<span style="color: #66cc66;">&#41;</span>
&nbsp;
mysql<span style="color: #66cc66;">&gt;</span> <span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">DATABASE</span> travelsiteph_deployment;
Query OK<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span> <span style="color: #993333; font-weight: bold;">ROW</span> affected <span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">0.00</span> sec<span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Launch Textmate

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>rails<span style="color: #000000; font-weight: bold;">/</span>travelsiteph
mate .</pre>
      </td>
    </tr>
  </table>
</div>

3. Edit database.yml

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="yml" style="font-family:monospace;">development:
  adapter: mysql
  database: travelsiteph_development
  username: root
  password: xxxxxxx
  host: localhost
&nbsp;
test:
  adapter: mysql
  database: travelsiteph_test
  username: root
  password: xxxxxxx
  host: localhost
&nbsp;
production:
  adapter: mysql
  database: travelsiteph_deployment
  username: root
  password: xxxxxxx
  host: localhost</pre>
      </td>
    </tr>
  </table>
</div>

4. Generate a Poi model. *The model should be capitalized and singular.*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ ruby script<span style="color: #000000; font-weight: bold;">/</span>generate model Poi
      exists  app<span style="color: #000000; font-weight: bold;">/</span>models<span style="color: #000000; font-weight: bold;">/</span>
      exists  test<span style="color: #000000; font-weight: bold;">/</span>unit<span style="color: #000000; font-weight: bold;">/</span>
      exists  test<span style="color: #000000; font-weight: bold;">/</span>fixtures<span style="color: #000000; font-weight: bold;">/</span>
      create  app<span style="color: #000000; font-weight: bold;">/</span>models<span style="color: #000000; font-weight: bold;">/</span>poi.rb
      create  test<span style="color: #000000; font-weight: bold;">/</span>unit<span style="color: #000000; font-weight: bold;">/</span>poi_test.rb
      create  test<span style="color: #000000; font-weight: bold;">/</span>fixtures<span style="color: #000000; font-weight: bold;">/</span>pois.yml
      create  db<span style="color: #000000; font-weight: bold;">/</span>migrate
      create  db<span style="color: #000000; font-weight: bold;">/</span>migrate<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">20090902111538</span>_create_pois.rb</pre>
      </td>
    </tr>
  </table>
</div>

5. Now let&#8217;s create the database table for Poi using migrations.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> Poi <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Migration</span>
  <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">up</span>
    create_table <span style="color:#ff3333; font-weight:bold;">:pois</span>, <span style="color:#ff3333; font-weight:bold;">:id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#ff3333; font-weight:bold;">:poi_id</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>t<span style="color:#006600; font-weight:bold;">|</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:name</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:full_address</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:location</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:get_there</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:short_description</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:full_description</span>, <span style="color:#ff3333; font-weight:bold;">:text</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:other_info</span>, <span style="color:#ff3333; font-weight:bold;">:text</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:tel_no</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:fax_no</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:mobile_no</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:email</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:website</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:other_contact_details</span>, <span style="color:#ff3333; font-weight:bold;">:text</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:longitude</span>, <span style="color:#ff3333; font-weight:bold;">:decimal</span>, <span style="color:#ff3333; font-weight:bold;">:precision</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">10</span>, <span style="color:#ff3333; font-weight:bold;">:scale</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">7</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:latitude</span>, <span style="color:#ff3333; font-weight:bold;">:decimal</span>, <span style="color:#ff3333; font-weight:bold;">:precision</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">10</span>, <span style="color:#ff3333; font-weight:bold;">:scale</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">7</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:created_at</span>, <span style="color:#ff3333; font-weight:bold;">:timestamp</span>
      t.<span style="color:#9900CC;">column</span> <span style="color:#ff3333; font-weight:bold;">:updated_at</span>, <span style="color:#ff3333; font-weight:bold;">:timestamp</span>
      t.<span style="color:#9900CC;">timestamps</span>
    <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">down</span>
    drop_table <span style="color:#ff3333; font-weight:bold;">:pois</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ rake db:migrate
<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>rails<span style="color: #000000; font-weight: bold;">/</span>travelsiteph<span style="color: #7a0874; font-weight: bold;">&#41;</span>
==  CreatePois: migrating =========================================
<span style="color: #660033;">--</span> create_table<span style="color: #7a0874; font-weight: bold;">&#40;</span>:point_of_interests, <span style="color: #7a0874; font-weight: bold;">&#123;</span>:<span style="color: #007800;">id</span>=<span style="color: #000000; font-weight: bold;">&gt;</span>:poi_id<span style="color: #7a0874; font-weight: bold;">&#125;</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
   -<span style="color: #000000; font-weight: bold;">&gt;</span> 0.0353s
==  CreatePois: migrated <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.0362s<span style="color: #7a0874; font-weight: bold;">&#41;</span> ================================</pre>
      </td>
    </tr>
  </table>
</div>

6. Generate a Poi controller.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ script<span style="color: #000000; font-weight: bold;">/</span>generate controller Poi
      exists  app<span style="color: #000000; font-weight: bold;">/</span>controllers<span style="color: #000000; font-weight: bold;">/</span>
      exists  app<span style="color: #000000; font-weight: bold;">/</span>helpers<span style="color: #000000; font-weight: bold;">/</span>
      create  app<span style="color: #000000; font-weight: bold;">/</span>views<span style="color: #000000; font-weight: bold;">/</span>poi
      create  test<span style="color: #000000; font-weight: bold;">/</span>functional<span style="color: #000000; font-weight: bold;">/</span>
      create  test<span style="color: #000000; font-weight: bold;">/</span>unit<span style="color: #000000; font-weight: bold;">/</span>helpers<span style="color: #000000; font-weight: bold;">/</span>
      create  app<span style="color: #000000; font-weight: bold;">/</span>controllers<span style="color: #000000; font-weight: bold;">/</span>poi_controller.rb
      create  test<span style="color: #000000; font-weight: bold;">/</span>functional<span style="color: #000000; font-weight: bold;">/</span>poi_controller_test.rb
      create  app<span style="color: #000000; font-weight: bold;">/</span>helpers<span style="color: #000000; font-weight: bold;">/</span>poi_helper.rb
      create  test<span style="color: #000000; font-weight: bold;">/</span>unit<span style="color: #000000; font-weight: bold;">/</span>helpers<span style="color: #000000; font-weight: bold;">/</span>poi_helper_test.rb</pre>
      </td>
    </tr>
  </table>
</div>

7. Add a *list* function to Poi Controller

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> PoiController <span style="color:#006600; font-weight:bold;">&lt;</span> ApplicationController
  <span style="color:#9966CC; font-weight:bold;">def</span> list
    <span style="color:#0066ff; font-weight:bold;">@pois</span> = Poi.<span style="color:#9900CC;">find</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:all</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

8. Lets test. Open a browser and point to http://127.0.0.1:3000/travelsiteph/poi/list

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666;">$</span>ruby script<span style="color: #000000; font-weight: bold;">/</span>server</pre>
      </td>
    </tr>
  </table>
</div>

9. Now create the view *list.rhtml* in *views/poi/*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="rails" style="font-family:monospace;"><span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">if</span> <span style="color:#0066ff; font-weight:bold;">@pois</span>.<span style="color:#9900CC;">blank</span>? <span style="color:#006600; font-weight:bold;">%&gt;</span>
&nbsp;
	&lt;p&gt;There are currently no pois in the system. &lt;/p&gt;
&nbsp;
<span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">else</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
&nbsp;
	&lt;p&gt;These are the pois in the system: &lt;/p&gt;
&nbsp;
	&lt;ul&gt;
		<span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#0066ff; font-weight:bold;">@pois</span>.<span style="color:#5A0A0A; font-weight:bold;">each</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>poi<span style="color:#006600; font-weight:bold;">|</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
			&lt;li&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= <span style="color:#5A0A0A; font-weight:bold;">link_to</span> poi.<span style="color:#9900CC;">name</span>, <span style="color:#006600; font-weight:bold;">&#123;</span>:action <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'show'</span>, <span style="color:#ff3333; font-weight:bold;">:id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> poi.<span style="color:#9900CC;">id</span><span style="color:#006600; font-weight:bold;">&#125;</span> <span style="color:#006600; font-weight:bold;">-%&gt;</span>&lt;/li&gt;
		<span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
	&lt;/ul&gt;
&nbsp;
<span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

**Part 3: Deploying**  
1. set RAILS_ENV to production

<pre>export RAILS_ENV=production</pre>

2. Make sure to populate the database in production mode, run rake db:migrate

3. Capistrano

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">set <span style="color:#ff3333; font-weight:bold;">:port</span>, <span style="color:#006666;">2210</span>
set <span style="color:#ff3333; font-weight:bold;">:application</span>, <span style="color:#996600;">"halalan2010"</span>
<span style="color:#008000; font-style:italic;">#set :repository,  "svn+ssh://2rmobile.com/data/repos/web/rails/halalan2010/"</span>
set <span style="color:#ff3333; font-weight:bold;">:repository</span>,  <span style="color:#996600;">"http://2rmobile.com/repos/web/rails/halalan2010/"</span>
&nbsp;
set <span style="color:#ff3333; font-weight:bold;">:scm</span>, <span style="color:#ff3333; font-weight:bold;">:subversion</span>
set <span style="color:#ff3333; font-weight:bold;">:scm_username</span>, <span style="color:#996600;">'rupert'</span>
set <span style="color:#ff3333; font-weight:bold;">:scm_password</span>, <span style="color:#CC0066; font-weight:bold;">proc</span><span style="color:#006600; font-weight:bold;">&#123;</span><span style="color:#6666ff; font-weight:bold;">Capistrano::CLI</span>.<span style="color:#9900CC;">password_prompt</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'SVN pass:'</span><span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">&#125;</span>
<span style="color:#008000; font-style:italic;"># Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`</span>
&nbsp;
role <span style="color:#ff3333; font-weight:bold;">:web</span>, <span style="color:#996600;">"2rmobile.com"</span> <span style="color:#008000; font-style:italic;"># IP Your HTTP server, Apache/etc</span>
role <span style="color:#ff3333; font-weight:bold;">:app</span>, <span style="color:#996600;">"2rmobile.com"</span> <span style="color:#008000; font-style:italic;"># This may be the same as your `Web` server</span>
role <span style="color:#ff3333; font-weight:bold;">:db</span>,  <span style="color:#996600;">"2rmobile.com"</span>, <span style="color:#ff3333; font-weight:bold;">:primary</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0000FF; font-weight:bold;">true</span> <span style="color:#008000; font-style:italic;"># This is where Rails migrations will run</span>
<span style="color:#008000; font-style:italic;">#role :db,  "your slave db-server here"</span>
&nbsp;
set <span style="color:#ff3333; font-weight:bold;">:user</span>,  <span style="color:#996600;">"rupert"</span>
set <span style="color:#ff3333; font-weight:bold;">:runner</span>, <span style="color:#996600;">"rupert"</span>
set <span style="color:#ff3333; font-weight:bold;">:deploy_to</span>, <span style="color:#996600;">"/opt/rails/#{application}"</span>
&nbsp;
<span style="color:#008000; font-style:italic;"># If you are using Passenger mod_rails uncomment this:</span>
<span style="color:#008000; font-style:italic;"># if you're still using the script/reapear helper you will need</span>
<span style="color:#008000; font-style:italic;"># these http://github.com/rails/irs_process_scripts</span>
&nbsp;
namespace <span style="color:#ff3333; font-weight:bold;">:deploy</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  task <span style="color:#ff3333; font-weight:bold;">:start</span> <span style="color:#9966CC; font-weight:bold;">do</span>
    run <span style="color:#996600;">"/etc/init.d/apache2 start"</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
  task <span style="color:#ff3333; font-weight:bold;">:stop</span> <span style="color:#9966CC; font-weight:bold;">do</span>
    run <span style="color:#996600;">"/etc/init.d/apache2 stop"</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
  task <span style="color:#ff3333; font-weight:bold;">:restart</span>, <span style="color:#ff3333; font-weight:bold;">:roles</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#ff3333; font-weight:bold;">:app</span>, <span style="color:#ff3333; font-weight:bold;">:except</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#123;</span> <span style="color:#ff3333; font-weight:bold;">:no_release</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0000FF; font-weight:bold;">true</span> <span style="color:#006600; font-weight:bold;">&#125;</span> <span style="color:#9966CC; font-weight:bold;">do</span>
     run <span style="color:#996600;">"#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
  task <span style="color:#ff3333; font-weight:bold;">:production</span> <span style="color:#9966CC; font-weight:bold;">do</span>
    run <span style="color:#996600;">"export RAILS_ENV=production"</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
namespace <span style="color:#ff3333; font-weight:bold;">:db</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  task <span style="color:#ff3333; font-weight:bold;">:seed</span> <span style="color:#9966CC; font-weight:bold;">do</span>
    run <span style="color:#996600;">"cd #{deploy_to}/current && RAILS_ENV=production rake db:seed"</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
  task <span style="color:#ff3333; font-weight:bold;">:populate</span> <span style="color:#9966CC; font-weight:bold;">do</span>
    run <span style="color:#996600;">"cd #{deploy_to}/current && RAILS_ENV=production rake db:populate"</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

Capistrano commands I normally use:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">#on local
#cap deploy:setup
&nbsp;
#on remote and change owner and permissions of project
sudo chown -Rf rupert:root halalan2010
&nbsp;
#on local
#cap deploy
#cap db:seed
#cap db:populate</pre>
      </td>
    </tr>
  </table>
</div>

**Part 4: Miscellaneous**

**1. Get a description or rake commands**

<pre>rake -D db</pre>

**2. How to populate the database in production mode?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="console" style="font-family:monospace;">rupert:halalan2010 rupert$ export RAILS_ENV=production
rupert:halalan2010 rupert$ rake db:migrate
(in /Users/rupert/projects/rails/halalan2010)
==  CreateDatabase: migrating =================================================
-- create_table(:candidates)
   -&gt; 0.0036s
-- create_table(:voters)
   -&gt; 0.0031s
-- create_table(:votes)
   -&gt; 0.0027s
==  CreateDatabase: migrated (0.0100s) ========================================</pre>
      </td>
    </tr>
  </table>
</div>

<http://blog.airbladesoftware.com/2009/4/10/avoid-typing-rails_env-all-the-time>

**3. Uninstall specific gem version**

<pre>gem uninstall activesupport -v 2.2.2
</pre>

**4 Add a source to gem**

<pre>rupert:rails rupert$ sudo gem sources -a http://gems.github.com
http://gems.github.com added to sources
</pre>

**5. Adding a rails project in svn**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#create a remote dir</span>
<span style="color: #c20cb9; font-weight: bold;">svn mkdir</span> http:<span style="color: #000000; font-weight: bold;">//</span>www.2rmobile.com<span style="color: #000000; font-weight: bold;">/</span>repos<span style="color: #000000; font-weight: bold;">/</span>web<span style="color: #000000; font-weight: bold;">/</span>rails<span style="color: #000000; font-weight: bold;">/</span>virginmobilechecker
&nbsp;
<span style="color: #666666; font-style: italic;">#checkout and copy all files</span>
<span style="color: #7a0874; font-weight: bold;">cd</span> ~<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>rails
<span style="color: #c20cb9; font-weight: bold;">mv</span> virginmobilechecker virginmobilechecker_old
<span style="color: #c20cb9; font-weight: bold;">svn co</span> <span style="color: #ff0000;">"svn+ssh://2rmobile.com/data/repos/web/rails/virginmobilechecker"</span> virginmobilechecker
<span style="color: #c20cb9; font-weight: bold;">mv</span> virginmobilechecker_old<span style="color: #000000; font-weight: bold;">/*</span> virginmobilechecker<span style="color: #000000; font-weight: bold;">/</span>
<span style="color: #7a0874; font-weight: bold;">cd</span> virginmobilechecker
<span style="color: #c20cb9; font-weight: bold;">svn add</span> <span style="color: #000000; font-weight: bold;">*</span>
&nbsp;
<span style="color: #666666; font-style: italic;">#ignoring log files</span>
<span style="color: #c20cb9; font-weight: bold;">svn revert</span> log<span style="color: #000000; font-weight: bold;">/*</span>
<span style="color: #c20cb9; font-weight: bold;">svn propset</span> svn:ignore <span style="color: #ff0000;">"*.log"</span> log
<span style="color: #c20cb9; font-weight: bold;">svn propset</span> svn:ignore <span style="color: #ff0000;">"*"</span> tmp
<span style="color: #c20cb9; font-weight: bold;">svn propset</span> svn:ignore <span style="color: #ff0000;">"*"</span> doc
&nbsp;
<span style="color: #666666; font-style: italic;">#commit the files</span>
<span style="color: #c20cb9; font-weight: bold;">svn commit</span> <span style="color: #660033;">-m</span> <span style="color: #ff0000;">"first commit"</span> <span style="color: #000000; font-weight: bold;">*</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: /wordpress/2008/11/getting-my-feet-wet-in-ruby-on-rails/
 [2]: https://wincent.com/wiki/Upgrading_to_RubyGems_1.0.1_on_Mac_OS_X_10.5.1