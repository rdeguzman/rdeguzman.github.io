---
title: 'Rails Note #16: rails3, devise, paperclip, uploadify, formtastic'
author: rupert
layout: post
permalink: /2011/02/rails-note-16-rails3-devise-paperclip-uploadify-formtastic/
categories:
  - rails
  - ruby
tags:
  - gallerific
  - paperclip
  - rails
  - rails3
  - ruby
  - uploadify
---
### Setup

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">dev:rails3 rupert$ rails new photogallery
dev:rails3 rupert$ <span style="color: #7a0874; font-weight: bold;">cd</span> photogallery
dev:photogallery rupert$ <span style="color: #c20cb9; font-weight: bold;">rm</span> public<span style="color: #000000; font-weight: bold;">/</span>index.html</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim Gemfile 
  <span style="color:#006666;">1</span> source <span style="color:#996600;">'http://rubygems.org'</span>
  <span style="color:#006666;">2</span> 
  <span style="color:#006666;">3</span> gem <span style="color:#996600;">'rails'</span>, <span style="color:#996600;">'3.0.3'</span>
  <span style="color:#006666;">4</span> 
  <span style="color:#006666;">5</span> <span style="color:#008000; font-style:italic;"># Bundle edge Rails instead:</span>
  <span style="color:#006666;">6</span> <span style="color:#008000; font-style:italic;"># gem 'rails', :git =&gt; 'git://github.com/rails/rails.git'</span>
  <span style="color:#006666;">7</span> 
  <span style="color:#006666;">8</span> gem <span style="color:#996600;">'sqlite3-ruby'</span>, :<span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'sqlite3'</span>
  <span style="color:#006666;">9</span> gem <span style="color:#996600;">'devise'</span>, <span style="color:#ff3333; font-weight:bold;">:git</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"git://github.com/plataformatec/devise.git"</span>, <span style="color:#ff3333; font-weight:bold;">:branch</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"master"</span>
 <span style="color:#006666;">10</span> gem <span style="color:#996600;">'formtastic'</span>, <span style="color:#996600;">'~&gt; 1.1.0'</span>
 <span style="color:#006666;">11</span> gem <span style="color:#996600;">'paperclip'</span>
 <span style="color:#006666;">12</span> gem <span style="color:#996600;">'mime-types'</span>, :<span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'mime/types'</span></pre>
      </td>
    </tr>
  </table>
</div>

Paperclip needs imagemagick to work. No need to install by source

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">apt-get install</span> imagemagick</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">dev:photogallery rupert$ bundle <span style="color: #c20cb9; font-weight: bold;">install</span>
Updating git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>plataformatec<span style="color: #000000; font-weight: bold;">/</span>devise.git
Fetching <span style="color: #7a0874; font-weight: bold;">source</span> index <span style="color: #000000; font-weight: bold;">for</span> http:<span style="color: #000000; font-weight: bold;">//</span>rubygems.org<span style="color: #000000; font-weight: bold;">/</span>
Using rake <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.8.7<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using abstract <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.0.0<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using activesupport <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using builder <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.1.2<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using i18n <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.5.0<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using activemodel <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using erubis <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.6.6<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using rack <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.2.1<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using rack-mount <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.6.13<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using rack-test <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.5.7<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using tzinfo <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.3.23<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using actionpack <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using mime-types <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">1.16</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using polyglot <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.3.1<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using treetop <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.4.9<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using mail <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.2.14<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using actionmailer <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using arel <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.0.6<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using activerecord <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using activeresource <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using bcrypt-ruby <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.1.4<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using bundler <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.0.7<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using orm_adapter <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.0.4<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using warden <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using devise <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">1.2</span>.rc<span style="color: #7a0874; font-weight: bold;">&#41;</span> from git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>plataformatec<span style="color: #000000; font-weight: bold;">/</span>devise.git <span style="color: #7a0874; font-weight: bold;">&#40;</span>at master<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using formtastic <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.1.0<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using paperclip <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.3.8<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using thor <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.14.6<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using railties <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using rails <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.3<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Using sqlite3-ruby <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.3.2<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Your bundle is <span style="color: #7a0874; font-weight: bold;">complete</span><span style="color: #000000; font-weight: bold;">!</span> Use <span style="color: #000000; font-weight: bold;">`</span>bundle show <span style="color: #7a0874; font-weight: bold;">&#91;</span>gemname<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">`</span> to see where a bundled gem is installed.</pre>
      </td>
    </tr>
  </table>
</div>

### Devise

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ rails g devise:install
      create  config/initializers/devise.rb
      create  config/locales/devise.en.yml
&nbsp;
===============================================================================
&nbsp;
Some setup you must do manually if you haven't yet:
&nbsp;
  1. Setup default url options for your specific environment. Here is an
     example of development environment:
&nbsp;
       config.action_mailer.default_url_options = { :host =&gt; 'localhost:3000' }
&nbsp;
     This is a required Rails configuration. In production it must be the
     actual host of your application
&nbsp;
  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:
&nbsp;
       root :to =&gt; "home#index"
&nbsp;
  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:
&nbsp;
       &lt;p class="notice"&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= notice <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/p&gt;
       &lt;p class="alert"&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= alert <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/p&gt;
&nbsp;
===============================================================================
dev:photogallery rupert$</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ rails g devise User
      invoke  active_record
      create    app<span style="color:#006600; font-weight:bold;">/</span>models<span style="color:#006600; font-weight:bold;">/</span>user.<span style="color:#9900CC;">rb</span>
      invoke    test_unit
      create      test<span style="color:#006600; font-weight:bold;">/</span>unit<span style="color:#006600; font-weight:bold;">/</span>user_test.<span style="color:#9900CC;">rb</span>
      create      test<span style="color:#006600; font-weight:bold;">/</span>fixtures<span style="color:#006600; font-weight:bold;">/</span>users.<span style="color:#9900CC;">yml</span>
      create    db<span style="color:#006600; font-weight:bold;">/</span>migrate<span style="color:#006600; font-weight:bold;">/</span><span style="color:#006666;">20110210032416</span>_devise_create_users.<span style="color:#9900CC;">rb</span>
      insert    app<span style="color:#006600; font-weight:bold;">/</span>models<span style="color:#006600; font-weight:bold;">/</span>user.<span style="color:#9900CC;">rb</span>
       route  devise_for <span style="color:#ff3333; font-weight:bold;">:users</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">  <span style="color:#006666;">1</span> <span style="color:#9966CC; font-weight:bold;">class</span> User <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Base</span>
  <span style="color:#006666;">2</span>   <span style="color:#008000; font-style:italic;"># Include default devise modules. Others available are:</span>
  <span style="color:#006666;">3</span>   <span style="color:#008000; font-style:italic;"># :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable</span>
  <span style="color:#006666;">4</span>   devise <span style="color:#ff3333; font-weight:bold;">:database_authenticatable</span>, <span style="color:#ff3333; font-weight:bold;">:registerable</span>,
  <span style="color:#006666;">5</span>          <span style="color:#ff3333; font-weight:bold;">:recoverable</span>, <span style="color:#ff3333; font-weight:bold;">:rememberable</span>, <span style="color:#ff3333; font-weight:bold;">:trackable</span>, <span style="color:#ff3333; font-weight:bold;">:validatable</span>
  <span style="color:#006666;">6</span> 
  <span style="color:#006666;">7</span>   <span style="color:#008000; font-style:italic;"># Setup accessible (or protected) attributes for your model</span>
  <span style="color:#006666;">8</span>   attr_accessible <span style="color:#ff3333; font-weight:bold;">:email</span>, <span style="color:#ff3333; font-weight:bold;">:password</span>, <span style="color:#ff3333; font-weight:bold;">:password_confirmation</span>, <span style="color:#ff3333; font-weight:bold;">:remember_me</span>
  <span style="color:#006666;">9</span> 
 <span style="color:#006666;">10</span>   has_many <span style="color:#ff3333; font-weight:bold;">:pictures</span>
 <span style="color:#006666;">11</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app/controllers/home_controller.rb
  1 class HomeController &lt; ApplicationController
  2   def index
  3   end
  4 end
