---
title: Android Project Setup in IntelliJ12/13 on OSX10.8 Mountain Lion
author: rupert
layout: post
permalink: /2013/08/android-project-setup-in-intellij-on-osx10-8/
categories:
  - android
  - java
  - mobile
  - osx
tags:
  - android
  - editors
  - Idea
  - java
  - mobile
---
My current setup involves the following:  
&#8211; Mountain Lion OSX10.8.4  
&#8211; IntelliJ IDEA 12.1.4  
&#8211; JDK1.6.0_51  
Update Aug 23, 2013:  
&#8211; IntelliJ IDEA 130.1619 (Cardea Preview) &#8211; Community Edition &#8211; Early Access Program (EAP). See screenshot below under Notes.

My main reference is <http://www.java-javafx.com/2013/02/first-android-application-on.html>

### Step 1. Get the JDK

According to the Android Developer System Requirements <http://developer.android.com/sdk/index.html>, we should have JDK6 (JRE alone is not sufficient).

UPDATE Oct 16, 2013: On IntelliJ&#8217;s project settings, you can choose either jdk6 or jdk7. There is no need to remove jdk7 if you need it in other java projects.  
<img src="/images/2013/10/jdk6or7.png" alt="jdk6or7.png" border="0" width="941" height="471" />

#### 1a. Install JDK6 from Apple

<https://developer.apple.com/downloads/index.action>.

<img src="/images/2013/08/java_download_from_apple.png" alt="java_download_from_apple.png" border="0" width="985" height="426" />

1. Search for &#8220;Java&#8221;

2. I downloaded Java for OS X 2013-004 Developer Package (java\_for\_os\_x\_2013004\_dp\__11m4509.dmg)

#### 1b. If you want to remove JDK7, then follow the steps below.

To find traces of JDK installed on my machine.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/System/Library/Java/JavaVirtualMachines
/Library/Java/JavaVirtualMachines</pre>
      </td>
    </tr>
  </table>
</div>

To complicate, I ***installed Oracle&#8217;s JDK7***. So to start on a clean slate, I decided to uninstall JDK7 and stick with JDK6.

**Removes Java Applet Plugin from System Preferences**  
[http://www.java.com/en/download/help/mac\_uninstall\_java.xml][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">cd /Library/Internet\ Plug-Ins/
sudo rm JavaAppletPlugin.plugin</pre>
      </td>
    </tr>
  </table>
</div>

**Removes traces of jdk7**  
<http://docs.oracle.com/javase/7/docs/webnotes/install/mac/mac-jdk.html>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">cd /System/Library/Java/JavaVirtualMachines
sudo rm -rf jdk1.7.0_06.jdk</pre>
      </td>
    </tr>
  </table>
</div>

### Step 2. Android SDK

Download the android-sdk for MacOSX <http://developer.android.com/sdk/index.html>  
<img src="/images/2013/08/android_sdk_macosx_download.png" alt="android_sdk_macosx_download.png" border="0" width="801" height="644" />

Once download is complete, I transferred android-sdk-macosx to /Developer

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/Developer/android-sdk-macosx% l
total 8
-rw-r-----   1 rupert  staff   1.1K 29 Jul 16:00 SDK Readme.txt
drwxr-x---   2 rupert  staff    68B 29 Jul 16:00 add-ons/
drwxr-x---   2 rupert  staff    68B 29 Jul 16:00 platforms/
drwxr-x---  36 rupert  staff   1.2K 21 Aug 13:29 tools/</pre>
      </td>
    </tr>
  </table>
</div>

### Step 3. Install Android Platform from the Android-SDK-Manager

Launch android-sdk-manager from the tools directory

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/Developer/android-sdk-macosx% cd tools
/Developer/android-sdk-macosx/tools% ./android</pre>
      </td>
    </tr>
  </table>
</div>

Select the packages

<img src="/images/2013/08/android-sdk-manager.png" alt="android-sdk-manager.png" border="0" width="846" height="897" />

### Step 4. Add Android SDK to your project

1. Open Idea

<img src="/images/2013/08/configure.png" alt="configure.png" border="0" width="805" height="610" />

2. Click on your project and navigate to > Project Defaults > Project Structure

<img src="/images/2013/08/project_structure_android_sdk.png" alt="project_structure_android_sdk.png" border="0" width="1057" height="850" />

3. Click on &#8220;+&#8221; > &#8220;Android SDK&#8221;.  
4. Specify android-sdk-macosx path (/Developers/android-sdk-macosx). Click &#8220;Choose&#8221;.  
5. Shows a drop down list which displays &#8220;Java SDK:&#8221; and &#8220;Build target&#8221;. Choose which target you want to support.

<img src="/images/2013/08/android-sdk-select.png" alt="android-sdk-select.png" border="0" width="305" height="252" />

6. Hit &#8220;OK&#8221;

### Step 4. Create a new Android Project

1. From the Welcome screen, click on &#8220;Create New Project&#8221;

<img src="/images/2013/08/configure.png" alt="configure.png" border="0" width="805" height="610" />

2. Specify the following settings:

<img src="/images/2013/08/new_project.png" alt="new_project.png" border="0" width="819" height="763" />

> a. Select &#8220;Application Module&#8221;  
> b. In &#8220;Project name:&#8221;, specify &#8220;hello_world&#8221;  
> c. In &#8220;Project SDK:&#8221;, choose &#8220;Android 4.3 Platform (java version &#8220;1.x.x&#8221;)&#8221; 

Hit &#8220;Next&#8221;

**Important:**  
Take this time to load as much SDKs by clicking on &#8220;New&#8221; > Choose directory (/Developer/android-sdk-macosx)  
<img src="/images/2013/08/multiple_sdks.png" alt="multiple_sdks.png" border="0" width="831" height="766" />

3. In Project properties, you can create an &#8220;Android Virtual Device&#8221; from the avd manager.  
<img src="/images/2013/08/avd.png" alt="avd.png" border="0" width="818" height="887" />

Hit &#8220;Finish&#8221;.

4. Project Loads  
<img src="/images/2013/08/hello_world.png" alt="hello_world.png" border="0" width="836" height="525" />

5. Hit the play button to run the adb. It will launch the emulator. Be patient.  
<img src="/images/2013/08/play.png" alt="play.png" border="0" width="158" height="33" />

### Notes

1. <http://confluence.jetbrains.com/display/IDEADEV/IDEA+13+EAP>

Idea13-EAP (Community Edition) is better in terms of the Layout Designer.  
<img src="/images/2013/08/idea13.png" alt="idea13.png" border="0" width="1209" height="1225" />

2. <http://blogs.jetbrains.com/idea/2013/05/intellij-idea-and-android-studio-faq/>

 [1]: http://www.java.com/en/download/help/mac_uninstall_java.xml