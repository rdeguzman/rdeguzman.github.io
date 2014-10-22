---
title: 'iPhone Note #7: TableView as Single Selections'
author: Rupert
layout: post
permalink: /2009/08/iphone-note-6-tableview-as-single-selections/
delicious:
  - 's:78:"a:3:{s:5:"count";s:1:"0";s:9:"post_tags";s:0:"";s:4:"time";s:10:"1250393375";}";'
reddit:
  - 's:55:"a:2:{s:5:"count";s:1:"0";s:4:"time";s:10:"1250393375";}";'
categories:
  - iphone
tags:
  - iphone
---
Today, I came up with a generic UITableViewController that allows single selections.

### Part 1: Creating the view controller..

1. File -> New File -> UIViewController subclass. Check the checkbox UITableViewController subclass.

CheckListTableViewController will be referred to as the controller from here on..

2. The controller will accept:

a. NSArray *array &#8211; which holds the items.  
b. NSString *title &#8211; title of the selection.

<!--more-->

3. I also added a protocol declaration for the controller when the user presses &#8220;Done&#8221; on the right portion of the Navbar.

*CheckListTableViewController.h*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import</span>
&nbsp;
<span style="color: #a61390;">@protocol</span> CheckListTableViewControllerDelegate;
&nbsp;
<span style="color: #a61390;">@interface</span> CheckListTableViewController <span style="color: #002200;">:</span> UITableViewController <span style="color: #002200;">&#123;</span>
	<span style="color: #11740a; font-style: italic;">//NSString *title;</span>
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>chosenString;
	<span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>array;
	<span style="color: #a61390;">id</span> delegate;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #11740a; font-style: italic;">//@property(nonatomic, copy) NSString *title;</span>
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> <span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>array;
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>assign<span style="color: #002200;">&#41;</span> <span style="color: #a61390;">id</span> delegate;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>initWithStyle<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UITableViewStyle<span style="color: #002200;">&#41;</span>style withTitle<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>t withArray<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>a;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>doneButtonPressed;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>initButton;
&nbsp;
<span style="color: #a61390;">@end</span>
&nbsp;
<span style="color: #a61390;">@protocol</span> CheckListTableViewControllerDelegate
&nbsp;
@optional
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>checkListTableViewController<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>CheckListTableViewController <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>controller didChooseString<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>chosenString;
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

4. In the cellForRowAtIndexPath, we display the checkmark if the cell&#8217;s current String is the same as the chosen String. The chosenString is an ivar which gets assigned during didSelectRowAtIndexPath. Notice that the assignment is performed AFTER the condition of comparing the strings.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>UITableViewCell <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>tableView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UITableView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>tableView cellForRowAtIndexPath<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSIndexPath</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>indexPath <span style="color: #002200;">&#123;</span>
&nbsp;
    <span style="color: #a61390;">static</span> <span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>CellIdentifier <span style="color: #002200;">=</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Cell"</span>;
&nbsp;
    UITableViewCell <span style="color: #002200;">*</span>cell <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>tableView dequeueReusableCellWithIdentifier<span style="color: #002200;">:</span>CellIdentifier<span style="color: #002200;">&#93;</span>;
    <span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span>cell <span style="color: #002200;">==</span> <span style="color: #a61390;">nil</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
        cell <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UITableViewCell alloc<span style="color: #002200;">&#93;</span> initWithStyle<span style="color: #002200;">:</span>UITableViewCellStyleDefault reuseIdentifier<span style="color: #002200;">:</span>CellIdentifier<span style="color: #002200;">&#93;</span> autorelease<span style="color: #002200;">&#93;</span>;
    <span style="color: #002200;">&#125;</span>
&nbsp;
    <span style="color: #11740a; font-style: italic;">// Set up the cell...</span>
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>currentString <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#91;</span>array objectAtIndex<span style="color: #002200;">:</span>indexPath.row<span style="color: #002200;">&#93;</span>;
	cell.textLabel.text <span style="color: #002200;">=</span> currentString;
	cell.textLabel.adjustsFontSizeToFitWidth <span style="color: #002200;">=</span> <span style="color: #a61390;">YES</span>;
&nbsp;
	<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span><span style="color: #002200;">&#91;</span>currentString localizedCaseInsensitiveCompare<span style="color: #002200;">:</span>chosenString<span style="color: #002200;">&#93;</span> <span style="color: #002200;">==</span> NSOrderedSame <span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		<span style="color: #002200;">&#91;</span>cell setAccessoryType<span style="color: #002200;">:</span>UITableViewCellAccessoryCheckmark<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#125;</span>
	<span style="color: #a61390;">else</span><span style="color: #002200;">&#123;</span>
		<span style="color: #002200;">&#91;</span>cell setAccessoryType<span style="color: #002200;">:</span>UITableViewCellAccessoryNone<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#125;</span>
