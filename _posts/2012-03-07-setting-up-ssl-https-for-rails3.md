---
title: Setting up SSL https for Rails3
author: rupert
layout: post
permalink: /2012/03/setting-up-ssl-https-for-rails3/
categories:
  - rails
tags:
  - apache2
  - rails
  - rails3
---
**1. Generate your server.crt and server.key first.**

For local development, [a self-signed certificate is adequate][1]. For production, we can [buy from Thawte, Verisign, the CArtels, etc.][2]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> openssl genrsa <span style="color: #660033;">-des3</span> <span style="color: #660033;">-out</span> server.key <span style="color: #000000;">1024</span>
<span style="color: #000000; font-weight: bold;">%</span> openssl req <span style="color: #660033;">-new</span> <span style="color: #660033;">-key</span> server.key <span style="color: #660033;">-out</span> server.csr
<span style="color: #000000; font-weight: bold;">%</span> openssl x509 <span style="color: #660033;">-req</span> <span style="color: #660033;">-days</span> <span style="color: #000000;">365</span> <span style="color: #660033;">-in</span> server.csr <span style="color: #660033;">-signkey</span> server.key <span style="color: #660033;">-out</span> server.crt</pre>
      </td>
    </tr>
  </table>
</div>

Notes: Ensure that you use x509 because if we use the other one (PK something), then apache2 complains that it can&#8217;t load it, invalid tags.

The certificate (server.crt) should have the proper tags (BEGIN and END) as shown below.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">-----BEGIN CERTIFICATE-----
MIIDBjCCAe4CCQDCzcL5z8chBzANBgkqhkiG9w0BAQUFADBFMQswCQYDVQQGEwJB
......+OAFfG2MvIeawg==
-----END CERTIFICATE-----</pre>
      </td>
    </tr>
  </table>
</div>

**2. Setup your Apache2 properly**

&#8211; Ensure that you have mod_ssl loaded

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">LoadModule ssl_module libexec/apache22/mod_ssl.so</pre>
      </td>
    </tr>
  </table>
</div>

&#8211; Enusure that you are listening to 80 and 443.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">Listen 80
Listen 443</pre>
      </td>
    </tr>
  </table>
</div>

