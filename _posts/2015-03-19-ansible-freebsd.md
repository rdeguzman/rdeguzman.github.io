---
title: 'Ansible + FreeBSD'
author: rupert
layout: post
permalink: /2015/03/ansible-freebsd/
categories:
  - ansible
  - freebsd
tags:
  - ansible
  - freebsd
---

# FreeBSD Master
	% pkg install lang/python
	% pkg install ansible
	root@master:~ #	pkg install ansible
	Updating FreeBSD repository catalogue...
	FreeBSD repository is up-to-date.
	All repositories are up-to-date.
	The following 11 packages will be affected (of 0 checked):

	New packages to be INSTALLED:
		ansible: 1.8.4
		py27-pycrypto: 2.6.1_1
		gmp: 5.1.3_2
		py27-setuptools27: 5.5.1_1
		py27-paramiko: 1.14.0
		py27-ecdsa: 0.11_1
		py27-yaml: 3.11
		py27-Jinja2: 2.7.3
		py27-MarkupSafe: 0.23
		py27-Babel: 1.3_2
		py27-pytz: 2014.10,1

	The process will require 31 MiB more space.
	5 MiB to be downloaded.

	Proceed with this action? [y/N]: y
	Fetching ansible-1.8.4.txz: 100%    1 MiB 275.7kB/s    00:04
	...
	Checking integrity... done (0 conflicting)
	[1/11] Installing py27-setuptools27-5.5.1_1...
	[1/11] Extracting py27-setuptools27-5.5.1_1: 100%
	[2/11] Installing gmp-5.1.3_2...
	[2/11] Extracting gmp-5.1.3_2: 100%
	[3/11] Installing py27-pytz-2014.10,1...
	[3/11] Extracting py27-pytz-2014.10,1: 100%
	[4/11] Installing py27-pycrypto-2.6.1_1...
	[4/11] Extracting py27-pycrypto-2.6.1_1: 100%
	[5/11] Installing py27-ecdsa-0.11_1...
	[5/11] Extracting py27-ecdsa-0.11_1: 100%
	[6/11] Installing py27-MarkupSafe-0.23...
	[6/11] Extracting py27-MarkupSafe-0.23: 100%
	[7/11] Installing py27-Babel-1.3_2...
	[7/11] Extracting py27-Babel-1.3_2: 100%
	[8/11] Installing py27-paramiko-1.14.0...
	[8/11] Extracting py27-paramiko-1.14.0: 100%
	[9/11] Installing py27-yaml-3.11...
	[9/11] Extracting py27-yaml-3.11: 100%
	[10/11] Installing py27-Jinja2-2.7.3...
	[10/11] Extracting py27-Jinja2-2.7.3: 100%
	[11/11] Installing ansible-1.8.4...
	[11/11] Extracting ansible-1.8.4: 100%
	Message for ansible-1.8.4:
	 ===============================================================================

	To use Ansible, you need at least a host database.
	If you installed examples, you will have a sample
	host database and a sample configuration file:

	  /usr/local/share/examples/ansible/hosts
	  /usr/local/share/examples/ansible/ansible.cfg

	To use Ansible to control systems other than FreeBSD,
	set the Python interpreter in the host database for
	that system. Example:

	  [freebsd]
	  host1
	  host2

	  [centos]
	  host3
	  host4

	  [centos:vars]
	  ansible_python_interpreter=/usr/bin/python

	===============================================================================	

# FreeBSD Node Setup


## Install FreeBSD

## SSH Setup

Allow root login

	% vi /etc/ssh/sshd_config
	PermitRootLogin yes
	% /etc/rc.d/sshd restart

Allow master to have password less access to the node via SSH. On master copy the ssh keys to the node

	% scp -r server_keys.tar.gz root@bsd10dev1:/root/
	% ssh root@bsd10dev1
	% cd /root
	% tar -zxvf server_keys.tar.gz
	% mv ssh_keys .ssh
	
Let's test if the keys work. On master, 

	% ssh root@bsd10dev1
	root@bsd10dev1:~ #
	
## Setup Python

Ansible needs python.

	root@bsd10dev1:~ # pkg install lang/python
	...
	root@bsd10dev1:~ # which python
	/usr/local/bin/python
	root@bsd10dev1:~ # python --version
	Python 2.7.9





