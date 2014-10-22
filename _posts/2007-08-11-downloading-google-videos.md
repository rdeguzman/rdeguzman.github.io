---
title: Downloading Google Videos
author: rupert
layout: post
permalink: /2007/08/downloading-google-videos/
categories:
  - google
tags:
  - google
---
Having troubles downloading google videos in china. I found this excellent post, [http://www.isaacmao.com/meta/2006/07/how-to-view-google-video-locally-in.html&#8221;][1].

Trick here, is for your browser to use anonymous access. This is where [TOR][2] comes to the picture.

1.  Follow the steps above in setting up TOR.
2.  You should see two (2) icons on your system tray&#8211;[1] Privoxy and [2]Tor.
3.  Go to D:\Vidalia Bundle\Torbutton\ and drag torbutton-1.0.4-fx+tb.xpi to Firefox to install the plugin. Restart Firefox.
4.  To test your settings: Go to [tor detector][3].

TOR-disabled:  
*219.142.136.4 (4.136.142.219.broad.bj.bj.dynamic.163data.com.cn)*

TOR:  
*88.84.142.165 (v29465.1blu.de)*

1.  Now we can view google video from China.
2.  To download the video, view source the file after the flash video has initialized
3.  Look for: &#8220;*googleplayer.swf?&videoUrl*&#8220;, copy and paste the URL until you see &#8220;*&messagesUrl\u003*&#8220;
4.  Now fire up your PL of choice and unescape the string

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="cf" style="font-family:monospace;">&lt;cfset temp="http%3A%2F%2Fvp.video.google.com%2Fvideodownload%3Fversion%3D0%26secureurl%3DtwAAAJXmdl7RAbyfYcDwHzBiBVKQtqUQSoSZfAnVXGhsGvKxwTGSF0kNuXRAvMyVxKs6uXkGf3muen2mfnv_D21e3Wkw89ngl9-GEELOIiKHZtJsfUc_kYbKHHMieqsUs92S5ALoyWiWZBeX3SaNdyNTNuc6h1aPjG9EBrGIK4sf0s9Zrl5npjJiUZJ8j_mKWj9YQFhnHOkL-t7XUBBxJuXGeK2ORTrfBPecXPAC-ql_GlIwWIDkAWP6bVCeej0uFln-EA%26sigh%3Dyt6dfQtoXjSdikbv9o9y5YADjj8%26begin%3D0%26len%3D6009275%26docid%3D1135114630744003385"&gt;
&nbsp;
&lt;cfoutput&gt;
&lt;a href="#URLDecode(temp)#"&gt;#URLDecode(temp)#&lt;/a&gt;
&lt;/cfoutput&gt;
&lt;/cfset&gt;</pre>
      </td>
    </tr>
  </table>
</div>

Once downloaded, you can view it from google&#8217;s video player. GoogleVideoPlayerSetup.exe

 [1]: http://www.isaacmao.com/meta/2006/07/how-to-view-google-video-locally-in.html
 [2]: http://tor.eff.org/docs/tor-doc-win32.html.en
 [3]: http://torcheck.xenobite.eu/