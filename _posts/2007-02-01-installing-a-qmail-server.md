---
title: Installing a qmail server
author: rupert
layout: post
permalink: /2007/02/installing-a-qmail-server/
categories:
  - linux
tags:
  - centos
  - linux
  - qmail
---
Its been almost two years now since I installed a mail server. Nevertheless, [qmail still rocks as qmailtoaster becomes more convenient to install.][1] I also tried the install on a fresh CentOS4.4 machines, and it works like a charm.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">--------------------------------------------------------------------
EZ QmailToaster Fresh Install on CentOS 4.3
Nick Hemmesch &lt;nick @ndhsoft.com&gt; June 08, 2006
--------------------------------------------------------------------
&nbsp;
CentOS 4.3: This test install was performed on an
P4 3Ghz with 2GB ram on an Intel m/b. 
&nbsp;
--------------------------------------------------------------------
This tutorial is for CentOS 4.3 (cnt40) i386 
&nbsp;
To install CentOS 4.3 x86_64, replace cnt40 with cnt4064
&nbsp;
To install Fedora Core 4 &amp; 5, change download path from centos to
fedora &amp; cnt40 to fdr40, fdr4064, fdr50 or fdr5064 per your distro
--------------------------------------------------------------------
&nbsp;
Notes:
&nbsp;
You must have either a local dns server or a local caching name
server. If you need a caching namserver, we will add one in Step 8.
&nbsp;
Be sure to replace "your-domain.com" with your real domain name,
and "your.fqdn.com" with your server's "Fully Qualified Domain Name".
&nbsp;
--------------------------------------------------------------------
1. Download CentOS 4.3 CD iso's or the DVD iso.
--------------------------------------------------------------------
&nbsp;
  Burn iso's to CD, or DVD if you downloded a DVD iso
&nbsp;
  Boot with your CD 1 or the DVD
&nbsp;
--------------------------------------------------------------------
2. CentOS Installation (This is the configuration of my test box):
--------------------------------------------------------------------
&nbsp;
  Splash Page: &lt;enter&gt; to install in graphical mode  
&nbsp;
  CD Found window: Choose "Skip" to bypass media test  
&nbsp;
  Welcome to CentOS: Click "Next"
&nbsp;
  Language Selection: Select your language &amp; Click "Next"
&nbsp;
  Keyboard Configuration: Select language type &amp; Click "Next"
&nbsp;
  Installation Type: Select "Server" &amp; Click "Next"
&nbsp;
  Disk Partitioning Setup: Select "Automatically Partition &amp; Click "Next"
&nbsp;
      Warning: Click "Yes"
&nbsp;
  Automatic Partitioning: Select "Remove all partitions" &amp; Click "Next"
&nbsp;
      Warning: Click "Yes"
&nbsp;
  Disk Setup: Click "Next"
&nbsp;
  Boot Loader Configuration: Click "Next"
&nbsp;
  Network Configuration: Click "Edit"
&nbsp;
      Edit Interface eth0: Deselect "Configure using DHCP"
&nbsp;
      Select "Activate on boot"
&nbsp;
      Enter your "IP Address" &amp; "Netmask"
&nbsp;
      Click "OK
&nbsp;
      Set the hostname:
&nbsp;
          Deselect "automatically via DHCP"
&nbsp;
          Select "manually" &amp; enter your "fully qualified domain name"
&nbsp;
      Miscellaneous Settings:
&nbsp;
          Gateway: enter IP address of your gateway
&nbsp;
          Primary DNS: enter IP address of primary dns server
&nbsp;
          Secondary DNS: enter IP address of secondary dns server
&nbsp;
      Click "Next"
&nbsp;
  Firewall Configuration:
&nbsp;
      Select "No firewall"
&nbsp;
      Select "Disabled" mode for SELinux
&nbsp;
      Click "Next"
&nbsp;
          Warning - No Firewall: Click "Proceed"
&nbsp;
  Additional Language Support" Click "Next"
&nbsp;
  Time Zone Selection: Select your time zone &amp; Click "Next"
