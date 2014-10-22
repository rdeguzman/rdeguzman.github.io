---
title: 'Rails Note #1: Getting my feet wet in Ruby On Rails'
author: rupert
layout: post
permalink: /2008/11/getting-my-feet-wet-in-ruby-on-rails/
aktt_tweeted:
  - 1
categories:
  - rails
  - ruby
tags:
  - rails
---
1. Just installed Ruby and Rails on my MacOSX Leopard. The current version of rails is 1.2.6. I wanted to upgrade using gem update &#8211;system but it seems like taking forever.. So I did a manual install of ruby, rubygems then rails..

2. The tutorial that I followed was from <http://hivelogic.com/articles/2008/02/ruby-rails-leopard>

Installation Summary

2.1 ruby

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">wget</span> http:<span style="color: #000000; font-weight: bold;">//</span>ftp.ruby-lang.org<span style="color: #000000; font-weight: bold;">/</span>pub<span style="color: #000000; font-weight: bold;">/</span>ruby<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1.8</span><span style="color: #000000; font-weight: bold;">/</span>ruby-1.8.6-p286.tar.gz
<span style="color: #c20cb9; font-weight: bold;">tar</span> <span style="color: #660033;">-zxvf</span> ruby-1.8.6-p286.tar.gz
.<span style="color: #000000; font-weight: bold;">/</span>configure
<span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

2.2 rubygems

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">wget</span> http:<span style="color: #000000; font-weight: bold;">//</span>rubyforge.org<span style="color: #000000; font-weight: bold;">/</span>frs<span style="color: #000000; font-weight: bold;">/</span>download.php<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">45905</span><span style="color: #000000; font-weight: bold;">/</span>rubygems-1.3.1.tgz
<span style="color: #c20cb9; font-weight: bold;">tar</span> <span style="color: #660033;">-zxvf</span> rubygems-1.3.1.tgz
ruby setup.rb</pre>
      </td>
    </tr>
  </table>
</div>

2.3 rails

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">gem <span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-V</span> rails</pre>
      </td>
    </tr>
  </table>
</div>

2.4 other gems

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">gem <span style="color: #c20cb9; font-weight: bold;">install</span> rubygems-update
gem <span style="color: #c20cb9; font-weight: bold;">install</span> mongrel
gem <span style="color: #c20cb9; font-weight: bold;">install</span> capistrano
gem <span style="color: #c20cb9; font-weight: bold;">install</span> postgres
gem <span style="color: #c20cb9; font-weight: bold;">install</span> builder</pre>
      </td>
    </tr>
  </table>
</div>

3. Browsed the first few pages of the hilarious <http://www.poignantguide.net/ruby>

4. Went for a book. Found Simply Rails 2.0 on Boox24x7 and Safari. Added that to my shelf and read chapters 1 &#8211; 5 on my first night.

5. Was able to setup database configuration in config/database.yml using Postgres. I have yet to study how oracle works.

6. **rake db:migrate** is a convenient way of building your database schema without using SQL. Simply Rails 2.0:Chapter 5:Generating a Model introduced inserting records using **script/console**

7. URL Helpers for Story Resource  
stories_path /stories  
new\_story\_path /stories/new  
story_path(@story) /stories/1  
edit\_story\_path(@story) /stories/1/edit

Remember to define the route in config/routes.rb  
**map.resources :users, :categories**

8. Naming Conventions  
<img src="/images/2008/11/picture-1.png" alt="Picture 1.png" border="0" width="340" height="326" />

Variables &#8211; lowercase letters and words separated by underscores.  
i.e name, country\_of\_origin

DB Table and Column names should follow convention is always pluralised.  
i.e users

Classes and Modules &#8211; no underscores and each word is capitalized  
i.e User, UserCategories