dev:photogallery rupert$ mkdir -p app/views/home
dev:photogallery rupert$ vim app/views/home/index.html.erb
  1 &lt;h1&gt;Welcome to Photo Gallery&lt;/h1&gt;
  2 <span style="color:#006600; font-weight:bold;">&lt;%</span>= render <span style="color:#ff3333; font-weight:bold;">:partial</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'shared/header'</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
dev:photogallery rupert$ mkdir -p app/views/shared
  1 &lt;ul&gt;
  2   <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">if</span> user_signed_in? <span style="color:#006600; font-weight:bold;">%&gt;</span>
  3     &lt;li&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to <span style="color:#996600;">"Log Out"</span>, destroy_user_session_path <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/li&gt;
  4     &lt;li&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to <span style="color:#996600;">"My Pictures"</span>, pictures_path<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> current_user.<span style="color:#9900CC;">id</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/li&gt;
  5   <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">else</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  6     &lt;li&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to <span style="color:#996600;">"Log In"</span>, new_user_session_path <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/li&gt;
  7     &lt;li&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to <span style="color:#996600;">"Sign Up"</span>, new_user_registration_path <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/li&gt;
  8   <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  9 &lt;/ul&gt;</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim config<span style="color:#006600; font-weight:bold;">/</span>routes.<span style="color:#9900CC;">rb</span>
  <span style="color:#006666;">1</span> <span style="color:#6666ff; font-weight:bold;">Photogallery::Application</span>.<span style="color:#9900CC;">routes</span>.<span style="color:#9900CC;">draw</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  <span style="color:#006666;">2</span>   devise_for <span style="color:#ff3333; font-weight:bold;">:users</span>
  <span style="color:#006666;">3</span> 
  <span style="color:#006666;">4</span>   resources <span style="color:#ff3333; font-weight:bold;">:pictures</span>
  <span style="color:#006666;">5</span> 
  <span style="color:#006666;">6</span>   root <span style="color:#ff3333; font-weight:bold;">:to</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"home#index"</span>
  <span style="color:#006666;">7</span> 
  <span style="color:#006666;">8</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

### Paperclip

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim config<span style="color:#006600; font-weight:bold;">/</span>environments<span style="color:#006600; font-weight:bold;">/</span>development.<span style="color:#9900CC;">rb</span>
  <span style="color:#006666;">1</span> <span style="color:#008000; font-style:italic;"># Be sure to restart your server when you modify this file.</span>
  <span style="color:#006666;">1</span> <span style="color:#6666ff; font-weight:bold;">Photogallery::Application</span>.<span style="color:#9900CC;">configure</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  <span style="color:#006666;">2</span>   <span style="color:#008000; font-style:italic;"># Settings specified here will take precedence over those in config/application.rb</span>
  <span style="color:#006666;">3</span> 
  <span style="color:#006666;">4</span>   <span style="color:#008000; font-style:italic;"># In the development environment your application's code is reloaded on</span>
  <span style="color:#006666;">5</span>   <span style="color:#008000; font-style:italic;"># every request.  This slows down response time but is perfect for development</span>
  <span style="color:#006666;">6</span>   <span style="color:#008000; font-style:italic;"># since you don't have to restart the webserver when you make code changes.</span>
  <span style="color:#006666;">7</span>   config.<span style="color:#9900CC;">cache_classes</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
  <span style="color:#006666;">8</span> 
  <span style="color:#006666;">9</span>   <span style="color:#008000; font-style:italic;"># Log error messages when you accidentally call methods on nil.</span>
 <span style="color:#006666;">10</span>   config.<span style="color:#9900CC;">whiny_nils</span> = <span style="color:#0000FF; font-weight:bold;">true</span>
 <span style="color:#006666;">11</span> 
 <span style="color:#006666;">12</span>   <span style="color:#008000; font-style:italic;"># Show full error reports and disable caching</span>
 <span style="color:#006666;">13</span>   config.<span style="color:#9900CC;">consider_all_requests_local</span>       = <span style="color:#0000FF; font-weight:bold;">true</span>
 <span style="color:#006666;">14</span>   config.<span style="color:#9900CC;">action_view</span>.<span style="color:#9900CC;">debug_rjs</span>             = <span style="color:#0000FF; font-weight:bold;">true</span>
 <span style="color:#006666;">15</span>   config.<span style="color:#9900CC;">action_controller</span>.<span style="color:#9900CC;">perform_caching</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
 <span style="color:#006666;">16</span> 
 <span style="color:#006666;">17</span>   <span style="color:#008000; font-style:italic;"># Don't care if the mailer can't send</span>
 <span style="color:#006666;">18</span>   config.<span style="color:#9900CC;">action_mailer</span>.<span style="color:#9900CC;">raise_delivery_errors</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
 <span style="color:#006666;">19</span> 
 <span style="color:#006666;">20</span>   <span style="color:#008000; font-style:italic;"># Print deprecation notices to the Rails logger</span>
 <span style="color:#006666;">21</span>   config.<span style="color:#9900CC;">active_support</span>.<span style="color:#9900CC;">deprecation</span> = <span style="color:#ff3333; font-weight:bold;">:log</span>
 <span style="color:#006666;">22</span> 
 <span style="color:#006666;">23</span>   <span style="color:#008000; font-style:italic;"># Only use best-standards-support built into browsers</span>
 <span style="color:#006666;">24</span>   config.<span style="color:#9900CC;">action_dispatch</span>.<span style="color:#9900CC;">best_standards_support</span> = <span style="color:#ff3333; font-weight:bold;">:builtin</span>
 <span style="color:#006666;">25</span> 
 <span style="color:#006666;">26</span>   Paperclip.<span style="color:#9900CC;">options</span><span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:command_path</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#996600;">"/usr/local/ImageMagick/bin"</span>
 <span style="color:#006666;">27</span>   Paperclip.<span style="color:#9900CC;">options</span><span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:swallow_stderr</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
 <span style="color:#006666;">28</span> <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">29</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ rails g model Picture
      invoke  active_record
      create    db<span style="color:#006600; font-weight:bold;">/</span>migrate<span style="color:#006600; font-weight:bold;">/</span><span style="color:#006666;">20110210032526</span>_create_pictures.<span style="color:#9900CC;">rb</span>
      create    app<span style="color:#006600; font-weight:bold;">/</span>models<span style="color:#006600; font-weight:bold;">/</span>picture.<span style="color:#9900CC;">rb</span>
      invoke    test_unit
      create      test<span style="color:#006600; font-weight:bold;">/</span>unit<span style="color:#006600; font-weight:bold;">/</span>picture_test.<span style="color:#9900CC;">rb</span>
      create      test<span style="color:#006600; font-weight:bold;">/</span>fixtures<span style="color:#006600; font-weight:bold;">/</span>pictures.<span style="color:#9900CC;">yml</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim db<span style="color:#006600; font-weight:bold;">/</span>migrate<span style="color:#006600; font-weight:bold;">/</span><span style="color:#006666;">20110210032526</span>_create_pictures.<span style="color:#9900CC;">rb</span>
  <span style="color:#006666;">1</span> <span style="color:#9966CC; font-weight:bold;">class</span> CreatePictures <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Migration</span>
  <span style="color:#006666;">2</span>   <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">up</span>
  <span style="color:#006666;">3</span>     create_table <span style="color:#ff3333; font-weight:bold;">:pictures</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>t<span style="color:#006600; font-weight:bold;">|</span>
  <span style="color:#006666;">4</span>       t.<span style="color:#CC0066; font-weight:bold;">string</span> <span style="color:#ff3333; font-weight:bold;">:caption_title</span>
  <span style="color:#006666;">5</span>       t.<span style="color:#9900CC;">text</span> <span style="color:#ff3333; font-weight:bold;">:caption_description</span>
  <span style="color:#006666;">6</span>       
  <span style="color:#006666;">7</span>       t.<span style="color:#9900CC;">references</span> <span style="color:#ff3333; font-weight:bold;">:user</span>
  <span style="color:#006666;">8</span>       
  <span style="color:#006666;">9</span>       t.<span style="color:#9900CC;">timestamps</span>
 <span style="color:#006666;">10</span>     <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">11</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">12</span>   
 <span style="color:#006666;">13</span>   <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">down</span>
 <span style="color:#006666;">14</span>     drop_table <span style="color:#ff3333; font-weight:bold;">:pictures</span>
 <span style="color:#006666;">15</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">16</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">dev:photogallery rupert$ rails g migration AddPaperclipToPictures
      invoke  active_record
      create    db<span style="color: #000000; font-weight: bold;">/</span>migrate<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">20110210032654</span>_add_paperclip_to_pictures.rb</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim db<span style="color:#006600; font-weight:bold;">/</span>migrate<span style="color:#006600; font-weight:bold;">/</span><span style="color:#006666;">20110210032654</span>_add_paperclip_to_pictures.<span style="color:#9900CC;">rb</span>
  <span style="color:#006666;">1</span> <span style="color:#9966CC; font-weight:bold;">class</span> AddPaperclipToPictures <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Migration</span>
  <span style="color:#006666;">2</span>   <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">up</span>
  <span style="color:#006666;">3</span>     add_column <span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_file_name</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
  <span style="color:#006666;">4</span>     add_column <span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_content_type</span>, :<span style="color:#CC0066; font-weight:bold;">string</span>
  <span style="color:#006666;">5</span>     add_column <span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_file_size</span>, :<span style="color:#CC0066; font-weight:bold;">integer</span>
  <span style="color:#006666;">6</span>     add_column <span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_updated_at</span>, <span style="color:#ff3333; font-weight:bold;">:datetime</span>
  <span style="color:#006666;">7</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">8</span> 
  <span style="color:#006666;">9</span>   <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">down</span>
 <span style="color:#006666;">10</span>     remove_column <span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_file_name</span>
 <span style="color:#006666;">11</span>     remove_column <span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_content_type</span>
 <span style="color:#006666;">12</span>     remove_column <span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_file_size</span>
 <span style="color:#006666;">13</span>     remove_column <span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_updated_at</span>
 <span style="color:#006666;">14</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">15</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app<span style="color:#006600; font-weight:bold;">/</span>models<span style="color:#006600; font-weight:bold;">/</span>picture.<span style="color:#9900CC;">rb</span>
  <span style="color:#006666;">1</span> <span style="color:#9966CC; font-weight:bold;">class</span> Picture <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Base</span>
  <span style="color:#006666;">2</span>   belongs_to <span style="color:#ff3333; font-weight:bold;">:user</span>
  <span style="color:#006666;">3</span> 
  <span style="color:#006666;">4</span>   has_attached_file <span style="color:#ff3333; font-weight:bold;">:image</span>,
  <span style="color:#006666;">5</span>                     <span style="color:#ff3333; font-weight:bold;">:styles</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#123;</span>
  <span style="color:#006666;">6</span>                       <span style="color:#ff3333; font-weight:bold;">:thumb</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">"100x100&gt;"</span>, <span style="color:#ff3333; font-weight:bold;">:jpg</span><span style="color:#006600; font-weight:bold;">&#93;</span>,
  <span style="color:#006666;">7</span>                       <span style="color:#ff3333; font-weight:bold;">:pagesize</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">"500x400&gt;"</span>, <span style="color:#ff3333; font-weight:bold;">:jpg</span><span style="color:#006600; font-weight:bold;">&#93;</span>,
  <span style="color:#006666;">8</span>                     <span style="color:#006600; font-weight:bold;">&#125;</span>,
  <span style="color:#006666;">9</span>                     <span style="color:#ff3333; font-weight:bold;">:default_style</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#ff3333; font-weight:bold;">:pagesize</span>,
 <span style="color:#006666;">10</span>                     <span style="color:#ff3333; font-weight:bold;">:url</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"/images/photogallery/:id/:style/:basename.:extension"</span>,
 <span style="color:#006666;">11</span>                     <span style="color:#ff3333; font-weight:bold;">:path</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"/wwwroot/images/photogallery/:id/:style/:basename.:extension"</span>
 <span style="color:#006666;">12</span> 
 <span style="color:#006666;">13</span>   validates_attachment_presence <span style="color:#ff3333; font-weight:bold;">:image</span>
 <span style="color:#006666;">14</span>   validates_attachment_size <span style="color:#ff3333; font-weight:bold;">:image</span>, <span style="color:#ff3333; font-weight:bold;">:less_than</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">10</span>.<span style="color:#9900CC;">megabytes</span>
 <span style="color:#006666;">15</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">dev:images rupert$ <span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #660033;">-p</span> <span style="color: #000000; font-weight: bold;">/</span>wwwroot<span style="color: #000000; font-weight: bold;">/</span>images<span style="color: #000000; font-weight: bold;">/</span>photogallery
