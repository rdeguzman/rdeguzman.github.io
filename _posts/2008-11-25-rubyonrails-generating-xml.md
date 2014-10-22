---
title: 'Rails Note #10: Generating XML'
author: rupert
layout: post
permalink: /2008/11/rubyonrails-generating-xml/
aktt_tweeted:
  - 1
categories:
  - rails
tags:
  - rails
---
This post should have made it a looong time ago.. 

I am currently building an application where all the output formats is in XML. One of the first problems I had was to output the xml. 

1. At first try, I could append &#8216;xml&#8217; in the routes as a format parameter. But this takes into consideration that all our views would be in XML. However, you could have your views to be index.xml.erb or index.rxml, if you are using the **builder templates** plugin.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#6666ff; font-weight:bold;">ActionController::Routing::Routes</span>.<span style="color:#9900CC;">draw</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>map<span style="color:#006600; font-weight:bold;">|</span>
  <span style="color:#008000; font-style:italic;">#map.connect '/menu/show.xml', :controller =&gt; 'menu', :action =&gt; 'show', :format =&gt; 'xml'</span>
&nbsp;
  map.<span style="color:#9900CC;">connect</span> <span style="color:#996600;">':controller/:action/:id'</span>, :<span style="color:#CC0066; font-weight:bold;">format</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'xml'</span>
  map.<span style="color:#9900CC;">connect</span> <span style="color:#996600;">':controller/:action/:id.:format'</span>, :<span style="color:#CC0066; font-weight:bold;">format</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'xml'</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

2. If my application requires me to output both html and xml, then the above would not be sufficient. In my controller, I have to explicitly say **:layout => false** which means it would not use the **application.html.erb** found in *app/views/layouts* if we have one.

So far, I made progress using builder templates only but it is enough to suit my needs. Below is a sample controller and view.

**app/controller/mobile_controller.rb**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">def</span> index
  headers<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'Content-Type'</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#996600;">'text/xml; charset=utf-8'</span>
  render <span style="color:#ff3333; font-weight:bold;">:layout</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#0000FF; font-weight:bold;">false</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

**app/views/index.rxml**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">xml.<span style="color:#9900CC;">instruct</span>! <span style="color:#ff3333; font-weight:bold;">:xml</span>, <span style="color:#ff3333; font-weight:bold;">:version</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"1.0"</span>, <span style="color:#ff3333; font-weight:bold;">:encoding</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"UTF-8"</span>
xml.<span style="color:#9900CC;">content</span> <span style="color:#ff3333; font-weight:bold;">:type</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"hypertext"</span> <span style="color:#9966CC; font-weight:bold;">do</span>
&nbsp;
xml.<span style="color:#9900CC;">head</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  xml.<span style="color:#9900CC;">pageID</span> <span style="color:#996600;">"1"</span>
  xml.<span style="color:#9900CC;">title</span> <span style="color:#996600;">"USSD Page from Ruby"</span>
  xml.<span style="color:#9900CC;">protocol</span> <span style="color:#996600;">"html,java,wap,ussd,xhtml"</span>
<span style="color:#9966CC; font-weight:bold;">end</span>
&nbsp;
xml.<span style="color:#9900CC;">body</span> <span style="color:#006600; font-weight:bold;">&#123;</span>        
  greeting = <span style="color:#996600;">'Welcome back!'</span>
  xml.<span style="color:#CC0066; font-weight:bold;">p</span> greeting
<span style="color:#006600; font-weight:bold;">&#125;</span>
&nbsp;
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>