---
title: 'Rails Note #8: Testing with session variables'
author: rupert
layout: post
permalink: /2008/11/testing-with-session-variables/
aktt_tweeted:
  - 1
categories:
  - rails
  - ruby
tags:
  - rails
  - ruby
---
Taken from [http://guides.rails.info/testing\_rails\_applications.html][1]

The get method kicks off the web request and populates the results into the response. It accepts 4 arguments:

*The action of the controller you are requesting. This can be in the form of a string or a symbol.  
*An optional hash of request parameters to pass into the action (eg. query string parameters or post variables).  
*An optional hash of session variables to pass along with the request.  
*An optional hash of flash values.

Example: Calling the :show action, passing an id of 12 as the params and setting a user_id of 5 in the session:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">get<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#ff3333; font-weight:bold;">:show</span>, <span style="color:#006600; font-weight:bold;">&#123;</span><span style="color:#996600;">'id'</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"12"</span><span style="color:#006600; font-weight:bold;">&#125;</span>, <span style="color:#006600; font-weight:bold;">&#123;</span><span style="color:#996600;">'user_id'</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#006666;">5</span><span style="color:#006600; font-weight:bold;">&#125;</span><span style="color:#006600; font-weight:bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://guides.rails.info/testing_rails_applications.html