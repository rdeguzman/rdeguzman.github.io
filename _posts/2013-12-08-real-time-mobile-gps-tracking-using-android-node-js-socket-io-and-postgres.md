---
title: Real time mobile GPS tracking using android, node.js, socket.io and postgres
author: rupert
layout: post
permalink: /2013/12/real-time-mobile-gps-tracking-using-android-node-js-socket-io-and-postgres/
dsq_needs_sync:
  - 1
categories:
  - android
  - postgres
tags:
  - android
  - nodejs
  - postgres
  - socket.io
---
UPDATE: Mar 3  
Updated apk, github repos and instructions

TLDR; For the impatient&#8230;

1. Download and install [itrackmygps.com][1] on your android device.

2. Register.

3. Enable GPS on your device. Let&#8217;s rock! Walk, run, drive with your android device. Be careful!

4. Share your location via SMS or provide this link: <http://itrackmygps.com/access?u=[your_username]> to your viewers.

5. Alternatively, you can login and see the map from <http://itrackmygps.com/current> and watch live gps updates from your device.

This post is about my experiments on how to display real time gps updates from a mobile client to a web browser. All the source code for this post is hosted on my [github.][2] 

[`https://github.com/rdeguzman/itrackmygps-android`][3]  
[`https://github.com/rdeguzman/itrackmygps-node`][4]

<img src="/images/2013/12/gpstracks_overview.png" alt="gpstracks_overview.png" border="0" width="1476" height="522" />

## Android Client

In a nutshell, an [android background service][5] listens for location (network and gps) updates. It saves the gps location details (lon/lat, speed, heading and timestamp) on a local sqlite database. Afterwards, it then posts it to a remote server via [Volley (an http library for android)][6].

I spruced it up a little bit by adding [Google Map for Android v2][7] on the main activity. Thus, you will definitely need your own [Google Map key][8] to run the android client.

<img src="/images/2013/12/android-map.png" alt="android-map.png" border="0" width="1238" height="1968" />

As not to drain the battery, a SettingsActivity provides basic configuration and control for time and distance interval.

<img src="/images/2013/12/android-settings.png" alt="android-settings.png" border="0" width="1238" height="1976" />

## Server backend

The backend is mainly [nodejs][9] using [socket.io][10] and saves the gps details thru [Postgres][11].

1. The nodejs `server.js` backend opens an http (8080) connection. We define a basic routing setup below. It has a `GET "/map"` route which delivers `map.html` to the web client.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;"><span style="color: #000066; font-weight: bold;">var</span> route <span style="color: #339933;">=</span> <span style="color: #009900;">&#123;</span>
  routes <span style="color: #339933;">:</span> <span style="color: #009900;">&#123;</span><span style="color: #009900;">&#125;</span><span style="color: #339933;">,</span>
  <span style="color: #000066; font-weight: bold;">for</span><span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>method<span style="color: #339933;">,</span> path<span style="color: #339933;">,</span> handler<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    <span style="color: #000066; font-weight: bold;">this</span>.<span style="color: #660066;">routes</span><span style="color: #009900;">&#91;</span>method <span style="color: #339933;">+</span> path<span style="color: #009900;">&#93;</span> <span style="color: #339933;">=</span> handler<span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span>
