---
title: Rails3 Notes
author: rupert
layout: post
permalink: /2010/12/rails3-recipes/
categories:
  - rails
tags:
  - rails
  - rails3
---
### Controllers

**Note: redirect_to**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">redirect_to admin_destinations_path<span style="color:#006600; font-weight:bold;">&#40;</span> <span style="color:#ff3333; font-weight:bold;">:country_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@destination</span>.<span style="color:#9900CC;">country_id</span> <span style="color:#006600; font-weight:bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

**Note: Creating a controller under Admin namespace**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">$ rails generate model Country
$ rails g controller Admin::Countries
      create  app/controllers/admin/countries_controller.rb
      invoke  erb
      create    app/views/admin/countries
      invoke  rspec
      create    spec/controllers/admin/countries_controller_spec.rb
      invoke  helper
      create    app/helpers/admin/countries_helper.rb
      invoke    rspec
      create      spec/helpers/admin/countries_helper_spec.rb</pre>
      </td>
    </tr>
  </table>
</div>

Note: Change class Admin::CountriesController < ApplicationController to use

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> <span style="color:#6666ff; font-weight:bold;">Admin::CountriesController</span> <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">Admin::ApplicationController</span>
  <span style="color:#9966CC; font-weight:bold;">def</span> new
    <span style="color:#0066ff; font-weight:bold;">@country</span> = Country.<span style="color:#9900CC;">new</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
<span style="color:#9966CC; font-weight:bold;">class</span> <span style="color:#6666ff; font-weight:bold;">Admin::ApplicationController</span> <span style="color:#006600; font-weight:bold;">&lt;</span> ApplicationController
  before_filter <span style="color:#ff3333; font-weight:bold;">:authenticate_user</span>!
&nbsp;
  layout <span style="color:#996600;">'admin'</span>  
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

### Models

**Note: Validation in Rails3**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">  <span style="color:#008000; font-style:italic;">#(rails2):</span>
  <span style="color:#008000; font-style:italic;">#validates_presence_of :country_name</span>
&nbsp;
  <span style="color:#008000; font-style:italic;">#(rails3):</span>
  validates <span style="color:#ff3333; font-weight:bold;">:country_name</span>, <span style="color:#ff3333; font-weight:bold;">:presence</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0000FF; font-weight:bold;">true</span></pre>
      </td>
    </tr>
  </table>
</div>

**Note: My foreign key does not save?**  
When you have an association between models usually defined by foreign keys and sometimes it does not update, make sure you add the key in the model&#8217;s :attr_accessible

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">attr_accessible <span style="color:#ff3333; font-weight:bold;">:destination_name</span>, <span style="color:#ff3333; font-weight:bold;">:description</span>, <span style="color:#ff3333; font-weight:bold;">:country_id</span>, <span style="color:#ff3333; font-weight:bold;">:destination_type_id</span></pre>
      </td>
    </tr>
  </table>
</div>

**SEO Friendly URLS**  
<http://www.seoonrails.com/to_param-for-better-looking-urls.html>  
<http://nithinbekal.com/2010/03/01/rails-seo-friendly-urls-using-to_param/>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> Poi <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Base</span>
  <span style="color:#9966CC; font-weight:bold;">def</span> to_param
    <span style="color:#996600;">"#{id}-#{name.gsub(/[^a-z0-9]+/i, '-')}"</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

In the view, its still the same:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to poi.<span style="color:#9900CC;">name</span>, poi <span style="color:#006600; font-weight:bold;">%&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

### Views

**Note: Deleting a model from a view from a REST route**

This is dependent on prototype or jquery.rails.js

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">&lt;li&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to <span style="color:#996600;">"Destroy"</span>, admin_poi_path, <span style="color:#ff3333; font-weight:bold;">:confirm</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'Are you sure?'</span>, <span style="color:#ff3333; font-weight:bold;">:method</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#ff3333; font-weight:bold;">:delete</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/li&gt;</pre>
      </td>
    </tr>
  </table>
