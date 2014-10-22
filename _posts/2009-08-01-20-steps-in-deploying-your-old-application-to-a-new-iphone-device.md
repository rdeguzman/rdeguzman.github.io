---
title: 'iPhone Note #1: Provisioning Profile, Code Signing Identity'
author: Rupert
layout: post
permalink: /2009/08/20-steps-in-deploying-your-old-application-to-a-new-iphone-device/
delicious:
  - 's:78:"a:3:{s:5:"count";s:1:"1";s:9:"post_tags";s:0:"";s:4:"time";s:10:"1249278197";}";'
reddit:
  - 's:55:"a:2:{s:5:"count";s:1:"0";s:4:"time";s:10:"1249278197";}";'
categories:
  - iphone
tags:
  - iphone
---
I have an old iPhone3G (8GB) and just recently bought an iPhone3GS (16GB).

1. Backup and sync old iPhone3G.

2. Power on iPhone3GS (new), insert a sim card and sync it to iTunes. Congratulations, you now have an *activated iPhone*.

3. Open up XCode -> Organizer.

4. &#8220;Use it for development&#8221;

5. Copy the identifier

6. Open up a browser, login to http://developer.apple.com and go to the &#8220;Program Portal&#8221;

7. Under Devices -> Add Devices.

8. Enter a new name, &#8220;iphone3GS&#8221; and the 40 hex identifier &#8220;xxxxxx&#8230;&#8221;

9. If you try to deploy an application at this point from XCode it will tell you that &#8220;A valid provisioning profile for this executable was not found&#8221;. Patience as we will create the provisioning profile in the next steps.

10. App Ids -> New App Id.  
Description: Applications by gismobiledev  
Bundle Seed ID: Generate New  
Bundle Identifier (App ID Suffix): gismobiledev.*

11. Provisioning -> New Profile.  
Profile: RDG\_iPhone3GS\_Development_Profile  
Certificates: &#8220;Check the box&#8221; next to your name.  
App ID: Choose &#8220;Applications by GisMobileDev&#8221;  
Devices: &#8220;Tick the boxes for each device that you want to use&#8221;

13. After submitting, I noticed the status to be *&#8220;Pending&#8221;*. Refresh after a few seconds and the status changed to: *&#8220;Active until 30 Oct 2009&#8243;*. Hmm, something is not right, my previous profile active until May 2010 since I joined the program May 2009. **Needs further investigation.**

14. Download your new provisioning profile.

15. From the Organizer, add the new provisioning profile. Don&#8217;t get too excited. You still can&#8217;t deploy on the iPhone3GS device. Why? Read on..

16. If you have an existing application that was code signed from a previous profile, we need to tell XCode to use the new provision profile for the new device.

17. XCode -> Open your application -> Project -> Edit Project Settings. Most likely, the Code Signing Identity is still using the old provisioning profile. Where is it?

18. /Users/rupert/Library/MobileDevice/Provisioning Profiles . You can delete the old profile if you don&#8217;t need it. Drop the new provisioning profile from here. Afterwards, check again step 17 above. This time around XCode should detect and display the correct profile.

<img src="/images/2009/08/code_sign_error.png" alt="code_sign_error.png" border="0" width="423" height="198" />

19. What if you have an existing application identifier for the application? Hey, I just created one from the Program Portal, we need to tell XCode to use that identifier! Navigate to your [application]-info.plist and change the Bundle identifier to gismobiledev.${PRODUCT_NAME:rfc1034identifier}. So if you defined &#8220;gismobiledev.apps.*&#8221; in your Application Id in step 10, then that&#8217;s the same string we use in the Bundle Identifier in info.plist.

<img src="/images/2009/08/codesign.png" alt="codesign.png" border="0" width="459" height="154" />

20. Build and Go. Enjoy!

UPDATE (JAN 07, 2010)  
I am having problems with a &#8220;codesign ambiguous&#8221; error from XCode. It seems confused because I just added another iphone developer certificate for another company I am working with. 

BEFORE:  
[1] iPhone Developer: RUPERTO DE GUZMAN  
[2] iPhone Developer: RUPERTO DE GUZMAN (89xxxxxxxx) 

To resolve this issue, you need to REVOKE [1] above from the PROGRAM PORTAL. After revoking, create a new certificate. Now you should have something like this:

AFTER:  
[1] iPhone Developer: RUPERTO DE GUZMAN (EZxxxxxxxx)  
[2] iPhone Developer: RUPERTO DE GUZMAN (89xxxxxxxx)

Now, all is good and I don&#8217;t have anymore &#8220;codesign ambiguous&#8221; problems anymore. Note: If you revoke the a certificate, all the developer provisioning profiles associated with the certificate would need to be changed as well. This means most likely you will end up with this process:

step 1: Revoke OLD CERT create NEW CERT  
step 2: Create a new DEVELOPER PROVISIONING PROFILE  
step 3: Migrate it to the devices.  
step 4: BUILD and DEPLOY to devices

When codesigning from XCode, you can now choose from the &#8220;PROJECT SETTINGS&#8221; which certifcate to use.

<img src="/images/2010/01/CodeSign.png" alt="CodeSign.png" border="0" width="589" height="234" />