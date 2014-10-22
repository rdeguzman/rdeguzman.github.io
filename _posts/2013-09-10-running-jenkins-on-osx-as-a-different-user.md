---
title: Running Jenkins on OSX as a different user
author: rupert
layout: post
permalink: /2013/09/running-jenkins-on-osx-as-a-different-user/
categories:
  - ci
  - jenkins
  - osx
  - testing
tags:
  - ci
  - jenkins
  - osx
  - testing
---
<img src="/images/2013/09/jenkins.png" alt="jenkins.png" border="0" width="423" height="138" />

Running Jenkins as a different user can be achieved in two ways as shown below. Either by installing Jenkins.app (preferred) or installing Jenkins by source. I prefer option 1 because it is straight-forward and uses the current OSX user by default. This means your `.ssh` keys is recognized.

### Option 1: Use Jenkins.app

1. Install from <https://github.com/stisti/jenkins-app>

2. Run Jenkins.app

<img src="/images/2013/09/jenkins_app_go.png" alt="jenkins_app_go.png" border="0" width="186" height="117" />

3. It will ask for settings

<img src="/images/2013/09/jenkins_settings.png" alt="jenkins_settings.png" border="0" width="379" height="156" />

4. By default, jenkins.app install the ff:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% cd ~
~% ls -la .jenkins
total 40
drwxr-xr-x   13 rupert  staff   442 10 Sep 13:05 ./
drwxr-xr-x+ 113 rupert  staff  3842 10 Sep 13:06 ../
-rw-r--r--    1 rupert  staff   159 10 Sep 13:05 hudson.model.UpdateCenter.xml
-rw-------    1 rupert  staff  1675 10 Sep 13:00 identity.key
drwxr-xr-x    2 rupert  staff    68 10 Sep 13:00 jobs/
-rw-r--r--    1 rupert  staff   907 10 Sep 13:05 nodeMonitors.xml
drwxr-xr-x   28 rupert  staff   952 10 Sep 13:00 plugins/
-rw-r--r--    1 rupert  staff    46 10 Sep 13:04 queue.xml.bak
-rw-r--r--    1 rupert  staff    64 10 Sep 13:00 secret.key
-rw-r--r--    1 rupert  staff     0 10 Sep 13:00 secret.key.not-so-secret
drwxr-xr-x    5 rupert  staff   170 10 Sep 13:05 updates/
drwxr-xr-x    3 rupert  staff   102 10 Sep 13:00 userContent/
drwxr-xr-x   24 rupert  staff   816 10 Sep 13:00 war/</pre>
      </td>
    </tr>
  </table>
</div>

5. To stop, simply quit Jenkins.app

<img src="/images/2013/09/jenkins_quit.png" alt="jenkins_quit.png" border="0" width="262" height="218" />

### Option 2: Jenkins on OSX by source

1. Install jenkins from <http://jenkins-ci.org/>. Choose Mac OS X or this direct link <http://mirrors.jenkins-ci.org/osx/latest>

<img src="/images/2013/09/jenkins_download_osx.png" alt="jenkins_download_osx.png" border="0" width="345" height="576" />

2. Jenkins will run as user &#8220;jenkins&#8221; by default. To see the files installed, read `vim /Library/Application Support/Jenkins/Uninstall.command`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">sudo</span> launchctl unload <span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>LaunchDaemons<span style="color: #000000; font-weight: bold;">/</span>org.jenkins-ci.plist
<span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>LaunchDaemons<span style="color: #000000; font-weight: bold;">/</span>org.jenkins-ci.plist
<span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-rf</span> <span style="color: #000000; font-weight: bold;">/</span>Applications<span style="color: #000000; font-weight: bold;">/</span>Jenkins <span style="color: #ff0000;">"/Library/Application Support/Jenkins"</span> <span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>Documentation<span style="color: #000000; font-weight: bold;">/</span>Jenkins
<span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-rf</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>Shared<span style="color: #000000; font-weight: bold;">/</span>Jenkins
<span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-rf</span> <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>log<span style="color: #000000; font-weight: bold;">/</span>jenkins
<span style="color: #c20cb9; font-weight: bold;">sudo</span> dscl . <span style="color: #660033;">-delete</span> <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>jenkins
<span style="color: #c20cb9; font-weight: bold;">sudo</span> dscl . <span style="color: #660033;">-delete</span> <span style="color: #000000; font-weight: bold;">/</span>Groups<span style="color: #000000; font-weight: bold;">/</span>jenkins
pkgutil <span style="color: #660033;">--pkgs</span> <span style="color: #000000; font-weight: bold;">|</span> <span style="color: #c20cb9; font-weight: bold;">grep</span> <span style="color: #ff0000;">'org\.jenkins-ci\.'</span> <span style="color: #000000; font-weight: bold;">|</span> <span style="color: #c20cb9; font-weight: bold;">xargs</span> <span style="color: #660033;">-n</span> <span style="color: #000000;">1</span> <span style="color: #c20cb9; font-weight: bold;">sudo</span> pkgutil <span style="color: #660033;">--forget</span></pre>
      </td>
    </tr>
  </table>
</div>

### Run Jenkins as a different user

1. To run jenkins as a different user on OSX, say rupert.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">sudo vim /Library/LaunchDaemons/org.jenkins-ci.plist&gt;</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="xml" style="font-family:monospace;">  <span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;key<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>GroupName<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/key<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
  <span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;string<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>wheel<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/string<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
  …
  <span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;key<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>UserName<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/key<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
  <span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;string<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>rupert<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/string<span style="color: #000000; font-weight: bold;">&gt;</span></span></span></pre>
      </td>
    </tr>
  </table>
</div>

2. Reload Jenkins

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">sudo launchctl unload -w /Library/LaunchDaemons/org.jenkins-ci.plist
sudo launchctl load -w /Library/LaunchDaemons/org.jenkins-ci.plist</pre>
      </td>
    </tr>
  </table>
</div>

References:

&#8211; [how to run jenkins as a different user][1]

&#8211; [Launchctl:Dubious permissions on file: Problem Installing Jenkins][2]

 [1]: http://stackoverflow.com/questions/6692330/how-to-run-jenkins-as-a-different-user
 [2]: http://apple.stackexchange.com/questions/63857/launchctldubious-permissions-on-file-problem-installing-jenkins