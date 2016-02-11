---
title: 'FreeBSD+pkg No active remote repositories configured'
author: rupert
layout: post
permalink: /2016/02/freebsd92+pkg-no-active-remote-repositories-configured/
categories:
  - freebsd
tags:
  - freebsd
---

Just installed a fresh freebsd92 from FreeBSD-9.2-RELEASE-amd64-disc1.iso and FreeBSD-9.2-RELEASE-amd64-dvd1.iso and after bootstraping pkg as follows

  	env ASSUME_ALWAYS_YES=YES pkg bootstrap

Installing a package fails with **"No active remote repositories configured."**

  	root@freebsd92:~ # pkg install git
  	No active remote repositories configured.

For some reason the remote repo in ``/etc/pkg/FreeBSD.conf`` does not exist! So lets create one.

	# vi /etc/pkg/FreeBSD.conf
	FreeBSD: {
	  url: "pkg+http://pkg.FreeBSD.org/${ABI}/latest",
	  mirror_type: "srv",
	  signature_type: "fingerprints",
	  fingerprints: "/usr/share/keys/pkg",
	  enabled: yes
	}

Also need to create the certificate <http://geocoding.io/images/2016/02/pkg.freebsd.org.2013102301> in ``/usr/share/keys/pkg/trusted/``

See <http://svnweb.freebsd.org/base/head/share/keys/pkg/trusted/>

  	# mkdir -p /usr/share/keys/pkg/trusted
  	# wget http://geocoding.io/images/2016/02/pkg.freebsd.org.2013102301
  	
Now, we can try to update pkg and see if we have a repo

	#/usr/share/keys/pkg/trusted # pkg update -f
	Updating FreeBSD repository catalogue...
	Fetching meta.txz: 100%    968 B   1.0kB/s    00:01
	Fetching packagesite.txz: 100%    5 MiB  98.8kB/s    00:56
	Processing entries: 100%
	FreeBSD repository update completed. 24610 packages processed.