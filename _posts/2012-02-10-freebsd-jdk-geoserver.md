---
title: freebsd + jdk + geoserver
author: rupert
layout: post
permalink: /2012/02/freebsd-jdk-geoserver/
categories:
  - freebsd
  - geoserver
  - linux
tags:
  - freebsd
  - geoserver
  - java
---
**1. Install java**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>java<span style="color: #000000; font-weight: bold;">/</span>jdk16
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span></pre>
      </td>
    </tr>
  </table>
</div>

Installing java on freebsd is not fully automated, you will be prompted to download files

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">IMPORTANT: To build the JDK 1.6.0 port, you should have at least
2.5Gb of <span style="color: #c20cb9; font-weight: bold;">free</span> disk space <span style="color: #000000; font-weight: bold;">in</span> the build area<span style="color: #000000; font-weight: bold;">!</span>
&nbsp;
&nbsp;
 Due to licensing restrictions, certain files must be fetched manually.
&nbsp;
 Please download the Update <span style="color: #000000;">3</span> Source from
 http:<span style="color: #000000; font-weight: bold;">//</span>www.java.net<span style="color: #000000; font-weight: bold;">/</span>download<span style="color: #000000; font-weight: bold;">/</span>jdk6<span style="color: #000000; font-weight: bold;">/</span>6u3<span style="color: #000000; font-weight: bold;">/</span>promoted<span style="color: #000000; font-weight: bold;">/</span>b05<span style="color: #000000; font-weight: bold;">/</span>jdk-6u3-fcs-src-b05-jrl-<span style="color: #000000;">24</span>_sep_2007.jar
 and the Source Binaries from
 http:<span style="color: #000000; font-weight: bold;">//</span>www.java.net<span style="color: #000000; font-weight: bold;">/</span>download<span style="color: #000000; font-weight: bold;">/</span>jdk6<span style="color: #000000; font-weight: bold;">/</span>6u3<span style="color: #000000; font-weight: bold;">/</span>promoted<span style="color: #000000; font-weight: bold;">/</span>b05<span style="color: #000000; font-weight: bold;">/</span>jdk-6u3-fcs-bin-b05-jrl-<span style="color: #000000;">24</span>_sep_2007.jar
 and the Mozilla Headers from
 http:<span style="color: #000000; font-weight: bold;">//</span>www.java.net<span style="color: #000000; font-weight: bold;">/</span>download<span style="color: #000000; font-weight: bold;">/</span>jdk6<span style="color: #000000; font-weight: bold;">/</span>6u3<span style="color: #000000; font-weight: bold;">/</span>promoted<span style="color: #000000; font-weight: bold;">/</span>b05<span style="color: #000000; font-weight: bold;">/</span>jdk-6u3-fcs-mozilla_headers-b05-unix-<span style="color: #000000;">24</span>_sep_2007.jar
 .
&nbsp;
 Please open http:<span style="color: #000000; font-weight: bold;">//</span>www.oracle.com<span style="color: #000000; font-weight: bold;">/</span>technetwork<span style="color: #000000; font-weight: bold;">/</span>java<span style="color: #000000; font-weight: bold;">/</span>javase<span style="color: #000000; font-weight: bold;">/</span>downloads<span style="color: #000000; font-weight: bold;">/</span>index.html
 <span style="color: #000000; font-weight: bold;">in</span> a web browser and follow the <span style="color: #ff0000;">"Download"</span> <span style="color: #c20cb9; font-weight: bold;">link</span> <span style="color: #000000; font-weight: bold;">for</span>
 <span style="color: #ff0000;">"JDK DST Timezone Update Tool - 1_3_45"</span> to obtain the
 <span style="color: #000000; font-weight: bold;">time</span> zone update <span style="color: #c20cb9; font-weight: bold;">file</span>, tzupdater-<span style="color: #000000;">1</span>_3_45-2011n.zip.
