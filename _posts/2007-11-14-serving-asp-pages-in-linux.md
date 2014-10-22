---
title: 'Serving ASP pages  in Linux'
author: rupert
layout: post
permalink: /2007/11/serving-asp-pages-in-linux/
categories:
  - debian
tags:
  - asp
  - linux
---
I never intended to do such a thing as what the *title* describes. However, since we need it at work temporarily, I have to crack up my linux skills to set this up. Principal reference is <http://www.apache-asp.org/config.html>.

In Debian,

1. install libapache2-mod-perl2 + libapache-asp-perl

`<br />
sudo apt-get install libapache2-mod-perl2<br />
sudo apt-get install libapache-asp-perl<br />
`

2. configuration includes:  
sudo vi /etc/apache2/sites-available/default

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;"> 76     PerlModule  Apache::ASP
 77      &lt;files&gt;
 78        SetHandler  perl-script
 79        PerlHandler Apache::ASP
 80        PerlSetVar  Global .
 81        PerlSetVar  StateDir /data/asp
 82      &lt;/files&gt;</pre>
      </td>
    </tr>
  </table>
</div>

3. Restart apache.

4. Make sure you have the correct permissions to: /data/asp  
`<br />
drwxrwxr-x  4 www-data www-data  4096 2007-11-13 15:33 asp<br />
`

5. If you encounter the problems:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>Tue Nov <span style="color: #000000;">13</span> <span style="color: #000000;">15</span>:<span style="color: #000000;">12</span>:<span style="color: #000000;">36</span> <span style="color: #000000;">2007</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>error<span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>client 127.0.0.1<span style="color: #7a0874; font-weight: bold;">&#93;</span> Can<span style="color: #ff0000;">'t locate object method "get" via package "APR::Table" at /usr/share/perl5/Apache/ASP.pm line       2016.\n at /usr/share/perl5/Apache/ASP.pm line 2016\n\tApache::ASP::get_dir_config('</span>APR::<span style="color: #007800;">Table</span>=HASH<span style="color: #7a0874; font-weight: bold;">&#40;</span>0x81d96f8<span style="color: #7a0874; font-weight: bold;">&#41;</span><span style="color: #ff0000;">', '</span>Global<span style="color: #ff0000;">') called at /usr/share/perl5/A      pache/ASP.pm line 275\n\tApache::ASP::new('</span>Apache::ASP<span style="color: #ff0000;">', '</span>Apache2::<span style="color: #007800;">RequestRec</span>=SCALAR<span style="color: #7a0874; font-weight: bold;">&#40;</span>0x81d9764<span style="color: #7a0874; font-weight: bold;">&#41;</span><span style="color: #ff0000;">', '</span><span style="color: #000000; font-weight: bold;">/</span>data<span style="color: #000000; font-weight: bold;">/</span>wwwroot<span style="color: #000000; font-weight: bold;">/</span>asp<span style="color: #000000; font-weight: bold;">/</span>test.asp<span style="color: #ff0000;">') called at /usr/share/pe      rl5/Apache/ASP.pm line 183\n\tApache::ASP::handler('</span>Apache2::<span style="color: #007800;">RequestRec</span>=SCALAR<span style="color: #7a0874; font-weight: bold;">&#40;</span>0x81d9764<span style="color: #7a0874; font-weight: bold;">&#41;</span><span style="color: #ff0000;">') called at -e line 0\n\teval {...} called at -e line 0\n, re      ferer: http://127.0.0.1/asp/</span></pre>
      </td>
    </tr>
  </table>
</div>

Read [nable-post][1]. which patches /usr/share/perl5/Apache/ASP.pm as follows:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="perl" style="font-family:monospace;">The lines <span style="color: #cc66cc;">65</span><span style="color: #339933;">-</span><span style="color: #cc66cc;">71</span><span style="color: #339933;">:</span>
   <span style="color: #b1b100;">if</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$ENV</span><span style="color: #009900;">&#123;</span>MOD_PERL<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
   <span style="color: #0000ff;">$ModPerl2</span> <span style="color: #339933;">=</span> <span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$mod_perl</span><span style="color: #339933;">::</span><span style="color: #006600;">VERSION</span> <span style="color: #339933;">&</span><span style="color: #b1b100;">gt</span><span style="color: #339933;">;=</span> <span style="color: #cc66cc;">1.99</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
   <span style="color: #b1b100;">if</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$ModPerl2</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
       <span style="color: #000066;">eval</span> <span style="color: #ff0000;">"use Apache::ASP::ApacheCommon ();"</span><span style="color: #339933;">;</span>
       <span style="color: #000066;">die</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$@</span><span style="color: #009900;">&#41;</span> <span style="color: #b1b100;">if</span> <span style="color: #0000ff;">$@</span><span style="color: #339933;">;</span>
   <span style="color: #009900;">&#125;</span>
   <span style="color: #009900;">&#125;</span>
