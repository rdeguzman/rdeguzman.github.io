---
title: Nominatim (Reverse Geocoder) via PL/PYTHON for RubyOnRails Mapping App
author: rupert
layout: post
permalink: /2012/01/nominatim-reverse-geocoder-via-plpython-for-rubyonrails-app/
categories:
  - geocoding
  - google
tags:
  - geocoding
  - google
  - nominatim
---
Even google maps enterprise have restrictions on their geocoding/reverse-geocoding services, 100k if my memory serves me correctly. So, I have to rollout our own service to allow millions of lonlats for reverse geocoding. Have a look at [Nominatim][1], yes it&#8217;s opensource. If you need to get it up and running, have a read of my [nominatim installation via homebrew on OSX.][2]

The nominatim www interface which spits out <a href="http://open.mapquestapi.com/nominatim/v1/reverse?format=xml&#038;lat=-37.856206&#038;lon=145.233980" target="_blank"><code>xml/json</code></a> depending on the format parameter is done in php. 

Anyway, I wanted to expose/use this webservice for our Rails3 app. It will also be good if we don&#8217;t use the nominatim webservice all the time if the lonlat was already requested&#8211;caching.

**Python-Nominatim** <https://github.com/rdeguzman/python-nominatim>

This project was forked from [Austin&#8217;s Gabels python-nominatim. ][3] I added the ability to pass a `base_url` to the classes and added `reverse_geocode.py`. So assuming you have Python installed, you can do a reverse geocode like this&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="python" style="font-family:monospace;"><span style="color: #ff7700;font-weight:bold;">from</span> nominatim <span style="color: #ff7700;font-weight:bold;">import</span> ReverseGeocoder
client <span style="color: #66cc66;">=</span> ReverseGeocoder<span style="color: black;">&#40;</span><span style="color: #483d8b;">"http://127.0.0.1/nominatim/reverse.php?format=json"</span><span style="color: black;">&#41;</span>
response <span style="color: #66cc66;">=</span> client.<span style="color: black;">geocode</span><span style="color: black;">&#40;</span>-<span style="color: #ff4500;">37.856206</span><span style="color: #66cc66;">,</span> <span style="color: #ff4500;">145.233980</span><span style="color: black;">&#41;</span>
&nbsp;
<span style="color: #ff7700;font-weight:bold;">print</span> response<span style="color: black;">&#91;</span><span style="color: #483d8b;">'full_address'</span><span style="color: black;">&#93;</span>
<span style="color: #808080; font-style: italic;">#Amesbury Avenue, Wantirna, City of Knox, 3152, Australia</span></pre>
      </td>
    </tr>
  </table>
</div>

**PL/PYTHON**  
Now we wrap this python code via PL/PYTHON so Postgres can call it. Checkout [setup.sql][4]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">PROCEDURAL</span> <span style="color: #993333; font-weight: bold;">LANGUAGE</span> <span style="color: #ff0000;">'plpythonu'</span> HANDLER plpython_call_handler;
&nbsp;
<span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">OR</span> <span style="color: #993333; font-weight: bold;">REPLACE</span> <span style="color: #993333; font-weight: bold;">FUNCTION</span> reverse_geocode<span style="color: #66cc66;">&#40;</span>geocoding_url text<span style="color: #66cc66;">,</span> latitude <span style="color: #993333; font-weight: bold;">FLOAT</span><span style="color: #66cc66;">,</span> longitude <span style="color: #993333; font-weight: bold;">FLOAT</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">RETURNS</span>
  text
  <span style="color: #993333; font-weight: bold;">AS</span>
  $$
    import nominatim
    client <span style="color: #66cc66;">=</span> nominatim<span style="color: #66cc66;">.</span>ReverseGeocoder<span style="color: #66cc66;">&#40;</span>geocoding_url<span style="color: #66cc66;">&#41;</span>
    response <span style="color: #66cc66;">=</span> client<span style="color: #66cc66;">.</span>geocode<span style="color: #66cc66;">&#40;</span>latitude<span style="color: #66cc66;">,</span> longitude<span style="color: #66cc66;">&#41;</span>
    <span style="color: #993333; font-weight: bold;">RETURN</span> response<span style="color: #66cc66;">&#91;</span><span style="color: #ff0000;">'full_address'</span><span style="color: #66cc66;">&#93;</span>
  $$
  <span style="color: #993333; font-weight: bold;">LANGUAGE</span> <span style="color: #ff0000;">'plpythonu'</span>;</pre>
      </td>
    </tr>
  </table>
</div>

With the snippet above, we can now call this with a regular SELECT statement&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> reverse_geocode<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'http://127.0.0.1/nominatim/reverse.php?format=json'</span><span style="color: #66cc66;">,</span> <span style="color: #66cc66;">-</span><span style="color: #cc66cc;">37.856206</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">145.233980</span><span style="color: #66cc66;">&#41;</span>; 
                       reverse_geocode
  <span style="color: #808080; font-style: italic;">----------------------------------------------------------</span>
   Amesbury Avenue<span style="color: #66cc66;">,</span> Wantirna<span style="color: #66cc66;">,</span> City <span style="color: #993333; font-weight: bold;">OF</span> Knox<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">3152</span><span style="color: #66cc66;">,</span> Australia
  <span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span> <span style="color: #993333; font-weight: bold;">ROW</span><span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

**Rails ActiveRecord**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">    create_table <span style="color:#ff3333; font-weight:bold;">:locations</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>t<span style="color:#006600; font-weight:bold;">|</span>
      t.<span style="color:#CC0066; font-weight:bold;">float</span>    <span style="color:#ff3333; font-weight:bold;">:latitude</span>
      t.<span style="color:#CC0066; font-weight:bold;">float</span>    <span style="color:#ff3333; font-weight:bold;">:longitude</span>
      t.<span style="color:#9900CC;">text</span>     <span style="color:#ff3333; font-weight:bold;">:address</span>
    <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

In AR, I created a `location` model above and exposed a `reverse_geocode` method below

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> Location <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Base</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">reverse_geocode</span><span style="color:#006600; font-weight:bold;">&#40;</span>geocode_url, lat, lon<span style="color:#006600; font-weight:bold;">&#41;</span>
    sql_string = <span style="color:#996600;">"SELECT reverse_geocode('#{geocode_url}', #{lat}, #{lon}) as address, #{lat} as latitude, #{lon} as longitude"</span>
    loc_array = <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">find_by_sql</span> sql_string
    loc_array<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#006666;"></span><span style="color:#006600; font-weight:bold;">&#93;</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

So now, in one of my models, I could simply do..

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> ActiveSession <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Base</span>
...
  <span style="color:#9966CC; font-weight:bold;">def</span> location_address
    <span style="color:#9966CC; font-weight:bold;">if</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">has_gps</span>?
      loc = Location.<span style="color:#9900CC;">reverse_geocode</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'http://path/to/reverse.php?format=json'</span>, <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">gps_latitude</span>, <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">gps_longitude</span><span style="color:#006600; font-weight:bold;">&#41;</span>
      loc.<span style="color:#9900CC;">address</span>
    <span style="color:#9966CC; font-weight:bold;">else</span>
      <span style="color:#0000FF; font-weight:bold;">nil</span>
    <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
...
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

In the view, we can simple call `model.location_address` to retrieve the location details. Below is a code snippet which creates a google marker and adds the location details in the infoWindow.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;"><span style="color: #339933;">&lt;%</span> location <span style="color: #339933;">=</span> active_session.<span style="color: #660066;">location_address</span> <span style="color: #339933;">%&gt;</span>
&nbsp;
<span style="color: #000066; font-weight: bold;">var</span> latlong <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> google.<span style="color: #660066;">maps</span>.<span style="color: #660066;">LatLng</span><span style="color: #009900;">&#40;</span><span style="color: #339933;">&lt;%=</span> active_session.<span style="color: #660066;">gps_latitude</span> <span style="color: #339933;">%&gt;,</span> <span style="color: #339933;">&lt;%=</span> active_session.<span style="color: #660066;">gps_longitude</span> <span style="color: #339933;">%&gt;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #000066; font-weight: bold;">var</span> content <span style="color: #339933;">=</span> <span style="color: #3366CC;">'&lt;div style="width: 300px;"&gt;'</span><span style="color: #339933;">;</span>
content <span style="color: #339933;">=</span> content <span style="color: #339933;">+</span> <span style="color: #3366CC;">'&lt;p&gt;&lt;%= escape_javascript location %&gt;&lt;/p&gt;'</span><span style="color: #339933;">;</span>
content <span style="color: #339933;">=</span> content <span style="color: #339933;">+</span> <span style="color: #3366CC;">'&lt;p&gt;&lt;%= active_session.gps_longitude %&gt;,&lt;%= active_session.gps_latitude %&gt;&lt;/p&gt;'</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2012/01/marker.png" alt="marker.png" border="0" width="413" height="373" />

**Caching**  
Our last step is to improve performance via caching. I have opted to do this from the PL/PYTHON end but using a Rails activerecord model/table. This way, the Rails activerecord has no idea that it is cached when it calls `model.location_address`. Below, I wrap the new `reverse_geocode PL/PYTHON function` in a rails migration.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> CreateFunctionReverseGeocoder <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Migration</span>
  <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Base</span>.<span style="color:#9900CC;">connection</span>.<span style="color:#9900CC;">schema_search_path</span> = <span style="color:#996600;">"public"</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">up</span>
    execute <span style="color:#996600;">'CREATE OR REPLACE FUNCTION reverse_geocode(geocoding_url text, latitude float, longitude float) RETURNS
      text
      AS
      $$
        plan = plpy.prepare("SELECT address FROM locations WHERE latitude = $1 AND longitude = $2", [ "float", "float" ])
        rv = plpy.execute(plan, [ latitude, longitude ], 1)
&nbsp;
        if rv.nrows() &gt; 0:
          result = rv[0]["address"]
        else:
          import nominatim
          client = nominatim.ReverseGeocoder(geocoding_url)
          response = client.geocode(latitude, longitude)
          result = response["full_address"]
          insert_plan = plpy.prepare("INSERT INTO locations(latitude, longitude, address) VALUES($1, $2, $3)", ["float", "float", "text"])
          plpy.execute(insert_plan, [ latitude, longitude, result ])
&nbsp;
        return result
      $$
      language plpythonu;'</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">down</span>
    execute <span style="color:#996600;">'DROP FUNCTION IF EXISTS reverse_geocode(text, double precision, double precision);'</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

**Benchmarks**  
I plotted 1000 records on my MBP (old core2duo early 2009 4GB RAM). Initial launch takes 108 seconds to load, ~ 2 minutes? But subsequent requests loads < 2 secs.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">For 1000 records:
Completed 200 OK in 110478ms (Views: 1608.8ms | ActiveRecord: 108674.6ms)
Completed 200 OK in 1744ms (Views: 1110.7ms | ActiveRecord: 443.3ms)</pre>
      </td>
    </tr>
  </table>
</div>

Below is an architecture diagram of how the systems talk to each other. The locations cache is inside the geo\_app\_development db. Ofcourse, the nominatim database (gazetteer_au) is separate from our domain so it goes into a different db/server whereever.  
<img src="/images/2012/01/archi.png" alt="archi.png" border="0" width="604" height="534" />

 [1]: http://wiki.openstreetmap.org/wiki/Nominatim
 [2]: /wordpress/2011/11/nominatim-on-osx/
 [3]: https://github.com/agabel/python-nominatim.git
 [4]: https://github.com/rdeguzman/python-nominatim/blob/master/setup.sql