---
title: ColdFusion Fonts
author: rupert
layout: post
permalink: /2008/10/coldfusion-fonts/
aktt_tweeted:
  - 1
categories:
  - coldfusion
tags:
  - cf
  - coldfusion
---
I was trying to make a chinese text drawn in an image. That worked flawlessly on my Mac. Upon svn updating my files in production, the characters in the image became *squares* again.

<img src="/images/2008/10/picture-4.png" alt="Picture 4.png" border="0" width="260" height="68" />

First hunch was to change my file.encoding as from my previous [post][1]. But didn&#8217;t helped, so I changed the font from the CF code itself..

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="coldfusion" style="font-family:monospace;"> &lt;cfset attr = StructNew() /&gt;
 &lt;cfset attr.size = 16 /&gt;
 &lt;cfset attr.style = "plain" /&gt;
 &lt;cfset attr.font = "microsoft yahei" /&gt;</pre>
      </td>
    </tr>
  </table>
</div>

I noticed that using the obvious fonts (Arial, Tahoma) didn&#8217;t worked. It always complained it can&#8217;t find the font&#8230;

<img src="/images/2008/10/picture-5.png" alt="Picture 5.png" border="0" width="460" height="329" />

I remember using msyh.ttf (Microsoft Yahei) in Mapserver for producing Chinese text. So what I did was, I copied msyh.ttf and dropped it in the coldfusion fonts directory (/opt/coldfusion8/runtime/jre/lib/fonts) then restarted coldfusion. Afterwards, I was able to see msyh.ttf from the Font Management of CFIDE Administrator. From there&#8230; I was able to display the image with Chinese Characters..

<img src="/images/2008/10/picture-3.png" alt="Picture 3.png" border="0" width="264" height="72" />

 [1]: /wordpress/?p=93