&nbsp;
&nbsp;
    <span style="color: #a61390;">return</span> cell;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>tableView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UITableView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>tableView didSelectRowAtIndexPath<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSIndexPath</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>indexPath <span style="color: #002200;">&#123;</span>
    <span style="color: #11740a; font-style: italic;">// Navigation logic may go here. Create and push another view controller.</span>
	<span style="color: #11740a; font-style: italic;">// AnotherViewController *anotherViewController = [[AnotherViewController alloc] initWithNibName:@"AnotherView" bundle:nil];</span>
	<span style="color: #11740a; font-style: italic;">// [self.navigationController pushViewController:anotherViewController];</span>
	<span style="color: #11740a; font-style: italic;">// [anotherViewController release];</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"User seleced row %d"</span>, indexPath.row<span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>currentString <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#91;</span>array objectAtIndex<span style="color: #002200;">:</span>indexPath.row<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span><span style="color: #002200;">&#91;</span>currentString localizedCaseInsensitiveCompare<span style="color: #002200;">:</span>chosenString<span style="color: #002200;">&#93;</span> <span style="color: #002200;">==</span> NSOrderedSame <span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		<span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>tableView cellForRowAtIndexPath<span style="color: #002200;">:</span>indexPath<span style="color: #002200;">&#93;</span> setAccessoryType<span style="color: #002200;">:</span>UITableViewCellAccessoryCheckmark<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#125;</span>
	<span style="color: #a61390;">else</span><span style="color: #002200;">&#123;</span>
		<span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>tableView cellForRowAtIndexPath<span style="color: #002200;">:</span>indexPath<span style="color: #002200;">&#93;</span> setAccessoryType<span style="color: #002200;">:</span>UITableViewCellAccessoryNone<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#125;</span>
&nbsp;
	chosenString <span style="color: #002200;">=</span> currentString;
&nbsp;
	<span style="color: #002200;">&#91;</span>tableView reloadData<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

Part 2: Calling the controller from a client.

1. Make the client conform to the CheckListTableViewControllerDelegate.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import</span>
....
<span style="color: #6e371a;">#import "DatePickerViewController.h"</span>
<span style="color: #6e371a;">#import "CheckListTableViewController.h"</span>
&nbsp;
<span style="color: #a61390;">@interface</span> JobProfileViewController <span style="color: #002200;">:</span> UIViewController <span style="color: #002200;">&#123;</span></pre>
      </td>
    </tr>
  </table>
</div>

2. You can even reuse the controller for different lists, say we have two lists:&#8221;Purpose&#8221; and &#8220;Location&#8221;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>showPurposePicker<span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"purpose button clicked"</span><span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>array <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSArray</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Design"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Testing"</span>, <span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>title <span style="color: #002200;">=</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Purpose"</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>self displayModalPickerForTitle<span style="color: #002200;">:</span>title withArray<span style="color: #002200;">:</span>array<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>showLocationOfWorkplace<span style="color: #002200;">&#123;</span>
	<span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>array <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSArray</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Both"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Private"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Public"</span>, <span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>title <span style="color: #002200;">=</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Location"</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>self displayModalPickerForTitle<span style="color: #002200;">:</span>title withArray<span style="color: #002200;">:</span>array<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

3. The controller is added to a Navigation Controller which is presented modally. Courtesy of the help of Erica Sadun from IRC.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>displayModalPickerForTitle<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>title withArray<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>array<span style="color: #002200;">&#123;</span>
&nbsp;
	CheckListTableViewController <span style="color: #002200;">*</span>listController <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>CheckListTableViewController alloc<span style="color: #002200;">&#93;</span> initWithStyle<span style="color: #002200;">:</span>UITableViewStylePlain withTitle<span style="color: #002200;">:</span>title withArray<span style="color: #002200;">:</span>array<span style="color: #002200;">&#93;</span>;
	listController.delegate <span style="color: #002200;">=</span> self;
&nbsp;
	UINavigationController <span style="color: #002200;">*</span>nav <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UINavigationController alloc<span style="color: #002200;">&#93;</span> initWithRootViewController<span style="color: #002200;">:</span>listController<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>self presentModalViewController<span style="color: #002200;">:</span>nav animated<span style="color: #002200;">:</span><span style="color: #a61390;">YES</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>listController release<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>nav release<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

4. When the user is finished with the control, the client performs its necessary processes and dismisses the modal view.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>checkListTableViewController<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>CheckListTableViewController <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>controller didChooseString<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>chosenString<span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Chosen String: %@"</span>, chosenString<span style="color: #002200;">&#41;</span>;
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Title: %@"</span>, controller.title<span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span> controller.title <span style="color: #002200;">==</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Purpose"</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		job.purpose <span style="color: #002200;">=</span> chosenString;
		<span style="color: #002200;">&#91;</span>purpose setTitle<span style="color: #002200;">:</span>job.purpose forState<span style="color: #002200;">:</span>UIControlStateNormal<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#125;</span>
	<span style="color: #a61390;">else</span> <span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span> controller.title <span style="color: #002200;">==</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Principal Excavation Activity"</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		job.principalExcavationActivity <span style="color: #002200;">=</span> chosenString;
		<span style="color: #002200;">&#91;</span>principalExcavationActivity setTitle<span style="color: #002200;">:</span>job.principalExcavationActivity forState<span style="color: #002200;">:</span>UIControlStateNormal<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#125;</span>
	<span style="color: #a61390;">else</span> <span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span> controller.title <span style="color: #002200;">==</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Location Of Workplace"</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		job.locationOfWorkplace <span style="color: #002200;">=</span> chosenString;
		<span style="color: #002200;">&#91;</span>locationOfWorkplace setTitle<span style="color: #002200;">:</span>job.locationOfWorkplace forState<span style="color: #002200;">:</span>UIControlStateNormal<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#125;</span>
&nbsp;
	<span style="color: #002200;">&#91;</span>self dismissModalViewControllerAnimated<span style="color: #002200;">:</span><span style="color: #a61390;">YES</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>