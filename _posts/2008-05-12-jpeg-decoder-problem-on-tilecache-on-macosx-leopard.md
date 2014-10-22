---
title: Jpeg decoder problem on TileCache on MacOSX Leopard
author: rupert
layout: post
permalink: /2008/05/jpeg-decoder-problem-on-tilecache-on-macosx-leopard/
aktt_tweeted:
  - 1
categories:
  - tilecache
tags:
  - leopard
  - osx
  - python
  - tilecache
---
There is a problem with a *&#8220;jpeg decoder&#8221;* because [Python Imaging Library (PIL)][1] cannot find the jpeg libraries. Remember that we installed [kyngchaos UnixIO libraries][2], therefore the PIL setup.py script should point to use those libraries. 

Actually, I even installed the jpegsrc manually. I believe there is no need to do this, since UnixIO Image libraries is sufficient enough for PIL to install. What is important is to ensure that python tests succeeded. Once you get passed that, then installing PIL should work.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000;">1</span>. Extract Imaging-1.1.6.tar.gz
<span style="color: #000000;">2</span>. Edit setup.py to reflect:
<span style="color: #007800;">JPEG_ROOT</span>=<span style="color: #ff0000;">"/Library/Frameworks/UnixImageIO.framework/unix"</span>
<span style="color: #000000;">3</span>. python setup.py build_ext <span style="color: #660033;">-i</span>
<span style="color: #000000;">4</span>. If no <span style="color: #7a0874; font-weight: bold;">test</span> fails, <span style="color: #000000; font-weight: bold;">then</span> go ahead and <span style="color: #c20cb9; font-weight: bold;">install</span>
<span style="color: #000000;">5</span>. python setup.py <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://www.pythonware.com/products/pil/
 [2]: http://www.kyngchaos.com/wiki/software:frameworks