---
title: rvm + cron + thinking_sphinx
author: rupert
layout: post
permalink: /2011/08/rvm-cron-thinking_sphinx/
categories:
  - rails
tags:
  - rais3
  - sphinx
---
1. Want to change crontab&#8217;s editor?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">EDITOR</span>=<span style="color: #c20cb9; font-weight: bold;">vim</span></pre>
      </td>
    </tr>
  </table>
</div>

2. crontab -e

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">PATH</span>=<span style="color: #000000; font-weight: bold;">/</span>sbin:<span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin
<span style="color: #000000;">30</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">*</span>  <span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>rvm-shell <span style="color: #ff0000;">'ruby-1.9.2-p180@travelspotsinasia'</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">'RAILS_ENV=production rake -f /srv/rails/travelspotsinasia/Rakefile thinking_sphinx:rebuild'</span> <span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #007800;">$HOME</span><span style="color: #000000; font-weight: bold;">/</span>travelspotsinasia.index.log</pre>
      </td>
    </tr>
  </table>
</div>

3. Didn&#8217;t work the first time. Argh.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">robin:~<span style="color: #000000; font-weight: bold;">%</span> mail 
Heirloom mailx version <span style="color: #000000;">12.4</span> <span style="color: #000000;">7</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">29</span><span style="color: #000000; font-weight: bold;">/</span>08.  Type ? <span style="color: #000000; font-weight: bold;">for</span> help.
<span style="color: #ff0000;">"/var/mail/rupert"</span>: <span style="color: #000000;">2</span> messages
<span style="color: #000000; font-weight: bold;">&gt;</span>O  <span style="color: #000000;">1</span> Cron Daemon        Mon Aug <span style="color: #000000;">22</span> <span style="color: #000000;">21</span>:08   <span style="color: #000000;">32</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1314</span>  Cron <span style="color: #000000; font-weight: bold;">&lt;</span>rupert<span style="color: #000000; font-weight: bold;">@</span>robin<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>rvm-shell <span style="color: #ff0000;">'ruby-1.9.2-p180@travelspotsinasia'</span> <span style="color: #660033;">-c</span> <span style="color: #ff0000;">'RAILS_ENV=producti
&nbsp;
Sphinx cannot be found on your system. You may need to configure the following
settings in your config/sphinx.yml file:
  * bin_path
  * searchd_binary_name
  * indexer_binary_name
&lt;/mail&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

4. Quick fix

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>sphinx<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>indexer indexer
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>sphinx<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>indextool indextool
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>sphinx<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>search search
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>sphinx<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>searchd searchd
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>sphinx<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>spelldump spelldump</pre>
      </td>
    </tr>
  </table>
</div>

5. Test by adjusting the date on cron. Wait for cron to kick in. Check the log file.  
Awesome.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">robin:~<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">tail</span> <span style="color: #660033;">-f</span> travelspotsinasia.index.log 
<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #7a0874; font-weight: bold;">&#41;</span>
Stopped search daemon <span style="color: #7a0874; font-weight: bold;">&#40;</span>pid <span style="color: #000000;">16831</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>.
Generating Configuration to <span style="color: #000000; font-weight: bold;">/</span>srv<span style="color: #000000; font-weight: bold;">/</span>rails<span style="color: #000000; font-weight: bold;">/</span>travelspotsinasia<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>production.sphinx.conf
Sphinx 0.9.9-release <span style="color: #7a0874; font-weight: bold;">&#40;</span>r2117<span style="color: #7a0874; font-weight: bold;">&#41;</span>
Copyright <span style="color: #7a0874; font-weight: bold;">&#40;</span>c<span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #000000;">2001</span>-<span style="color: #000000;">2009</span>, Andrew Aksyonoff
&nbsp;
using config <span style="color: #c20cb9; font-weight: bold;">file</span> <span style="color: #ff0000;">'/srv/rails/travelspotsinasia/config/production.sphinx.conf'</span>...
indexing index <span style="color: #ff0000;">'poi_core'</span>...
collected <span style="color: #000000;">10700</span> docs, <span style="color: #000000;">1.1</span> MB
sorted <span style="color: #000000;">0.2</span> Mhits, <span style="color: #000000;">100.0</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #000000; font-weight: bold;">done</span>
total <span style="color: #000000;">10700</span> docs, <span style="color: #000000;">1106049</span> bytes
total <span style="color: #000000;">0.363</span> sec, <span style="color: #000000;">3042131</span> bytes<span style="color: #000000; font-weight: bold;">/</span>sec, <span style="color: #000000;">29429.80</span> docs<span style="color: #000000; font-weight: bold;">/</span>sec
distributed index <span style="color: #ff0000;">'poi'</span> can not be directly indexed; skipping.
total <span style="color: #000000;">2</span> reads, <span style="color: #000000;">0.001</span> sec, <span style="color: #000000;">592.8</span> kb<span style="color: #000000; font-weight: bold;">/</span>call avg, <span style="color: #000000;">0.8</span> msec<span style="color: #000000; font-weight: bold;">/</span>call avg
total <span style="color: #000000;">7</span> writes, <span style="color: #000000;">0.005</span> sec, <span style="color: #000000;">393.1</span> kb<span style="color: #000000; font-weight: bold;">/</span>call avg, <span style="color: #000000;">0.7</span> msec<span style="color: #000000; font-weight: bold;">/</span>call avg
Started successfully <span style="color: #7a0874; font-weight: bold;">&#40;</span>pid <span style="color: #000000;">17764</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>.</pre>
      </td>
    </tr>
  </table>
</div>