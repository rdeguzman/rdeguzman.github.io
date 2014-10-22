---
title: ExtJS and OpenLayers
author: rupert
layout: post
permalink: /2008/02/extjs-and-openlayers/
categories:
  - ExtJS
  - javascript
  - openlayers
tags:
  - ExtJS
  - openlayers
---
It seems that ExtJS and OpenLayers does not blend well together. One of the bug biters that hit me was the way ExtJS was handling arrays. It would be wise for OpenLayers to be agnostic of these frameworks.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;"><span style="color: #000066; font-weight: bold;">for</span><span style="color: #009900;">&#40;</span> <span style="color: #000066; font-weight: bold;">var</span> i <span style="color: #000066; font-weight: bold;">in</span> blocks <span style="color: #009900;">&#41;</span> should be transformed to <span style="color: #000066; font-weight: bold;">for</span><span style="color: #009900;">&#40;</span> <span style="color: #000066; font-weight: bold;">var</span> i <span style="color: #339933;">=</span> <span style="color: #CC0000;"></span><span style="color: #339933;">;</span> i <span style="color: #339933;">&</span>lt<span style="color: #339933;">;</span> blocks.<span style="color: #660066;">length</span><span style="color: #339933;">;</span> i<span style="color: #339933;">++</span><span style="color: #009900;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

I believe [OpenLayers Ticket#1362][1] closely resembles this bug. Thanks to pgiraud for pointing me to the right direction.

 [1]: http://trac.openlayers.org/ticket/1362