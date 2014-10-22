---
title: Preparing your linux machine
author: rupert
layout: post
permalink: /2007/01/preparing-your-linux-machine/
categories:
  - linux
tags:
  - linux
---
1. For production servers, you need to install CentOS4.4 minimal.  
&#8211; Create partitions as follow:  
/boot &#8211; 100  
swap &#8211; 2x as the memory, if the memory is 2GB, then your swap should be 4096MB  
/ &#8211; assign the rest for root  
/data &#8211; if needs be  
&#8211; Choose GRUB as boot loader.  
&#8211; Disable SELINUX  
&#8211; Enable httpd, sshd  
&#8211; Choose minimal

2. Get connected to your network. Modify your network as needed. Network configuration scripts are found in  
`<br />
/etc/sysconfig/network-scripts/<br />
`

You should see at least the ff, depending on how many ethernet interfaces you have:  
`<br />
ifcfg-eth0<br />
ifcfg-lo<br />
`

Edit ifcfg-eth0:  
`<br />
DEVICE=eth0<br />
BOOTPROTO=static<br />
HWADDR=00:16:96:10:F3:2B<br />
ONBOOT=yes<br />
TYPE=Ethernet<br />
IPADDR=192.168.1.105<br />
GATEWAY=192.168.1.1<br />
`

3. Edit your hostname:  
`<br />
#vi /etc/sysconfig/network<br />
NETWORKING=yes<br />
HOSTNAME=rupert-linux<br />
`

4. Edit your hosts:  
`<br />
# vi /etc/hosts<br />
# Do not remove the following line, or various programs<br />
# that require network functionality will fail.<br />
127.0.0.1               rupert-linux localhost.localdomain localhost<br />
192.168.1.10            appserver<br />
192.168.1.11            dbserver1<br />
192.168.1.12            svnserver<br />
`

Providing ip addreses on your hosts can make network access faster, depending on the routes.

5. Edit your path to reflect the ff:  
`<br />
#vi /etc/skel/.bash_profile<br />
PATH=$PATH:$HOME/bin:/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:/usr/local/mysql/bin<br />
export HTDOCS=/usr/local/apache2/htdocs<br />
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib:/usr/lib`

cp -Rf /etc/skel/.bash_profile /home/rupert/  
cp -Rf /etc/skel/.bash_profile /home/tan/  
cp -Rf /etc/skel/.bash_profile /root/  
6. Copy the centos packages into your harddisk, so you don&#8217;t need the CD&#8217;s later on. Reboot.

7. Install the ff rpms:  
`<br />
#install gcc<br />
echo "installing gcc"<br />
rpm -ivh cpp-3.4.6-3.i386.rpm<br />
rpm -ivh glibc-kernheaders-2.4-9.1.98.EL.i386.rpm<br />
rpm -ivh glibc-headers-2.3.4-2.25.i386.rpm<br />
rpm -ivh glibc-devel-2.3.4-2.25.i386.rpm<br />
rpm -ivh gcc-3.4.6-3.i386.rpm`

echo &#8220;installing gcc++&#8221;  
rpm -ivh compat-libstdc++-33-3.2.3-47.3  
rpm -ivh compat-libstdc++-296-2.96-132.7.2  
rpm -ivh libstdc++-3.4.6-3  
rpm -ivh gcc-c++-3.4.6-3

#installing other utilies  
rpm -ivh apr-0.9.4-24.5.c4.2.i386.rpm  
rpm -ivh apr-util-0.9.4-21.i386.rpm  
rpm -ivh neon-0.24.7-4.i386.rpm  
rpm -ivh perl-URI-1.30-4.noarch.rpm  
rpm -ivh umb-scheme-3.2-36.EL4.i386.rpm  
rpm -ivh guile-1.6.4-14.i386.rpm  
rpm -ivh swig-1.3.21-6.i386.rpm  
rpm -ivh subversion-1.1.4-2.ent.i386.rpm  
rpm -ivh perl-DBI-1.40-8.i386.rpm  
rpm -ivh nmap-3.70-1.i386.rpm  
rpm -ivh vim-common-6.3.046-0.40E.7.i386.rpm  
rpm -ivh vim-enhanced-6.3.046-0.40E.7.i386.rpm  
rpm -ivh binutils-2.15.92.0.2-21.i386.rpm  
8. Disable unneeded services.  
`<br />
chkconfig bluetooth  off<br />
chkconfig cups  off<br />
chkconfig irda  off<br />
chkconfig isdn off<br />
chkconfig netdump off<br />
chkconfig netfs off<br />
chkconfig nfs off<br />
chkconfig nfslock off<br />
chkconfig nscd off<br />
chkconfig openibd off<br />
chkconfig pand off<br />
chkconfig pcmcia off<br />
chkconfig portmap off<br />
chkconfig rhnsd off<br />
chkconfig rpcgssd off<br />
chkconfig rpcidmapd off<br />
chkconfig rpcsvcgssd off<br />
chkconfig sendmail off<br />
chkconfig syslog off<br />
chkconfig xfs off<br />
chkconfig xinetd off<br />
chkconfig ypbind off<br />
chkconfig yum off<br />
`