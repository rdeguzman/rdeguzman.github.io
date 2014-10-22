---
title: Installing Firefox on Linux (Debian)
author: rupert
layout: post
permalink: /2008/03/installing-firefox-on-linux-debian/
categories:
  - debian
  - linux
tags:
  - debian
  - firefox
  - linux
---
I read somewhere that Firefox was renamed to Iceweasel on Debian. Thus, I can&#8217;t install the Google Toolbar for it. So here are the steps for installing Firefox manually in a linux system.<!--more-->

1. Download the source from [Mozilla&#8217;s site][1]

2. Unpack the source. tar -zxvf firefox-2.0.0.12.tar.gz

3. Create a shell script pointing to the binary of the source.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#!/bin/sh</span>
<span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>firefox
.<span style="color: #000000; font-weight: bold;">/</span>firefox <span style="color: #000000; font-weight: bold;">&</span>amp;</pre>
      </td>
    </tr>
  </table>
</div>

4. Grant execute rights to the script.

5. Right click on the top-panel and click &#8220;Add To Panel&#8221;

6. Choose &#8220;Custom Application Launcher&#8221; and specify the ff:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">Name: "Firefox"
Command: /home/rupert/firefox.sh
Comment: Mozilla Firefox Browser.</pre>
      </td>
    </tr>
  </table>
</div>

7. Click on the Left Button to specify an icon to the launcher.

8. Click on Browse and navigate to /home/rupert/firefox/icons

9. Let&#8217;s install [Google Toolbar.][2]

10. Restart Firefox.

If you want to install the Adobe Flash Plugin, then download the player ([install\_flash\_player\_9\_linux.tar.gz][3]) from Adobe.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># tar -zxvf install_flash_player_9_linux.tar.gz</span>
<span style="color: #666666; font-style: italic;"># cd /home/rupert/install_flash_player_9_linux.tar.gz</span>
<span style="color: #666666; font-style: italic;"># ./flashplayer-installer</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://www.mozilla.com/en-US/firefox/all.html
 [2]: http://www.google.com/tools/firefox/toolbar/FT3/intl/en/
 [3]: http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&P2_Platform=Linux