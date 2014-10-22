---
title: Installing Postgresql, Postgis, pgRouting on Debian
author: rupert
layout: post
permalink: /2008/05/installing-postgresql-postgis-pgrouting-on-debian/
aktt_tweeted:
  - 1
categories:
  - debian
  - postgis
  - postgres
  - routing
tags:
  - debian
  - pgRouting
  - postgis
  - postgres
---
Operating System: Debian sid

Versions:

*   postgres 8.3.1
*   postgis 1.3.3
*   pgRouting1.02

1. Install base system and ssh

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#vi /etc/apt/sources.list to include</span>
deb http:<span style="color: #000000; font-weight: bold;">//</span>debian.cn99.com<span style="color: #000000; font-weight: bold;">/</span>debian etch main
deb-src http:<span style="color: #000000; font-weight: bold;">//</span>debian.cn99.com<span style="color: #000000; font-weight: bold;">/</span>debian etch main
<span style="color: #666666; font-style: italic;">#apt-get update</span>
<span style="color: #666666; font-style: italic;">#apt-get upgrade libc6</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Install the required packages for postgres8.3 and postgis1.3.3

<pre lang="bash" xml:lang="bash">#apt-get install sudo nmap telnet
#apt-get install python2.5 python2.5-dev python-setuptools
#apt-get install g++
#apt-get install build-essential cmake ibboost-graph-dev
#apt-get install libreadline5 libreadline5-dev
#apt-get install zlib-bin zlib1g-dev
#apt-get install libkrb5-dev
#apt-get install libcurl3
#apt-get install libssl-dev
#apt-get install postgresql-8.3
#apt-get install postgresql-8.3-postgis
#apt-get install postgresql-server-dev-8.3
</pre>

3. Installing pgRouting

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># tar -zxvf pgRouting-1.02.tgz</span>
<span style="color: #666666; font-style: italic;"># cmake .</span>
<span style="color: #666666; font-style: italic;"># make </span>
<span style="color: #666666; font-style: italic;"># make install</span></pre>
      </td>
    </tr>
  </table>
</div>