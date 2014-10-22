---
title: devise limit one session per user at a time
author: rupert
layout: post
permalink: /2012/02/devise-limit-one-session-per-user-at-a-time/
categories:
  - rails
tags:
  - devise
  - rails
---
A user can only be signed in a single session at a time. This means if he logged in to computer A then afterwards he logged in to computer B, then computer A times out. The original question was solved in <http://stackoverflow.com/questions/7068919/devise-limit-one-session-per-user-at-a-time>

`app/controllers/application_controller.rb`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> ApplicationController <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActionController::Base</span>
  protect_from_forgery
&nbsp;
  before_filter <span style="color:#ff3333; font-weight:bold;">:authenticate_user</span>!, <span style="color:#ff3333; font-weight:bold;">:check_concurrent_session</span>, <span style="color:#ff3333; font-weight:bold;">:store_location</span>
&nbsp;
  ... 
  <span style="color:#9966CC; font-weight:bold;">def</span> check_concurrent_session
    <span style="color:#9966CC; font-weight:bold;">if</span> is_already_logged_in?
      sign_out_and_redirect<span style="color:#006600; font-weight:bold;">&#40;</span>current_user<span style="color:#006600; font-weight:bold;">&#41;</span>
    <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">def</span> is_already_logged_in?
    current_user <span style="color:#006600; font-weight:bold;">&&</span> !<span style="color:#006600; font-weight:bold;">&#40;</span>session<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:token</span><span style="color:#006600; font-weight:bold;">&#93;</span> == current_user.<span style="color:#9900CC;">login_token</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">def</span> after_sign_out_path_for<span style="color:#006600; font-weight:bold;">&#40;</span>resource<span style="color:#006600; font-weight:bold;">&#41;</span>
    loggedout_path
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

`app/controllers/sessions_controller.rb`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> SessionsController <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">Devise::SessionsController</span>
&nbsp;
  skip_before_filter <span style="color:#ff3333; font-weight:bold;">:check_concurrent_session</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">def</span> create
    <span style="color:#9966CC; font-weight:bold;">super</span>
    set_login_token
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
  private
  <span style="color:#9966CC; font-weight:bold;">def</span> set_login_token
    token = Devise.<span style="color:#9900CC;">friendly_token</span>
    session<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#ff3333; font-weight:bold;">:token</span><span style="color:#006600; font-weight:bold;">&#93;</span> = token
    current_user.<span style="color:#9900CC;">login_token</span> = token
    current_user.<span style="color:#9900CC;">save</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

`app/controllers/static_controller.rb`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> StaticController <span style="color:#006600; font-weight:bold;">&lt;</span> ApplicationController
  skip_before_filter <span style="color:#ff3333; font-weight:bold;">:authenticate_user</span>!
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

`app/views/sessions/new.html.erb`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="html" style="font-family:monospace;">&lt;div id="application"&gt;
&nbsp;
 &lt;nav id="secondary"&gt;
    &lt;ul&gt;
      &lt;li class="current"&gt;&lt;%= link_to "Log In", new_user_session_path %&gt;&lt;/li&gt;
      &lt;%- if devise_mapping.recoverable? && controller_name != 'passwords' %&gt;
        &lt;li&gt;&lt;%= link_to "Forgot Password", new_password_path(resource_name) %&gt;&lt;/li&gt;
      &lt;% end -%&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
&nbsp;
  &lt;section id="content"&gt;
&nbsp;
    &lt;%= semantic_form_for(resource, :as =&gt; resource_name, :url =&gt; session_path(resource_name)) do |f| %&gt;
      &lt;section&gt;
        &lt;%= f.input :username %&gt;
      &lt;/section&gt;
&nbsp;
      &lt;section&gt;
        &lt;%= f.input :password %&gt;
      &lt;/section&gt;
&nbsp;
      &lt;%= f.buttons do %&gt;
        &lt;%= f.commit_button :label =&gt; "Login", :button_html =&gt; { :class =&gt; "button primary submit"} %&gt;
      &lt;% end %&gt;
&nbsp;
      &lt;br/&gt;
    &lt;% end %&gt;
&nbsp;
    &lt;%= render :partial =&gt; 'layouts/devise/devise_error_messages' %&gt;
&nbsp;
  &lt;/section&gt;
&nbsp;
&lt;/div&gt;</pre>
      </td>
    </tr>
  </table>
</div>

`app/views/static/loggedout.html.erb`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="html" style="font-family:monospace;">&lt;section id="content"&gt;
&nbsp;
  &lt;h1&gt;Logged Out&lt;/h1&gt;
&nbsp;
  &lt;hr/&gt;
&nbsp;
  &lt;p&gt;This is not an error page but an indication that you have lost your session.&lt;/p&gt;
&nbsp;
  &lt;p&gt;&lt;b&gt;So why are you here?&lt;/b&gt;&lt;/p&gt;
&nbsp;
  &lt;ul&gt;
    &lt;li&gt;- You have successfully logged out after clicking the "Logout" button.&lt;/li&gt;
    &lt;li&gt;- You logged in to another machine so we logged this session out. We don't want to have multiple logins everywhere for security purposes.&lt;/li&gt;
    &lt;li&gt;- You have been inactive for a while, we logged this session out.&lt;/li&gt;
  &lt;/ul&gt;
&nbsp;
  &lt;p&gt;&lt;b&gt;&lt;%= link_to "Login", new_user_session_path, :class =&gt; "button" %&gt;&lt;/b&gt;&lt;/p&gt;
&lt;/section&gt;</pre>
      </td>
    </tr>
  </table>
</div>

`config/routes.rb`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">  devise_for <span style="color:#ff3333; font-weight:bold;">:users</span>, <span style="color:#ff3333; font-weight:bold;">:controllers</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006600; font-weight:bold;">&#123;</span> <span style="color:#ff3333; font-weight:bold;">:sessions</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"sessions"</span> <span style="color:#006600; font-weight:bold;">&#125;</span>
&nbsp;
  ..
  <span style="color:#9900CC;">match</span> <span style="color:#996600;">"loggedout"</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"static#loggedout"</span>
 <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

`db/migrate/20120223022102_add_login_token_to_users.rb`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> AddLoginTokenToUsers <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#6666ff; font-weight:bold;">ActiveRecord::Migration</span>
  <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">up</span>
    PgTools.<span style="color:#9900CC;">restore_default_search_path</span>
&nbsp;
    change_table <span style="color:#996600;">"users"</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>t<span style="color:#006600; font-weight:bold;">|</span>
      t.<span style="color:#CC0066; font-weight:bold;">string</span> <span style="color:#996600;">"login_token"</span>
    <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
  <span style="color:#9966CC; font-weight:bold;">def</span> <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9900CC;">down</span>
    PgTools.<span style="color:#9900CC;">restore_default_search_path</span>
&nbsp;
    change_table <span style="color:#996600;">"users"</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>t<span style="color:#006600; font-weight:bold;">|</span>
      t.<span style="color:#9900CC;">remove</span> <span style="color:#996600;">"login_token"</span>
    <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>