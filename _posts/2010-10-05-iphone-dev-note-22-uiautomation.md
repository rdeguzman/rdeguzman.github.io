---
title: 'iPhone Dev Note #22: UIAutomation'
author: rupert
layout: post
permalink: /2010/10/iphone-dev-note-22-uiautomation/
categories:
  - iphone
tags:
  - iphone
  - tdd
  - testing
---
One of the problems with UIAutomation is the lack of documentation. At the time of writing this, the current documentation/reference that I use is found here ( <http://developer.apple.com/library/ios/#documentation/DeveloperTools/Reference/UIAutomationRef/_index.html> )

1. Works on the device but not on the simulator?

Copy com.apple.Accessibility.plist from 4.0 to 4.0.1

<img src="/images/2010/10/simulator.png" alt="simulator.png" border="0" width="459" height="431" />

2. I can&#8217;t get the mainWindow().buttons(). Why?

Related code shown below have a navigation view added as a subview to window. Don&#8217;t confuse yourself that you need to get a subview from mainWindow() like mainWindow().elements[0]? It will not work. There&#8217;s nothing wrong with your code, however, open up your xib or Interface Builder, in my case, I will open MenuController.xib.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>applicationDidFinishLaunching<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UIApplication <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>application <span style="color: #002200;">&#123;</span>
	<span style="color: #002200;">&#91;</span>self createEditableCopyOfDatabaseIfNeeded<span style="color: #002200;">&#93;</span>;
&nbsp;
	MenuController <span style="color: #002200;">*</span>mainMenuController <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>MenuController alloc<span style="color: #002200;">&#93;</span> initWithNibName<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"MenuController"</span> bundle<span style="color: #002200;">:</span><span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
	navigationController <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UINavigationController alloc<span style="color: #002200;">&#93;</span> initWithRootViewController<span style="color: #002200;">:</span>mainMenuController<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>window addSubview<span style="color: #002200;">:</span> <span style="color: #002200;">&#91;</span>navigationController view<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>mainMenuController release<span style="color: #002200;">&#93;</span>;
&nbsp;
    <span style="color: #11740a; font-style: italic;">// Override point for customization after application launch</span>
    <span style="color: #002200;">&#91;</span>window makeKeyAndVisible<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2010/10/test-1.gif" alt="test-1.gif" border="0" width="558" height="641" />

For some reason, when the &#8220;Accessibility&#8221; is enabled on the view, it doesn&#8217;t work. I am not exactly sure why, but UIAutomation only recognizes the window and not its sub-elements. Unticking this checkbox, allows us to get all the elements under mainWindow(). This has been a bugger and I spent 4 hours figuring this.

<img src="/images/2010/10/test-2.gif" alt="test-2.gif" border="0" width="558" height="637" />

After you finished updating your elements in Interface Builder, make sure you build and deploy the app in the simulator. This will recreate/replace the binary and remember that it is the target app of Instruments. Afterwards, launch the test script and see if it works now. 

3. How was I able to see the element heirarchy?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">...mainWindow<span style="color: #002200;">&#40;</span><span style="color: #002200;">&#41;</span>.logElementTree<span style="color: #002200;">&#40;</span><span style="color: #002200;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

As always don&#8217;t keep banging your head that there&#8217;s something wrong with your view heirarchy. I suggest you read thoroughly the reference posted above to understand what is available for mainWindow().

4. Instrument tips  
&#8211; Command + R will stop or record the test.  
&#8211; Your app is not listed in the &#8220;Choose target&#8221;? Well you could navigate to the /Users/rupert/Library/Application Support/iPhone Simulator/4.0.1/Applications/94EC26E5-D76B-4003-9675-8F0DDE111D01/beforeUdig.app/ (which sucks) OR from XCode > Run > Run With Perfomance Tool > Leaks. Once Leaks opens, it automatically chooses your current app as the target. Close leaks and go back to Instruments. From here, you will see your app listed in the target.