&nbsp;
 Please download the patchset, bsd-jdk16-patches-<span style="color: #000000;">4</span>.tar.bz2, from
 http:<span style="color: #000000; font-weight: bold;">//</span>www.eyesbeyond.com<span style="color: #000000; font-weight: bold;">/</span>freebsddom<span style="color: #000000; font-weight: bold;">/</span>java<span style="color: #000000; font-weight: bold;">/</span>jdk16.html.
&nbsp;
 Please place the downloaded <span style="color: #c20cb9; font-weight: bold;">file</span><span style="color: #7a0874; font-weight: bold;">&#40;</span>s<span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>distfiles 
 and restart the build.
&nbsp;
<span style="color: #000000; font-weight: bold;">***</span> Error code <span style="color: #000000;">1</span>
&nbsp;
Stop <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>java<span style="color: #000000; font-weight: bold;">/</span>jdk16.
<span style="color: #000000; font-weight: bold;">***</span> Error code <span style="color: #000000;">1</span>
&nbsp;
Stop <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>java<span style="color: #000000; font-weight: bold;">/</span>jdk16.
<span style="color: #000000; font-weight: bold;">***</span> Error code <span style="color: #000000;">1</span></pre>
      </td>
    </tr>
  </table>
</div>

These files are:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>distfiles
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">wget</span> http:<span style="color: #000000; font-weight: bold;">//</span>www.java.net<span style="color: #000000; font-weight: bold;">/</span>download<span style="color: #000000; font-weight: bold;">/</span>jdk6<span style="color: #000000; font-weight: bold;">/</span>6u3<span style="color: #000000; font-weight: bold;">/</span>promoted<span style="color: #000000; font-weight: bold;">/</span>b05<span style="color: #000000; font-weight: bold;">/</span>jdk-6u3-fcs-src-b05-jrl-<span style="color: #000000;">24</span>_sep_2007.jar
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">wget</span> http:<span style="color: #000000; font-weight: bold;">//</span>www.java.net<span style="color: #000000; font-weight: bold;">/</span>download<span style="color: #000000; font-weight: bold;">/</span>jdk6<span style="color: #000000; font-weight: bold;">/</span>6u3<span style="color: #000000; font-weight: bold;">/</span>promoted<span style="color: #000000; font-weight: bold;">/</span>b05<span style="color: #000000; font-weight: bold;">/</span>jdk-6u3-fcs-bin-b05-jrl-<span style="color: #000000;">24</span>_sep_2007.jar
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">wget</span> http:<span style="color: #000000; font-weight: bold;">//</span>www.java.net<span style="color: #000000; font-weight: bold;">/</span>download<span style="color: #000000; font-weight: bold;">/</span>jdk6<span style="color: #000000; font-weight: bold;">/</span>6u3<span style="color: #000000; font-weight: bold;">/</span>promoted<span style="color: #000000; font-weight: bold;">/</span>b05<span style="color: #000000; font-weight: bold;">/</span>jdk-6u3-fcs-mozilla_headers-b05-unix-<span style="color: #000000;">24</span>_sep_2007.jar
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #666666; font-style: italic;"># download manually tzupdater-1_3_45-2011n.zip from http://www.oracle.com/technetwork/java/javase/downloads/index.html</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #666666; font-style: italic;"># download manually bsd-jdk16-patches-4.tar.bz2 from http://www.eyesbeyond.com/freebsddom/java/jdk16.html</span></pre>
      </td>
    </tr>
  </table>
</div>

**2. Run make**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>java<span style="color: #000000; font-weight: bold;">/</span>jdk16
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

**3. Install geoserver**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>graphics<span style="color: #000000; font-weight: bold;">/</span>geoserver
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

**4. Startup geoserver**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rc.conf
<span style="color: #007800;">geoserver_enable</span>=YES</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rc.d<span style="color: #000000; font-weight: bold;">/</span>geoserver start</pre>
      </td>
    </tr>
  </table>
</div>

**5. Browse** <http://127.0.0.1:8080/geoserver/>