---
title: 'iPhone Note #10: Creating Custom Settings'
author: rupert
layout: post
permalink: /2009/09/iphone-note-10-creating-custom-settings/
categories:
  - iphone
tags:
  - iphone
---
<img src="/images/2009/09/settings-overview.gif" alt="settings-overview.gif" border="0" width="400" height="176" />

1. Create a directory on your desktop, name it &#8220;Foo&#8221;

2. Download this [Sample_plist.txt][1] and place it inside foo. Name it as Root.plist

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">Foo<span style="color: #000000; font-weight: bold;">/</span>
Foo<span style="color: #000000; font-weight: bold;">/</span>Root.plist</pre>
      </td>
    </tr>
  </table>
</div>

3. Rename Foo to Settings.bundle

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">Settings.bundle<span style="color: #000000; font-weight: bold;">/</span>
Settings.bundle<span style="color: #000000; font-weight: bold;">/</span>Root.plist</pre>
      </td>
    </tr>
  </table>
</div>

4. Drag it to your project.

<img src="/images/2009/09/settings-bundle.gif" alt="settings-bundle.gif" border="0" width="234" height="187" />

5. To retrieve a value from the settings.. For example, if we want to retrieve if the *&#8220;enabled&#8221;* switch is on or off?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #400080;">NSUserDefaults</span> <span style="color: #002200;">*</span>defaults <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSUserDefaults</span> standardUserDefaults<span style="color: #002200;">&#93;</span>;
<span style="color: #a61390;">BOOL</span> b <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>defaults boolForKey<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"enabled_preference"</span><span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

 [1]: /images/2009/09/Sample_plist.txt "Sample_plist.txt"