---
title: 'Rails Note #6: Pagination'
author: rupert
layout: post
permalink: /2008/11/ruby-on-rails-pagination/
aktt_tweeted:
  - 1
categories:
  - rails
  - ruby
tags:
  - rails
  - ruby
---
1. will_paginate docs  
Main <http://github.com/mislav/will_paginate/wikis>  
Reference <http://mislav.uniqpath.com/static/will_paginate/doc/>  
Clone URL: [git://github.com/mislav/will_paginate.git][1]

2. Installation as a gem  
<http://github.com/mislav/will_paginate/wikis/installation>  
gem sources -a http://gems.github.com

Once installed, do **script/server** 

3. Controller

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> PoiAppController <span style="color:#006600; font-weight:bold;">&lt;</span> ApplicationController 
  <span style="color:#9966CC; font-weight:bold;">def</span> poi_by_category
	mylimit = <span style="color:#006666;">100</span>
    sql = <span style="color:#996600;">"SELECT pa.* FROM poi_apps pa WHERE pa.id IN "</span> <span style="color:#006600; font-weight:bold;">+</span>
          <span style="color:#996600;">"("</span> <span style="color:#006600; font-weight:bold;">+</span>
			  <span style="color:#996600;">"SELECT pc.poi_app_id "</span> <span style="color:#006600; font-weight:bold;">+</span>
			  <span style="color:#996600;">"FROM poi_categories pc "</span> <span style="color:#006600; font-weight:bold;">+</span>
			  <span style="color:#996600;">"WHERE pc.categ_node_id LIKE '"</span> <span style="color:#006600; font-weight:bold;">+</span> params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:node_id</span><span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">+</span> <span style="color:#996600;">"%%'"</span> <span style="color:#006600; font-weight:bold;">+</span>
			  <span style="color:#996600;">"LIMIT "</span> <span style="color:#006600; font-weight:bold;">+</span> mylimit.<span style="color:#9900CC;">to_s</span> <span style="color:#006600; font-weight:bold;">+</span>
          <span style="color:#996600;">")"</span>
    <span style="color:#008000; font-style:italic;">#@poi_apps = PoiApp.find_by_sql(sql)</span>
    <span style="color:#0066ff; font-weight:bold;">@poi_apps</span> = PoiApp.<span style="color:#9900CC;">paginate_by_sql</span> <span style="color:#006600; font-weight:bold;">&#91;</span>sql<span style="color:#006600; font-weight:bold;">&#93;</span>, <span style="color:#ff3333; font-weight:bold;">:page</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:page</span><span style="color:#006600; font-weight:bold;">&#93;</span>, <span style="color:#ff3333; font-weight:bold;">:per_page</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">10</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

4. View

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="erb" style="font-family:monospace;">&lt;h2&gt;POIs&lt;/h2&gt;
&nbsp;
&lt;div clas="page_info"&gt;
  &lt;%= page_entries_info @poi_apps %&gt;
&lt;/div&gt;
&nbsp;
&lt;table&gt;
  &lt;tr&gt;
    &lt;td&gt;POI_APP_ID&lt;/td&gt;
    &lt;td&gt;CN_NAME&lt;/td&gt;
  	&lt;td&gt;EN_NAME&lt;/td&gt;
  &lt;/tr&gt;
	&lt;% for poi in @poi_apps %&gt;
	&lt;tr&gt;
	  &lt;td&gt;&lt;%= poi.id %&gt;&lt;/td&gt;
	  &lt;td&gt;&lt;%= poi.cn_name %&gt;&lt;/td&gt;
		&lt;td&gt;&lt;%= poi.en_name %&gt;&lt;/td&gt;
	&lt;/tr&gt;
	&lt;% end %&gt;
&lt;/table&gt;
&nbsp;
&lt;%= will_paginate @poi_apps %&gt;</pre>
      </td>
    </tr>
  </table>
</div>

5. Checkout the styles <http://mislav.uniqpath.com/static/will_paginate/>

 [1]: http://mislav.uniqpath.com/static/will_paginate/doc/