<span style="color: #009900;">&#125;</span>
&nbsp;
route.<span style="color: #000066; font-weight: bold;">for</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"GET"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"/map"</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>request<span style="color: #339933;">,</span> response<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
  fs.<span style="color: #660066;">readFile</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'./map.html'</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>error<span style="color: #339933;">,</span> data<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    response.<span style="color: #660066;">writeHead</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">200</span><span style="color: #339933;">,</span> <span style="color: #009900;">&#123;</span><span style="color: #3366CC;">"Content-Type"</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">"text/html"</span><span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    response.<span style="color: #660066;">end</span><span style="color: #009900;">&#40;</span>data<span style="color: #339933;">,</span> <span style="color: #3366CC;">'utf-8'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #000066; font-weight: bold;">function</span> onRequest<span style="color: #009900;">&#40;</span>request<span style="color: #339933;">,</span> response<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
  <span style="color: #000066; font-weight: bold;">var</span> pathname <span style="color: #339933;">=</span> url.<span style="color: #660066;">parse</span><span style="color: #009900;">&#40;</span>request.<span style="color: #660066;">url</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">pathname</span><span style="color: #339933;">;</span>
  console.<span style="color: #660066;">log</span><span style="color: #009900;">&#40;</span>request.<span style="color: #660066;">method</span> <span style="color: #339933;">+</span> <span style="color: #3366CC;">" request for "</span> <span style="color: #339933;">+</span> pathname<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
  <span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">typeof</span><span style="color: #009900;">&#40;</span>route.<span style="color: #660066;">routes</span><span style="color: #009900;">&#91;</span>request.<span style="color: #660066;">method</span> <span style="color: #339933;">+</span> pathname<span style="color: #009900;">&#93;</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">===</span> <span style="color: #3366CC;">'function'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    route.<span style="color: #660066;">routes</span><span style="color: #009900;">&#91;</span>request.<span style="color: #660066;">method</span> <span style="color: #339933;">+</span> pathname<span style="color: #009900;">&#93;</span><span style="color: #009900;">&#40;</span>request<span style="color: #339933;">,</span> response<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span>
  <span style="color: #000066; font-weight: bold;">else</span><span style="color: #009900;">&#123;</span>
    response.<span style="color: #660066;">writeHead</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">404</span><span style="color: #339933;">,</span> <span style="color: #009900;">&#123;</span><span style="color: #3366CC;">"Content-Type"</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">"text/plain"</span><span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    response.<span style="color: #660066;">end</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"404 not found"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span>
<span style="color: #009900;">&#125;</span>
&nbsp;
<span style="color: #000066; font-weight: bold;">var</span> server <span style="color: #339933;">=</span> http.<span style="color: #660066;">createServer</span><span style="color: #009900;">&#40;</span>onRequest<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
server.<span style="color: #660066;">listen</span><span style="color: #009900;">&#40;</span>port<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
console.<span style="color: #660066;">log</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"Server "</span> <span style="color: #339933;">+</span> port <span style="color: #339933;">+</span> <span style="color: #3366CC;">" has started."</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

2. The `POST "/location"` route will process all incoming location updates from our mobile clients (currently android, but iOS soon!).

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">route.<span style="color: #000066; font-weight: bold;">for</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"POST"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"/location"</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>request<span style="color: #339933;">,</span> response<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
  <span style="color: #000066; font-weight: bold;">var</span> form_data <span style="color: #339933;">=</span> <span style="color: #3366CC;">""</span><span style="color: #339933;">;</span>
  request.<span style="color: #660066;">on</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'data'</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>chunk<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    form_data <span style="color: #339933;">+=</span> chunk.<span style="color: #660066;">toString</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>
&nbsp;
  request.<span style="color: #660066;">on</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'end'</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    console.<span style="color: #660066;">log</span><span style="color: #009900;">&#40;</span>form_data<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
	insertLocation<span style="color: #009900;">&#40;</span>obj<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
    <span style="color: #000066; font-weight: bold;">var</span> obj <span style="color: #339933;">=</span> qs.<span style="color: #660066;">parse</span><span style="color: #009900;">&#40;</span>form_data<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    insertLocation<span style="color: #009900;">&#40;</span>obj<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
    response.<span style="color: #660066;">writeHead</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">200</span><span style="color: #339933;">,</span> <span style="color: #009900;">&#123;</span><span style="color: #3366CC;">"Content-Type"</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">"text/plain"</span><span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    response.<span style="color: #660066;">write</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"OK"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    response.<span style="color: #660066;">end</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

