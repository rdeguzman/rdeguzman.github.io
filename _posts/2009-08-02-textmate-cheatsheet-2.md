---
title: TextMate CheatSheet (Updated)
author: rupert
layout: post
permalink: /2009/08/textmate-cheatsheet-2/
categories:
  - osx
  - rails
  - ruby
tags:
  - osx
  - rails
  - textmate
---
**Shortcuts**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="textmate" style="font-family:monospace;">Ruby:
---------------------------------
:key =&gt; "value" - : + tab
&nbsp;
Navigate:
---------------------------------
go to file - cmd - t
tab to file (left|right) - opt + cmd + (left arrow|right arrow)
select bundle item - ctrl + cmd + t
navigate (from controller to view) - opt + cmd + down arrow
show methods - shift + cmd + t
&nbsp;
Views:
---------------------------------
create partial - ctrl + shift + H
render partial (object|collection|locals) - r + p + (o|c|l)
inserting an erb tag &lt;%=  %&gt; or &lt;% %&gt; - ctrl + shift + . (cycle)
code completion, &lt;h3&gt;foo&lt;/h3&gt; - opt + cmd + .
&nbsp;
2RMobile Snippets:
---------------------------------
&lt;% objects.each do |object| %&gt;		2rmloope
	&lt;%= object. %&gt;
&lt;% end %&gt;</pre>
      </td>
    </tr>
  </table>
</div>

*** [Make the project drawer appear on the left or right.][1]  
**

From the menubar select View, then Hide Project Drawer.

Move your TextMate editor window over to the left side of the screen so the project gutter won&#8217;t have enough room to open up on that side. (You can move the window all the way to the left if you want, but you don&#8217;t need to go that far.)

Select View, then Show Project Drawer, and the drawer will now open on the right side of your TextMate editor.

*** Plugins directory is located at**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000;">1</span>. <span style="color: #000000; font-weight: bold;">/</span>Applications<span style="color: #000000; font-weight: bold;">/</span>TextMate.app<span style="color: #000000; font-weight: bold;">/</span>Contents<span style="color: #000000; font-weight: bold;">/</span>PlugIns<span style="color: #000000; font-weight: bold;">/</span>
<span style="color: #000000;">2</span>. <span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>Application Support<span style="color: #000000; font-weight: bold;">/</span></pre>
      </td>
    </tr>
  </table>
</div>

<http://manual.macromates.com/en/bundles#support_folder>

*** Installing a bundle.**  
RubyOnRails Bundle: <https://github.com/drnic/ruby-on-rails-tmbundle>  
RSpec Bundle: <https://github.com/rspec/rspec-tmbundle>  
Cucumber Bundle: <https://github.com/aslakhellesoy/cucumber-tmbundle>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #660033;">-p</span> ~<span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>Application\ Support<span style="color: #000000; font-weight: bold;">/</span>TextMate<span style="color: #000000; font-weight: bold;">/</span>Bundles
<span style="color: #7a0874; font-weight: bold;">cd</span> ~<span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>Application\ Support<span style="color: #000000; font-weight: bold;">/</span>TextMate<span style="color: #000000; font-weight: bold;">/</span>Bundles
<span style="color: #c20cb9; font-weight: bold;">git clone</span> git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>drnic<span style="color: #000000; font-weight: bold;">/</span>ruby-on-rails-tmbundle.git <span style="color: #ff0000;">"Ruby on Rails.tmbundle"</span></pre>
      </td>
    </tr>
  </table>
</div>

Launch TextMate > Bundles > Bundle Editor > &#8220;Reload Bundles&#8221;

**\* Identify \*.html.erb to open in HTML(Rails)**  
Read [http://blog.macromates.com/2007/file-type-detection-rspec-rails/][2]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:blog rupert$ defaults <span style="color: #c20cb9; font-weight: bold;">read</span> com.macromates.textmate OakLanguageFileBindings
<span style="color: #7a0874; font-weight: bold;">&#40;</span>
        <span style="color: #7a0874; font-weight: bold;">&#123;</span>
        fileTypes =         <span style="color: #7a0874; font-weight: bold;">&#40;</span>
            txt
        <span style="color: #7a0874; font-weight: bold;">&#41;</span>;
        language = <span style="color: #ff0000;">"17994EC8-6B1D-11D9-AC3A-000D93589AF6"</span>;
        name = HTML;
    <span style="color: #7a0874; font-weight: bold;">&#125;</span>,
        <span style="color: #7a0874; font-weight: bold;">&#123;</span>
        fileTypes =         <span style="color: #7a0874; font-weight: bold;">&#40;</span>
            builder,
            rb,
            erb
        <span style="color: #7a0874; font-weight: bold;">&#41;</span>;
        language = <span style="color: #ff0000;">"54D6E91E-8F31-11D9-90C5-0011242E4184"</span>;
        name = <span style="color: #ff0000;">"Ruby on Rails"</span>;
    <span style="color: #7a0874; font-weight: bold;">&#125;</span>
<span style="color: #7a0874; font-weight: bold;">&#41;</span>
rupert:blog rupert$ defaults delete com.macromates.textmate OakLanguageFileBindings</pre>
      </td>
    </tr>
  </table>
</div>

*** Identify Gemfiles in TextMate for Ruby on Rails**  
Read <http://efreedom.com/Question/1-3174451/Bundler-Gemfile-Syntax-Highlight-Text-Mate>

Include the &#8216;Gemfile&#8217; as a filetype

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">fileTypes = <span style="color: #7a0874; font-weight: bold;">&#40;</span> <span style="color: #ff0000;">'rb'</span>, <span style="color: #ff0000;">'rxml'</span>, <span style="color: #ff0000;">'builder'</span>, <span style="color: #ff0000;">'Gemfile'</span> <span style="color: #7a0874; font-weight: bold;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

*** Soft Tabs and Spaces in TextMate**  
To turn on soft tabs (bottom of the window, in the tab size selector). This will insert spaces instead of tabs, so there won&#8217;t be anything to convert when it&#8217;s time to save  
Source: [http://old.nabble.com/Convert-tabs-to-spaces-when-saving&#8211;td28891731.html][3]

 [1]: http://www.devdaily.com/blog/post/mac-os-x/how-to-move-textmate-project-drawer-left-right-side/
 [2]: http://blog.macromates.com/2007/file-type-detection-rspec-rails/<br />
 [3]: http://old.nabble.com/Convert-tabs-to-spaces-when-saving--td28891731.html