dev:images rupert$ <span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> <span style="color: #000000; font-weight: bold;">/</span>wwwroot<span style="color: #000000; font-weight: bold;">/</span>images<span style="color: #000000; font-weight: bold;">/</span>photogallery photogallery</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ rake db:migrate
<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#9966CC; font-weight:bold;">in</span> <span style="color:#006600; font-weight:bold;">/</span>Volumes<span style="color:#006600; font-weight:bold;">/</span>rupert<span style="color:#006600; font-weight:bold;">/</span>projects<span style="color:#006600; font-weight:bold;">/</span>rails3<span style="color:#006600; font-weight:bold;">/</span>photogallery<span style="color:#006600; font-weight:bold;">&#41;</span>
==  DeviseCreateUsers: migrating ==============================================
<span style="color:#006600; font-weight:bold;">--</span> create_table<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:users</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#006600; font-weight:bold;">-&gt;</span> 0.0084s
<span style="color:#006600; font-weight:bold;">--</span> add_index<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:users</span>, <span style="color:#ff3333; font-weight:bold;">:email</span>, <span style="color:#006600; font-weight:bold;">&#123;</span>:unique<span style="color:#006600; font-weight:bold;">=&gt;</span><span style="color:#0000FF; font-weight:bold;">true</span><span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#006600; font-weight:bold;">-&gt;</span> 0.0679s
<span style="color:#006600; font-weight:bold;">--</span> add_index<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:users</span>, <span style="color:#ff3333; font-weight:bold;">:reset_password_token</span>, <span style="color:#006600; font-weight:bold;">&#123;</span>:unique<span style="color:#006600; font-weight:bold;">=&gt;</span><span style="color:#0000FF; font-weight:bold;">true</span><span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#006600; font-weight:bold;">-&gt;</span> 0.0007s
==  DeviseCreateUsers: migrated <span style="color:#006600; font-weight:bold;">&#40;</span>0.0772s<span style="color:#006600; font-weight:bold;">&#41;</span> =====================================
&nbsp;
==  CreatePictures: migrating =================================================
<span style="color:#006600; font-weight:bold;">--</span> create_table<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:pictures</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#006600; font-weight:bold;">-&gt;</span> 0.0007s
==  CreatePictures: migrated <span style="color:#006600; font-weight:bold;">&#40;</span>0.0008s<span style="color:#006600; font-weight:bold;">&#41;</span> ========================================
&nbsp;
==  AddPaperclipToPictures: migrating =========================================
<span style="color:#006600; font-weight:bold;">--</span> add_column<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_file_name</span>, :<span style="color:#CC0066; font-weight:bold;">string</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#006600; font-weight:bold;">-&gt;</span> 0.0005s
<span style="color:#006600; font-weight:bold;">--</span> add_column<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_content_type</span>, :<span style="color:#CC0066; font-weight:bold;">string</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#006600; font-weight:bold;">-&gt;</span> 0.0003s
<span style="color:#006600; font-weight:bold;">--</span> add_column<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_file_size</span>, :<span style="color:#CC0066; font-weight:bold;">integer</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#006600; font-weight:bold;">-&gt;</span> 0.0003s
<span style="color:#006600; font-weight:bold;">--</span> add_column<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:pictures</span>, <span style="color:#ff3333; font-weight:bold;">:image_updated_at</span>, <span style="color:#ff3333; font-weight:bold;">:datetime</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#006600; font-weight:bold;">-&gt;</span> 0.0003s
==  AddPaperclipToPictures: migrated <span style="color:#006600; font-weight:bold;">&#40;</span>0.0016s<span style="color:#006600; font-weight:bold;">&#41;</span> ================================</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">dev:photogallery rupert$ rails g controller pictures
      create  app<span style="color: #000000; font-weight: bold;">/</span>controllers<span style="color: #000000; font-weight: bold;">/</span>pictures_controller.rb
      invoke  erb
      create    app<span style="color: #000000; font-weight: bold;">/</span>views<span style="color: #000000; font-weight: bold;">/</span>pictures
      invoke  helper
      create    app<span style="color: #000000; font-weight: bold;">/</span>helpers<span style="color: #000000; font-weight: bold;">/</span>pictures_helper.rb</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app<span style="color:#006600; font-weight:bold;">/</span>controllers<span style="color:#006600; font-weight:bold;">/</span>pictures_controller.<span style="color:#9900CC;">rb</span> 
  <span style="color:#006666;">1</span> <span style="color:#9966CC; font-weight:bold;">class</span> PicturesController <span style="color:#006600; font-weight:bold;">&lt;</span> ApplicationController
  <span style="color:#006666;">2</span>   <span style="color:#9966CC; font-weight:bold;">def</span> index
  <span style="color:#006666;">3</span>     <span style="color:#0066ff; font-weight:bold;">@user</span> = User.<span style="color:#9900CC;">find</span><span style="color:#006600; font-weight:bold;">&#40;</span>params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  <span style="color:#006666;">4</span>     <span style="color:#0066ff; font-weight:bold;">@pictures</span> = <span style="color:#0066ff; font-weight:bold;">@user</span>.<span style="color:#9900CC;">pictures</span>
  <span style="color:#006666;">5</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">6</span> 
  <span style="color:#006666;">7</span>   <span style="color:#9966CC; font-weight:bold;">def</span> create
  <span style="color:#006666;">8</span>     <span style="color:#008000; font-style:italic;">#You can specify a sleep here to mimic a long response</span>
  <span style="color:#006666;">9</span>     <span style="color:#008000; font-style:italic;">#sleep 5</span>
 <span style="color:#006666;">10</span>     newparams = coerce<span style="color:#006600; font-weight:bold;">&#40;</span>params<span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">11</span> 
 <span style="color:#006666;">12</span>     current_pictures = Picture.<span style="color:#9900CC;">where</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#41;</span>.<span style="color:#9900CC;">all</span>
 <span style="color:#006666;">13</span> 
 <span style="color:#006666;">14</span>     <span style="color:#0066ff; font-weight:bold;">@picture</span> = Picture.<span style="color:#9900CC;">new</span><span style="color:#006600; font-weight:bold;">&#40;</span>newparams<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:picture</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">15</span>     <span style="color:#0066ff; font-weight:bold;">@picture</span>.<span style="color:#9900CC;">user_id</span> = current_user.<span style="color:#9900CC;">id</span>
 <span style="color:#006666;">16</span> 
 <span style="color:#006666;">17</span>     <span style="color:#9966CC; font-weight:bold;">if</span> <span style="color:#0066ff; font-weight:bold;">@picture</span>.<span style="color:#9900CC;">save</span>
 <span style="color:#006666;">18</span>       flash<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:notice</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#996600;">"Picture was successfully created"</span>
 <span style="color:#006666;">19</span> 
 <span style="color:#006666;">20</span>       respond_to <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span><span style="color:#CC0066; font-weight:bold;">format</span><span style="color:#006600; font-weight:bold;">|</span>
 <span style="color:#006666;">21</span>         <span style="color:#CC0066; font-weight:bold;">format</span>.<span style="color:#9900CC;">html</span> <span style="color:#006600; font-weight:bold;">&#123;</span>redirect_to pictures_path<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@picture</span>.<span style="color:#9900CC;">user_id</span><span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">&#125;</span>
 <span style="color:#006666;">22</span>         <span style="color:#CC0066; font-weight:bold;">format</span>.<span style="color:#9900CC;">json</span> <span style="color:#006600; font-weight:bold;">&#123;</span>render <span style="color:#ff3333; font-weight:bold;">:json</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#123;</span> <span style="color:#ff3333; font-weight:bold;">:result</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'success'</span>, <span style="color:#ff3333; font-weight:bold;">:picture</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> picture_path<span style="color:#006600; font-weight:bold;">&#40;</span>@picture<span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">&#125;</span> <span style="color:#006600; font-weight:bold;">&#125;</span>
 <span style="color:#006666;">23</span>       <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">24</span>     <span style="color:#9966CC; font-weight:bold;">else</span>
 <span style="color:#006666;">25</span>       flash<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:alert</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#996600;">"There is an error in saving the picture."</span>
 <span style="color:#006666;">26</span>       respond_to <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span><span style="color:#CC0066; font-weight:bold;">format</span><span style="color:#006600; font-weight:bold;">|</span>
 <span style="color:#006666;">27</span>         <span style="color:#CC0066; font-weight:bold;">format</span>.<span style="color:#9900CC;">html</span> <span style="color:#006600; font-weight:bold;">&#123;</span>redirect_to pictures_path<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@picture</span>.<span style="color:#9900CC;">user_id</span><span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">&#125;</span>
 <span style="color:#006666;">28</span>         <span style="color:#CC0066; font-weight:bold;">format</span>.<span style="color:#9900CC;">json</span> <span style="color:#006600; font-weight:bold;">&#123;</span>render <span style="color:#ff3333; font-weight:bold;">:json</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#123;</span> <span style="color:#ff3333; font-weight:bold;">:result</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'error'</span>, <span style="color:#ff3333; font-weight:bold;">:error</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> flash<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:alert</span><span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">&#125;</span> <span style="color:#006600; font-weight:bold;">&#125;</span>
 <span style="color:#006666;">29</span>       <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">30</span>     <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">31</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">32</span>   
 <span style="color:#006666;">33</span>   <span style="color:#9966CC; font-weight:bold;">def</span> show
 <span style="color:#006666;">34</span>     <span style="color:#0066ff; font-weight:bold;">@picture</span> = Picture.<span style="color:#9900CC;">find</span><span style="color:#006600; font-weight:bold;">&#40;</span>params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:id</span><span style="color:#006600; font-weight:bold;">&#93;</span>, :<span style="color:#9966CC; font-weight:bold;">include</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#ff3333; font-weight:bold;">:user</span><span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">35</span>     <span style="color:#0066ff; font-weight:bold;">@total_pictures</span> = Picture.<span style="color:#9900CC;">find</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:all</span>, <span style="color:#ff3333; font-weight:bold;">:conditions</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#123;</span> <span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@picture</span>.<span style="color:#9900CC;">user</span>.<span style="color:#9900CC;">id</span><span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">36</span>     render <span style="color:#ff3333; font-weight:bold;">:template</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'pictures/show'</span>
 <span style="color:#006666;">37</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">38</span>   
 <span style="color:#006666;">39</span>   <span style="color:#9966CC; font-weight:bold;">def</span> destroy
 <span style="color:#006666;">40</span>     picture = Picture.<span style="color:#9900CC;">find</span><span style="color:#006600; font-weight:bold;">&#40;</span>params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:id</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">41</span>     user_id = picture.<span style="color:#9900CC;">user_id</span>
 <span style="color:#006666;">42</span>     picture.<span style="color:#9900CC;">destroy</span>
 <span style="color:#006666;">43</span>     flash<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:notice</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#996600;">"Picture was successfully deleted"</span>
 <span style="color:#006666;">44</span>     redirect_to pictures_path<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> user_id<span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">45</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">46</span>     
 <span style="color:#006666;">47</span>   private
 <span style="color:#006666;">48</span>     <span style="color:#9966CC; font-weight:bold;">def</span> coerce<span style="color:#006600; font-weight:bold;">&#40;</span>params<span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">49</span>       <span style="color:#9966CC; font-weight:bold;">if</span> params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:picture</span><span style="color:#006600; font-weight:bold;">&#93;</span>.<span style="color:#0000FF; font-weight:bold;">nil</span>?
 <span style="color:#006666;">50</span>         h = <span style="color:#CC00FF; font-weight:bold;">Hash</span>.<span style="color:#9900CC;">new</span> 
 <span style="color:#006666;">51</span>         h<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:picture</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#CC00FF; font-weight:bold;">Hash</span>.<span style="color:#9900CC;">new</span>
 <span style="color:#006666;">52</span>         h<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:picture</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span><span style="color:#006600; font-weight:bold;">&#93;</span> = params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span><span style="color:#006600; font-weight:bold;">&#93;</span>
 <span style="color:#006666;">53</span>         h<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:picture</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:image</span><span style="color:#006600; font-weight:bold;">&#93;</span> = params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:Filedata</span><span style="color:#006600; font-weight:bold;">&#93;</span>
 <span style="color:#006666;">54</span>         h<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:picture</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:image</span><span style="color:#006600; font-weight:bold;">&#93;</span>.<span style="color:#9900CC;">content_type</span> = <span style="color:#6666ff; font-weight:bold;">MIME::Types</span>.<span style="color:#9900CC;">type_for</span><span style="color:#006600; font-weight:bold;">&#40;</span>h<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:picture</span><span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:image</span><span style="color:#006600; font-weight:bold;">&#93;</span>.<span style="color:#9900CC;">original_filename</span><span style="color:#006600; font-weight:bold;">&#41;</span>.<span style="color:#9900CC;">to_s</span>
 <span style="color:#006666;">55</span>         h
 <span style="color:#006666;">56</span>       <span style="color:#9966CC; font-weight:bold;">else</span>
 <span style="color:#006666;">57</span>         params
 <span style="color:#006666;">58</span>       <span style="color:#9966CC; font-weight:bold;">end</span> 
 <span style="color:#006666;">59</span>     <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">60</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