3. The function `insertLocation(obj)` saves the gps details in Postgres is pretty straightforward.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;"><span style="color: #000066; font-weight: bold;">function</span> insertLocation<span style="color: #009900;">&#40;</span>loc<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
  pg.<span style="color: #660066;">connect</span><span style="color: #009900;">&#40;</span>connectionString<span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>err<span style="color: #339933;">,</span> client<span style="color: #339933;">,</span> done<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    <span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>err<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
      console.<span style="color: #660066;">error</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'error fetching client from pool '</span><span style="color: #339933;">,</span> err<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span>
    <span style="color: #000066; font-weight: bold;">else</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">var</span> sqlStmt  <span style="color: #339933;">=</span> <span style="color: #3366CC;">"INSERT INTO locations("</span><span style="color: #339933;">;</span>
          sqlStmt <span style="color: #339933;">+=</span> <span style="color: #3366CC;">"device_id,"</span><span style="color: #339933;">;</span>
          sqlStmt <span style="color: #339933;">+=</span> <span style="color: #3366CC;">"gps_timestamp,"</span><span style="color: #339933;">;</span>
          sqlStmt <span style="color: #339933;">+=</span> <span style="color: #3366CC;">"gps_latitude,"</span><span style="color: #339933;">;</span>
          sqlStmt <span style="color: #339933;">+=</span> <span style="color: #3366CC;">"gps_longitude,"</span><span style="color: #339933;">;</span>
          sqlStmt <span style="color: #339933;">+=</span> <span style="color: #3366CC;">"gps_speed,"</span><span style="color: #339933;">;</span>
          sqlStmt <span style="color: #339933;">+=</span> <span style="color: #3366CC;">"gps_heading,"</span><span style="color: #339933;">;</span>
          sqlStmt <span style="color: #339933;">+=</span> <span style="color: #3366CC;">"created_at)"</span><span style="color: #339933;">;</span>
          sqlStmt <span style="color: #339933;">+=</span> <span style="color: #3366CC;">"VALUES ($1, $2, $3, $4, $5, $6, Now())"</span><span style="color: #339933;">;</span>
&nbsp;
      <span style="color: #000066; font-weight: bold;">var</span> sqlParams <span style="color: #339933;">=</span> <span style="color: #009900;">&#91;</span>loc.<span style="color: #660066;">device_id</span><span style="color: #339933;">,</span> loc.<span style="color: #660066;">gps_timestamp</span><span style="color: #339933;">,</span> loc.<span style="color: #660066;">gps_latitude</span><span style="color: #339933;">,</span> loc.<span style="color: #660066;">gps_longitude</span><span style="color: #339933;">,</span> loc.<span style="color: #660066;">gps_speed</span><span style="color: #339933;">,</span> loc.<span style="color: #660066;">gps_heading</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">;</span>
&nbsp;
      <span style="color: #000066; font-weight: bold;">var</span> query <span style="color: #339933;">=</span> client.<span style="color: #660066;">query</span><span style="color: #009900;">&#40;</span>sqlStmt<span style="color: #339933;">,</span> sqlParams<span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>err<span style="color: #339933;">,</span> result<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
        <span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>err<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
          console.<span style="color: #660066;">error</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'error inserting '</span><span style="color: #339933;">,</span> err<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        <span style="color: #009900;">&#125;</span>
        <span style="color: #000066; font-weight: bold;">else</span><span style="color: #009900;">&#123;</span>
          console.<span style="color: #660066;">log</span><span style="color: #009900;">&#40;</span>result<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        <span style="color: #009900;">&#125;</span>
&nbsp;
      <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
      done<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span>
  <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

4. We now open a socket.io object and listen thru the http server on port 8080. *Each time a browser is connected, its socket instance is pushed to an array*, in this case the `map_clients` object.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;"><span style="color: #000066; font-weight: bold;">var</span> server <span style="color: #339933;">=</span> http.<span style="color: #660066;">createServer</span><span style="color: #009900;">&#40;</span>onRequest<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
server.<span style="color: #660066;">listen</span><span style="color: #009900;">&#40;</span>port<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
console.<span style="color: #660066;">log</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"Server "</span> <span style="color: #339933;">+</span> port <span style="color: #339933;">+</span> <span style="color: #3366CC;">" has started."</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
io <span style="color: #339933;">=</span> io.<span style="color: #660066;">listen</span><span style="color: #009900;">&#40;</span>server<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
io.<span style="color: #660066;">sockets</span>.<span style="color: #660066;">on</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"connection"</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>client<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
&nbsp;
  <span style="color: #006600; font-style: italic;">// We push the map clients to an array.</span>
  <span style="color: #006600; font-style: italic;">// If a gps is received from a device,</span>
  <span style="color: #006600; font-style: italic;">// we broadcast the gps to all map clients.</span>
  console.<span style="color: #660066;">log</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"Map client connected"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  map_clients.<span style="color: #660066;">push</span><span style="color: #009900;">&#40;</span>client<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
  client.<span style="color: #660066;">on</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'disconnect'</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    map_clients.<span style="color: #660066;">splice</span><span style="color: #009900;">&#40;</span>map_clients.<span style="color: #660066;">indexOf</span><span style="color: #009900;">&#40;</span>client<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">1</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>
&nbsp;
<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

