---
title: iPhone Interface Elements
author: rupert
layout: post
permalink: /2009/05/iphone-interface-elements/
aktt_notify_twitter:
  - no
categories:
  - iphone
tags:
  - iphone
---
My notes from the [iPhone Human Interface Guidelines.][1]

<!--more-->

**Toolbars**

<img src="/images/2009/05/62edfd6d-585d-4efc-a501-b936104236fd.jpg" alt="62EDFD6D-585D-4EFC-A501-B936104236FD.jpg" border="0" width="320" height="44" />

*   actions users can take in the current context
*   provides functionality within the context of a task
*   hit-region of a user interface element is recommended to be 44 x 44 pixels

**Tab Bars**

<img src="/images/2009/05/9507ca52-75cc-4103-82c3-8119042cb714.jpg" alt="9507CA52-75CC-4103-82C3-8119042CB714.jpg" border="0" width="320" height="49" />

*   A tab bar gives users the ability to switch among different modes or views in an application, and users should be able to access these modes from everywhere in the application
*   Displays 5 or fewer tabs. More Tab is display on 6+
*   When an application has more than five tabs, users can select their favorite tabs to display in the tab bar

**Alerts**

<img src="/images/2009/05/picture-1.png" alt="Picture 1.png" border="0" width="93" height="140" />

*   Alerts give users important information that affects their use of the application (or the device). Alerts are usually unexpected, because they generally tell users about a problem or a change in the current situation that might require users to take action.
*   An alert that contains three or more buttons is significantly more complex than a two-button alert, and should be avoided if possible. In fact, if you find that you need to offer users more than two choices, you should consider using an action sheet instead

**Action Sheets**

<img src="/images/2009/05/picture-3.png" alt="Picture 3.png" border="0" width="87" height="136" />

*   Displays a collection of alternatives that are associated with a task users initiate by tapping a button in an application’s toolbar
*   Get confirmation before completing a potentially dangerous task.
*   If you need to provide a button that performs a potentially destructive action, such as deleting all the items in a user’s shopping list, you should use the red button color.

**Modal Views**

<img src="/images/2009/05/picture-2.png" alt="Picture 2.png" border="0" width="93" height="140" />

*   A modal view slides up from the bottom edge of the screen and always covers the entire application screen
*   A good example of a modal view is the compose view in Mail. When users tap the Compose button, a modal view appears that contains text areas for the addresses and message, a keyboard for input, a Cancel, and a Send button.
*   In a modal view, you can use whichever controls are required to accomplish the task. For example, you can include text fields, buttons, and table views.

**Table Views**

<img src="/images/2009/05/picture-4.png" alt="Picture 4.png" border="0" width="446" height="222" />

*   Left &#8211; Simple List in a Regular Style Table View
*   Left &#8211; The disclosure indicator element is necessary if you’re using the table to present hierarchical information. This is because users know that this element means “show the next page of information.” It should appear to the right of every list item that contains a sublist of items.
*   Middle &#8211; Indexed list in a Regular Style Table View
*   If you want to display a list of items divided into sections, you can configure a regular table view to display section headers, with each header describing a section and providing visual distinction from the other sections.
*   Right &#8211; Grouped List in a Grouped Style Table View

**Text Views**

*   A region that displays multiple lines of text.
*   Inherits from a scroll view, which means that the text view supports scrolling when the content is too large to fit inside its bounds.
*   Support user editing. If you make a text view editable, a keyboard appears when the user taps inside the text view.

**Web Views**

*   Region that can display rich, HTML content in your application screen.

**Activity Indicator**

<img src="/images/2009/05/picture-5.png" alt="Picture 5.png" border="0" width="332" height="68" />

*   The “spinning gear” appearance of the activity indicator shows users that processing is occurring, but does not suggest when it will finish.
*   By default, an activity indicator is white.

**Normal Picker**

<img src="/images/2009/05/picture-8.png" alt="Picture 8.png" border="0" width="101" height="151" />

*   Display any set of values
*   Values in a wheel are hidden from the user when the wheel is stationary

**Date and Time Pickers**

<img src="/images/2009/05/picture-6.png" alt="Picture 6.png" border="0" width="101" height="147" />

*   Can have up to four independent spinning wheels

**Info Buttons**

<img src="/images/2009/05/picture-7.png" alt="Picture 7.png" border="0" width="325" height="106" />

*   Provides a way to reveal configuration details about an application, often on the back side of the screen.
*   Suited to utility applications

**Page Indicators**

*   Displays a dot for each currently open view in an application (See weather app image above)

**Progress Views**

<img src="/images/2009/05/picture-9.png" alt="Picture 9.png" border="0" width="324" height="107" />

*   Shows the progress of a task or process that has a known duration

**Search Bars**

<img src="/images/2009/05/picture-10.png" alt="Picture 10.png" border="0" width="322" height="127" />

*   When the user taps a search bar, a keyboard appears; when the user is finished typing search terms, the input is handled in an application-specific way.
*   Placeholder text.
*   The Bookmarks button.
*   The Clear button.
*   A descriptive title

**Segmented Controls**

<img src="/images/2009/05/picture-11.png" alt="Picture 11.png" border="0" width="217" height="173" />

*   A linear set of segments, each of which functions as a button that can display a different view

**Sliders**

<img src="/images/2009/05/picture-12.png" alt="Picture 12.png" border="0" width="365" height="177" />

*   Allow users to have fine-grained control over the values they choose

**Switch Controls**

*   See auto brightness switch control image above
*   Presents to the user two mutually exclusive choices or states, such as yes/no or on/off.

**Text Field**

<img src="/images/2009/05/picture-13.png" alt="Picture 13.png" border="0" width="218" height="114" />

*   When the user taps a text field a keyboard appears; when the user taps Return in the keyboard, the text field handles the input in an application-specific way.

**[System Generated Controls][2]**

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarAction.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarCamera.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarCompose.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarBookmarks.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarSearch.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarNew.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarTrash.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarOrganize.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarReply.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarStop.jpg" border="0" width="30" height="25" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIButtonBarRefresh.jpg" border="0" width="30" height="25" align="left" />



<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIBarSystemItemEdit.jpg" border="0" width="44" height="30" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIBarSystemItemCancel.jpg" border="0" width="61" height="30" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIBarSystemItemSave.jpg" border="0" width="51" height="30" align="left" />

<img src="http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/art/UIBarSystemItemDone.jpg" border="0" width="51" height="30" align="left" />



*   Comes in bordered or plain style
*   For a complete list, go to [Apple&#8217;s Documentation on System Generated Controls][2]

**Launch Images**

<img src="/images/2009/05/picture-15.png" alt="Picture 15.png" border="0" width="354" height="243" />

*   Measures 320 x 480 pixels.
*   Name your launch image file Default.png and place it at the top level of your application bundle. 

**Application Icon**

*   Measures 57 x 57 pixels.
*   Does not have any shine or gloss.
*   Name your icon file Icon.png and place it at the top level of your application bundle.

**Custom Icons**

*   For toolbar and navigation bar icons, create an icon that measures about 20 x 20 pixels.
*   For tab bar icons, create an icon that measures about 30 x 30 pixels.
*   Use the PNG format.
*   Use white with appropriate alpha and no shadow.
*   Use anti-aliasing.

 [1]: http://developer.apple.com/iphone/library/documentation/UserExperience/Conceptual/MobileHIG/MobileHIG.pdf
 [2]: http://developer.apple.com/iPhone/library/documentation/UserExperience/Conceptual/MobileHIG/SystemProvided/SystemProvided.html#//apple_ref/doc/uid/TP40006556-CH15-SW14