</div>

> The &#8220;:delete&#8221; is a symbol of HTTP verb (POST, DELETE, PUT). :method => symbol of HTTP verb &#8211; This modifier will dynamically create an HTML form and immediately submit the form for processing using the HTTP verb specified. Useful for having links perform a POST operation in dangerous actions like deleting a record (which search bots can follow while spidering your site). Supported verbs are :post, :delete and :put. Note that if the user has JavaScript disabled, the request will fall back to using GET. If :href => &#8216;#&#8217; is used and the user has JavaScript disabled clicking the link will have no effect. If you are relying on the POST behavior, you should check for it in your controller’s action by using the request object’s methods for post?, delete? or put?.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">              admin_pois GET    /admin/pois(.:format)                  {:action=&gt;"index", :controller=&gt;"admin/pois"}
                         POST   /admin/pois(.:format)                  {:action=&gt;"create", :controller=&gt;"admin/pois"}
           new_admin_poi GET    /admin/pois/new(.:format)              {:action=&gt;"new", :controller=&gt;"admin/pois"}
          edit_admin_poi GET    /admin/pois/:id/edit(.:format)         {:action=&gt;"edit", :controller=&gt;"admin/pois"}
               admin_poi GET    /admin/pois/:id(.:format)              {:action=&gt;"show", :controller=&gt;"admin/pois"}
                         PUT    /admin/pois/:id(.:format)              {:action=&gt;"update", :controller=&gt;"admin/pois"}
                         DELETE /admin/pois/:id(.:format)              {:action=&gt;"destroy", :controller=&gt;"admin/pois"}</pre>
      </td>
    </tr>
  </table>
</div>

**Note: Displaying in\_groups\_of vertical**

http://railscasts.com/episodes/28-in-groups-of

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="erb" style="font-family:monospace;">&lt;table cellpadding="2" cellspacing="2"&gt;
  &lt;% @destinations.in_groups_of((@destinations.length/3).ceil).transpose.each do |destinations| %&gt;
    &lt;tr&gt;
      &lt;% destinations.each do |destination| %&gt;
        &lt;td&gt;
            &lt;%= render destination %&gt;
        &lt;/td&gt;
      &lt;% end %&gt;
    &lt;/tr&gt;
  &lt;% end %&gt;  
&lt;/table&gt;
&nbsp;
&lt;% @destinations.in_groups(5, false) do |group| %&gt;
  &lt;ul class="column_list"&gt;
    &lt;%= render :partial =&gt; "destinations/destination", :collection =&gt; group %&gt;
  &lt;/ul&gt;
&lt;% end %&gt;</pre>
      </td>
    </tr>
  </table>
</div>

### Others

**Migrate a mysql to sqlite database**

1. Install yaml_db.git from  
<http://www.kartar.net/2008/08/migrating-a-rails-database-from-sqlite3-to-mysql/>

2. Have the mysql database ready. We will configure it on production.

3. config/database.yml

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="yaml" style="font-family:monospace;"><span style="color: #007F45;">development</span>:<span style="color: green;">
  adapter</span><span style="font-weight: bold; color: brown;">: </span>sqlite3<span style="color: green;">
  database</span><span style="font-weight: bold; color: brown;">: </span>db/mytp-1.0.4.db<span style="color: green;">
  pool</span><span style="font-weight: bold; color: brown;">: </span><span style="">5</span><span style="color: green;">
  timeout</span><span style="font-weight: bold; color: brown;">: </span><span style="">5000</span>
