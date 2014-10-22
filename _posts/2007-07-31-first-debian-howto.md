---
title: Installing Debian
author: rupert
layout: post
permalink: /2007/07/first-debian-howto/
categories:
  - debian
  - linux
tags:
  - debian
---
This is already an update on my First Howto with debian. So far, I could atest that Debian has been very good to me, and lessen my daily admin tasks.

**1. Install base system. I prefer a minimal install.**

**2. Setup Networking**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000;">2.1</span> Disable IPV6
<span style="color: #c20cb9; font-weight: bold;">vi</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>modprobe.d<span style="color: #000000; font-weight: bold;">/</span>aliases
<span style="color: #7a0874; font-weight: bold;">alias</span> ipv6 off
<span style="color: #7a0874; font-weight: bold;">alias</span> net-pf-<span style="color: #000000;">10</span> off
&nbsp;
<span style="color: #000000;">2.2</span> Setup IP
<span style="color: #c20cb9; font-weight: bold;">vi</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>network<span style="color: #000000; font-weight: bold;">/</span>interfaces
<span style="color: #666666; font-style: italic;"># This file describes the network interfaces available on your system</span>
<span style="color: #666666; font-style: italic;"># and how to activate them. For more information, see interfaces(5).</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># The loopback network interface</span>
auto lo
iface lo inet loopback
&nbsp;
<span style="color: #666666; font-style: italic;"># The primary network interface</span>
allow-hotplug eth0
iface eth0 inet static
        address 192.168.1.211
        netmask 255.255.255.0
        network 192.168.1.0
        broadcast 192.168.1.255
        gateway 192.168.1.1</pre>
      </td>
    </tr>
  </table>
</div>

2.3 Modify Hosts

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#vi /etc/hosts</span>
127.0.0.1           localhost
127.0.1.1           rupert-debian
192.168.1.211     rupert-debian
222.73.255.64     mirrors.geekbone.org
61.132.102.124   debian.cn99.com
128.31.0.36       security.debian.org
&nbsp;
<span style="color: #666666; font-style: italic;"># The following lines are desirable for IPv6 capable hosts</span>
<span style="color: #666666; font-style: italic;">#::1     ip6-localhost ip6-loopback</span>
<span style="color: #666666; font-style: italic;">#fe00::0 ip6-localnet</span>
<span style="color: #666666; font-style: italic;">#ff00::0 ip6-mcastprefix</span>
<span style="color: #666666; font-style: italic;">#ff02::1 ip6-allnodes</span>
<span style="color: #666666; font-style: italic;">#ff02::2 ip6-allrouters</span>
<span style="color: #666666; font-style: italic;">#ff02::3 ip6-allhosts</span></pre>
      </td>
    </tr>
  </table>
</div>

