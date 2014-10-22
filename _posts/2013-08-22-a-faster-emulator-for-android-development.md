---
title: A faster emulator for Android development
author: rupert
layout: post
permalink: /2013/08/a-faster-emulator-for-android-development/
categories:
  - android
  - mobile
  - testing
tags:
  - android
  - emulators
  - mobile
  - testing
---
One of the pains of Android development is the ridiculously slow Android ARM Emulator. I want to be able to code and test in the Android Emulator similar to the experience I had with iOS development. The default Android Emulator in ARM is painfully too slow for me.

### Intel HAX

[Intel Hardware Accelerated Execution (HAX)][1] is an attempt by Intel + Google to speed up Android Emulation.

<cite>The Intel Hardware Accelerated Execution Manager (Intel® HAXM) is a hardware-assisted virtualization engine (hypervisor) that uses Intel Virtualization Technology (Intel® VT) to speed up Android app emulation on a host machine. In combination with Android x86 emulator images provided by Intel and the official Android SDK Manager, HAXM allows for faster Android emulation on Intel VT enabled systems.</cite>

1. Download Intel HAX from the Android SDK Manager 

<img src="/images/2013/08/android-sdk-intel-hax.png" alt="android-sdk-intel-hax.png" border="0" width="604" height="640" />

2. install from `/android-sdk-osx-path/extras/intel`

<img src="/images/2013/08/intel.png" alt="intel.png" border="0" width="645" height="562" />

3. Confirm if Intel HAX was installed property

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/Developer/android-sdk-macosx% kextstat | grep intel
142    0 0xffffff7f825a1000 0x11000    0x11000    com.intel.kext.intelhaxm (1.0.6) &lt;7 5 4 3 1&gt;</pre>
      </td>
    </tr>
  </table>
</div>

### Genymotion

<cite>Android expert, Genymobile aims to make developers and professional users of Android life easier by using simple and efficient tools. The Genymotion team is composed of 10 persons living in Paris, Lyon and soon San Francisco.</cite>

1. You need to [Signup in Genymotion][2]

2. Click the link provided in the email confirmation to activate your account. This allows you to download the genymotion app.

3. Go to https://cloud.genymotion.com/page/launchpad/download/ and download genymotion.

<img src="/images/2013/08/genymotion.png" alt="genymotion.png" border="0" width="665" height="458" />

4. You should have <http://www.virtualbox.org> installed. If not, get it before proceeding. 

5. Install the genymotion package to your `Applications`. Drag both items to your `Applications`. 

<img src="/images/2013/08/genymotion-installer.png" alt="genymotion-installer.png" border="0" width="594" height="332" />

6. Launch the genymotion application and specify `android-sdk-osx` path in genymotion&#8217;s settings.

<img src="/images/2013/08/genymotion-settings.png" alt="genymotion-settings.png" border="0" width="808" height="625" />

8. Click on &#8220;Add&#8221; to Create a new virtual device. It will ask for your genymotion&#8217;s credentials

<img src="/images/2013/08/genymotion-credentials.png" alt="genymotion-credentials.png" border="0" width="803" height="674" />

9. Select from the virtual images. Click &#8220;Next&#8221; to download.

<img src="/images/2013/08/genymotion-virtual-devices.png" alt="genymotion-virtual-devices.png" border="0" width="801" height="660" />

10. Specify a name

<img src="/images/2013/08/genymotion-name.png" alt="genymotion-name.png" border="0" width="535" height="514" />

11. Test the image if it runs.

<img src="/images/2013/08/genymotion-play.png" alt="genymotion-play.png" border="0" width="799" height="621" />

<img src="/images/2013/08/virtual-device.png" alt="virtual-device.png" border="0" width="1074" height="625" />

UPDATE: Nov 22, 2013  
To PERMANENTLY allow su_access or display the virtual keyboard in the settings of the Genymotion Configuration. See <http://stackoverflow.com/questions/19107507/genymotion-allow-su-access-permanently>

<img src="/images/2013/11/genymotion_configuration.png" alt="genymotion_configuration.png" border="0" width="418" height="321" />

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="code" style="font-family:monospace;">VBoxManage guestproperty set "WXGA 10.1 Tablet - 4.2.2 - with Google Apps - API 17 - 1024x768" su_bypass 1
VBoxManage guestproperty set "WXGA 10.1 Tablet - 4.2.2 - with Google Apps - API 17 - 1024x768" vkeyboard_mode 1</pre>
      </td>
    </tr>
  </table>
</div>

### Integrating GenyMotion with IntelliJ IDEA

1. Open IDEA&#8217;s settings (Command + ,)

2. Click on Plugins > Install JetBrains plugin > Search &#8220;genymotion&#8221; > Download and Install.

<img src="/images/2013/08/idea-settings.png" alt="idea-settings.png" border="0" width="1226" height="844" />  
Note: If you are using IntelliJ Idea 13 Community Edition EAP, you might need to install the plugin from disk.

3. Restart IntelliJ so it can load the genymotion plugin

4. Open up a sample app, i.e hello_world. In IntelliJ, you should see the red genymotion icon. 

<img src="/images/2013/08/red-genymotion-icon.png" alt="red-genymotion-icon.png" border="0" width="180" height="34" />

5. From the Genymotion Device Manager, select the virtual device and click on &#8220;Start&#8221;.

<img src="/images/2013/08/genymotion-device-manager.png" alt="genymotion-device-manager.png" border="0" width="585" height="512" />

To check if it started correctly, run `adb devices`.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% adb devices
List of devices attached
192.168.56.102:5555	device</pre>
      </td>
    </tr>
  </table>
</div>

6. In Idea, click on &#8220;Edit Configurations&#8221;. Ensure that &#8220;Show chooser dialog&#8221; is chosen under Target Device. This allows us to choose the genymotion virtual device later on.

<img src="/images/2013/08/idea_edit_config.png" alt="idea_edit_config.png" border="0" width="749" height="663" />

7. Run play.  
<img src="/images/2013/08/play1.png" alt="play.png" border="0" width="757" height="116" />

8. You should see the virtual device listed. Click &#8220;OK&#8221;

<img src="/images/2013/08/virtual-device-avd.png" alt="virtual-device-avd.png" border="0" width="477" height="391" />

9. Idea deploys hello_world app to virtual device (took mine 3-5 seconds).

<img src="/images/2013/08/hello_world1.png" alt="hello_world.png" border="0" width="1078" height="626" />

### Notes:

You might need to specify a &#8220;host-only&#8221; network adapter in VirtualBox.

<img src="/images/2013/08/host-only.png" alt="host-only.png" border="0" width="571" height="251" />

### References:

Download Genymotion  
<https://cloud.genymotion.com/page/launchpad/download/>

Genymotion UserGuide  
<https://cloud.genymotion.com/page/doc/>

Genymotion Features  
<http://www.genymotion.com/features/>

 [1]: http://software.intel.com/en-us/articles/intel-hardware-accelerated-execution-manager
 [2]: http://www.genymotion.com/