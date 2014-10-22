---
title: 'Rails Note #11: TDD and Loading Development Fixtures for Testing'
author: rupert
layout: post
permalink: /2008/11/ruby-on-rails-tdd-and-loading-development-fixtures-for-testing/
aktt_tweeted:
  - 1
categories:
  - rails
tags:
  - rails
  - tdd
  - testing
---
Here is a brief outline on how I am doing test driven development *personally*.

1. Code up tests/functional/foo\_controller\_test.rb until you know what you expect from the method. Make the test method as self explanatory as much as possible.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">def</span> test_goto_restaurant_next
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Imagine how the URL parameters will be passed to the controller.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">get <span style="color:#ff3333; font-weight:bold;">:goto</span>, <span style="color:#996600;">'WHOISD-ABONENT'</span><span style="color:#006600; font-weight:bold;">=&gt;</span> MOBILE_NUMBER, <span style="color:#ff3333; font-weight:bold;">:categ_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'123'</span>, <span style="color:#ff3333; font-weight:bold;">:node_id</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'10'</span>, <span style="color:#ff3333; font-weight:bold;">:page</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">'2'</span></pre>
      </td>
    </tr>
  </table>
</div>

3. At this point. It gets too exciting to code up the controller itself. Hold on, try to make an assertion on a variable that we will use in the view.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">assert_equal assigns<span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">"sub_menus"</span><span style="color:#006600; font-weight:bold;">&#41;</span>.<span style="color:#9900CC;">length</span>, <span style="color:#006666;">2</span></pre>
      </td>
    </tr>
  </table>
</div>

4. Code the controller

5. Code the view

6. Test from the browser.

7. Refactor the testcase and make more assertions.

8. Run the testcase

Now, it could be very hard to execute the tests if you don&#8217;t have the same **development data** inside your *testing* database. I found a good tip from the Rail&#8217;s Way book, and used ar_fixtures.

<cite>For whatever reason, dumping data to fixtures is not a part of core Rails. Considering that Rails gives you a to_yaml method on ActiveRecord models and Hash objects, it wouldn’t be too hard to write your own Rake task. However, it’s not necessary to do so because of a well-proven plugin written by Geoff Grosenbach. It’s called ar_fixtures and you can install it with the following command:<br /> </cite>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">$ script<span style="color:#006600; font-weight:bold;">/</span>plugin install http:<span style="color:#006600; font-weight:bold;">//</span>topfunky.<span style="color:#9900CC;">net</span><span style="color:#006600; font-weight:bold;">/</span>svn<span style="color:#006600; font-weight:bold;">/</span>plugins<span style="color:#006600; font-weight:bold;">/</span>ar_fixtures</pre>
      </td>
    </tr>
  </table>
</div>

<cite>Once the plugin is installed, dumping a fixture is a simple matter of invoking a new rake task called rake db:fixtures:dump. Unlike the built-in loading rake task, this one takes a MODEL parameter with the name of the ActiveRecord class that you want to dump data for:</cite>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">$ rake db:fixtures:dump MODEL=BillingCode</pre>
      </td>
    </tr>
  </table>
</div>