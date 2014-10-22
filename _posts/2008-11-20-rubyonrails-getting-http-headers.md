---
title: 'Rails Note #9: Getting HTTP Headers'
author: rupert
layout: post
permalink: /2008/11/rubyonrails-getting-http-headers/
aktt_tweeted:
  - 1
categories:
  - rails
  - ruby
tags:
  - rails
  - ruby
---
1. I was trying to get the http headers dump from a mobile phone. So I quickly dump it in a log file to see its contents..

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">    headers<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'Content-Type'</span><span style="color:#006600; font-weight:bold;">&#93;</span> = <span style="color:#996600;">'text/xml; charset=utf-8'</span>
    <span style="color:#9966CC; font-weight:bold;">for</span> header <span style="color:#9966CC; font-weight:bold;">in</span> request.<span style="color:#9900CC;">env</span>.<span style="color:#CC0066; font-weight:bold;">select</span> <span style="color:#006600; font-weight:bold;">&#123;</span><span style="color:#006600; font-weight:bold;">|</span>k,v<span style="color:#006600; font-weight:bold;">|</span> k.<span style="color:#9900CC;">match</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">"^HTTP.*"</span><span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">&#125;</span>
        logger.<span style="color:#9900CC;">info</span><span style="color:#006600; font-weight:bold;">&#40;</span>header<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#006666;"></span><span style="color:#006600; font-weight:bold;">&#93;</span>.<span style="color:#CC0066; font-weight:bold;">split</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'_'</span>,<span style="color:#006666;">2</span><span style="color:#006600; font-weight:bold;">&#41;</span><span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#006666;">1</span><span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">+</span> <span style="color:#996600;">":"</span> <span style="color:#006600; font-weight:bold;">+</span> header<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#006666;">1</span><span style="color:#006600; font-weight:bold;">&#93;</span><span style="color:#006600; font-weight:bold;">&#41;</span>
    <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

Reference:  
[http://tonycode.com/wiki/index.php?title=Dumping\_HTTP\_Headers][1]

2. However, please note that you can actually see everything from the request as parameters.

Parameters: {&#8220;MSAG-ADDRESS-PREFIX&#8221;=>&#8221;aSTARTa&#8221;, &#8220;format&#8221;=>&#8221;xml&#8221;, &#8220;protocol&#8221;=>&#8221;ussd&#8221;, &#8220;user-agent&#8221;=>&#8221;Jakarta Commons-HttpClient/3.0.1&#8243;, &#8220;WHOISD-ABONENT&#8221;=>&#8221;8613520747210&#8243;, &#8220;action&#8221;=>&#8221;menu&#8221;, &#8220;controller&#8221;=>&#8221;ussd&#8221;, &#8220;subscriberID&#8221;=>&#8221;8613520747210&#8243;, &#8220;WHOISD-USR&#8221;=>&#8221;-1&#8243;, &#8220;host&#8221;=>&#8221;wap.watago.mobi&#8221;, &#8220;WHOISD-USSD-MESSAGE&#8221;=>&#8221;&#8221;, &#8220;content-length&#8221;=>&#8221;0&#8243;}

This means we can easily do..

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#0066ff; font-weight:bold;">@whoisd_abonent</span> = params<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'WHOISD-ABONENT'</span><span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">||</span> <span style="color:#0000FF; font-weight:bold;">nil</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://tonycode.com/wiki/index.php?title=Dumping_HTTP_Headers