---
title: 'Rails Note #15: Rails 3, Devise, Cucumber'
author: rupert
layout: post
permalink: /2011/02/rails-note-15-rails-3-2/
categories:
  - rails
  - ruby
tags:
  - cucumber
  - rails
  - rails3
---
1. **Installed rvm (Ruby Version Manager).** See [Episode 200. Rails3 Beta and RVM][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ rvm ruby-1.9.2-p0
rupert:tsa rupert$ ruby <span style="color: #660033;">-v</span>
ruby 1.9.2p0 <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">2010</span>-08-<span style="color: #000000;">18</span> revision <span style="color: #000000;">29036</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>x86_64-darwin10.5.0<span style="color: #7a0874; font-weight: bold;">&#93;</span></pre>
      </td>
    </tr>
  </table>
</div>

To use ruby-1.9.2-p0 as default

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:rails3 rupert$ rvm ruby-1.9.2-p0 <span style="color: #660033;">--default</span>
rupert:rails3 rupert$ ruby <span style="color: #660033;">-v</span>
ruby 1.9.2p0 <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">2010</span>-08-<span style="color: #000000;">18</span> revision <span style="color: #000000;">29036</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>x86_64-darwin10.5.0<span style="color: #7a0874; font-weight: bold;">&#93;</span></pre>
      </td>
    </tr>
  </table>
</div>

2. **Install rails3**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">gem <span style="color: #c20cb9; font-weight: bold;">install</span> rails</pre>
      </td>
    </tr>
  </table>
</div>

3. **Create a rails app tsa** (the sample app)

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rails new tsa <span style="color: #660033;">-d</span> mysql</pre>
      </td>
    </tr>
  </table>
</div>

4. Start webrick. Yup, script/server is gone

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ rails server <span style="color: #660033;">-e</span> development
=<span style="color: #000000; font-weight: bold;">&gt;</span> Booting WEBrick
=<span style="color: #000000; font-weight: bold;">&gt;</span> Rails 3.0.3 application starting <span style="color: #000000; font-weight: bold;">in</span> production on http:<span style="color: #000000; font-weight: bold;">//</span>0.0.0.0:<span style="color: #000000;">3000</span>
=<span style="color: #000000; font-weight: bold;">&gt;</span> Call with <span style="color: #660033;">-d</span> to detach
=<span style="color: #000000; font-weight: bold;">&gt;</span> Ctrl-C to shutdown server
<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">2010</span>-<span style="color: #000000;">12</span>-06 <span style="color: #000000;">20</span>:<span style="color: #000000;">47</span>:<span style="color: #000000;">27</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> INFO  WEBrick 1.3.1
<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">2010</span>-<span style="color: #000000;">12</span>-06 <span style="color: #000000;">20</span>:<span style="color: #000000;">47</span>:<span style="color: #000000;">27</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> INFO  ruby 1.9.2 <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">2010</span>-08-<span style="color: #000000;">18</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>x86_64-darwin10.5.0<span style="color: #7a0874; font-weight: bold;">&#93;</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">2010</span>-<span style="color: #000000;">12</span>-06 <span style="color: #000000;">20</span>:<span style="color: #000000;">47</span>:<span style="color: #000000;">27</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> INFO  WEBrick::HTTPServer<span style="color: #666666; font-style: italic;">#start: pid=1348 port=3000</span></pre>
      </td>
    </tr>
  </table>
</div>

Note: Upon checking http://127.0.0.1:3000/ I get a &#8220;Routing Error&#8221;

5. **Update your GemFile with the necessary gems.**  
Let&#8217;s use devise as a login authentication system.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">source <span style="color:#996600;">'http://rubygems.org'</span>
&nbsp;
gem <span style="color:#996600;">'rails'</span>, <span style="color:#996600;">'3.0.3'</span>
&nbsp;
<span style="color:#008000; font-style:italic;"># Bundle edge Rails instead:</span>
<span style="color:#008000; font-style:italic;"># gem 'rails', :git =&gt; 'git://github.com/rails/rails.git'</span>
&nbsp;
gem <span style="color:#996600;">'mysql2'</span>
gem <span style="color:#996600;">'devise'</span>, <span style="color:#ff3333; font-weight:bold;">:git</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"git://github.com/plataformatec/devise.git"</span>, <span style="color:#ff3333; font-weight:bold;">:branch</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"master"</span></pre>
      </td>
    </tr>
  </table>
</div>

Then run **bundle install**. This will install devise gem.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ bundle <span style="color: #c20cb9; font-weight: bold;">install</span>
Fetching git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>plataformatec<span style="color: #000000; font-weight: bold;">/</span>devise.git
remote: Counting objects: <span style="color: #000000;">10326</span>, done.
remote: Compressing objects: <span style="color: #000000;">100</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">3745</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">3745</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, done.
remote: Total <span style="color: #000000;">10326</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>delta <span style="color: #000000;">6603</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, reused <span style="color: #000000;">9755</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>delta <span style="color: #000000;">6163</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
Receiving objects: <span style="color: #000000;">100</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">10326</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">10326</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #000000;">1.24</span> MiB <span style="color: #000000; font-weight: bold;">|</span> <span style="color: #000000;">314</span> KiB<span style="color: #000000; font-weight: bold;">/</span>s, done.
Resolving deltas: <span style="color: #000000;">100</span><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">6603</span><span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">6603</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, done.
Fetching <span style="color: #7a0874; font-weight: bold;">source</span> index <span style="color: #000000; font-weight: bold;">for</span> http:<span style="color: #000000; font-weight: bold;">//</span>rubygems.org<span style="color: #000000; font-weight: bold;">/</span></pre>
      </td>
    </tr>
  </table>
</div>

Where are the gems installed?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ bundle show devise
<span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.rvm<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>ruby-1.9.2-p0<span style="color: #000000; font-weight: bold;">/</span>bundler<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>devise-b50fd1a72e71</pre>
      </td>
    </tr>
  </table>
</div>

6. **Create the necessary databases in mysql.** See config/database.yml

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">DATABASE</span> tsa_development;</pre>
      </td>
    </tr>
  </table>
</div>

7. **Run devise generator.**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ rails generate devise:install
      create  config<span style="color: #000000; font-weight: bold;">/</span>initializers<span style="color: #000000; font-weight: bold;">/</span>devise.rb
      create  config<span style="color: #000000; font-weight: bold;">/</span>locales<span style="color: #000000; font-weight: bold;">/</span>devise.en.yml
&nbsp;
===============================================================================
&nbsp;
Some setup you must <span style="color: #000000; font-weight: bold;">do</span> manually <span style="color: #000000; font-weight: bold;">if</span> you havent yet:
&nbsp;
  <span style="color: #000000;">1</span>. Setup default url options <span style="color: #000000; font-weight: bold;">for</span> your specific environment. Here is an
     example of development environment:
&nbsp;
       config.action_mailer.default_url_options = <span style="color: #7a0874; font-weight: bold;">&#123;</span> :host =<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #ff0000;">'localhost:3000'</span> <span style="color: #7a0874; font-weight: bold;">&#125;</span>
&nbsp;
     This is a required Rails configuration. In production it must be the
     actual host of your application
&nbsp;
  <span style="color: #000000;">2</span>. Ensure you have defined root_url to <span style="color: #000000; font-weight: bold;">*</span>something<span style="color: #000000; font-weight: bold;">*</span> <span style="color: #000000; font-weight: bold;">in</span> your config<span style="color: #000000; font-weight: bold;">/</span>routes.rb.
     For example:
&nbsp;
       root :to =<span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #ff0000;">"home#index"</span>
&nbsp;
  <span style="color: #000000;">3</span>. Ensure you have flash messages <span style="color: #000000; font-weight: bold;">in</span> app<span style="color: #000000; font-weight: bold;">/</span>views<span style="color: #000000; font-weight: bold;">/</span>layouts<span style="color: #000000; font-weight: bold;">/</span>application.html.erb.
     For example:
&nbsp;
       <span style="color: #000000; font-weight: bold;">&lt;</span>p <span style="color: #007800;">class</span>=<span style="color: #ff0000;">"notice"</span><span style="color: #000000; font-weight: bold;">&gt;&lt;%</span>= notice <span style="color: #000000; font-weight: bold;">%&gt;&lt;/</span>p<span style="color: #000000; font-weight: bold;">&gt;</span>
       <span style="color: #000000; font-weight: bold;">&lt;</span>p <span style="color: #007800;">class</span>=<span style="color: #ff0000;">"alert"</span><span style="color: #000000; font-weight: bold;">&gt;&lt;%</span>= alert <span style="color: #000000; font-weight: bold;">%&gt;&lt;/</span>p<span style="color: #000000; font-weight: bold;">&gt;</span>
&nbsp;
===============================================================================</pre>
      </td>
    </tr>
  </table>
</div>

8. **Generate a controller in Rails3.**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ rails generate controller main index
      create  app<span style="color: #000000; font-weight: bold;">/</span>controllers<span style="color: #000000; font-weight: bold;">/</span>main_controller.rb
       route  get <span style="color: #ff0000;">"main/index"</span>
      invoke  erb
      create    app<span style="color: #000000; font-weight: bold;">/</span>views<span style="color: #000000; font-weight: bold;">/</span>main
      create    app<span style="color: #000000; font-weight: bold;">/</span>views<span style="color: #000000; font-weight: bold;">/</span>main<span style="color: #000000; font-weight: bold;">/</span>index.html.erb
      invoke  test_unit
      create    test<span style="color: #000000; font-weight: bold;">/</span>functional<span style="color: #000000; font-weight: bold;">/</span>main_controller_test.rb
      invoke  helper
      create    app<span style="color: #000000; font-weight: bold;">/</span>helpers<span style="color: #000000; font-weight: bold;">/</span>main_helper.rb
      invoke    test_unit
      create      test<span style="color: #000000; font-weight: bold;">/</span>unit<span style="color: #000000; font-weight: bold;">/</span>helpers<span style="color: #000000; font-weight: bold;">/</span>main_helper_test.rb</pre>
      </td>
    </tr>
  </table>
</div>

Update routes.rb for the root_url

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">  root <span style="color:#ff3333; font-weight:bold;">:to</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"main#index"</span></pre>
      </td>
    </tr>
  </table>
</div>

9. Create a User model with devise.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ rails generate devise User
      invoke  active_record
      create    app<span style="color: #000000; font-weight: bold;">/</span>models<span style="color: #000000; font-weight: bold;">/</span>user.rb
      invoke    test_unit
      create      test<span style="color: #000000; font-weight: bold;">/</span>unit<span style="color: #000000; font-weight: bold;">/</span>user_test.rb
      create      test<span style="color: #000000; font-weight: bold;">/</span>fixtures<span style="color: #000000; font-weight: bold;">/</span>users.yml
      create    db<span style="color: #000000; font-weight: bold;">/</span>migrate<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">20101206104321</span>_devise_create_users.rb
      insert    app<span style="color: #000000; font-weight: bold;">/</span>models<span style="color: #000000; font-weight: bold;">/</span>user.rb
       route  devise_for :users
rupert:tsa rupert$</pre>
      </td>
    </tr>
  </table>
</div>

10. Run migration for User model

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ <span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">RAILS_ENV</span>=development
rupert:tsa rupert$ rake db:migrate
<span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>rails3<span style="color: #000000; font-weight: bold;">/</span>tsa<span style="color: #7a0874; font-weight: bold;">&#41;</span>
==  DeviseCreateUsers: migrating ==============================================
<span style="color: #660033;">--</span> create_table<span style="color: #7a0874; font-weight: bold;">&#40;</span>:users<span style="color: #7a0874; font-weight: bold;">&#41;</span>
   -<span style="color: #000000; font-weight: bold;">&gt;</span> 0.0805s
<span style="color: #660033;">--</span> add_index<span style="color: #7a0874; font-weight: bold;">&#40;</span>:users, :email, <span style="color: #7a0874; font-weight: bold;">&#123;</span>:<span style="color: #007800;">unique</span>=<span style="color: #000000; font-weight: bold;">&gt;</span><span style="color: #c20cb9; font-weight: bold;">true</span><span style="color: #7a0874; font-weight: bold;">&#125;</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
   -<span style="color: #000000; font-weight: bold;">&gt;</span> 0.1368s
<span style="color: #660033;">--</span> add_index<span style="color: #7a0874; font-weight: bold;">&#40;</span>:users, :reset_password_token, <span style="color: #7a0874; font-weight: bold;">&#123;</span>:<span style="color: #007800;">unique</span>=<span style="color: #000000; font-weight: bold;">&gt;</span><span style="color: #c20cb9; font-weight: bold;">true</span><span style="color: #7a0874; font-weight: bold;">&#125;</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
   -<span style="color: #000000; font-weight: bold;">&gt;</span> 0.1484s
==  DeviseCreateUsers: migrated <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.3662s<span style="color: #7a0874; font-weight: bold;">&#41;</span> =====================================</pre>
      </td>
    </tr>
  </table>
</div>

11. Using cucumber

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> port <span style="color: #c20cb9; font-weight: bold;">install</span> libxml2 libxslt</pre>
      </td>
    </tr>
  </table>
</div>

12. Update Gemfile

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">group <span style="color:#ff3333; font-weight:bold;">:test</span>, <span style="color:#ff3333; font-weight:bold;">:development</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  gem <span style="color:#996600;">'rspec'</span>
  gem <span style="color:#996600;">'rspec-rails'</span>
  gem <span style="color:#996600;">'cucumber'</span>
  gem <span style="color:#996600;">'cucumber-rails'</span>
  gem <span style="color:#996600;">'capybara'</span>
  gem <span style="color:#996600;">'launchy'</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

13. Rspec

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ rails g rspec:install
      create  .rspec
      create  spec
      create  spec<span style="color: #000000; font-weight: bold;">/</span>spec_helper.rb
      create  autotest
      create  autotest<span style="color: #000000; font-weight: bold;">/</span>discover.rb</pre>
      </td>
    </tr>
  </table>
</div>

14. Cucumber

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:tsa rupert$ rails g cucumber:install <span style="color: #660033;">--rspec</span> <span style="color: #660033;">--capybara</span>
      create  config<span style="color: #000000; font-weight: bold;">/</span>cucumber.yml
      create  script<span style="color: #000000; font-weight: bold;">/</span>cucumber
       <span style="color: #c20cb9; font-weight: bold;">chmod</span>  script<span style="color: #000000; font-weight: bold;">/</span>cucumber
      create  features<span style="color: #000000; font-weight: bold;">/</span>step_definitions
      create  features<span style="color: #000000; font-weight: bold;">/</span>step_definitions<span style="color: #000000; font-weight: bold;">/</span>web_steps.rb
      create  features<span style="color: #000000; font-weight: bold;">/</span>support
      create  features<span style="color: #000000; font-weight: bold;">/</span>support<span style="color: #000000; font-weight: bold;">/</span>paths.rb
      create  features<span style="color: #000000; font-weight: bold;">/</span>support<span style="color: #000000; font-weight: bold;">/</span>env.rb
       exist  lib<span style="color: #000000; font-weight: bold;">/</span>tasks
      create  lib<span style="color: #000000; font-weight: bold;">/</span>tasks<span style="color: #000000; font-weight: bold;">/</span>cucumber.rake
        gsub  config<span style="color: #000000; font-weight: bold;">/</span>database.yml
        gsub  config<span style="color: #000000; font-weight: bold;">/</span>database.yml
       force  config<span style="color: #000000; font-weight: bold;">/</span>database.yml</pre>
      </td>
    </tr>
  </table>
</div>

15. Write your first feature

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="cucumber" style="font-family:monospace;">Feature: Home Page
  In order to make sure the home page works
  As a normal user
  I want to see the home page
&nbsp;
Scenario: Show Main Sections
  When I go to the home page
  Then show me the page
  Then I should see "Login"</pre>
      </td>
    </tr>
  </table>
</div>

From [Harold Jimenez][2]:

> *&#8220;The Given step is where you set up the context of your scenario. Every scenario starts with a blank slate, so it is important to create a state in your application for example by creating data in the database, or by navigating to a specific page. </p> 
> The When step is where you exercise the application in order to accomplish what needs testing. In the case of a web app like twiddr, this is usually where you fill in forms, press buttons, click links, or otherwise interact with the system in some way. 
> 
> Finally, the Then step is where you verify the result, and it’s where we check that the correct pages are rendered, that we see a success or error message, or anything that could help us verify that the prior action was successful. As we move along with creating our own features, this will become much clearer.&#8221;</em></blockquote> 
> 
> 16. See it fail in cucumber
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="terminal" style="font-family:monospace;">rake features  (or)
cucumber (or)
bundle exec cucumber features/home.feature</pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="terminal" style="font-family:monospace;">rupert:tsa rupert$ cucumber
Using the default profile...
F--
&nbsp;
(::) failed steps (::)
&nbsp;
Can't find mapping from "the home page" to a path.
Now, go and add a mapping in /Users/rupert/projects/rails3/tsa/tsa/features/support/paths.rb (RuntimeError)
./features/support/paths.rb:26:in `rescue in path_to'
./features/support/paths.rb:20:in `path_to'
./features/step_definitions/web_steps.rb:24:in `/^(?:|I )go to (.+)$/'
features/home.feature:7:in `When I go to the home page'
&nbsp;
Failing Scenarios:
cucumber features/home.feature:6 # Scenario: Show Main Sections
&nbsp;
1 scenario (1 failed)
3 steps (1 failed, 2 skipped)
0m0.062s</pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> 17. Defining &#8220;the home page&#8221; in the **support/paths.rb**
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="ruby" style="font-family:monospace;">    <span style="color:#9966CC; font-weight:bold;">when</span> <span style="color:#006600; font-weight:bold;">/</span>the home page<span style="color:#006600; font-weight:bold;">/</span>
      root_path</pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> and in the routes.rb
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="ruby" style="font-family:monospace;">root <span style="color:#ff3333; font-weight:bold;">:to</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"home#index"</span></pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> Other examples:
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">when</span> <span style="color:#006600; font-weight:bold;">/</span>the profile page <span style="color:#9966CC; font-weight:bold;">for</span> <span style="color:#996600;">"([^<span style="color:#000099;">\"</span>]+)"</span><span style="color:#006600; font-weight:bold;">/</span>
  user = User.<span style="color:#9900CC;">find_by_twiddr_name</span>!<span style="color:#006600; font-weight:bold;">&#40;</span>$1<span style="color:#006600; font-weight:bold;">&#41;</span>
  user_path<span style="color:#006600; font-weight:bold;">&#40;</span>user<span style="color:#006600; font-weight:bold;">&#41;</span></pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> Note: When you see the error
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="ruby" style="font-family:monospace;">undefined local variable <span style="color:#9966CC; font-weight:bold;">or</span> method <span style="color:#996600;">`node' for #&lt;Capybara::Driver::RackTest::Node:0x00000101151ad8&gt; (NameError)"</span></pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> You need to comment in features/support/env.rb
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="ruby" style="font-family:monospace;"><span style="color:#008000; font-style:italic;">#require 'cucumber/rails/capybara_javascript_emulation'</span></pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> For more info, read <https://rspec.lighthouseapp.com/projects/16211-cucumber/tickets/674>
> 
> 18. Then show me the page will open up the browser
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="terminal" style="font-family:monospace;">file://localhost/Users/rupert/projects/rails3/tsa/tsa/tmp/capybara/capybara-20101209222149.html</pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> 19. Automatic Testing with &#8220;autotest&#8221;. When you save a file, autotest automatically runs cucumber. To avoid autotest infinite loop with cucumber, make sure your IDE (i.e rubymine) does not save automatically in the file system. You can exclude files and directories from autotest with a &#8220;.autotest&#8221; file
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="ruby" style="font-family:monospace;">Autotest.<span style="color:#9900CC;">add_hook</span> <span style="color:#ff3333; font-weight:bold;">:initialize</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>at<span style="color:#006600; font-weight:bold;">|</span>
  at.<span style="color:#9900CC;">add_exception</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#006600; font-weight:bold;">%</span>r<span style="color:#006600; font-weight:bold;">&#123;</span>^\.<span style="color:#006600; font-weight:bold;">/</span>\.<span style="color:#9900CC;">git</span><span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  at.<span style="color:#9900CC;">add_exception</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#006600; font-weight:bold;">%</span>r<span style="color:#006600; font-weight:bold;">&#123;</span>^\.<span style="color:#006600; font-weight:bold;">/</span>db<span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  at.<span style="color:#9900CC;">add_exception</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#006600; font-weight:bold;">%</span>r<span style="color:#006600; font-weight:bold;">&#123;</span>^\.<span style="color:#006600; font-weight:bold;">/</span>log<span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  at.<span style="color:#9900CC;">add_exception</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#006600; font-weight:bold;">%</span>r<span style="color:#006600; font-weight:bold;">&#123;</span>^\.<span style="color:#006600; font-weight:bold;">/</span>tmp<span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  at.<span style="color:#9900CC;">add_exception</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#006600; font-weight:bold;">%</span>r<span style="color:#006600; font-weight:bold;">&#123;</span>^\.<span style="color:#006600; font-weight:bold;">/</span>.<span style="color:#9900CC;">idea</span><span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  at.<span style="color:#9900CC;">add_exception</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#006600; font-weight:bold;">%</span>r<span style="color:#006600; font-weight:bold;">&#123;</span>^\.<span style="color:#006600; font-weight:bold;">/</span>rerun\.<span style="color:#9900CC;">txt</span><span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
  at.<span style="color:#9900CC;">add_exception</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#006600; font-weight:bold;">%</span>r<span style="color:#006600; font-weight:bold;">&#123;</span>^\.<span style="color:#006600; font-weight:bold;">/</span>Gemfile\.<span style="color:#9900CC;">lock</span><span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> Now you can run, autotest from the terminal. Save a file and see autotest run.
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="terminal" style="font-family:monospace;">autotest</pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> 20. If you have javascript AJAX calls included in cucumber scenarios, you need to append them with @javascript tag. Below is a sample which selects &#8220;Australia&#8221; from the &#8220;Country&#8221; and waits for the ajax request to finish before selecting the &#8220;State&#8221; drop down. More info on [capybara github][3].
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="gherkin" style="font-family:monospace;">@javascript
Scenario: Creating a Fleet
  And I select "Australia" from "Country"
  And I wait for the ajax request to finish
  And I select "Victoria" from "State"</pre>
>       </td>
>     </tr>
>   </table>
> </div>
> 
> How does the step &#8220;I wait for the ajax request to finish&#8221; looks like? <http://stackoverflow.com/questions/7286254/cucumber-wait-for-ajaxsuccess>
> 
> <div class="wp_syntax">
>   <table>
>     <tr>
>       <td class="code">
>         <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">When</span> <span style="color:#006600; font-weight:bold;">/</span>^I wait <span style="color:#9966CC; font-weight:bold;">for</span> the ajax request to finish$<span style="color:#006600; font-weight:bold;">/</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  start_time = <span style="color:#CC00FF; font-weight:bold;">Time</span>.<span style="color:#9900CC;">now</span>
  page.<span style="color:#9900CC;">evaluate_script</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'jQuery.isReady&&jQuery.active==0'</span><span style="color:#006600; font-weight:bold;">&#41;</span>.<span style="color:#9966CC; font-weight:bold;">class</span>.<span style="color:#9900CC;">should_not</span> eql<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#CC0066; font-weight:bold;">String</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#9966CC; font-weight:bold;">until</span> page.<span style="color:#9900CC;">evaluate_script</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'jQuery.isReady&&jQuery.active==0'</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#9966CC; font-weight:bold;">or</span> <span style="color:#006600; font-weight:bold;">&#40;</span>start_time <span style="color:#006600; font-weight:bold;">+</span> <span style="color:#006666;">5</span>.<span style="color:#9900CC;">seconds</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">&lt;</span> <span style="color:#CC00FF; font-weight:bold;">Time</span>.<span style="color:#9900CC;">now</span>
    <span style="color:#CC0066; font-weight:bold;">sleep</span> <span style="color:#006666;">1</span>
  <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
>       </td>
>     </tr>
>   </table>
> </div>

 [1]: http://railscasts.com/episodes/200-rails-3-beta-and-rvm
 [2]: http://rubylearning.com/blog/2010/10/05/outside-in-development/
 [3]: https://github.com/jnicklas/capybara