&nbsp;
become
   <span style="color: #b1b100;">if</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$ENV</span><span style="color: #009900;">&#123;</span>MOD_PERL<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
   <span style="color: #0000ff;">$ModPerl2</span> <span style="color: #339933;">=</span> <span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$mod_perl</span><span style="color: #339933;">::</span><span style="color: #006600;">VERSION</span> <span style="color: #339933;">&</span><span style="color: #b1b100;">gt</span><span style="color: #339933;">;=</span> <span style="color: #cc66cc;">1.99</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
   <span style="color: #b1b100;">my</span> <span style="color: #0000ff;">$ver</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">$mod_perl</span><span style="color: #339933;">::</span><span style="color: #006600;">VERSION</span><span style="color: #339933;">;</span>
   <span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$ver</span> <span style="color: #b1b100;">eq</span> <span style="color: #ff0000;">""</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span> <span style="color: #0000ff;">$ver</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">$ENV</span><span style="color: #009900;">&#123;</span>MOD_PERL_API_VERSION<span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span> <span style="color: #009900;">&#125;</span>
   <span style="color: #0000ff;">$ModPerl2</span> <span style="color: #339933;">=</span> <span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$ver</span> <span style="color: #339933;">&</span><span style="color: #b1b100;">gt</span><span style="color: #339933;">;=</span> <span style="color: #cc66cc;">1.99</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
   <span style="color: #b1b100;">if</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$ModPerl2</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
       <span style="color: #000066;">eval</span> <span style="color: #ff0000;">"use Apache::ASP::ApacheCommon ();"</span><span style="color: #339933;">;</span>
       <span style="color: #000066;">die</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">$@</span><span style="color: #009900;">&#41;</span> <span style="color: #b1b100;">if</span> <span style="color: #0000ff;">$@</span><span style="color: #339933;">;</span>
   <span style="color: #009900;">&#125;</span>
   <span style="color: #009900;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

6. If Step 5 still doesn&#8217;t work.

a. And this to /etc/apache2/conf.d/perl.conf:

`PerlRequire /etc/apache2/startup.pl`

b. startup.pl  
`<br />
#!/usr/bin/perl<br />
use Apache2::compat;<br />
1;<br />
`

7. To test. Paste the ff in test.asp under your webroot.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="asp" style="font-family:monospace;">  <span style="color: #006600; font-weight: bold;">&lt;!</span>-- sample here --<span style="color: #006600; font-weight: bold;">&gt;</span>
&nbsp;
  <span style="color: #990099; font-weight: bold;">For</span> <span style="color: #990099; font-weight: bold;">loop</span> incrementing font size<span style="color: #006600; font-weight: bold;">:</span>
&nbsp;
  <span style="color: #006600; font-weight: bold;">&</span>lt<span style="color: #006600; font-weight: bold;">;%</span> <span style="color: #990099; font-weight: bold;">for</span><span style="color: #006600; font-weight:bold;">&#40;</span><span style="color: #800000;">1</span>..<span style="color: #800000;">5</span><span style="color: #006600; font-weight:bold;">&#41;</span> <span style="color: #006600; font-weight:bold;">&#123;</span> <span style="color: #006600; font-weight: bold;">%&</span>gt<span style="color: #006600; font-weight: bold;">;</span>
	<span style="color: #006600; font-weight: bold;">&lt;!</span>-- iterated html text --<span style="color: #006600; font-weight: bold;">&gt;</span>
	<span style="color: #006600; font-weight: bold;">&lt;</span>font size<span style="color: #006600; font-weight: bold;">=</span><span style="color: #cc0000;">"&lt;%=$_%&gt;"</span><span style="color: #006600; font-weight: bold;">&gt;</span> Size <span style="color: #006600; font-weight: bold;">=</span> <span style="color: #006600; font-weight: bold;">&</span>lt<span style="color: #006600; font-weight: bold;">;%=</span>$_<span style="color: #006600; font-weight: bold;">%&</span>gt<span style="color: #006600; font-weight: bold;">;</span> <span style="color: #006600; font-weight: bold;">&lt;/</span>font<span style="color: #006600; font-weight: bold;">&gt;</span> 
  <span style="color: #006600; font-weight: bold;">&</span>lt<span style="color: #006600; font-weight: bold;">;%</span> <span style="color: #006600; font-weight:bold;">&#125;</span> <span style="color: #006600; font-weight: bold;">%&</span>gt<span style="color: #006600; font-weight: bold;">;</span>
&nbsp;
  <span style="color: #006600; font-weight: bold;">&lt;!</span>-- <span style="color: #990099; font-weight: bold;">end</span> sample here --<span style="color: #006600; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://www.nabble.com/forum/ViewPost.jtp?post=4833633&framed=y