### Uploadify

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim config<span style="color:#006600; font-weight:bold;">/</span>initializers<span style="color:#006600; font-weight:bold;">/</span>session_store.<span style="color:#9900CC;">rb</span>
  <span style="color:#006666;">1</span> <span style="color:#008000; font-style:italic;"># Be sure to restart your server when you modify this file.</span>
  <span style="color:#006666;">2</span> 
  <span style="color:#006666;">3</span> <span style="color:#6666ff; font-weight:bold;">Photogallery::Application</span>.<span style="color:#9900CC;">config</span>.<span style="color:#9900CC;">session_store</span> <span style="color:#ff3333; font-weight:bold;">:cookie_store</span>, <span style="color:#ff3333; font-weight:bold;">:key</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'_photogallery_session'</span>
  <span style="color:#006666;">4</span> 
  <span style="color:#006666;">5</span> <span style="color:#008000; font-style:italic;"># Use the database for sessions instead of the cookie-based default,</span>
  <span style="color:#006666;">6</span> <span style="color:#008000; font-style:italic;"># which shouldn't be used to store highly confidential information</span>
  <span style="color:#006666;">7</span> <span style="color:#008000; font-style:italic;"># (create the session table with "rails generate session_migration")</span>
  <span style="color:#006666;">8</span> <span style="color:#008000; font-style:italic;"># Photogallery::Application.config.session_store :active_record_store</span>
  <span style="color:#006666;">9</span> Rails.<span style="color:#9900CC;">application</span>.<span style="color:#9900CC;">config</span>.<span style="color:#9900CC;">middleware</span>.<span style="color:#9900CC;">insert_before</span><span style="color:#006600; font-weight:bold;">&#40;</span>
 <span style="color:#006666;">10</span>   <span style="color:#6666ff; font-weight:bold;">ActionDispatch::Session::CookieStore</span>,
 <span style="color:#006666;">11</span>   FlashSessionCookieMiddleware,
 <span style="color:#006666;">12</span>   Rails.<span style="color:#9900CC;">application</span>.<span style="color:#9900CC;">config</span>.<span style="color:#9900CC;">session_options</span><span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:key</span><span style="color:#006600; font-weight:bold;">&#93;</span>
 <span style="color:#006666;">13</span> <span style="color:#006600; font-weight:bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ mkdir app<span style="color:#006600; font-weight:bold;">/</span>middleware
