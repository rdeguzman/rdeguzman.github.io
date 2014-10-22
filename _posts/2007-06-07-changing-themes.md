---
title: Changing WordPress Themes
author: rupert
layout: post
permalink: /2007/06/changing-themes/
categories:
  - WordPress
tags:
  - WordPress
---
I recently updated my blog just to give it a new look. Found out all my code markups with the &#8220;pre&#8221; tag were all messed up.

The ff CSS Markup should be added to style.css of the selected theme

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.ch_code_container</span> <span style="color: #00AA00;">&#123;</span>
<span style="color: #000000; font-weight: bold;">background-color</span><span style="color: #00AA00;">:</span> <span style="color: #cc00cc;">#f0f0f0</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">border</span><span style="color: #00AA00;">:</span> <span style="color: #933;">1px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#C3CED9</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">padding</span><span style="color: #00AA00;">:</span> <span style="color: #933;">10px</span> <span style="color: #933;">10px</span> <span style="color: #933;">10px</span> <span style="color: #933;">10px</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">width</span><span style="color: #00AA00;">:</span> <span style="color: #933;">100%</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">text-align</span><span style="color: #00AA00;">:</span> <span style="color: #000000; font-weight: bold;">left</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">font</span><span style="color: #00AA00;">:</span> <span style="color: #993333;">normal</span> <span style="color: #933;">14px</span> <span style="color: #ff0000;">'Courier-New'</span><span style="color: #00AA00;">,</span> Verdana<span style="color: #00AA00;">,</span> <span style="color: #993333;">sans-serif</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">overflow</span><span style="color: #00AA00;">:</span><span style="color: #993333;">auto</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span>
<span style="color: #6666ff;">.ch_code_container</span> <span style="color: #6666ff;">.head</span>
<span style="color: #00AA00;">&#123;</span>
<span style="color: #000000; font-weight: bold;">color</span><span style="color: #00AA00;">:</span> <span style="color: #cc00cc;">#808080</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">font-weight</span><span style="color: #00AA00;">:</span> <span style="color: #993333;">bold</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">background-color</span><span style="color: #00AA00;">:</span> <span style="color: #cc00cc;">#f0f0ff</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">border-bottom</span><span style="color: #00AA00;">:</span> <span style="color: #933;">1px</span> <span style="color: #993333;">solid</span> <span style="color: #cc00cc;">#d0d0d0</span><span style="color: #00AA00;">;</span>
<span style="color: #000000; font-weight: bold;">padding</span><span style="color: #00AA00;">:</span> <span style="color: #933;">2px</span><span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>