5. We modify our `POST "/location"` route and using the `map_clients` object, we loop over ALL connected sockets/`map_clients`, and send the incoming gps location update.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">route.<span style="color: #000066; font-weight: bold;">for</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"POST"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"/location"</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>request<span style="color: #339933;">,</span> response<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
  <span style="color: #000066; font-weight: bold;">var</span> form_data <span style="color: #339933;">=</span> <span style="color: #3366CC;">""</span><span style="color: #339933;">;</span>
  request.<span style="color: #660066;">on</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'data'</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>chunk<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    form_data <span style="color: #339933;">+=</span> chunk.<span style="color: #660066;">toString</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>
&nbsp;
  request.<span style="color: #660066;">on</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'end'</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    console.<span style="color: #660066;">log</span><span style="color: #009900;">&#40;</span>form_data<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
    <span style="color: #000066; font-weight: bold;">var</span> obj <span style="color: #339933;">=</span> qs.<span style="color: #660066;">parse</span><span style="color: #009900;">&#40;</span>form_data<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    insertLocation<span style="color: #009900;">&#40;</span>obj<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    console.<span style="color: #660066;">log</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"Connected clients: "</span> <span style="color: #339933;">+</span> map_clients.<span style="color: #660066;">length</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
    <span style="color: #000066; font-weight: bold;">for</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">var</span> i<span style="color: #339933;">=</span><span style="color: #CC0000;"></span><span style="color: #339933;">;</span> i <span style="color: #339933;">&lt;</span> map_clients.<span style="color: #660066;">length</span><span style="color: #339933;">;</span> i<span style="color: #339933;">++</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">var</span> client <span style="color: #339933;">=</span> map_clients<span style="color: #009900;">&#91;</span>i<span style="color: #009900;">&#93;</span><span style="color: #339933;">;</span>
      <span style="color: #000066; font-weight: bold;">var</span> jsonString <span style="color: #339933;">=</span> JSON.<span style="color: #660066;">stringify</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span> type<span style="color: #339933;">:</span><span style="color: #3366CC;">'gps'</span><span style="color: #339933;">,</span> data<span style="color: #339933;">:</span>obj<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      client.<span style="color: #660066;">send</span><span style="color: #009900;">&#40;</span>jsonString<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span>
&nbsp;
    response.<span style="color: #660066;">writeHead</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">200</span><span style="color: #339933;">,</span> <span style="color: #009900;">&#123;</span><span style="color: #3366CC;">"Content-Type"</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">"text/plain"</span><span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    response.<span style="color: #660066;">write</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"OK"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    response.<span style="color: #660066;">end</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

## Web client (viewer)

The web client displays a google map and sets its lonlat initially to 0,0. So don&#8217;t be surprised if you only see a blue ocean. Once a device sends a gps update, the map will automatically zoom to its position.