&nbsp;
  Set Root Password: Enter your root password twice &amp; Click "Next"
&nbsp;
--------------------------------------------------------------------
3. Package Group Selection - Select ONLY the following groups:
--------------------------------------------------------------------
&nbsp;
  Server Configuration Tools: Select
&nbsp;
  Web Server: Select
&nbsp;
      Click "Details" and add php-mysql plus the defaults
&nbsp;
  DNS Name Server: Select
&nbsp;
  FTP Server: Select
&nbsp;
  MySQL Database: Select
&nbsp;
      Click "Details" and add mysql-bench, mysql-server plus the defaults
&nbsp;
  Development Tools: Select
&nbsp;
      Click "Details" and add expect to the defaults
&nbsp;
  Administration Tools: Select
&nbsp;
  System Tools: Select
&nbsp;
      Click "Details" and add mrtg to the defaults
&nbsp;
  Click "Next"
&nbsp;
  About to Install: Click "Next"
&nbsp;
      Required Install Media: verify and click "Continue"
&nbsp;
  Installing Packages: Click "Next" &amp; watch the install
&nbsp;
  After installation: remove your media &amp; Click "Reboot"
&nbsp;
--------------------------------------------------------------------
4. After reboot, login as root:
--------------------------------------------------------------------
&nbsp;
  mkdir -p /usr/src/qtms-install
&nbsp;
  cd /usr/src/qtms-install
&nbsp;
  This example is CentOS 4.3 i386 so the qmailtoaster switch is cnt40 
&nbsp;
--------------------------------------------------------------------
5. Prepare to Install QmailToaster:
--------------------------------------------------------------------
&nbsp;
  wget http://www.qmailtoaster.com/centos/cnt40/cnt40-deps.sh
&nbsp;
      sh cnt40-deps.sh
&nbsp;
  wget http://www.qmailtoaster.com/centos/cnt40/cnt40-perl.sh
&nbsp;
      sh cnt40-perl.sh
&nbsp;
  wget http://www.qmailtoaster.com/centos/cnt40/cnt40-svcs.sh
&nbsp;
  wget http://www.qmailtoaster.com/centos/cnt40/firewall.sh
&nbsp;
      nano -w cnt40-svcs.sh
&nbsp;
      edit MYSQLPW=your-mysql-password
&nbsp;
      ctl-o and enter to save
&nbsp;
      ctl-x to exit
&nbsp;
      nano -w firewall.sh
&nbsp;
      edit MYIP="your-IP-address"
&nbsp;
      ctl-o and enter to save
&nbsp;
      ctl-x to exit
&nbsp;
      sh cnt40-svcs.sh
&nbsp;
  === NOTE ===
&nbsp;
  This script turns on or off all necessary services. Then the script sets
  up your mysql root account, creates and grants privileges for your vpopmail
  mysql account, makes a symlink so your krb5 is read properly, edits your
  php.ini, sets inittab to start at runlevel 3, and sets up your firewall.
&nbsp;
  Note: You might see some service errors while the script runs,
  don't worry about them.
&nbsp;
  ============
&nbsp;
  Update all your packages:
&nbsp;
      yum -y update
&nbsp;
  REBOOT
&nbsp;
--------------------------------------------------------------------
6. Get QmailToaster Packages:
--------------------------------------------------------------------
&nbsp;
  cd /usr/src/qtms-install
&nbsp;
  wget http://www.qmailtoaster.com/info/current-download-script.sh
&nbsp;
      sh current-download-script.sh
&nbsp;
  This script downloads all necessary packages into you current
  directory (should be /usr/src/qtms-install/).
&nbsp;
--------------------------------------------------------------------
7. Install QmailToaster Packages:
--------------------------------------------------------------------
&nbsp;
  wget http://www.qmailtoaster.com/centos/cnt40/cnt40-install-script.sh
&nbsp;
      sh cnt40-install-script.sh
&nbsp;
  Check your services:
&nbsp;
      setup: Select Services
