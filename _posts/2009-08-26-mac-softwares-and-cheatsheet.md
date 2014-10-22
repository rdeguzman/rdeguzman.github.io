---
title: OSX CheatSheet
author: rupert
layout: post
permalink: /2009/08/mac-softwares-and-cheatsheet/
categories:
  - mac
  - osx
tags:
  - mac
  - osx
---
1. [iTerm][1] &#8211; terminal with tabs. 

2. [MarsEdit][2]- Blog Software. Im doing a local post on a local wordpress then copying and pasting to a remote wordpress.

3. Mac Shortcuts from <http://www.danrodney.com/mac/index.html>. Here&#8217;s a [local post][3] and another [one.][4]

4. How to create an ISO?

<pre>hdiutil makehybrid -o CS3v1.iso CS3</pre>

5. [chmOX][5] &#8211; CHM Viewer in OSX.

6. [Git][6] for OS X from google code.

7. Open a finder from terminal

<pre>open .</pre>

8. Keychain Access asking on passwordless ssh?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">ssh-add</span>
Enter passphrase: <span style="color: #000000; font-weight: bold;">******</span>
<span style="color: #c20cb9; font-weight: bold;">ssh-add</span> <span style="color: #660033;">-l</span> <span style="color: #000000; font-weight: bold;">&lt;</span>To list your identities<span style="color: #000000; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

Credits goes to <http://www.danrodney.com/mac/index.html>

<img src="/images/2008/08/picture-17.png" border="0" alt="Picture 1.png" width="651" height="395" />

9. ln -s /Applications/TextMate.app/Contents/Resources/mate /usr/local/bin/mate

10. dscacheutil -flushcache<!--more-->

  
<img src="/images/2008/08/picture-22.png" border="0" alt="Picture 2.png" width="651" height="718" />  
<img src="/images/2008/08/picture-31.png" border="0" alt="Picture 3.png" width="650" height="351" />  
<img src="/images/2008/08/picture-4.png" border="0" alt="Picture 4.png" width="651" height="727" />  
<img src="/images/2008/08/picture-51.png" border="0" alt="Picture 5.png" width="650" height="608" />  
<img src="/images/2008/08/picture-6.png" border="0" alt="Picture 6.png" width="651" height="441" />  
<img src="/images/2008/08/picture-71.png" border="0" alt="Picture 7.png" width="651" height="748" />  
<img src="/images/2008/08/picture-8.png" border="0" alt="Picture 8.png" width="651" height="560" />  
<img src="/images/2008/08/picture-9.png" border="0" alt="Picture 9.png" width="651" height="656" />

 [1]: http://iterm.sourceforge.net/download.shtml
 [2]: http://www.red-sweater.com/marsedit/
 [3]: /wordpress/2008/08/mac-shortcuts/
 [4]: /wordpress/2008/11/mac-tip-of-the-day-know-your-shortcuts/
 [5]: http://chmox.sourceforge.net
 [6]: http://code.google.com/p/git-osx-installer/