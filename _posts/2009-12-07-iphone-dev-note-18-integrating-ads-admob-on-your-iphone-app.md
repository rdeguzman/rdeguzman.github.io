---
title: 'iPhone Note #18: Integrating Ads (AdMob) on your iPhone App'
author: rupert
layout: post
permalink: /2009/12/iphone-dev-note-18-integrating-ads-admob-on-your-iphone-app/
categories:
  - iphone
tags:
  - iphone
---
## Basic Info

**What is common with these ad platforms?**  
Each application is offered a unique id which needs to be specified during development.

**What is publishing?**  
Publishing allows the developer to display (*publish*) ads on the native application.

**What is CPM?**  
Impressions per thousand. Normally ad networks pays $1 for every 1000 CPM. So you need 1000 page views (not clicks) to earn a buck.

**What is the fillrate?**  
The percentage of impressions served based on total requests for ads. This is number to look for when you get blank ads. How many of my clients gets an ad impression? I had 60%

**What is the Click Through Rate (CTR)?**  
Out of 60% of my clients who had ad impressions, 6.18% of them clicked the ad. The more they get clicked, the higher your revenue.

## [Admob][1]

Offers both publishing and analytics. Currently offers both iPhone and Android. Able to publish ads for native app and mobile websites. This is my preferred ad network of choice as it is easier to setup than the others. And just recently, it was swallowed by Google, whether that is good or bad for us, we have yet to know.

[AdMob Iphone SDK Integration][2]

1. After signing up/registering to Admob you need to add your application in &#8220;Sites &#038; Apps&#8221; tab (2nd tab from the left).

2. Click on &#8220;Add Site/App&#8221; and you would be presented with what kind of site or app type (Mobile Web, Iphone App, Iphone Web and Android App). Select &#8220;Iphone App&#8221; and fill out the details..

3. If you go to &#8220;Sites &#038; Apps&#8221;, there&#8217;s a link &#8220;Setup&#8221; just under the Quick Links. You could download a sample AdMob application there wherein your publisherId is already built-in. Here&#8217;s a sample ([admob\_iphone\_sdk_20091119.tar.gz][3]). Note that AdMob upgrade their code, notice the dates (20091119)? So it&#8217;s good practice to read the CHANGELOG.

4. Note your publisherId.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#pragma mark Admob delegate methods</span>
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>publisherId <span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"a14ac98028663b0"</span>; <span style="color: #11740a; font-style: italic;">// bayanihan</span>
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

5. Make the sample application from AdMob run first before integrating your app.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #11740a; font-style: italic;">// To receive test ads rather than real ads...</span>
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">BOOL</span><span style="color: #002200;">&#41;</span>useTestAd <span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> <span style="color: #a61390;">YES</span>; <span style="color: #11740a; font-style: italic;">//change this to NO later..</span>
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

6. Normally, the problems/quirks I experience when integrating a 3rd Party Project are framework references. So, here&#8217;s mine:

<img src="/images/2009/12/admob_frameworks.png" alt="admob_frameworks.png" border="0" width="221" height="172" />

Note: As of ver 20091119, I added *MessageUI.framework, AudioToolbox.framework, MediaPlayer.framework*. Prior to that build (200906xx), I don&#8217;t have those. If you are compiling against iPhoneOS version 3, then you would need to reference *libAdMObDevice3_0.a* and *libAdMobSimulator3_0.a* (to run it in the simulator&#8211;but you would take this reference off when making an actual build)

<img src="/images/2009/12/admob-iphoneos3.png" alt="admob-iphoneos3.png" border="0" width="204" height="85" />

7. Now, that both the testAd (YES) is working, it might take you a few hours before the real ad comes in. Be patient. :)

8. Integrate to your project. AdMob provided detailed examples on how to integrate depending on your needs&#8211;Interface Builder (IB), Programmatically or TableView. Personally, I have used both IB and TableView and it works flawlessly.

9. I dont get an ad? I get an Ad? Which one? Check out the AdMobDelegate Methods.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>didReceiveAd<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>AdMobView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>adView <span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"AdMob: Did receive ad"</span><span style="color: #002200;">&#41;</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>didFailToReceiveAd<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>AdMobView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>adView <span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"AdMob: Did fail to receive ad"</span><span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #11740a; font-style: italic;">//[self createMobclix];</span>
	<span style="color: #11740a; font-style: italic;">//[bannerCell setNeedsLayout];</span>
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

10. Now once you have AdMob going, you want to be more efficient and get higher fill rates. You can checkout other Ad Platforms ([Mobclix][4], [Adwhirl][5]). Notice on step 9 above, that if I don&#8217;t get an ad from AdMob, I fire up an add from MobClix.

 [1]: http://www.admob.com
 [2]: http://developer.admob.com/wiki/IPhone#SDK_Integration_instructions
 [3]: /images/2009/12/admob_iphone_sdk_20091119.tar.gz "admob_iphone_sdk_20091119.tar.gz"
 [4]: https://developer.mobclix.com/
 [5]: www.adwhirl.com