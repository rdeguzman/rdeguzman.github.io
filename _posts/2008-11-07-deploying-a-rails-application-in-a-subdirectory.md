---
title: 'Rails Note #4: Deploying a Rails Application in a Subdirectory'
author: rupert
layout: post
permalink: /2008/11/deploying-a-rails-application-in-a-subdirectory/
aktt_tweeted:
  - 1
categories:
  - rails
tags:
  - centos
  - debian
  - rails
---
There are many ways to deploy RoR applications. I have googled all over the place and so far the easiest setup that I could find that would suit my needs (existing Apache2 + ColdFusion + TileCache) would be to use

1. Apache PROXY  
2. Mongrel

**CentOS Installation Instructions**

1. Make sure Apache has mod_proxy

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"> .<span style="color: #000000; font-weight: bold;">/</span>configure <span style="color: #660033;">--prefix</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2 <span style="color: #660033;">--enable-so</span> <span style="color: #660033;">--enable-rewrite</span> <span style="color: #660033;">--with-mpm</span>=prefork <span style="color: #660033;">--enable-proxy</span> <span style="color: #660033;">--enable-proxy-connect</span> <span style="color: #660033;">--enable-proxy-ftp</span> <span style="color: #660033;">--enable-proxy-httpd</span> <span style="color: #660033;">--enable-proxy-ajp</span> <span style="color: #660033;">--enable-proxy-balancer</span> <span style="color: #660033;">--enable-cgi</span></pre>
      </td>
    </tr>
  </table>
</div>

1. Apache Proxy

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&lt;VirtualHost *:80&gt;
    ServerName test
    ProxyRequests Off 
        &lt;Proxy *&gt;
            Order deny,allow
            Allow from all
        &lt;/Proxy&gt;
    ProxyPass /localdumplings http://localhost:3000/localdumplings
    ProxyPassReverse /localdumplings http://localhost:3000/localdumplings
    #ProxyPass /localdumplings/ http://localhost:3000/
    #ProxyPassReverse /localdumplings/ http://localhost:3000/
&lt;/VirtualHost&gt;</pre>
      </td>
    </tr>
  </table>
</div>

2. Starting mongrel on a subdir  
mongrel_rails start &#8211;prefix=/localdumplings

**Debian Installation Instructions**

1. Install libapache2-mod-proxy-html is easier&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">apt-get install</span> libapache2-mod-proxy-html</pre>
      </td>
    </tr>
  </table>
</div>

2. Enable modules to load in apache2

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> a2enmod proxy
<span style="color: #c20cb9; font-weight: bold;">sudo</span> a2enmod proxy_balancer
<span style="color: #c20cb9; font-weight: bold;">sudo</span> a2enmod proxy_http
<span style="color: #c20cb9; font-weight: bold;">sudo</span> a2enmod rewrite
<span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 stop
<span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 start</pre>
      </td>
    </tr>
  </table>
</div>

3. Add the application in /etc/apache2/mods-available/proxy.conf

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&lt;IfModule mod_proxy.c&gt;
        #turning ProxyRequests on and allowing proxying from all may allow
        #spammers to use your proxy to send email.
&nbsp;
        ProxyRequests Off 
&nbsp;
        &lt;Proxy *&gt;
                AddDefaultCharset off 
                Order deny,allow
                Allow from all
                #Allow from .example.com
        &lt;/Proxy&gt;
&nbsp;
        # Enable/disable the handling of HTTP/1.1 "Via:" headers.
        # ("Full" adds the server version; "Block" removes all outgoing Via: headers)
        # Set to one of: Off | On | Full | Block
        ProxyPass /localdumplings http://localhost:3000/localdumplings
        ProxyPassReverse /localdumplings http://localhost:3000/localdumplings
&nbsp;
        ProxyVia On
&lt;/IfModule&gt;</pre>
      </td>
    </tr>
  </table>
</div>

**Starting a mongrel_rails on boot**  
Slicehost ( <http://articles.slicehost.com/2007/9/21/debian-etch-apache-vhosts-rails-and-mongrels> ) has a very good article regarding this.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">mongrel_rails start <span style="color: #660033;">-d</span> <span style="color: #660033;">-e</span> production <span style="color: #660033;">-p</span> <span style="color: #000000;">8001</span> <span style="color: #660033;">-P</span> log<span style="color: #000000; font-weight: bold;">/</span>mongrel8001.pid <span style="color: #660033;">-l</span> log<span style="color: #000000; font-weight: bold;">/</span>mongrel.log</pre>
      </td>
    </tr>
  </table>
</div>