---
title: 'Installing Google Apps in Genymotion'
author: rupert
layout: post
permalink: /2014/10/installing-google-apps-in-genymotion/
categories:
  - android
  - genymotion
tags:
  - android
  - genymotion
---

After successfully [upgrading Genymotion from 1.3 to 2.0](/2014/10/upgrading-genymotion/), I have noticed Google Apps is not included in the emulator, which is noted in [Genymotion's changelog for 2.0.0 (November 13th, 2013)](https://cloud.genymotion.com/page/changelog/).

Stupid moment. I was using a Google Apps version different for the Emulator! I downloaded [gapps-jb-20130813-signed.zip](https://goo.im/gapps/gapps-jb-20130813-signed.zip) which has jb for Jelly Bean but the emulator I was using was 4.4.4.  It was an endless cycle of "Setup Wizard" errors which I cannot get out of.

Headover to [wikipedia's Android version history](http://en.wikipedia.org/wiki/Android_version_history) reveals:

* Ice Cream Sandwich (4.0–4.0.4)
* Jelly Bean (4.1–4.3.1)
* KitKat (4.4–4.4.4)
* Lollipop (5.0)


The external links in http://wiki.cyanogenmod.org/w/Google_Apps provides Google Apps downloads:

* https://itvends.com/gapps/ (preferred)
* http://goo.im/gapps (slow)
* http://www.androidfilehost.com/gapps

## Install Google Apps

1. Download Google Apps KK for KitKat 4.4.4 emulator. https://itvends.com/gapps/gapps-kk-20140606-signed.zip

2. Drag the zip file to the emulator. Emulator extracts and ask if you want to install.

	![Genymotion](/images/2014/10/google_apps_download.png)

	Note: File shown is for JB as I forgot to screenshot the kitkat one, but basically its the same dialog confirmation.

3. Ask you to restart the virtual device. Not yet.

	![Genymotion](/images/2014/10/google_apps_extrac_finished.png)
	
4. You'll get lots of errors. Ignore and skip them.

	![Genymotion](/images/2014/10/google_apps_error1.png)
	
	![Genymotion](/images/2014/10/google_apps_error2.png)
		
5. Launch the Google Play Service. It will ask you to add a Google Account.

	![Genymotion](/images/2014/10/google_apps_google_account.png)

6. Shows "Signing in..."

	![Genymotion](/images/2014/10/google_account_sign_in.png)
	
7. Shows "Backup Services"

	![Genymotion](/images/2014/10/google_apps_backup_services.png)
	
8. Yay! We're in!

	![Genymotion](/images/2014/10/google_play_store_1.png)

9. Still lots of errors
	
	![Genymotion](/images/2014/10/google_apps_error3.png)

10. Let's disable a few apps so they don't get updated. Go to Settings > Apps > All. For example, lets disable Google+ by clicking "Force Stop" then "Disable"

	![Genymotion](/images/2014/10/google_apps_list1.png)
	
	![Genymotion](/images/2014/10/google_apps_list2.png)
	
	![Genymotion](/images/2014/10/disable_google_plus.png)






