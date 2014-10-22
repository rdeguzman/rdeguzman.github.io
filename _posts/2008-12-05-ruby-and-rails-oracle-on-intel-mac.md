---
title: 'Rails Note #12: Oracle on Intel Mac'
author: rupert
layout: post
permalink: /2008/12/ruby-and-rails-oracle-on-intel-mac/
aktt_tweeted:
  - 1
categories:
  - mac
  - oracle
  - osx
  - rails
  - ruby
tags:
  - mac
  - oracle
  - osx
  - rails
---
1. Read <http://www.foliosus.com/2008/05/05/connecting-ruby-on-rails-to-oracle-on-an-intel-mac-in-leopard-take-2/>

2. Install [Oracle Instant Client on Mac][1]. 

a. Instant Client Package &#8211; Basic: All files required to run OCI, OCCI, and JDBC-OCI applications  
&#8211; instantclient-basic-macosx-10.2.0.4.0.zip (34,020,719 bytes)

b. *Instant Client Package &#8211; SDK: Additional header files and an example makefile for developing Oracle applications with Instant Client  
instantclient-sdk-macosx-10.2.0.4.0.zip (603,493 bytes) 

OR download the [whole bundle (10.2.0.4.zip)][2] with sqlplus installed from my installers.

3. Put this on your sudo vim ~/.bash_profile.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">ORACLE_HOME</span>=<span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>Oracle<span style="color: #000000; font-weight: bold;">/</span>instantclient<span style="color: #000000; font-weight: bold;">/</span>10.2.0.4
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">TNS_ADMIN</span>=<span style="color: #007800;">$ORACLE_HOME</span>
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">LD_LIBRARY_PATH</span>=<span style="color: #007800;">$ORACLE_HOME</span>
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">DYLD_LIBRARY_PATH</span>=<span style="color: #007800;">$ORACLE_HOME</span>
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">PATH</span>=<span style="color: #007800;">$PATH</span>:<span style="color: #007800;">$ORACLE_HOME</span></pre>
      </td>
    </tr>
  </table>
</div>

4. Make a symbolic link

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>Oracle<span style="color: #000000; font-weight: bold;">/</span>instantclient<span style="color: #000000; font-weight: bold;">/</span>10.2.0.4
<span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> libclntsh.dylib.10.1 libclntsh.dylib</pre>
      </td>
    </tr>
  </table>
</div>

5. Go to /Library/Oracle/instantclient/10.2.0.4 and edit tnsnames.ora. Point the Oracle SID to the IP where you installed Oracle.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">ORCL =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.1.155)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl)
    )   
  )
&nbsp;
&nbsp;
ORCL_2_11 =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.2.11)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl)
    )   
  )</pre>
      </td>
    </tr>
  </table>
</div>

6. Install the oracle-adapter for rails

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> gem <span style="color: #c20cb9; font-weight: bold;">install</span> activerecord-oracle-adapter <span style="color: #660033;">--source</span> http:<span style="color: #000000; font-weight: bold;">//</span>gems.rubyonrails.org</pre>
      </td>
    </tr>
  </table>
</div>

7. In your database.yml file

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">development:
  adapter: oracle
  database: orcl
  username: youzhu_mobile_dev
  password: your_password</pre>
      </td>
    </tr>
  </table>
</div>

or browse the contents of a sample rails project [youzhumobile.tar.gz][3] 

8. If you ever encounter an **encoding problem**, then we need to set the NLS_LANG environment variable before running *script/server*.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># export NLS_LANG=American_America.UTF8</span>
<span style="color: #666666; font-style: italic;"># script/server</span></pre>
      </td>
    </tr>
  </table>
</div>

or I prefer setting it in the environment.rb

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#6666ff; font-weight:bold;">Rails::Initializer</span>.<span style="color:#9900CC;">run</span> <span style="color:#9966CC; font-weight:bold;">do</span> <span style="color:#006600; font-weight:bold;">|</span>config<span style="color:#006600; font-weight:bold;">|</span>
  ENV<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'NLS_LANG'</span><span style="color:#006600; font-weight:bold;">&#93;</span>=<span style="color:#996600;">'American_America.UTF8'</span>
  <span style="color:#008000; font-style:italic;"># Settings in config/environments/* take precedence over those specified here.</span></pre>
      </td>
    </tr>
  </table>
</div>

Note: [If you don&#8217;t know your database encoding, then read this post.][4]

 [1]: http://www.oracle.com/technology/software/tech/oci/instantclient/htdocs/intel_macsoft.html
 [2]: /installers/oracle/10.2.0.4.zip
 [3]: /images/2008/12/youzhumobiletar.gz "youzhumobile.tar.gz"
 [4]: /wordpress/?p=228