&nbsp;
          See that the following services are selected: acpid anacron
&nbsp;
          atd autofs cpuspeed crond djbdns freshclam haldaemon httpd
&nbsp;
          iptables kudzu messagebus mysqld network ntpd qmail rawdevices
&nbsp;
          smartd sshd syslog xinet
&nbsp;
          Also: irqbalance (w/dual processors) xfs (w/xwindows)
&nbsp;
--------------------------------------------------------------------
8. Add djbdns (if you don't want bind)
--------------------------------------------------------------------
&nbsp;
  rpm -e --nodeps bind bind-chroot caching-nameserver
&nbsp;
  rpmbuild --rebuild --with cnt40 djbdns*.src.rpm
&nbsp;
  rpm -Uvh ../redhat/RPMS/i386/djbdns-localcache*.rpm
&nbsp;
  echo "search your-domain.com" &gt; /etc/resolv.conf
  echo "nameserver 127.0.0.1" &gt;&gt; /etc/resolv.conf
&nbsp;
  REBOOT
&nbsp;
--------------------------------------------------------------------
9. Setup QmailToaster:
--------------------------------------------------------------------
&nbsp;
  qmailctl stat
&nbsp;
  (Should look somewhat like this)
&nbsp;
      [root@gateway ~]# qmailctl stat
      authlib: up (pid 2425) 65 seconds
      clamd: up (pid 2425) 65 seconds
      imap4: up (pid 2421) 65 seconds
      imap4-ssl: up (pid 2423) 65 seconds
      pop3: up (pid 2414) 65 seconds
      pop3-ssl: up (pid 2409) 65 seconds
      send: up (pid 2416) 65 seconds
      smtp: up (pid 2418) 65 seconds
      spamd: up (pid 2407) 65 seconds
      authlib/log: up (pid 2417) 65 seconds
      clamd/log: up (pid 2417) 65 seconds
      imap4/log: up (pid 2422) 65 seconds
      imap4-ssl/log: up (pid 2424) 65 seconds
      pop3/log: up (pid 2415) 65 seconds
      pop3-ssl/log: up (pid 2413) 65 seconds
      send/log: up (pid 2420) 65 seconds
      smtp/log: up (pid 2419) 65 seconds
      spamd/log: up (pid 2408) 65 seconds
      [root@gateway ~]#
&nbsp;
  Add a domain:
&nbsp;
      /home/vpopmail/bin/vadddomain your-domain.com
&lt;postmaster -password&gt;
&nbsp;
  Add a user:
&nbsp;
      /home/vpopmail/bin/vadduser you@your-domain.com &lt;your -password&gt;
&nbsp;
  Edit /etc/php.ini and set register_globals = On
&nbsp;
      service httpd restart  
&nbsp;
  Bring up your browser and go to:
&nbsp;
      http://www.your-domain.com/admin-toaster/
&nbsp;
        Username: admin
        Password: toaster
&nbsp;
      Change your password . . . 
&nbsp;
  Edit /etc/php.ini and set register_globals = Off
&nbsp;
      service httpd restart  
&nbsp;
  Check your mail server:
&nbsp;
      http://www.your-domain.com/webmail
&nbsp;
      login with your full email address and your password
&nbsp;
      Send yourself an email - should show right away
&nbsp;
      Send an email to yourself if you have another address
&nbsp;
      Go to your other email account and reply to the message you sent
&nbsp;
  If Isoqlog doesn't show right away, do this:
&nbsp;
      sh /usr/share/toaster/isoqlog/bin/cron.sh
&nbsp;
--------------------------------------------------------------------
10. Add domainkeys:
--------------------------------------------------------------------
&nbsp;
  Make dir for yourdomain.com: 
&nbsp;
      mkdir /var/qmail/control/domainkeys/your-domain.com 
&nbsp;
  Make domainkey (Remove the "\"): 
&nbsp;
      dknewkey /var/qmail/control/domainkeys/your-domain.com/private &gt; \
                                                         your-domain-dk.txt 
&nbsp;
      chown root:qmail /var/qmail/control/domainkeys/your-domain.com/private
      chmod 444 /var/qmail/control/domainkeys/your-domain.com/private
&nbsp;
  Make dns entry: 
&nbsp;
      BIND - in the your-domain.com zone file (see yourdomain-dk.txt):
&nbsp;
         private._domainkey IN TXT "k=rsa; p=MEwwDQY . . . to end of key"
            (NOTE QUOTATION MARKS MUST BE THERE) 
&nbsp;
      DJBDNS - in /var/djbdns/tinydns/root/data (make from your-domain-dk.txt): 
&nbsp;
        '_domainkey.your-domain.com:o=-; r=postmaster@your-domain.com
        'private._domainkey.your-domain.com:k=rsa; p=MEwwDQY . . . to end of key 
&nbsp;
  Test your mailserver:
&nbsp;
      http://domainkeys.sourceforge.net/policycheck.html
      http://domainkeys.sourceforge.net/selectorcheck.html
&nbsp;
      In squirrelmail, send a test email, select View Full Header and you
      should find something like the following:
&nbsp;
      ----------- snip ------------
      DomainKey-Status: good
      Received: by simscan 1.2.0 ppid: 22641, pid: 22644, t: 0.8416s
           scanners: clamav: 0.88.2/m:38/d:1476 spam: 3.1.1
      X-Spam-Checker-Version: SpamAssassin 3.1.1 (2006-03-10) on ndh1.whatgives.org
      X-Spam-Level: *
      X-Spam-Status: No, score=1.6 required=5.0 tests=FROM_DOMAIN_NOVOWEL
           autolearn=no version=3.1.1
      Received: from unknown (HELO ns1.ndhsdns.com) (216.221.100.227)
           by ndh1.whatgives.org with (DHE-RSA-AES256-SHA encrypted) SMTP; 22 May 2006 20:03:36 -0000
      Received-SPF: pass (ndh1.whatgives.org: SPF record at ndhsdns.com designates 216.221.100.227 as permitted sender)
      Received: (qmail 28034 invoked by uid 89); 22 May 2006 20:03:36 -0000
      Comment: DomainKeys? See http://antispam.yahoo.com/domainkeys
      DomainKey-Signature: a=rsa-sha1; q=dns; c=nofws;
           s=private; d=ndhsdns.com;
           b=XVKQZe446BXMnSoQKvgchf0DRx4v8YQYZn5KVLj5O8XYf7V1dX7ETaJ1VGWGp5Bf ;
      Received: from unknown (HELO www.ndhsdns.com) (127.0.0.1)
           by ns1.ndhsdns.com with SMTP; 22 May 2006 20:03:36 -0000
      ----------- snip ------------
&nbsp;
--------------------------------------------------------------------
11. Logs for all packages except freshclam are at:
--------------------------------------------------------------------
&nbsp;
  /var/log/qmail/*
&nbsp;
  Freshclam is at /var/log/clamav
&lt;/your&gt;&lt;/postmaster&gt;&lt;/enter&gt;&lt;/nick&gt;</pre>
      </td>
    </tr>
  </table>
</div>

Notes:  
The only problem I stumbbled upon is when using vadddomain, as the mysql password was still set to &#8220;SsEeCcRrEeTt&#8221;. Edit these files before adding a domain. I dont use the web interface when adding a domain, i prefer it by command line.  
`<br />
[root@mail vpopmail]# find . | grep mysql<br />
./etc/vpopmail.mysql.dist<br />
./etc/vpopmail.mysql<br />
`

After all the installs is completed, reboot and check if qmail is running.  
`<br />
Administrator links:<br />
http://your-mail-server-ip/admin-toaster/ -> this is the main administration interface<br />
http://your-mail-server-ip/qmailadmin/     -> administrative interface to manage accounts<br />
http://your-mail-server-ip/webmail/         -> an email account interface<br />
`

 [1]: http://www.qmailtoaster.com/centos/cnt40/EZ-QmailToaster-CentOS-4.3.txt