You can delete the commented (#) lines, if you don&#8217;t have ipv6 on your network&#8230;

2.4 Setup Basic Firewall  
vi firewall.sh

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">iptables <span style="color: #660033;">-F</span>
iptables <span style="color: #660033;">-N</span> FIREWALL
iptables <span style="color: #660033;">-F</span> FIREWALL
iptables <span style="color: #660033;">-A</span> INPUT <span style="color: #660033;">-j</span> FIREWALL
iptables <span style="color: #660033;">-A</span> FORWARD <span style="color: #660033;">-j</span> FIREWALL
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-i</span> lo <span style="color: #660033;">-j</span> ACCEPT
&nbsp;
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-p</span> icmp <span style="color: #660033;">--icmp-type</span> any <span style="color: #660033;">-j</span> ACCEPT
&nbsp;
<span style="color: #666666; font-style: italic;">#iptables -A FIREWALL -p 50 -j ACCEPT</span>
<span style="color: #666666; font-style: italic;">#iptables -A FIREWALL -p 51 -j ACCEPT</span>
&nbsp;
<span style="color: #666666; font-style: italic;">#iptables -A FIREWALL -p udp --dport 5353 -d 224.0.0.251 -j ACCEPT</span>
<span style="color: #666666; font-style: italic;">#iptables -A FIREWALL -p udp -m udp --dport 631 -j ACCEPT</span>
&nbsp;
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-m</span> state <span style="color: #660033;">--state</span> ESTABLISHED,RELATED <span style="color: #660033;">-j</span> ACCEPT
&nbsp;
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-p</span> tcp <span style="color: #660033;">-m</span> tcp <span style="color: #660033;">--dport</span> <span style="color: #000000;">22</span> <span style="color: #660033;">--syn</span> <span style="color: #660033;">-j</span> ACCEPT
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-p</span> tcp <span style="color: #660033;">-m</span> tcp <span style="color: #660033;">--sport</span> <span style="color: #000000;">80</span> <span style="color: #660033;">-j</span> ACCEPT
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-p</span> tcp <span style="color: #660033;">-m</span> tcp <span style="color: #660033;">--sport</span> <span style="color: #000000;">3306</span> <span style="color: #660033;">-j</span> ACCEPT
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-p</span> tcp <span style="color: #660033;">-m</span> tcp <span style="color: #660033;">--sport</span> <span style="color: #000000;">5432</span> <span style="color: #660033;">-j</span> ACCEPT
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-p</span> tcp <span style="color: #660033;">-m</span> tcp <span style="color: #660033;">--syn</span> <span style="color: #660033;">-j</span> REJECT
iptables <span style="color: #660033;">-A</span> FIREWALL <span style="color: #660033;">-p</span> udp <span style="color: #660033;">-m</span> udp <span style="color: #660033;">-j</span> REJECT
iptables-save <span style="color: #000000; font-weight: bold;">&</span>gt; <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>firewall-rules
iptables-restore <span style="color: #000000; font-weight: bold;">&</span>lt; <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>firewall-rules</pre>
      </td>
    </tr>
  </table>
</div>

sh -v firewall_setup.sh

To set it up on boot:  
vi /etc/network/interfaces  
&#8230;  
iface lo inet loopback  
pre-up iptables-restore < /etc/firewall-rules  
&#8230;

I did catch a slight problem on this, for more details please read this [post.][1]

[**3. Specify the nearest source list** ][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;</span>a <span style="color: #007800;">href</span>=<span style="color: #ff0000;">"/wordpress/?p=83"</span><span style="color: #000000; font-weight: bold;">&gt;</span>
<span style="color: #c20cb9; font-weight: bold;">vi</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>apt<span style="color: #000000; font-weight: bold;">/</span>sources.list
<span style="color: #666666; font-style: italic;">#deb http://mirrors.geekbone.org/debian etch main</span>
<span style="color: #666666; font-style: italic;">#deb-src http://mirrors.geekbone.org/debian etch main</span>
&nbsp;
deb http:<span style="color: #000000; font-weight: bold;">//</span>mirrors.geekbone.org<span style="color: #000000; font-weight: bold;">/</span>debian etch main
deb-src http:<span style="color: #000000; font-weight: bold;">//</span>mirrors.geekbone.org<span style="color: #000000; font-weight: bold;">/</span>debian etch main
<span style="color: #000000; font-weight: bold;">&lt;/</span>a<span style="color: #000000; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

[**4. Let&#8217;s get ssh up and running first.**][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;</span>a <span style="color: #007800;">href</span>=<span style="color: #ff0000;">"/wordpress/?p=83"</span><span style="color: #000000; font-weight: bold;">&gt;</span>
<span style="color: #c20cb9; font-weight: bold;">apt-get update</span>
<span style="color: #c20cb9; font-weight: bold;">apt-get install</span> <span style="color: #c20cb9; font-weight: bold;">ssh</span>
<span style="color: #000000; font-weight: bold;">&lt;/</span>a<span style="color: #000000; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

[**5. Once you have networking up and running, then I advise to upgrade to lenny (testing) as stated from the source list[3] above.**][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;</span>a <span style="color: #007800;">href</span>=<span style="color: #ff0000;">"/wordpress/?p=83"</span><span style="color: #000000; font-weight: bold;">&gt;</span>
<span style="color: #c20cb9; font-weight: bold;">apt-get upgrade</span> libc6
<span style="color: #c20cb9; font-weight: bold;">apt-get dist-upgrade</span>
<span style="color: #000000; font-weight: bold;">&lt;/</span>a<span style="color: #000000; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

[**6. Reboot**][1]

[**7. Do you want this machine to be your desktop? If yes, let&#8217;s get gnome.**][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;</span>a <span style="color: #007800;">href</span>=<span style="color: #ff0000;">"/wordpress/?p=83"</span><span style="color: #000000; font-weight: bold;">&gt;</span>
<span style="color: #666666; font-style: italic;">#aptitude install gnome</span>
<span style="color: #666666; font-style: italic;">#aptitude install gnome-core</span>
<span style="color: #666666; font-style: italic;">#aptitude install x-window-system</span>
<span style="color: #000000; font-weight: bold;">&lt;/</span>a<span style="color: #000000; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

[**8. Reboot. You should see a graphical Gnome Login**][1]

[**9. Utilities**][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;</span>a <span style="color: #007800;">href</span>=<span style="color: #ff0000;">"/wordpress/?p=83"</span><span style="color: #000000; font-weight: bold;">&gt;</span>
<span style="color: #666666; font-style: italic;">#apt-get install htop nmap unzip subversion build-essential cmake locate</span>
<span style="color: #666666; font-style: italic;">#apt-get install libboost-graph*</span>
<span style="color: #000000; font-weight: bold;">&lt;/</span>a<span style="color: #000000; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

[**10. Servers**  
#apt-get install apache2  
#apt-get install postgresql-8.2  
#apt-get install postgresql-8.2-postgis  
#apt-get install postgresql-server-dev-8.2  
#apt-get install mysql-server][1]

[**11. Removing unwanted services**  
#update-rc.d -f portmap remove  
#update-rc.d -f cupsys remove  
#update-rc.d -f exim4 remove][1]

[**12. Configuring vimrc with syntax highlighting**][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&lt;a href="/wordpress/?p=83"&gt;
set nocompatible
set nu
set ts=4
syntax on
&lt;/a&gt;</pre>
      </td>
    </tr>
  </table>
</div>

 [1]: /wordpress/?p=83