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

# On Master

- Using OSX, install ansible

		brew install ansible

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