dev:photogallery rupert$ vim app<span style="color:#006600; font-weight:bold;">/</span>middleware<span style="color:#006600; font-weight:bold;">/</span>flash_session_cookie_middleware.<span style="color:#9900CC;">rb</span>
  <span style="color:#006666;">1</span> <span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#996600;">'rack/utils'</span>
  <span style="color:#006666;">2</span>  
  <span style="color:#006666;">3</span> <span style="color:#9966CC; font-weight:bold;">class</span> FlashSessionCookieMiddleware
  <span style="color:#006666;">4</span>   <span style="color:#9966CC; font-weight:bold;">def</span> initialize<span style="color:#006600; font-weight:bold;">&#40;</span>app, session_key = <span style="color:#996600;">'_session_id'</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  <span style="color:#006666;">5</span>     <span style="color:#0066ff; font-weight:bold;">@app</span> = app
  <span style="color:#006666;">6</span>     <span style="color:#0066ff; font-weight:bold;">@session_key</span> = session_key
  <span style="color:#006666;">7</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">8</span>  
  <span style="color:#006666;">9</span>   <span style="color:#9966CC; font-weight:bold;">def</span> call<span style="color:#006600; font-weight:bold;">&#40;</span>env<span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">10</span>     <span style="color:#9966CC; font-weight:bold;">if</span> env<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'HTTP_USER_AGENT'</span><span style="color:#006600; font-weight:bold;">&#93;</span> =~ <span style="color:#006600; font-weight:bold;">/</span>^<span style="color:#006600; font-weight:bold;">&#40;</span>Adobe<span style="color:#006600; font-weight:bold;">|</span>Shockwave<span style="color:#006600; font-weight:bold;">&#41;</span> Flash<span style="color:#006600; font-weight:bold;">/</span>
 <span style="color:#006666;">11</span>       req = <span style="color:#6666ff; font-weight:bold;">Rack::Request</span>.<span style="color:#9900CC;">new</span><span style="color:#006600; font-weight:bold;">&#40;</span>env<span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">12</span>       env<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'HTTP_COOKIE'</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#006600; font-weight:bold;">&#91;</span> <span style="color:#0066ff; font-weight:bold;">@session_key</span>,
 <span style="color:#006666;">13</span>                              req.<span style="color:#9900CC;">params</span><span style="color:#006600; font-weight:bold;">&#91;</span>@session_key<span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">&#93;</span>.<span style="color:#9900CC;">join</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'='</span><span style="color:#006600; font-weight:bold;">&#41;</span>.<span style="color:#9900CC;">freeze</span> <span style="color:#9966CC; font-weight:bold;">unless</span> req.<span style="color:#9900CC;">params</span><span style="color:#006600; font-weight:bold;">&#91;</span>@session_key<span style="color:#006600; font-weight:bold;">&#93;</span>.<span style="color:#0000FF; font-weight:bold;">nil</span>?
 <span style="color:#006666;">14</span>       env<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'HTTP_ACCEPT'</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#996600;">"#{req.params['_http_accept']}"</span>.<span style="color:#9900CC;">freeze</span> <span style="color:#9966CC; font-weight:bold;">unless</span> req.<span style="color:#9900CC;">params</span><span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'_http_accept'</span><span style="color:#006600; font-weight:bold;">&#93;</span>.<span style="color:#0000FF; font-weight:bold;">nil</span>?
 <span style="color:#006666;">15</span>     <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">16</span>  
 <span style="color:#006666;">17</span>     <span style="color:#0066ff; font-weight:bold;">@app</span>.<span style="color:#9900CC;">call</span><span style="color:#006600; font-weight:bold;">&#40;</span>env<span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">18</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">19</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">dev:photogallery rupert$ <span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-rf</span> public<span style="color: #000000; font-weight: bold;">/</span>javascripts<span style="color: #000000; font-weight: bold;">/*</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">dev:photogallery rupert$ <span style="color: #7a0874; font-weight: bold;">cd</span> doc<span style="color: #000000; font-weight: bold;">/</span>
