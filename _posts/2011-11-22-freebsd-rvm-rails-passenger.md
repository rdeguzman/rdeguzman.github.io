---
title: freebsd + apache + rvm + rails + passenger
author: rupert
layout: post
permalink: /2011/11/freebsd-rvm-rails-passenger/
categories:
  - freebsd
tags:
  - freebsd
  - rails
  - rvm
---
**1. Install apache22**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>www<span style="color: #000000; font-weight: bold;">/</span>apache22
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> config
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span> clean</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rc.conf
<span style="color: #007800;">apache22_enable</span>=YES</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/usr/local/etc/rc.d/apache22 start</pre>
      </td>
    </tr>
  </table>
</div>

**2. Install [rvm via multi user install from http://beginrescueend.com/rvm/install/][1]**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">Login <span style="color: #c20cb9; font-weight: bold;">as</span> root.
<span style="color: #000000; font-weight: bold;">%</span>  <span style="color: #c20cb9; font-weight: bold;">bash</span> <span style="color: #660033;">-s</span> stable <span style="color: #000000; font-weight: bold;">&lt;</span> <span style="color: #000000; font-weight: bold;">&lt;</span><span style="color: #7a0874; font-weight: bold;">&#40;</span>curl <span style="color: #660033;">-s</span> https:<span style="color: #000000; font-weight: bold;">//</span>raw.github.com<span style="color: #000000; font-weight: bold;">/</span>wayneeseguin<span style="color: #000000; font-weight: bold;">/</span>rvm<span style="color: #000000; font-weight: bold;">/</span>master<span style="color: #000000; font-weight: bold;">/</span>binscripts<span style="color: #000000; font-weight: bold;">/</span>rvm-installer<span style="color: #7a0874; font-weight: bold;">&#41;</span>
Downloading RVM from wayneeseguin branch stable
  <span style="color: #000000; font-weight: bold;">%</span> Total    <span style="color: #000000; font-weight: bold;">%</span> Received <span style="color: #000000; font-weight: bold;">%</span> Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
<span style="color: #000000;">100</span>  799k  <span style="color: #000000;">100</span>  799k    <span style="color: #000000;"></span>     <span style="color: #000000;"></span>   109k      <span style="color: #000000;"></span>  <span style="color: #000000;"></span>:00:07  <span style="color: #000000;"></span>:00:07 --:--:--  199k
&nbsp;
Installing RVM to <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>rvm<span style="color: #000000; font-weight: bold;">/</span>
    RVM system user group <span style="color: #ff0000;">'rvm'</span> exists, proceeding with installation.
&nbsp;
<span style="color: #666666; font-style: italic;"># RVM:  Shell scripts enabling management of multiple ruby environments.</span>
<span style="color: #666666; font-style: italic;"># RTFM: https://rvm.beginrescueend.com/</span>
<span style="color: #666666; font-style: italic;"># HELP: http://webchat.freenode.net/?channels=rvm (#rvm on irc.freenode.net)</span>
<span style="color: #666666; font-style: italic;"># Screencast: http://screencasts.org/episodes/how-to-use-rvm</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># In case of any issues read output of 'rvm requirements' and/or 'rvm notes'</span>
&nbsp;
Installation of RVM <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>rvm<span style="color: #000000; font-weight: bold;">/</span> is almost complete:
&nbsp;
  <span style="color: #000000; font-weight: bold;">*</span> First you need add all <span style="color: #c20cb9; font-weight: bold;">users</span> that will be using rvm to <span style="color: #ff0000;">'rvm'</span> group,
    anyone using rvm will be operating with <span style="color: #000000; font-weight: bold;">`</span><span style="color: #7a0874; font-weight: bold;">umask</span> g+<span style="color: #c20cb9; font-weight: bold;">w</span><span style="color: #000000; font-weight: bold;">`</span>.
&nbsp;
  <span style="color: #000000; font-weight: bold;">*</span> To start using RVM you need to run <span style="color: #000000; font-weight: bold;">`</span><span style="color: #7a0874; font-weight: bold;">source</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>profile.d<span style="color: #000000; font-weight: bold;">/</span>rvm.sh<span style="color: #000000; font-weight: bold;">`</span>
    <span style="color: #000000; font-weight: bold;">in</span> all your open shell windows, <span style="color: #000000; font-weight: bold;">in</span> rare cases you need to reopen all shell windows.
&nbsp;
  <span style="color: #000000; font-weight: bold;">*</span> Optionally you can run <span style="color: #000000; font-weight: bold;">`</span>rvm tools rvm-env ruby <span style="color: #c20cb9; font-weight: bold;">bash</span><span style="color: #000000; font-weight: bold;">`</span> <span style="color: #c20cb9; font-weight: bold;">which</span> will generate 
    shebang wrappers <span style="color: #000000; font-weight: bold;">for</span> easier selecting ruby <span style="color: #000000; font-weight: bold;">in</span> scripts.
&nbsp;
<span style="color: #666666; font-style: italic;"># root,</span>
<span style="color: #666666; font-style: italic;">#</span>
<span style="color: #666666; font-style: italic;">#   Thank you for using RVM!</span>
<span style="color: #666666; font-style: italic;">#   I sincerely hope that RVM helps to make your life easier and more enjoyable!!!</span>
<span style="color: #666666; font-style: italic;">#</span>
<span style="color: #666666; font-style: italic;"># ~Wayne</span></pre>
      </td>
    </tr>
  </table>
</div>

**3. Add your users to rvm group**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># vim /etc/group</span>
....
rvm:<span style="color: #000000; font-weight: bold;">*</span>:<span style="color: #000000;">1003</span>:root,rupert</pre>
      </td>
    </tr>
  </table>
</div>

**Load rvm script to current shell by calling `source /etc/profile.d/rvm.sh`** or add it to /etc/profile and re-login

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#vim /etc/profile</span>
<span style="color: #7a0874; font-weight: bold;">source</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>profile.d<span style="color: #000000; font-weight: bold;">/</span>rvm.sh</pre>
      </td>
    </tr>
  </table>
</div>

After relogging in, simply type `rvm` and it should spit out something. If the command is not found, then you are doing something wrong.

**4. Install 1.9.3**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% rvm install 1.9.3
Installing Ruby from source to: /usr/local/rvm/rubies/ruby-1.9.3-p0, this may take a while depending on your cpu(s)...
&nbsp;
ruby-1.9.3-p0 - #fetching 
ruby-1.9.3-p0 - #downloading ruby-1.9.3-p0, this may take a while depending on your connection...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  3 8604k    3  340k    0     0  27173      0  0:05:24  0:00:12  0:05:12 64100</pre>
      </td>
    </tr>
  </table>
</div>

Use ruby1.9.3

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">% rvm --default use 1.9.3-p0
% gem install bundler -V</pre>
      </td>
    </tr>
  </table>
</div>

**5. Install passenger3**

This will install system wide passenger gem which is installed on 1.9.3-p0 gemset.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> gem <span style="color: #c20cb9; font-weight: bold;">install</span> passenger <span style="color: #660033;">-V</span></pre>
      </td>
    </tr>
  </table>
</div>

You should have at least the ff gems installed:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">bundler <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.1.3<span style="color: #7a0874; font-weight: bold;">&#41;</span>
daemon_controller <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.0.0<span style="color: #7a0874; font-weight: bold;">&#41;</span>
fastthread <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.0.7<span style="color: #7a0874; font-weight: bold;">&#41;</span>
passenger <span style="color: #7a0874; font-weight: bold;">&#40;</span>3.0.12<span style="color: #7a0874; font-weight: bold;">&#41;</span>
rack <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.4.1<span style="color: #7a0874; font-weight: bold;">&#41;</span>
rake <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.9.2.2<span style="color: #7a0874; font-weight: bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>rvm<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>ruby-1.9.3-p0<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>passenger-3.0.11<span style="color: #000000; font-weight: bold;">/</span>bin
<span style="color: #000000; font-weight: bold;">%</span> .<span style="color: #000000; font-weight: bold;">/</span>passenger-install-apache2-module</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">--------------------------------------------
The Apache 2 module was successfully installed.
&nbsp;
Please edit your Apache configuration file, and add these lines:
&nbsp;
   LoadModule passenger_module /usr/local/rvm/gems/ruby-1.9.3-p0/gems/passenger-3.0.11/ext/apache2/mod_passenger.so
   PassengerRoot /usr/local/rvm/gems/ruby-1.9.3-p0/gems/passenger-3.0.11
   PassengerRuby /usr/local/rvm/wrappers/ruby-1.9.3-p0/ruby
&nbsp;
After you restart Apache, you are ready to deploy any number of Ruby on Rails
applications on Apache, without any further Ruby on Rails-specific
configuration!
&nbsp;
Press ENTER to continue.
&nbsp;
&nbsp;
--------------------------------------------
Deploying a Ruby on Rails application: an example
&nbsp;
Suppose you have a Rails application in /somewhere. Add a virtual host to your
Apache configuration file and set its DocumentRoot to /somewhere/public:
&nbsp;
   &lt;VirtualHost *:80&gt;
      ServerName www.yourhost.com
      DocumentRoot /somewhere/public    # &lt;-- be sure to point to 'public'!
      &lt;Directory /somewhere/public&gt;
         AllowOverride all              # &lt;-- relax Apache security settings
         Options -MultiViews            # &lt;-- MultiViews must be turned off
      &lt;/Directory&gt;
   &lt;/VirtualHost&gt;</pre>
      </td>
    </tr>
  </table>
</div>

**6. Edit httpd.conf to load the passenger module**

To use a rvm gemset by passenger read &#8220;Rails app with custom .rvmrc and a system wide passenger install&#8221; <https://rvm.beginrescueend.com/integration/passenger/>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">LoadModule passenger_module /usr/local/rvm/gems/ruby-1.9.3-p0/gems/passenger-3.0.11/ext/apache2/mod_passenger.so
PassengerRoot /usr/local/rvm/gems/ruby-1.9.3-p0/gems/passenger-3.0.11
PassengerRuby /usr/local/rvm/wrappers/ruby-1.9.3-p0/ruby</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&lt;VirtualHost 192.168.69.3:80&gt;
   ServerAdmin rupert@2rmobile.com
   ServerName myserver
   ServerAlias myserver
&nbsp;
   DocumentRoot "/path/to/myapp/public"
   &lt;Directory "/path/to/myapp/public"&gt;
&nbsp;
   #DocumentRoot "/path/to/myapp/current/public"
   #&lt;Directory "/path/to/myapp/current/public"&gt;
      Options Indexes MultiViews
      AllowOverride None 
      Order allow,deny
      Allow from all 
   &lt;/Directory&gt;
&nbsp;
   CustomLog /var/log/apache22/myapp-error.log combinedio
   LogLevel warn 
&lt;/VirtualHost&gt;</pre>
      </td>
    </tr>
  </table>
</div>

We need a `railsapp/config/setup_load_paths.rb` to use our custom `.rvmrc`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">if</span> ENV<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'MY_RUBY_HOME'</span><span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">&&</span> ENV<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'MY_RUBY_HOME'</span><span style="color:#006600; font-weight:bold;">&#93;</span>.<span style="color:#9966CC; font-weight:bold;">include</span>?<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'rvm'</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#9966CC; font-weight:bold;">begin</span>
      rvm_path     = <span style="color:#CC00FF; font-weight:bold;">File</span>.<span style="color:#9900CC;">dirname</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#CC00FF; font-weight:bold;">File</span>.<span style="color:#9900CC;">dirname</span><span style="color:#006600; font-weight:bold;">&#40;</span>ENV<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'MY_RUBY_HOME'</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
      rvm_lib_path = <span style="color:#CC00FF; font-weight:bold;">File</span>.<span style="color:#9900CC;">join</span><span style="color:#006600; font-weight:bold;">&#40;</span>rvm_path, <span style="color:#996600;">'lib'</span><span style="color:#006600; font-weight:bold;">&#41;</span>
      <span style="color:#ff6633; font-weight:bold;">$LOAD_PATH</span>.<span style="color:#9900CC;">unshift</span> rvm_lib_path
      <span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#996600;">'rvm'</span>
      RVM.<span style="color:#9900CC;">use_from_path</span>! <span style="color:#CC00FF; font-weight:bold;">File</span>.<span style="color:#9900CC;">dirname</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#CC00FF; font-weight:bold;">File</span>.<span style="color:#9900CC;">dirname</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#0000FF; font-weight:bold;">__FILE__</span><span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
   <span style="color:#9966CC; font-weight:bold;">rescue</span> <span style="color:#CC00FF; font-weight:bold;">LoadError</span>
      <span style="color:#008000; font-style:italic;"># RVM is unavailable at this point.</span>
      <span style="color:#CC0066; font-weight:bold;">raise</span> <span style="color:#996600;">"RVM ruby lib is currently unavailable."</span>
   <span style="color:#9966CC; font-weight:bold;">end</span>
<span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
<span style="color:#008000; font-style:italic;"># Pick the lines for your version of Bundler</span>
<span style="color:#008000; font-style:italic;"># If you're not using Bundler at all, remove all of them</span>
&nbsp;
<span style="color:#008000; font-style:italic;"># Require Bundler 1.0 </span>
ENV<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'BUNDLE_GEMFILE'</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#CC00FF; font-weight:bold;">File</span>.<span style="color:#9900CC;">expand_path</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'../Gemfile'</span>, <span style="color:#CC00FF; font-weight:bold;">File</span>.<span style="color:#9900CC;">dirname</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#0000FF; font-weight:bold;">__FILE__</span><span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
<span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#996600;">'bundler/setup'</span>
&nbsp;
<span style="color:#008000; font-style:italic;"># Require Bundler 0/9</span>
<span style="color:#008000; font-style:italic;"># if File.exist?(".bundle/environment.rb")</span>
<span style="color:#008000; font-style:italic;">#   require '.bundle/environment'</span>
<span style="color:#008000; font-style:italic;"># else</span>
<span style="color:#008000; font-style:italic;">#   require 'rubygems'</span>
<span style="color:#008000; font-style:italic;">#   require 'bundler'</span>
<span style="color:#008000; font-style:italic;">#   Bundler.setup</span>
<span style="color:#008000; font-style:italic;"># end</span></pre>
      </td>
    </tr>
  </table>
</div>

Visit this stackoverflow question <http://stackoverflow.com/questions/5680341/how-to-load-passenger-from-apache-with-rvm-and-unique-gem-sets>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">git clone</span> rupert<span style="color: #000000; font-weight: bold;">@</span>server:<span style="color: #000000; font-weight: bold;">/</span>path<span style="color: #000000; font-weight: bold;">/</span>to<span style="color: #000000; font-weight: bold;">/</span>your<span style="color: #000000; font-weight: bold;">/</span>myapp.git
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> myapp</pre>
      </td>
    </tr>
  </table>
</div>

**9. Run bundle**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> bundle <span style="color: #c20cb9; font-weight: bold;">install</span> <span style="color: #660033;">-V</span>
Fetching <span style="color: #7a0874; font-weight: bold;">source</span> index <span style="color: #000000; font-weight: bold;">for</span> http:<span style="color: #000000; font-weight: bold;">//</span>rubygems.org<span style="color: #000000; font-weight: bold;">/</span>
....</pre>
      </td>
    </tr>
  </table>
</div>

**Errors that you may encounter**

Note: The rvmrc located in &#8216;../releases/20120208034235&#8242; could not be loaded, likely due to trust mechanisms. Please run &#8216;rvm rvmrc {trust,untrust} &#8220;../releases/20120208034235&#8243;&#8216; to continue, or set rvm\_trust\_rvmrcs_flag to 1. (RVM::ErrorLoadingRVMRC)

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rvmrc
<span style="color: #7a0874; font-weight: bold;">umask</span> g+<span style="color: #c20cb9; font-weight: bold;">w</span>
<span style="color: #007800;">rvm_trust_rvmrcs_flag</span>=<span style="color: #000000;">1</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://beginrescueend.com/rvm/install/