1. When a web client points its URL to [http://track.geocoding.io/map][12], the browser connects to the remote server on port 8080 using socket.io. It now listens for incoming messages from the server backend and pass the gps data to the `processGPS()` function.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">    <span style="color: #000066; font-weight: bold;">function</span> initSocket<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">var</span> socket_host <span style="color: #339933;">=</span> <span style="color: #3366CC;">"track.geocoding.io"</span><span style="color: #339933;">;</span>
      <span style="color: #000066; font-weight: bold;">var</span> socket_port <span style="color: #339933;">=</span> <span style="color: #CC0000;">8080</span><span style="color: #339933;">;</span>
&nbsp;
      socket <span style="color: #339933;">=</span> io.<span style="color: #660066;">connect</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'http://'</span> <span style="color: #339933;">+</span> socket_host <span style="color: #339933;">+</span> <span style="color: #3366CC;">':'</span> <span style="color: #339933;">+</span> socket_port<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
      socket.<span style="color: #660066;">on</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'message'</span><span style="color: #339933;">,</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>d<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
        <span style="color: #000066; font-weight: bold;">var</span> parsedObj <span style="color: #339933;">=</span> JSON.<span style="color: #660066;">parse</span><span style="color: #009900;">&#40;</span>d<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        <span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>parsedObj.<span style="color: #660066;">type</span> <span style="color: #339933;">===</span> <span style="color: #3366CC;">'gps'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
          <span style="color: #000066; font-weight: bold;">var</span> gps <span style="color: #339933;">=</span> parsedObj.<span style="color: #660066;">data</span><span style="color: #339933;">;</span>
          $<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'#messages'</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">append</span><span style="color: #009900;">&#40;</span>formatGPSHTMLOutput<span style="color: #009900;">&#40;</span>gps<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
          processGPS<span style="color: #009900;">&#40;</span>gps<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        <span style="color: #009900;">&#125;</span>
      <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

2. As the function `processGPS()` name implies, it process the location update coming from the server backend. *Each google.map.marker is a particular device*. To distinguish a gps update for a particular device, we use `gps.device_id` and search for the `device_id` element in the `devices` array.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">    <span style="color: #000066; font-weight: bold;">function</span> processGPS<span style="color: #009900;">&#40;</span>gps<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">var</span> device <span style="color: #339933;">=</span> getDevice<span style="color: #009900;">&#40;</span>gps.<span style="color: #660066;">device_id</span><span style="color: #339933;">,</span> devices<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>device <span style="color: #339933;">==</span> <span style="color: #003366; font-weight: bold;">null</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
        device <span style="color: #339933;">=</span> createDevice<span style="color: #009900;">&#40;</span>gps<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        devices.<span style="color: #660066;">push</span><span style="color: #009900;">&#40;</span>device<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #009900;">&#125;</span>
      <span style="color: #000066; font-weight: bold;">else</span><span style="color: #009900;">&#123;</span>
        moveDevice<span style="color: #009900;">&#40;</span>device<span style="color: #339933;">,</span> gps<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #009900;">&#125;</span>
    <span style="color: #009900;">&#125;</span>
&nbsp;
    <span style="color: #000066; font-weight: bold;">function</span> getDevice<span style="color: #009900;">&#40;</span>device_id<span style="color: #339933;">,</span> markers<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">var</span> device <span style="color: #339933;">=</span> <span style="color: #003366; font-weight: bold;">null</span><span style="color: #339933;">;</span>
&nbsp;
      <span style="color: #000066; font-weight: bold;">for</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">var</span> i <span style="color: #339933;">=</span> <span style="color: #CC0000;"></span><span style="color: #339933;">;</span> i <span style="color: #339933;">&lt;</span> markers.<span style="color: #660066;">length</span><span style="color: #339933;">;</span> i<span style="color: #339933;">++</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
        <span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>markers<span style="color: #009900;">&#91;</span>i<span style="color: #009900;">&#93;</span>.<span style="color: #660066;">device_id</span> <span style="color: #339933;">===</span> device_id<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
          device <span style="color: #339933;">=</span> markers<span style="color: #009900;">&#91;</span>i<span style="color: #009900;">&#93;</span><span style="color: #339933;">;</span>
          <span style="color: #000066; font-weight: bold;">break</span><span style="color: #339933;">;</span>
        <span style="color: #009900;">&#125;</span>
      <span style="color: #009900;">&#125;</span>
&nbsp;
      <span style="color: #000066; font-weight: bold;">return</span> device<span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

3. Once we know which device marker we need, base on the gps.device_id, it is simply a case of displaying the marker on the map. If the device marker does not exist yet, we call `createMarker()`. If the device marker already exist, then we move the particular marker based on its new position (lonlat), see `moveMarker()`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">    <span style="color: #000066; font-weight: bold;">var</span> map<span style="color: #339933;">,</span> devices_bounds<span style="color: #339933;">,</span> socket<span style="color: #339933;">;</span>
    <span style="color: #000066; font-weight: bold;">var</span> devices <span style="color: #339933;">=</span> <span style="color: #009900;">&#91;</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">;</span>
&nbsp;
    <span style="color: #000066; font-weight: bold;">function</span> initMap<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #006600; font-style: italic;">//var myLatlng = new google.maps.LatLng(-25.363882,131.044922); //Australia</span>
      <span style="color: #000066; font-weight: bold;">var</span> myLatlng <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> google.<span style="color: #660066;">maps</span>.<span style="color: #660066;">LatLng</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;"></span><span style="color: #339933;">,</span><span style="color: #CC0000;"></span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
      <span style="color: #000066; font-weight: bold;">var</span> mapOptions <span style="color: #339933;">=</span> <span style="color: #009900;">&#123;</span>
        center<span style="color: #339933;">:</span> myLatlng<span style="color: #339933;">,</span>
        zoom<span style="color: #339933;">:</span> <span style="color: #CC0000;">10</span>
      <span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span>
&nbsp;
      map <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> google.<span style="color: #660066;">maps</span>.<span style="color: #660066;">Map</span><span style="color: #009900;">&#40;</span>document.<span style="color: #660066;">getElementById</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'mapdiv'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> mapOptions<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      devices_bounds <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> google.<span style="color: #660066;">maps</span>.<span style="color: #660066;">LatLngBounds</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span>
&nbsp;
    <span style="color: #000066; font-weight: bold;">function</span> createDevice<span style="color: #009900;">&#40;</span>gps<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">var</span> pos <span style="color: #339933;">=</span> getLatLngFromString<span style="color: #009900;">&#40;</span>gps<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #000066; font-weight: bold;">var</span> marker <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> google.<span style="color: #660066;">maps</span>.<span style="color: #660066;">Marker</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span>
        position<span style="color: #339933;">:</span> pos<span style="color: #339933;">,</span>
        map<span style="color: #339933;">:</span> map
      <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
      marker.<span style="color: #000066; font-weight: bold;">set</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"device_id"</span><span style="color: #339933;">,</span> gps.<span style="color: #660066;">device_id</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      adjustMapBounds<span style="color: #009900;">&#40;</span>pos<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
      <span style="color: #000066; font-weight: bold;">return</span> marker<span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span>
&nbsp;
    <span style="color: #000066; font-weight: bold;">function</span> moveDevice<span style="color: #009900;">&#40;</span>device<span style="color: #339933;">,</span> gps<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">var</span> pos <span style="color: #339933;">=</span> getLatLngFromString<span style="color: #009900;">&#40;</span>gps<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      device.<span style="color: #660066;">setPosition</span><span style="color: #009900;">&#40;</span>pos<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      adjustMapBounds<span style="color: #009900;">&#40;</span>pos<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span>
&nbsp;
    <span style="color: #000066; font-weight: bold;">function</span> getLatLngFromString<span style="color: #009900;">&#40;</span>obj<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">var</span> lat <span style="color: #339933;">=</span> parseFloat<span style="color: #009900;">&#40;</span>obj.<span style="color: #660066;">gps_latitude</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> lon <span style="color: #339933;">=</span> parseFloat<span style="color: #009900;">&#40;</span>obj.<span style="color: #660066;">gps_longitude</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #000066; font-weight: bold;">return</span> <span style="color: #000066; font-weight: bold;">new</span> google.<span style="color: #660066;">maps</span>.<span style="color: #660066;">LatLng</span><span style="color: #009900;">&#40;</span>lat<span style="color: #339933;">,</span> lon<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

We add some google map smarties such as rendering all available markers/devices on the map.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">    <span style="color: #000066; font-weight: bold;">function</span> adjustMapBounds<span style="color: #009900;">&#40;</span>pos<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
      <span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>map.<span style="color: #660066;">getBounds</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">contains</span><span style="color: #009900;">&#40;</span>pos<span style="color: #009900;">&#41;</span> <span style="color: #339933;">==</span> <span style="color: #003366; font-weight: bold;">false</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
        devices_bounds.<span style="color: #660066;">extend</span><span style="color: #009900;">&#40;</span>pos<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        map.<span style="color: #660066;">fitBounds</span><span style="color: #009900;">&#40;</span>devices_bounds<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #009900;">&#125;</span>
    <span style="color: #009900;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

As the device sends location updates you can see the actual marker move on the web client&#8217;s map! If we have multiple viewers, each of those viewers will receive location updates as well in realtime. 

<img src="/images/2013/12/Screen-Shot-2013-12-08-at-3.12.06-pm.png" alt="Screen Shot 2013-12-08 at 3.12.06 pm.png" border="0" width="1578" height="1018" />

Hope you enjoy this post!

 [1]: https://github.com/rdeguzman/itrackmygps-android/tree/master/releases
 [2]: http://github.com/rdeguzman
 [3]: https://github.com/rdeguzman/itrackmygps-android
 [4]: https://github.com/rdeguzman/itrackmygps-node
 [5]: http://developer.android.com/guide/components/services.html
 [6]: https://android.googlesource.com/platform/frameworks/volley
 [7]: https://developers.google.com/maps/documentation/android/start#getting_the_google_maps_android_api_v2
 [8]: https://developers.google.com/maps/documentation/android/start#the_google_maps_api_key
 [9]: http://nodejs.org/
 [10]: http://socket.io/
 [11]: http://www.postgresql.org/
 [12]: http://track.geocoding.io:8080/map