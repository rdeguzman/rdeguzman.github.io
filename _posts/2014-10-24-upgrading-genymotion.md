---
title: 'Upgrading Genymotion'
author: rupert
layout: post
permalink: /2014/10/upgrading-genymotion/
categories:
  - android
tags:
  - android
  - genymotion
---

The last time I updated Genymotion from 1.3 to 2.0, I had issues with ARM support INSTALL_FAILED_CPU_ABI_INCOMPATIBLE as described in this stackoverflow [post](http://stackoverflow.com/questions/17831990/how-do-you-install-google-frameworks-play-accounts-etc-on-a-genymotion-virt).  So I ensured to take careful steps in upgrading Genymotion just in case I need to revert back to 1.3

1. **Backup official genymotion files.** Genymotion official FAQ regarding ["How do I properly uninstall Genymotion?"](https://cloud.genymotion.com/page/faq/#uninstall) notes two important paths

	    /Applications/Genymotion Shell.app
	    /Applications/Genymotion.app
	        
		/Users/rupert/.Genymobile
		   |-Genymotion
		   |---deployed
		   |-----WXGA 10.1 Tablet - 4.2.2 - with Google Apps - API 17 - 1280x800
		   |-------Logs
		   |-----WXGA 10.1 Tablet - 4.3 - API 18 - 1024x768
		   |---ova
		   |---templates
		   |---vdi
		   
		% mkdir ~/Desktop/genymotion_)backup   
	   	   
2. **Install Genymotion**. Download the latest Genymotion from https://cloud.genymotion.com/page/launchpad/download/ (v2.3 at the time of writing this).

3. **Download Virtual Devices**. After logging your credentials, download the latest Virtual Device (i.e Custom Tablet 4.4.4-API 19)

	![Genymotion](/images/2014/10/genymotion_upgrade1.png)