**Very Important Note:** Please note that if you are not listening to these ports you might get [&#8220;Connection Refused&#8221;][3] messages. Please make sure that your Listen directives match your <VirtualHost> directives.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&lt;VirtualHost 192.168.10.1:80&gt;
   ServerAdmin rupert@2rmobile.com
   ServerName foo.2rmobile.com
   ServerAlias foo.2rmobile.com
&nbsp;
   DocumentRoot "/path/to/rails/app/public"
   &lt;Directory "/path/to/rails/app/public"&gt;
      #Options Indexes MultiViews
      AllowOverride None
      Order allow,deny
      Allow from all
   &lt;/Directory&gt;
&nbsp;
   CustomLog /var/log/httpd/myapp.log combinedio
   LogLevel warn
&lt;/VirtualHost&gt;
&nbsp;
&lt;VirtualHost 192.168.10.1:443&gt;
   ServerAdmin rupert@2rmobile.com
   ServerName foo.2rmobile.com
   ServerAlias foo.2rmobile.com
&nbsp;
   DocumentRoot "/path/to/rails/app/public"
   &lt;Directory "/path/to/rails/app/public"&gt;
      #Options Indexes MultiViews
      AllowOverride None
      Order allow,deny
      Allow from all
   &lt;/Directory&gt;
&nbsp;
   CustomLog /var/log/httpd/myapp.log combinedio
   LogLevel warn
&nbsp;
   SSLEngine on
   SSLCertificateFile /path/to/certs/server.crt
   SSLCertificateKeyFile /path/to/certs/server.key
&lt;/VirtualHost&gt;</pre>
      </td>
    </tr>
  </table>
</div>

Restart! Hopefully, apache2 will load with ssl support. If not, do some googling.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">% /usr/local/etc/rc.d/apache22 restart #freebsd
Performing sanity check on apache22 configuration:
Syntax OK
Stopping apache22.
Waiting for PIDS: 89044.
Performing sanity check on apache22 configuration:
Syntax OK
Starting apache22.
% tail -f /var/log/apache2/httpd-access.log
...."Apache/2.2.15 (FreeBSD) mod_ssl/2.2.15 OpenSSL/0.9.8q DAV/2 PHP/5.2.14 with Suhosin-Patch Phusion_Passenger/3.0.11 (internal dummy connection)"</pre>
      </td>
    </tr>
  </table>
</div>

**3. Configure Rails3.0.10 for rack/ssl support.**  
Read this <http://collectiveidea.com/blog/archives/2010/11/29/ssl-with-rails/>. If you&#8217;re on Rails3.1? you didn&#8217;t read this <http://collectiveidea.com/blog/archives/2010/11/29/ssl-with-rails/>..

`Gemfile`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">gem <span style="color:#996600;">'rack-ssl'</span>, :<span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'rack/ssl'</span></pre>
      </td>
    </tr>
  </table>
</div>

`production.rb`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#996600;">'rack/ssl'</span>
&nbsp;
<span style="color:#6666ff; font-weight:bold;">Cws::Application</span>.<span style="color:#9900CC;">configure</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  config.<span style="color:#9900CC;">middleware</span>.<span style="color:#9900CC;">insert_before</span> <span style="color:#6666ff; font-weight:bold;">ActionDispatch::Cookies</span>, <span style="color:#6666ff; font-weight:bold;">Rack::SSL</span>
  <span style="color:#008000; font-style:italic;">#config.middleware.insert_before ActionDispatch::Cookies, Rack::SSL, :exclude =&gt; proc { |env| env['HTTPS'] != 'on' }</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Settings specified here will take precedence over those in config/application.rb</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># The production environment is meant for finished, "live" apps.</span>
  <span style="color:#008000; font-style:italic;"># Code is not reloaded between requests</span>
  config.<span style="color:#9900CC;">cache_classes</span> = <span style="color:#0000FF; font-weight:bold;">true</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Full error reports are disabled and caching is turned on</span>
  config.<span style="color:#9900CC;">consider_all_requests_local</span>       = <span style="color:#0000FF; font-weight:bold;">false</span>
  config.<span style="color:#9900CC;">action_controller</span>.<span style="color:#9900CC;">perform_caching</span> = <span style="color:#0000FF; font-weight:bold;">true</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Specifies the header that your server uses for sending files</span>
  config.<span style="color:#9900CC;">action_dispatch</span>.<span style="color:#9900CC;">x_sendfile_header</span> = <span style="color:#996600;">"X-Sendfile"</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># For nginx:</span>
  <span style="color:#008000; font-style:italic;"># config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect'</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># If you have no front-end server that supports something like X-Sendfile,</span>
  <span style="color:#008000; font-style:italic;"># just comment this out and Rails will serve the files</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># See everything in the log (default is :info)</span>
  <span style="color:#008000; font-style:italic;"># config.log_level = :debug</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Use a different logger for distributed setups</span>
  <span style="color:#008000; font-style:italic;"># config.logger = SyslogLogger.new</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Use a different cache store in production</span>
  <span style="color:#008000; font-style:italic;"># config.cache_store = :mem_cache_store</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Disable Rails's static asset server</span>
  <span style="color:#008000; font-style:italic;"># In production, Apache or nginx will already do this</span>
  config.<span style="color:#9900CC;">serve_static_assets</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Enable serving of images, stylesheets, and javascripts from an asset server</span>
  <span style="color:#008000; font-style:italic;"># config.action_controller.asset_host = "http://assets.example.com"</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Disable delivery errors, bad email addresses will be ignored</span>
  <span style="color:#008000; font-style:italic;"># config.action_mailer.raise_delivery_errors = false</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Enable threaded mode</span>
  <span style="color:#008000; font-style:italic;"># config.threadsafe!</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Enable locale fallbacks for I18n (makes lookups for any locale fall back to</span>
  <span style="color:#008000; font-style:italic;"># the I18n.default_locale when a translation can not be found)</span>
  config.<span style="color:#9900CC;">i18n</span>.<span style="color:#9900CC;">fallbacks</span> = <span style="color:#0000FF; font-weight:bold;">true</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Send deprecation notices to registered listeners</span>
  config.<span style="color:#9900CC;">active_support</span>.<span style="color:#9900CC;">deprecation</span> = <span style="color:#ff3333; font-weight:bold;">:notify</span>
&nbsp;
  config.<span style="color:#9900CC;">action_mailer</span>.<span style="color:#9900CC;">default_url_options</span> = <span style="color:#006600; font-weight:bold;">&#123;</span> <span style="color:#ff3333; font-weight:bold;">:host</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'whatever'</span> <span style="color:#006600; font-weight:bold;">&#125;</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

If you want to have http and https working on both sites, then you can use

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">config.<span style="color:#9900CC;">middleware</span>.<span style="color:#9900CC;">insert_before</span> <span style="color:#6666ff; font-weight:bold;">ActionDispatch::Cookies</span>, <span style="color:#6666ff; font-weight:bold;">Rack::SSL</span>, <span style="color:#ff3333; font-weight:bold;">:exclude</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#CC0066; font-weight:bold;">proc</span> <span style="color:#006600; font-weight:bold;">&#123;</span> <span style="color:#006600; font-weight:bold;">|</span>env<span style="color:#006600; font-weight:bold;">|</span> env<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'HTTPS'</span><span style="color:#006600; font-weight:bold;">&#93;</span> != <span style="color:#996600;">'on'</span> <span style="color:#006600; font-weight:bold;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

**4. Test time!**  
&#8211; On Safari, ensure you blow away your cache.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">Safari &gt; Reset
Safari &gt; Empty Cache</pre>
      </td>
    </tr>
  </table>
</div>

**If you go to your http://server.website.com/ then it should redirect https://server.website.com/**

Note:  
&#8211; If you see a &#8220;Connection Refused&#8221; or ERROR bad URI or ERROR bad Request-Line, then ensure that it&#8217;s not an apache2 misconfiguration! I got apache2 listening to 80 only but have two virtual hosts. Not easy to see especially if you have the virtual hosts included.

&#8211; In Google Chrome, if you get a green icon lock then it fine.  
<img src="/images/2012/03/trusted.png" alt="trusted.png" border="0" width="467" height="130" />

 [1]: http://superuser.com/questions/73979/how-to-easily-create-a-ssl-certificate-and-configure-it-in-apache2-in-mac-os-x
 [2]: http://www.williambharding.com/blog/rails/ultimate-guide-to-setup-ssl-on-rails-and-apache-2-with-ubuntu-seasoning/
 [3]: http://httpd.apache.org/docs/2.0/ssl/ssl_faq.html#refused