&nbsp;
<span style="color: blue;"># Warning: The database defined as "test" will be erased and</span>
<span style="color: blue;"># re-generated from your development database when you run "rake".</span>
<span style="color: blue;"># Do not set this db to the same as development or production.</span><span style="color: #007F45;">
test</span>:<span style="color: green;">
  adapter</span><span style="font-weight: bold; color: brown;">: </span>sqlite3<span style="color: green;">
  database</span><span style="font-weight: bold; color: brown;">: </span>db/test.sqlite3<span style="color: green;">
  pool</span><span style="font-weight: bold; color: brown;">: </span><span style="">5</span><span style="color: green;">
  timeout</span><span style="font-weight: bold; color: brown;">: </span><span style="">5000</span>
<span style="color: #007F45;">
production</span>:<span style="color: green;">
  adapter</span><span style="font-weight: bold; color: brown;">: </span>mysql<span style="color: green;">
  database</span><span style="font-weight: bold; color: brown;">: </span>tp_production<span style="color: green;">
  username</span><span style="font-weight: bold; color: brown;">: </span>rupert<span style="color: green;">
  password</span><span style="font-weight: bold; color: brown;">: </span><span style="color: #FF45C0;">******</span><span style="color: green;">
  host</span><span style="font-weight: bold; color: brown;">: </span>localhost</pre>
      </td>
    </tr>
  </table>
</div>

4. Dump the database from production with rake command below. We should have as output: data.yml  
rake db:dump RAILS_ENV=production

5. Load data.yml to SQLite. Ensure you have given a database name for sqlite. We should have as output: mytp-1.0.4.db under db/  
rake db:load RAILS_ENV=development

**Adding ar_mailer to Rails**

1. environment.rb:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">  config.<span style="color:#9900CC;">gem</span> <span style="color:#996600;">"adzap-ar_mailer"</span>, <span style="color:#ff3333; font-weight:bold;">:lib</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'action_mailer/ar_mailer'</span>
  config.<span style="color:#9900CC;">action_mailer</span>.<span style="color:#9900CC;">delivery_method</span> = <span style="color:#ff3333; font-weight:bold;">:activerecord</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#008000; font-style:italic;">#production mailing settings</span>
<span style="color:#6666ff; font-weight:bold;">ActionMailer::Base</span>.<span style="color:#9900CC;">smtp_settings</span> = <span style="color:#006600; font-weight:bold;">&#123;</span>
   <span style="color:#ff3333; font-weight:bold;">:address</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"127.0.0.1"</span>,
   <span style="color:#ff3333; font-weight:bold;">:port</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">25</span>,
   <span style="color:#ff3333; font-weight:bold;">:domain</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"mytravelphilippines.com"</span>,
   <span style="color:#ff3333; font-weight:bold;">:authentication</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#ff3333; font-weight:bold;">:login</span>,
   <span style="color:#ff3333; font-weight:bold;">:user_name</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"info"</span>,
   <span style="color:#ff3333; font-weight:bold;">:password</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"******"</span>,
<span style="color:#006600; font-weight:bold;">&#125;</span>
&nbsp;
<span style="color:#6666ff; font-weight:bold;">ActionMailer::Base</span>.<span style="color:#9900CC;">default_content_type</span> = <span style="color:#996600;">"text/plain"</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Emailer.rb is still

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> Emailer <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActionMailer::Base</span></pre>
      </td>
    </tr>
  </table>
</div>

3. Run

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert<span style="color: #000000; font-weight: bold;">@</span>2rmobile:<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>rails<span style="color: #000000; font-weight: bold;">/</span>tp<span style="color: #000000; font-weight: bold;">/</span>current$ ar_sendmail <span style="color: #660033;">-ov</span>
expired <span style="color: #000000;"></span> emails from the queue
found <span style="color: #000000;">1</span> emails to send
sent email 00000000002 from info<span style="color: #000000; font-weight: bold;">@</span>mytravelphilippines.com to rupert<span style="color: #000000; font-weight: bold;">@</span>2rmobile.com: <span style="color: #666666; font-style: italic;">#&lt;Net::SMTP::Response:0xb702279c @string="250 Message accepted.\n", @status="250"&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>