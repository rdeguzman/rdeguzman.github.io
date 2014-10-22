---
title: 'iPhone Bug Note #1: Route-Me and Three20 in the same Project. _aasin dup symbol when building on iOS4'
author: rupert
layout: post
permalink: /2010/08/iphone-bug-note-1-route-me-and-three20-in-the-same-project-_aasin-dup-symbol-when-building-on-ios4/
categories:
  - iphone
tags:
  - iphone
---
It seems route-me and three20 doesn&#8217;t mix well on iOS4. When building my project (Philippines), I get an error on _aasin duplicate symbol, which was also discussed [on route-me issue 138 at code.google.com][1]

Three20 needs linker flag shown below:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">-all_load</pre>
      </td>
    </tr>
  </table>
</div>

The only way to go about this was linking proj4 directly from the project and removing it from route-me, thus no need to remove the &#8220;all\_load&#8221; linker flag. Note: I tried removing the &#8220;all\_load&#8221; linker flag from my project and it builds fine. However, the app crashes.

1. Drag the proj4.xcodeproj from RouteMe to your main project.

2. Afterwards delete the proj4.xcodeproj from RouteMe.  
<img src="/images/2010/08/RouteMe.png" alt="RouteMe.png" border="0" width="324" height="394" />

3. Your project should now reference both MapView and Proj4.  
<img src="/images/2010/08/three20.png" alt="three20.png" border="0" width="264" height="216" />

 [1]: http://code.google.com/p/route-me/issues/detail?id=138