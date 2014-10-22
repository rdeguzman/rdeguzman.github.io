---
title: 'iPhone Dev Note #24: Using Frank'
author: rupert
layout: post
permalink: /2011/05/iphone-dev-note-24-using-frank/
categories:
  - iphone
tags:
  - iphone
---
If you are into testing iphone apps. You might want to check out Frank (<https://github.com/moredip/Frank/>) and watch the videos, especially this one [Testing Your Mobile Apps with Selenium 2 and Frank March 30th, 2011 by Pete Hodgsen][1].

### Main Tutorial

1. Follow this tutorial for steps 1-7 <https://github.com/moredip/Frank/blob/master/tutorial/Tutorial.md> Note: A bit outdated when you&#8217;re in steps 8.

2. Assuming you already have a working &#8220;frankified&#8221; project running, check by doing <http://localhost:37265/>

<img src="/images/2011/05/2-symbiote.png" alt="2-symbiote.png" border="0" width="400" height="132" /> 

3. Now do:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">frank skeleton</pre>
      </td>
    </tr>
  </table>
</div>

4. This will give you a directory structure below.

<img src="/images/2011/05/1-frank-skeleton.png" alt="1-frank-skeleton.png" border="0" width="192" height="115" />

5. If you try to run &#8220;cucumber&#8221;, it will complain that APP\_BUNDLE\_PATH is not set. 

Note: Normally, this will be in a build directory within your project. However, I have my XCode build settings as shown below for the reason sometimes I forget to put the build folder on gitignore or svnignore (Sometimes my global git is a mess). Also, it becomes convenient for me to wipe out the whole directory after doing a &#8220;clean all&#8221;, makes me feel certain that I wiped it out myself. :) So, this is my personal preference only.

<img src="/images/2011/05/xcode-build-settings.png" alt="xcode-build-settings.png" border="0" width="400" height="215" />

So all the builds goes to this folder:  
<img src="/images/2011/05/app-bundle-path.png" alt="app-bundle-path.png" border="0" width="586" height="277" />

So, I append the APP\_BUNDLE\_PATH to my .bash_profile so I don&#8217;t have to do this everytime I run cucumber in terminal

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">  <span style="color: #000000;">35</span> <span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">vr</span>=<span style="color: #000000; font-weight: bold;">/</span>Volumes<span style="color: #000000; font-weight: bold;">/</span>rupert
  <span style="color: #000000;">36</span> <span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">vrp</span>=<span style="color: #000000; font-weight: bold;">/</span>Volumes<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects
  <span style="color: #000000;">37</span> <span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">vrpr</span>=<span style="color: #000000; font-weight: bold;">/</span>Volumes<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>rails3
  <span style="color: #000000;">38</span> <span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">vrpi</span>=<span style="color: #000000; font-weight: bold;">/</span>Volumes<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>projects<span style="color: #000000; font-weight: bold;">/</span>iphone
  <span style="color: #000000;">39</span> 
  <span style="color: #000000;">40</span> <span style="color: #666666; font-style: italic;">#For XCode Frank Testing</span>
  <span style="color: #000000;">41</span> <span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">APP_BUNDLE_PATH</span>=<span style="color: #000000; font-weight: bold;">/</span>Volumes<span style="color: #000000; font-weight: bold;">/</span>temp<span style="color: #000000; font-weight: bold;">/</span>iphone-builds<span style="color: #000000; font-weight: bold;">/</span>Debug-iphonesimulator<span style="color: #000000; font-weight: bold;">/</span></pre>
      </td>
    </tr>
  </table>
</div>

Another alternative is to define the APP\_BUNDLE\_PATH in env.rb

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#996600;">'frank-cucumber'</span>
<span style="color:#008000; font-style:italic;">#APP_BUNDLE_PATH = File.dirname(__FILE__) + "/../../build/Debug-iphonesimulator/EmployeeAdmin.app"</span>
APP_BUNDLE_PATH = <span style="color:#996600;">"/Volumes/temp/iphone-builds/Debug-iphonesimulator/Country-Frankified.app"</span></pre>
      </td>
    </tr>
  </table>
</div>

6. While the project-fankified.app is running on the iOS simulator, I then ran &#8220;cucumber&#8221;. However, *the app went to a background state.* If you double-click the iOS Simulator Home Button, you will get all the apps running in the background. After selecting the app, cucumber ran the tests, since it is trying to connect/ping to the frank HTTP server, and the device rotated as expected. However, this is now what I expected.

7. I expect to 

*   Build and Run the Frankified app.
*   Run cucumber and see my tests fail or pass. 

8. So I edited &#8220;launch\_steps.rb&#8221; as shown below by commenting lines 6-9. This will prevent &#8220;press\_home\_on\_simulator&#8221;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">   <span style="color:#006666;">1</span> Given <span style="color:#006600; font-weight:bold;">/</span>^I launch the app$<span style="color:#006600; font-weight:bold;">/</span> <span style="color:#9966CC; font-weight:bold;">do</span>
   <span style="color:#006666;">2</span> 
   <span style="color:#006666;">3</span>   <span style="color:#008000; font-style:italic;"># kill the app if it's already running, just in case this helps </span>
   <span style="color:#006666;">4</span>   <span style="color:#008000; font-style:italic;"># reduce simulator flakiness when relaunching the app. Use a timeout of 5 seconds to </span>
   <span style="color:#006666;">5</span>   <span style="color:#008000; font-style:italic;"># prevent us hanging around for ages waiting for the ping to fail if the app isn't running</span>
   <span style="color:#006666;">6</span>   <span style="color:#008000; font-style:italic;">#begin</span>
   <span style="color:#006666;">7</span>   <span style="color:#008000; font-style:italic;">#  Timeout::timeout(5) { press_home_on_simulator if frankly_ping }</span>
   <span style="color:#006666;">8</span>   <span style="color:#008000; font-style:italic;">#rescue Timeout::Error </span>
   <span style="color:#006666;">9</span>   <span style="color:#008000; font-style:italic;">#end</span>
  <span style="color:#006666;">10</span> 
  <span style="color:#006666;">11</span>   <span style="color:#CC0066; font-weight:bold;">require</span> <span style="color:#996600;">'sim_launcher'</span>
  <span style="color:#006666;">12</span> 
  <span style="color:#006666;">13</span>   app_path = ENV<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'APP_BUNDLE_PATH'</span><span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">||</span> APP_BUNDLE_PATH
  <span style="color:#006666;">14</span>   <span style="color:#CC0066; font-weight:bold;">raise</span> <span style="color:#996600;">"APP_BUNDLE_PATH was not set. <span style="color:#000099;">\n</span>Please set a APP_BUNDLE_PATH ruby constant or environment variable to the path of your compiled Frankified iOS app      bundle"</span> <span style="color:#9966CC; font-weight:bold;">if</span> app_path.<span style="color:#0000FF; font-weight:bold;">nil</span>?
  <span style="color:#006666;">15</span> 
  <span style="color:#006666;">16</span>   <span style="color:#9966CC; font-weight:bold;">if</span><span style="color:#006600; font-weight:bold;">&#40;</span> ENV<span style="color:#006600; font-weight:bold;">&#91;</span><span style="color:#996600;">'USE_SIM_LAUNCHER_SERVER'</span><span style="color:#006600; font-weight:bold;">&#93;</span> <span style="color:#006600; font-weight:bold;">&#41;</span>
  <span style="color:#006666;">17</span>     simulator = <span style="color:#6666ff; font-weight:bold;">SimLauncher::Client</span>.<span style="color:#9900CC;">for_iphone_app</span><span style="color:#006600; font-weight:bold;">&#40;</span> app_path, <span style="color:#996600;">"4.2"</span> <span style="color:#006600; font-weight:bold;">&#41;</span>
  <span style="color:#006666;">18</span>   <span style="color:#9966CC; font-weight:bold;">else</span>
  <span style="color:#006666;">19</span>     simulator = <span style="color:#6666ff; font-weight:bold;">SimLauncher::DirectClient</span>.<span style="color:#9900CC;">for_iphone_app</span><span style="color:#006600; font-weight:bold;">&#40;</span> app_path, <span style="color:#996600;">"4.2"</span> <span style="color:#006600; font-weight:bold;">&#41;</span>
  <span style="color:#006666;">20</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">21</span> 
  <span style="color:#006666;">22</span>   num_timeouts = <span style="color:#006666;"></span>
  <span style="color:#006666;">23</span>   <span style="color:#CC0066; font-weight:bold;">loop</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  <span style="color:#006666;">24</span>     <span style="color:#9966CC; font-weight:bold;">begin</span>
  <span style="color:#006666;">25</span>       simulator.<span style="color:#9900CC;">relaunch</span>
  <span style="color:#006666;">26</span>       wait_for_frank_to_come_up
  <span style="color:#006666;">27</span>       <span style="color:#9966CC; font-weight:bold;">break</span> <span style="color:#008000; font-style:italic;"># if we make it this far without an exception then we're good to move on</span>
  <span style="color:#006666;">28</span> 
  <span style="color:#006666;">29</span>     <span style="color:#9966CC; font-weight:bold;">rescue</span> <span style="color:#6666ff; font-weight:bold;">Timeout::Error</span>
  <span style="color:#006666;">30</span>       num_timeouts <span style="color:#006600; font-weight:bold;">+</span>= <span style="color:#006666;">1</span>
  <span style="color:#006666;">31</span>       <span style="color:#CC0066; font-weight:bold;">puts</span> <span style="color:#996600;">"Encountered #{num_timeouts} timeouts while launching the app."</span>
  <span style="color:#006666;">32</span>       <span style="color:#9966CC; font-weight:bold;">if</span> num_timeouts <span style="color:#006600; font-weight:bold;">&gt;</span> <span style="color:#006666;">3</span>
  <span style="color:#006666;">33</span>         <span style="color:#CC0066; font-weight:bold;">raise</span> <span style="color:#996600;">"Encountered #{num_timeouts} timeouts in a row while trying to launch the app."</span>
  <span style="color:#006666;">34</span>       <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">35</span>     <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">36</span>   <span style="color:#9966CC; font-weight:bold;">end</span>
  <span style="color:#006666;">37</span> 
  <span style="color:#006666;">38</span>   <span style="color:#008000; font-style:italic;"># TODO: do some kind of waiting check to see that your initial app UI is ready</span>
  <span style="color:#006666;">39</span>   <span style="color:#008000; font-style:italic;"># e.g. Then "I wait to see the login screen"</span>
  <span style="color:#006666;">40</span> 
  <span style="color:#006666;">41</span> <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

### Notes and Issues

**1. ld: duplicate symbol \_OBJC\_METACLASS\_$\_SBJsonParser**  
Frank comes with &#8220;json&#8221;, &#8220;uispec&#8221;, &#8220;cocoahttpserver&#8221;. Since my project also has json dependency, I just removed the json folder from frank/lib under &#8220;Group &#038; Files&#8221;. Note: Only delete the references and don&#8217;t move to trash.  
<img src="/images/2011/05/duplicate-json.png" alt="duplicate-json.png" border="0" width="150" height="271" />

**2. I get &#8220;Terminating app due to uncaught exception &#8216;NSInvalidArgumentException&#8217;, reason: &#8216;-[UIImageView panoramaID]&#8220;**  
My project has MapKit as a dependency. I added this to main.m. See <https://github.com/moredip/Frank/blob/d8a76223cad7df8143d8b6d3524c12494a65d069/main.m.sample>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="obj-c" style="font-family:monospace;">#ifdef FRANK
//UNCOMMENT THIS SECTION IF YOU'RE USING MapKit AND YOU ARE SEEING CRASHES IN iOS4
//Work around the issue in iOS 4 where exceptions thrown within a NSInvocation are not catchable. This was causing crashes in UIQuery::describeView when trying to dump the DOM w. Symbiote see http://groups.google.com/group/uispec/browse_thread/thread/1879741ebae978d/a90001a8956290af
@implementation NSObject (MapKitUISpecHack) 
- (id)_mapkit_hasPanoramaID { 
	return nil; 
} 
@end
#endif</pre>
      </td>
    </tr>
  </table>
</div>

**3. Query a custom graphic &#8216;Home&#8217; ToolbarButton**  
<img src="/images/2011/05/toolbar.png" alt="toolbar.png" border="0" width="322" height="91" />  
In IB, you cannot specify an accessibilityLabel for a UIBarButtonItem inside a UIToolbar. So, to query this using  


<pre>toolbarButton accessibilityLabel:'Home'
</pre>

We need to specify this using code explicitly in viewDidLoad.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="obj-c" style="font-family:monospace;">- (void)viewDidLoad {
	...
&nbsp;
	#ifdef FRANK
	barButtonHome.accessibilityLabel = @"Home";
	barButtonSearch.accessibilityLabel = @"Search";
	barButtonMoreResults.accessibilityLabel = @"More";
	barButtonPageCurl.accessibilityLabel = @"Map Settings";
	#endif
&nbsp;
	...
}</pre>
      </td>
    </tr>
  </table>
</div>

For the search button, the second one from the left and has a magnifying glass icon, it can be queried directly without specifying any code.

<pre>toolbarButton accessibilityLabel:'Search'
</pre>

 [1]: http://bit.ly/fyUfJE