dev:doc rupert$ <span style="color: #c20cb9; font-weight: bold;">wget</span> http:<span style="color: #000000; font-weight: bold;">//</span>www.uploadify.com<span style="color: #000000; font-weight: bold;">/</span>wp-content<span style="color: #000000; font-weight: bold;">/</span>uploads<span style="color: #000000; font-weight: bold;">/</span>Uploadify-v2.1.4.zip
<span style="color: #660033;">--2011-02-10</span> <span style="color: #000000;">14</span>:<span style="color: #000000;">58</span>:<span style="color: #000000;">26</span>--  http:<span style="color: #000000; font-weight: bold;">//</span>www.uploadify.com<span style="color: #000000; font-weight: bold;">/</span>wp-content<span style="color: #000000; font-weight: bold;">/</span>uploads<span style="color: #000000; font-weight: bold;">/</span>Uploadify-v2.1.4.zip
Resolving www.uploadify.com... 67.205.57.45
Connecting to www.uploadify.com<span style="color: #000000; font-weight: bold;">|</span>67.205.57.45<span style="color: #000000; font-weight: bold;">|</span>:<span style="color: #000000;">80</span>... connected.
HTTP request sent, awaiting response... <span style="color: #000000;">200</span> OK
Length: <span style="color: #000000;">237327</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>232K<span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>application<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">zip</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
Saving to: <span style="color: #000000; font-weight: bold;">`</span>Uploadify-v2.1.4.zip<span style="color: #ff0000;">'
&nbsp;
100%[===========================================================================================================================================&gt;] 237,327     88.9K/s   in 2.6s    
&nbsp;
2011-02-10 14:58:29 (88.9 KB/s) - `Uploadify-v2.1.4.zip'</span> saved <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">237327</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">237327</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
dev:doc rupert$ <span style="color: #c20cb9; font-weight: bold;">unzip</span> Uploadify-v2.1.4.zip
dev:doc rupert$ <span style="color: #7a0874; font-weight: bold;">cd</span> jquery.uploadify-v2.1.4<span style="color: #000000; font-weight: bold;">/</span>
&nbsp;
dev:jquery.uploadify-v2.1.4 rupert$ <span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #660033;">-p</span> ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>public<span style="color: #000000; font-weight: bold;">/</span>javascripts<span style="color: #000000; font-weight: bold;">/</span>uploadify
dev:jquery.uploadify-v2.1.4 rupert$ <span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #660033;">-p</span> ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>public<span style="color: #000000; font-weight: bold;">/</span>uploadify
&nbsp;
dev:jquery.uploadify-v2.1.4 rupert$ <span style="color: #c20cb9; font-weight: bold;">cp</span> uploadify.css ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>public<span style="color: #000000; font-weight: bold;">/</span>stylesheets<span style="color: #000000; font-weight: bold;">/</span>
&nbsp;
dev:jquery.uploadify-v2.1.4 rupert$ <span style="color: #c20cb9; font-weight: bold;">cp</span> jquery.uploadify.v2.1.4.js ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>public<span style="color: #000000; font-weight: bold;">/</span>javascripts<span style="color: #000000; font-weight: bold;">/</span>uploadify<span style="color: #000000; font-weight: bold;">/</span>
dev:jquery.uploadify-v2.1.4 rupert$ <span style="color: #c20cb9; font-weight: bold;">cp</span> swfobject.js ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>public<span style="color: #000000; font-weight: bold;">/</span>javascripts<span style="color: #000000; font-weight: bold;">/</span>uploadify<span style="color: #000000; font-weight: bold;">/</span>
&nbsp;
dev:jquery.uploadify-v2.1.4 rupert$ <span style="color: #c20cb9; font-weight: bold;">cp</span> <span style="color: #660033;">-Rf</span> uploadify.swf ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>public<span style="color: #000000; font-weight: bold;">/</span>uploadify<span style="color: #000000; font-weight: bold;">/</span>
dev:jquery.uploadify-v2.1.4 rupert$ <span style="color: #c20cb9; font-weight: bold;">cp</span> <span style="color: #660033;">-Rf</span> cancel.png ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>public<span style="color: #000000; font-weight: bold;">/</span>uploadify<span style="color: #000000; font-weight: bold;">/</span>
&nbsp;
dev:photogallery rupert$ <span style="color: #7a0874; font-weight: bold;">cd</span> ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>public<span style="color: #000000; font-weight: bold;">/</span>javascripts<span style="color: #000000; font-weight: bold;">/</span>
<span style="color: #c20cb9; font-weight: bold;">wget</span> https:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>rails<span style="color: #000000; font-weight: bold;">/</span>jquery-ujs<span style="color: #000000; font-weight: bold;">/</span>raw<span style="color: #000000; font-weight: bold;">/</span>master<span style="color: #000000; font-weight: bold;">/</span>src<span style="color: #000000; font-weight: bold;">/</span>rails.js <span style="color: #660033;">--no-check-certificate</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app/views/layouts/pictures.html.erb
  1 &lt;!DOCTYPE html&gt;
  2 &lt;html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"&gt;
  3 &lt;head&gt;
  4   &lt;title&gt;Photo Gallery&lt;/title&gt;
  5   
  6   <span style="color:#006600; font-weight:bold;">&lt;%</span>= stylesheet_link_tag <span style="color:#996600;">'formtastic/formtastic'</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  7   <span style="color:#006600; font-weight:bold;">&lt;%</span>= stylesheet_link_tag <span style="color:#996600;">'formtastic/formtastic_changes'</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  8 
  9   <span style="color:#006600; font-weight:bold;">&lt;%</span>= stylesheet_link_tag <span style="color:#996600;">'uploadify'</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 10 
 11   <span style="color:#006600; font-weight:bold;">&lt;%</span>= javascript_include_tag <span style="color:#996600;">'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js'</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 12   
 13   &lt;!-- 
 14     Taken from https://github.com/rails/jquery-ujs/raw/master/src/rails.js
 15     Do not remove jquery.rails.js as the delete links will not work 
 16   --&gt;
 17   <span style="color:#006600; font-weight:bold;">&lt;%</span>= javascript_include_tag <span style="color:#996600;">"jquery.rails.js"</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 18   
 19   <span style="color:#006600; font-weight:bold;">&lt;%</span>= csrf_meta_tag <span style="color:#006600; font-weight:bold;">%&gt;</span>
 20 &lt;/head&gt;
 21 &lt;body&gt;
 22 &lt;div class="container"&gt;
 23   <span style="color:#006600; font-weight:bold;">&lt;%</span> flash.<span style="color:#9900CC;">each</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>name, msg<span style="color:#006600; font-weight:bold;">|</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 24     &lt;hr/&gt;
 25     <span style="color:#006600; font-weight:bold;">&lt;%</span>= content_tag <span style="color:#ff3333; font-weight:bold;">:div</span>, msg, :<span style="color:#9966CC; font-weight:bold;">class</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"flash_#{name}"</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 26   <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 27 
 28   <span style="color:#006600; font-weight:bold;">&lt;%</span>= render <span style="color:#ff3333; font-weight:bold;">:partial</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'shared/header'</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 29 
 30   &lt;hr/&gt;
 31 
 32   <span style="color:#006600; font-weight:bold;">&lt;%</span>= <span style="color:#9966CC; font-weight:bold;">yield</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 33 
 34 &lt;/div&gt;
 35 
 36 &lt;/body&gt;
 37 &lt;/html&gt;</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app/views/pictures/index.html.erb
  1 &lt;h1&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= <span style="color:#996600;">"Manage #{pluralize(@user.pictures.size, 'Picture')}"</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/h1&gt;
  2 
  3   &lt;div class="upload_form"&gt;
  4     <span style="color:#006600; font-weight:bold;">&lt;%</span>= form_for Picture.<span style="color:#9900CC;">new</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@user</span>.<span style="color:#9900CC;">id</span><span style="color:#006600; font-weight:bold;">&#41;</span>, <span style="color:#ff3333; font-weight:bold;">:html</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#123;</span>:multipart <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0000FF; font-weight:bold;">true</span> <span style="color:#006600; font-weight:bold;">&#125;</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>f<span style="color:#006600; font-weight:bold;">|</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  5       &lt;h2&gt;Step 1: Choose your images&lt;/h2&gt;
  6       <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">file_field</span> <span style="color:#ff3333; font-weight:bold;">:image</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  7 
  8       <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">hidden_field</span> <span style="color:#ff3333; font-weight:bold;">:user_id</span>, <span style="color:#996600;">"value"</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@user</span>.<span style="color:#9900CC;">id</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  9 
 10       &lt;h2&gt;Step 2: Upload&lt;/h2&gt;
 11       <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">submit</span> <span style="color:#996600;">'Upload'</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 12     <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 13 
 14     <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">if</span> simple_upload_form? <span style="color:#006600; font-weight:bold;">%&gt;</span>
 15 
 16       &lt;span class="simple_upload_link"&gt;
 17         If you want to see the Browse flash button above, click on the
 18         <span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to <span style="color:#996600;">"Flash Upload"</span>, pictures_path<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@user</span>.<span style="color:#9900CC;">id</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 19       &lt;/span&gt;
 20 
 21     <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">else</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 22 
 23       &lt;!-- Important: Please see uploadify. It contains javascript functions to provide the BROWSE button, submit to a user with content_type json, and process the response. See     more details in uploadify --&gt;
 24       <span style="color:#006600; font-weight:bold;">&lt;%</span>= render <span style="color:#ff3333; font-weight:bold;">:partial</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"uploadify"</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 25 
 26       &lt;span class="simple_upload_link"&gt;
 27         If you cannot see the Browse flash button above, click on the
 28         <span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to <span style="color:#996600;">"Simple Upload"</span>, pictures_path<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:user_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@user</span>.<span style="color:#9900CC;">id</span>, <span style="color:#ff3333; font-weight:bold;">:simple</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">1</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 29       &lt;/span&gt;
 30 
 31     <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 32   &lt;/div&gt;
 33 
 34 &lt;div class="clear"&gt;&lt;/div&gt;
 35 
 36 &lt;hr/&gt;
 37 
 38 &lt;div class="picture_container"&gt;
 39   &lt;ul class="thumbs noscript"&gt;
 40     <span style="color:#006600; font-weight:bold;">&lt;%</span>= render <span style="color:#0066ff; font-weight:bold;">@pictures</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 41   &lt;/ul&gt;
 42 &lt;/div&gt;</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">dev<span style="color: #339933;">:</span>photogallery rupert$ vim app<span style="color: #339933;">/</span>views<span style="color: #339933;">/</span>pictures<span style="color: #339933;">/</span>_uploadify.<span style="color: #660066;">html</span>.<span style="color: #660066;">erb</span> 
  <span style="color: #CC0000;">1</span> <span style="color: #339933;">&lt;%=</span> javascript_include_tag <span style="color: #3366CC;">"uploadify/swfobject.js"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"uploadify/jquery.uploadify.v2.1.4.js"</span> <span style="color: #339933;">%&gt;</span>
  <span style="color: #CC0000;">2</span> 
  <span style="color: #CC0000;">3</span> <span style="color: #339933;">&lt;</span>script type<span style="color: #339933;">=</span><span style="color: #3366CC;">"text/javascript"</span> charset<span style="color: #339933;">=</span><span style="color: #3366CC;">"utf-8"</span><span style="color: #339933;">&gt;</span>
  <span style="color: #CC0000;">4</span> <span style="color: #339933;">&lt;%-</span> session_key <span style="color: #339933;">=</span> Rails.<span style="color: #660066;">application</span>.<span style="color: #660066;">config</span>.<span style="color: #660066;">session_options</span><span style="color: #009900;">&#91;</span><span style="color: #339933;">:</span>key<span style="color: #009900;">&#93;</span> <span style="color: #339933;">-%&gt;</span> 
  <span style="color: #CC0000;">5</span> $<span style="color: #009900;">&#40;</span>document<span style="color: #009900;">&#41;</span>.<span style="color: #660066;">ready</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
  <span style="color: #CC0000;">6</span>   
  <span style="color: #CC0000;">7</span>   $<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'#picture_image'</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">click</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>event<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span> 
  <span style="color: #CC0000;">8</span>     event.<span style="color: #660066;">preventDefault</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #CC0000;">9</span>   <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span> 
 <span style="color: #CC0000;">10</span>   
 <span style="color: #CC0000;">11</span>   $<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'#picture_image'</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">uploadify</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span>
 <span style="color: #CC0000;">12</span>     buttonText<span style="color: #339933;">:</span> <span style="color: #3366CC;">'Browse'</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">13</span>     width<span style="color: #339933;">:</span> <span style="color: #CC0000;">110</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">14</span>     uploader <span style="color: #339933;">:</span> <span style="color: #3366CC;">'/images/uploadify/uploadify.swf'</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">15</span>     cancelImg <span style="color: #339933;">:</span> <span style="color: #3366CC;">'/images/uploadify/cancel.png'</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">16</span>     multi <span style="color: #339933;">:</span> <span style="color: #003366; font-weight: bold;">true</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">17</span>     auto <span style="color: #339933;">:</span> <span style="color: #003366; font-weight: bold;">true</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">18</span>     script <span style="color: #339933;">:</span> <span style="color: #3366CC;">'pictures'</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">19</span>     <span style="color: #006600; font-style: italic;">//Function 'onComplete' below will process response from pictures_controller 'create'</span>
 <span style="color: #CC0000;">20</span>     <span style="color: #006600; font-style: italic;">//format.json {render :json =&gt; { :result =&gt; 'success', :picture =&gt; admin_picture_path(@picture) } }</span>
 <span style="color: #CC0000;">21</span>     onComplete <span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>event<span style="color: #339933;">,</span> queueID<span style="color: #339933;">,</span> fileObj<span style="color: #339933;">,</span> response<span style="color: #339933;">,</span> data<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span> 
 <span style="color: #CC0000;">22</span>       <span style="color: #000066; font-weight: bold;">var</span> data <span style="color: #339933;">=</span> eval<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'('</span> <span style="color: #339933;">+</span> response <span style="color: #339933;">+</span> <span style="color: #3366CC;">')'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
 <span style="color: #CC0000;">23</span>       <span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>data.<span style="color: #660066;">result</span> <span style="color: #339933;">==</span> <span style="color: #3366CC;">'success'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
 <span style="color: #CC0000;">24</span>         $.<span style="color: #660066;">getScript</span><span style="color: #009900;">&#40;</span>data.<span style="color: #660066;">picture</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
 <span style="color: #CC0000;">25</span>       <span style="color: #009900;">&#125;</span>
 <span style="color: #CC0000;">26</span>       <span style="color: #000066; font-weight: bold;">else</span><span style="color: #009900;">&#123;</span>
 <span style="color: #CC0000;">27</span>         alert<span style="color: #009900;">&#40;</span>data.<span style="color: #660066;">error</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
 <span style="color: #CC0000;">28</span>         <span style="color: #006600; font-style: italic;">//We can have a &lt;hr/&gt; before alert or notice using jquery</span>
 <span style="color: #CC0000;">29</span>         $<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'#alert'</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">html</span><span style="color: #009900;">&#40;</span>data.<span style="color: #660066;">error</span><span style="color: #009900;">&#41;</span>
 <span style="color: #CC0000;">30</span>       <span style="color: #009900;">&#125;</span>
 <span style="color: #CC0000;">31</span>     <span style="color: #009900;">&#125;</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">32</span>     scriptData <span style="color: #339933;">:</span> <span style="color: #009900;">&#123;</span>
 <span style="color: #CC0000;">33</span>           <span style="color: #3366CC;">'_http_accept'</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">'application/javascript'</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">34</span>           <span style="color: #3366CC;">'format'</span> <span style="color: #339933;">:</span> <span style="color: #3366CC;">'json'</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">35</span>           <span style="color: #3366CC;">'_method'</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">'post'</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">36</span>           <span style="color: #3366CC;">'&lt;%= session_key %&gt;'</span> <span style="color: #339933;">:</span> encodeURIComponent<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'&lt;%= u cookies[session_key] %&gt;'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">37</span>           <span style="color: #3366CC;">'authenticity_token'</span><span style="color: #339933;">:</span> encodeURIComponent<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'&lt;%= u form_authenticity_token %&gt;'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span>
 <span style="color: #CC0000;">38</span>           <span style="color: #3366CC;">'user_id'</span> <span style="color: #339933;">:</span> <span style="color: #3366CC;">'&lt;%= @user.id %&gt;'</span>
 <span style="color: #CC0000;">39</span>         <span style="color: #009900;">&#125;</span>
 <span style="color: #CC0000;">40</span>   <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
 <span style="color: #CC0000;">41</span>   
 <span style="color: #CC0000;">42</span>   $<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'#picture_submit'</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">click</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>event<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span> 
 <span style="color: #CC0000;">43</span>       event.<span style="color: #660066;">preventDefault</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span> 
 <span style="color: #CC0000;">44</span>       $<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'#upload_photo'</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">uploadifyUpload</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span> 
 <span style="color: #CC0000;">45</span>     <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
 <span style="color: #CC0000;">46</span>     
 <span style="color: #CC0000;">47</span> <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span> 
 <span style="color: #CC0000;">48</span> <span style="color: #339933;">&lt;/</span>script<span style="color: #339933;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app<span style="color:#006600; font-weight:bold;">/</span>helpers<span style="color:#006600; font-weight:bold;">/</span>pictures_helper.<span style="color:#9900CC;">rb</span>
  <span style="color:#006666;">1</span> <span style="color:#9966CC; font-weight:bold;">module</span> PicturesHelper
  <span style="color:#006666;">2</span>   <span style="color:#9966CC; font-weight:bold;">def</span> simple_upload_form?
  <span style="color:#006666;">3</span>     <span style="color:#9966CC; font-weight:bold;">if</span> params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:simple</span><span style="color:#006600; font-weight:bold;">&#93;</span> == <span style="color:#0000FF; font-weight:bold;">nil</span>
  <span style="color:#006666;">4</span>       <span style="color:#0000FF; font-weight:bold;">return</span> <span style="color:#0000FF; font-weight:bold;">false</span>
  <span style="color:#006666;">5</span>     <span style="color:#9966CC; font-weight:bold;">else</span>
  <span style="color:#006666;">6</span>       <span style="color:#0000FF; font-weight:bold;">return</span> <span style="color:#0000FF; font-weight:bold;">true</span>
  <span style="color:#006666;">7</span>     <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">8</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">9</span> 
 <span style="color:#006666;">10</span>   <span style="color:#9966CC; font-weight:bold;">def</span> link_to_picture<span style="color:#006600; font-weight:bold;">&#40;</span>picture<span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">11</span>     link_to<span style="color:#006600; font-weight:bold;">&#40;</span>
 <span style="color:#006666;">12</span>       image_tag<span style="color:#006600; font-weight:bold;">&#40;</span> picture.<span style="color:#9900CC;">image</span>.<span style="color:#9900CC;">url</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:thumb</span><span style="color:#006600; font-weight:bold;">&#41;</span>, <span style="color:#ff3333; font-weight:bold;">:size</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'80x80'</span>, <span style="color:#ff3333; font-weight:bold;">:border</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;"></span> <span style="color:#006600; font-weight:bold;">&#41;</span>,
 <span style="color:#006666;">13</span>       picture.<span style="color:#9900CC;">image</span>.<span style="color:#9900CC;">url</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:pagesize</span><span style="color:#006600; font-weight:bold;">&#41;</span>,
 <span style="color:#006666;">14</span>       <span style="color:#006600; font-weight:bold;">&#123;</span>
 <span style="color:#006666;">15</span>         :<span style="color:#9966CC; font-weight:bold;">class</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"thumb"</span>,
 <span style="color:#006666;">16</span>         <span style="color:#ff3333; font-weight:bold;">:title</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"#{picture.image_file_name}"</span>,
 <span style="color:#006666;">17</span>         <span style="color:#ff3333; font-weight:bold;">:name</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"#{picture.image_file_name}"</span>,
 <span style="color:#006666;">18</span>         <span style="color:#ff3333; font-weight:bold;">:rel</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"nofollow"</span>
 <span style="color:#006666;">19</span>       <span style="color:#006600; font-weight:bold;">&#125;</span>
 <span style="color:#006666;">20</span>     <span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">21</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">22</span> 
 <span style="color:#006666;">23</span>   <span style="color:#9966CC; font-weight:bold;">def</span> link_to_web_photo<span style="color:#006600; font-weight:bold;">&#40;</span>photo<span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">24</span>     link_to<span style="color:#006600; font-weight:bold;">&#40;</span>
 <span style="color:#006666;">25</span>       image_tag<span style="color:#006600; font-weight:bold;">&#40;</span> photo.<span style="color:#9900CC;">thumb_path</span>, <span style="color:#ff3333; font-weight:bold;">:size</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'80x80'</span>, <span style="color:#ff3333; font-weight:bold;">:border</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;"></span> <span style="color:#006600; font-weight:bold;">&#41;</span>,
 <span style="color:#006666;">26</span>       photo.<span style="color:#9900CC;">full_path</span>,
 <span style="color:#006666;">27</span>       <span style="color:#006600; font-weight:bold;">&#123;</span>
 <span style="color:#006666;">28</span>         :<span style="color:#9966CC; font-weight:bold;">class</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"thumb"</span>,
 <span style="color:#006666;">29</span>         <span style="color:#ff3333; font-weight:bold;">:title</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"#{photo.thumb_path}"</span>,
 <span style="color:#006666;">30</span>         <span style="color:#ff3333; font-weight:bold;">:name</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"#{photo.thumb_path}"</span>,
 <span style="color:#006666;">31</span>         <span style="color:#ff3333; font-weight:bold;">:rel</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"nofollow"</span>
 <span style="color:#006666;">32</span>       <span style="color:#006600; font-weight:bold;">&#125;</span>
 <span style="color:#006666;">33</span>     <span style="color:#006600; font-weight:bold;">&#41;</span>
 <span style="color:#006666;">34</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
 <span style="color:#006666;">35</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app/views/pictures/_picture.html.erb
  1 &lt;li&gt;
  2   &lt;p&gt;
  3     <span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to_picture<span style="color:#006600; font-weight:bold;">&#40;</span>picture<span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;br/&gt;
  4     <span style="color:#006600; font-weight:bold;">&lt;%</span>= picture.<span style="color:#9900CC;">caption_title</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  5   &lt;/p&gt;
  6   <span style="color:#006600; font-weight:bold;">&lt;%</span>= link_to <span style="color:#996600;">"Delete Picture"</span>, picture_path<span style="color:#006600; font-weight:bold;">&#40;</span>picture<span style="color:#006600; font-weight:bold;">&#41;</span>, <span style="color:#ff3333; font-weight:bold;">:confirm</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"Are you sure?"</span>, <span style="color:#ff3333; font-weight:bold;">:method</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#ff3333; font-weight:bold;">:delete</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  7 &lt;/li&gt;</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app/views/pictures/show.js.erb
  1 $('h1').html('Manage <span style="color:#006600; font-weight:bold;">&lt;%</span>= pluralize<span style="color:#006600; font-weight:bold;">&#40;</span>@total_pictures.<span style="color:#9900CC;">count</span>, <span style="color:#996600;">"Picture"</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>');
  2 $('ul.thumbs').append('<span style="color:#006600; font-weight:bold;">&lt;%</span>= escape_javascript<span style="color:#006600; font-weight:bold;">&#40;</span>render <span style="color:#0066ff; font-weight:bold;">@picture</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>');</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">dev:photogallery rupert$ vim app/views/pictures/edit.html.erb
  1 <span style="color:#006600; font-weight:bold;">&lt;%</span> title <span style="color:#996600;">'Edit Caption'</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  2 
  3 <span style="color:#006600; font-weight:bold;">&lt;%</span>= render <span style="color:#996600;">"shared/error_messages"</span>, <span style="color:#ff3333; font-weight:bold;">:target</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@picture</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  4 
  5 &lt;p style="text-align:center"&gt;<span style="color:#006600; font-weight:bold;">&lt;%</span>= image_tag <span style="color:#0066ff; font-weight:bold;">@picture</span>.<span style="color:#9900CC;">image</span>.<span style="color:#9900CC;">url</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:pagesize</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>&lt;/p&gt;
  6 
  7 <span style="color:#006600; font-weight:bold;">&lt;%</span>= semantic_form_for <span style="color:#0066ff; font-weight:bold;">@picture</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>f<span style="color:#006600; font-weight:bold;">|</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  8   <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">inputs</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
  9     <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">input</span> <span style="color:#ff3333; font-weight:bold;">:caption_title</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 10     <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">input</span> <span style="color:#ff3333; font-weight:bold;">:caption_description</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 11   <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 12   
 13   <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">buttons</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 14     <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">commit_button</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 15     <span style="color:#006600; font-weight:bold;">&lt;%</span>= f.<span style="color:#9900CC;">cancel_button</span> pictures_path<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:page_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0066ff; font-weight:bold;">@picture</span>.<span style="color:#9900CC;">page</span>.<span style="color:#9900CC;">id</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 16   <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 17   
 18 <span style="color:#006600; font-weight:bold;">&lt;%</span> <span style="color:#9966CC; font-weight:bold;">end</span> <span style="color:#006600; font-weight:bold;">%&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

Download [photogallery.tar.gz][1]

 [1]: /images/2011/02/photogallery.tar1.gz "photogallery.tar.gz"