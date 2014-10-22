---
title: Understanding Iptables
author: rupert
layout: post
permalink: /2007/07/understanding-iptables/
categories:
  - debian
  - linux
tags:
  - linux
---
My first hack with debian was smooth except for the firewall issues. RHEL/Fedora/CentOS stores its firewall policies in */etc/sysconfig/iptables*, in Debian, you have to write down the chains and run it. Writing the chain rules is basically the same for both distros since it is **iptables**, however it is not pretty obvious for a newbie. So my problem was, I cannot ping a domainname but can ping an IP address instantly. I misinterpreted the root cause of the problem as a dns problem, so I disabled ipv6.. still a no go. Later I found out it was one of the rules in my iptables policies.

So here is the iptables firewall shell script that resolved the issue&#8230;

1. vi firewall.sh

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
iptables-save <span style="color: #000000; font-weight: bold;">&gt;</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>firewall-rules
iptables-restore <span style="color: #000000; font-weight: bold;">&lt;</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>firewall-rules</pre>
      </td>
    </tr>
  </table>
</div>

2. Run `sh -v firewall_setup.sh`

Here&#8217;s a brief explanation of the iptables flag taken from *man*.

> -F, &#8211;flush [chain]  
> Flush the selected chain (all the chains in the table if none is given). This is equivalent to deleting all the rules one by one.
> 
> -N, &#8211;new-chain chain  
> Create a new user-defined chain by the given name. There must be no target of that name already.
> 
> -A, &#8211;append chain rule-specification  
> Append one or more rules to the end of the selected chain. When the source and/or destination names resolve to more than one address, a rule will be added for each possible address combination.
> 
> -j, &#8211;jump target  
> This specifies the target of the rule; i.e., what to do if the packet matches it. The target can be a user-defined chain (other than the one this rule is in), one of the special builtin targets which decide the fate of the packet immediately, or an extension (see EXTENSIONS below). 

So I checked out my CentOS4 box and found out that I four (4) lines which I don&#8217;t understand. See commented lines above. Here&#8217;s an explanation of them..

> Port 50 is Remote Mail Checking Protocol  
> Killing this may stop you checking if you have new mail on your provider&#8217;s POP server. Haven&#8217;t confirmed this&#8230;
> 
> Port 51 is IMP Logical Address Maintenance. Dunno what this is for..
> 
> Port 5353  
> This port is used for the Apple Bonjour network discovery protocol, as you can read here: http://www.apple.com/support/downloads/bonjourforwindows_readme.html
> 
> Port 631 IPP (Internet Printing Protocol). Enable this if you want to print from Linux.