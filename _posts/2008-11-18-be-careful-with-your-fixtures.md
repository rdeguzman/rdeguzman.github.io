---
title: 'Rails Note #7: NIL in Fixtures'
author: rupert
layout: post
permalink: /2008/11/be-careful-with-your-fixtures/
aktt_tweeted:
  - 1
categories:
  - rails
  - ruby
tags:
  - rails
  - ruby
---
If you want user\_id to be &#8216;nil&#8217;, then omit it from your fixtures. I tried setting user\_id: nil before, and it turned out to be &#8216;0&#8217; in the database.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"># Read about fixtures at http://ar.rubyonrails.org/classes/Fixtures.html
<span style="color:#006600; font-weight:bold;">&lt;%</span> u = UserLogin.<span style="color:#9900CC;">create</span><span style="color:#006600; font-weight:bold;">&#40;</span> <span style="color:#ff3333; font-weight:bold;">:password</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'foo'</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
<span style="color:#006600; font-weight:bold;">&lt;%</span> u.<span style="color:#9900CC;">password</span>=<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'password'</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
&nbsp;
user_no_profile:
 email: noprofile@yahoo.com
 admin: false
 user_id: nil
 salt: <span style="color:#006600; font-weight:bold;">&lt;%</span>= u.<span style="color:#9900CC;">salt</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 salted_password: <span style="color:#006600; font-weight:bold;">&lt;%</span>= u.<span style="color:#9900CC;">salted_password</span> <span style="color:#006600; font-weight:bold;">%&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2008/11/picture-3.png" alt="Picture 3.png" border="0" width="640" height="60" />

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"># Read about fixtures at http://ar.rubyonrails.org/classes/Fixtures.html
<span style="color:#006600; font-weight:bold;">&lt;%</span> u = UserLogin.<span style="color:#9900CC;">create</span><span style="color:#006600; font-weight:bold;">&#40;</span> <span style="color:#ff3333; font-weight:bold;">:password</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'foo'</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
<span style="color:#006600; font-weight:bold;">&lt;%</span> u.<span style="color:#9900CC;">password</span>=<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'password'</span><span style="color:#006600; font-weight:bold;">&#41;</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
&nbsp;
user_no_profile:
 email: noprofile@yahoo.com
 admin: false
 salt: <span style="color:#006600; font-weight:bold;">&lt;%</span>= u.<span style="color:#9900CC;">salt</span> <span style="color:#006600; font-weight:bold;">%&gt;</span>
 salted_password: <span style="color:#006600; font-weight:bold;">&lt;%</span>= u.<span style="color:#9900CC;">salted_password</span> <span style="color:#006600; font-weight:bold;">%&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2008/11/picture-21.png" alt="Picture 2.png" border="0" width="680" height="61" />

*Before pulling your hair out on what went wrong with your functional tests, check the test database if you have the correct values in your records.* Remember **&#8216;0&#8217;** is different from **&#8216;nil&#8217;**.