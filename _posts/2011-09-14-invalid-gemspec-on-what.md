---
title: Invalid gemspec on what?!
author: rupert
layout: post
permalink: /2011/09/invalid-gemspec-on-what/
categories:
  - rails
  - ruby
tags:
  - cucumber
  - ruby
  - rubyonrails
---
This belongs to a royal PITA moment, thus needs a worthy post. I&#8217;m trying to do a

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">bundle <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

with my Gemfile as follows:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">group <span style="color:#ff3333; font-weight:bold;">:development</span>, <span style="color:#ff3333; font-weight:bold;">:test</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  gem <span style="color:#996600;">'capybara'</span>
  gem <span style="color:#996600;">'cucumber'</span>
  gem <span style="color:#996600;">'cucumber-rails'</span>
  gem <span style="color:#996600;">'database_cleaner'</span>
  gem <span style="color:#996600;">'rspec-rails'</span>
  gem <span style="color:#996600;">'autotest'</span>
  gem <span style="color:#996600;">'spork'</span>
  gem <span style="color:#996600;">'launchy'</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

At the time of writing this, these are the errors that I encountered. Since you are reading this, then I guess something is still wrong here.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">Installing cucumber <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.0.6<span style="color: #7a0874; font-weight: bold;">&#41;</span> 
Installing cucumber-rails <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.0.4<span style="color: #7a0874; font-weight: bold;">&#41;</span> Invalid gemspec <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.rvm<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>ruby-1.9.2-p180<span style="color: #000000; font-weight: bold;">@</span>cws<span style="color: #000000; font-weight: bold;">/</span>specifications<span style="color: #000000; font-weight: bold;">/</span>cucumber-rails-1.0.4.gemspec<span style="color: #7a0874; font-weight: bold;">&#93;</span>: Illformed requirement <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"#&lt;Syck::DefaultKey:0x00000104b82a40&gt; 0.7.2"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
Installing database_cleaner <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.6.7<span style="color: #7a0874; font-weight: bold;">&#41;</span> Invalid gemspec <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.rvm<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>ruby-1.9.2-p180<span style="color: #000000; font-weight: bold;">@</span>cws<span style="color: #000000; font-weight: bold;">/</span>specifications<span style="color: #000000; font-weight: bold;">/</span>cucumber-rails-1.0.4.gemspec<span style="color: #7a0874; font-weight: bold;">&#93;</span>: Illformed requirement <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"#&lt;Syck::DefaultKey:0x00000104b82a40&gt; 0.7.2"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
Installing orm_adapter <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.0.5<span style="color: #7a0874; font-weight: bold;">&#41;</span> Invalid gemspec <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.rvm<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>ruby-1.9.2-p180<span style="color: #000000; font-weight: bold;">@</span>cws<span style="color: #000000; font-weight: bold;">/</span>specifications<span style="color: #000000; font-weight: bold;">/</span>cucumber-rails-1.0.4.gemspec<span style="color: #7a0874; font-weight: bold;">&#93;</span>: Illformed requirement <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"#&lt;Syck::DefaultKey:0x00000104b82a40&gt; 0.7.2"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
Installing warden <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.0.5<span style="color: #7a0874; font-weight: bold;">&#41;</span> Invalid gemspec <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.rvm<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>ruby-1.9.2-p180<span style="color: #000000; font-weight: bold;">@</span>cws<span style="color: #000000; font-weight: bold;">/</span>specifications<span style="color: #000000; font-weight: bold;">/</span>cucumber-rails-1.0.4.gemspec<span style="color: #7a0874; font-weight: bold;">&#93;</span>: Illformed requirement <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"#&lt;Syck::DefaultKey:0x00000104b82a40&gt; 0.7.2"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
Installing devise <span style="color: #7a0874; font-weight: bold;">&#40;</span>1.4.5<span style="color: #7a0874; font-weight: bold;">&#41;</span> Invalid gemspec <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.rvm<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>ruby-1.9.2-p180<span style="color: #000000; font-weight: bold;">@</span>cws<span style="color: #000000; font-weight: bold;">/</span>specifications<span style="color: #000000; font-weight: bold;">/</span>cucumber-rails-1.0.4.gemspec<span style="color: #7a0874; font-weight: bold;">&#93;</span>: Illformed requirement <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"#&lt;Syck::DefaultKey:0x00000104b82a40&gt; 0.7.2"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
Installing meta_programming <span style="color: #7a0874; font-weight: bold;">&#40;</span>0.2.2<span style="color: #7a0874; font-weight: bold;">&#41;</span> Invalid gemspec <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000; font-weight: bold;">/</span>Users<span style="color: #000000; font-weight: bold;">/</span>rupert<span style="color: #000000; font-weight: bold;">/</span>.rvm<span style="color: #000000; font-weight: bold;">/</span>gems<span style="color: #000000; font-weight: bold;">/</span>ruby-1.9.2-p180<span style="color: #000000; font-weight: bold;">@</span>cws<span style="color: #000000; font-weight: bold;">/</span>specifications<span style="color: #000000; font-weight: bold;">/</span>cucumber-rails-1.0.4.gemspec<span style="color: #7a0874; font-weight: bold;">&#93;</span>: Illformed requirement <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"#&lt;Syck::DefaultKey:0x00000104b82a40&gt; 0.7.2"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span></pre>
      </td>
    </tr>
  </table>
</div>

Ok, avoid the PITA moment by reading [this.][1] And make the changes to the Gemfile like this:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">group <span style="color:#ff3333; font-weight:bold;">:development</span>, <span style="color:#ff3333; font-weight:bold;">:test</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  gem <span style="color:#996600;">'capybara'</span>
  gem <span style="color:#996600;">'cucumber'</span>, <span style="color:#996600;">"1.0.6"</span>
  gem <span style="color:#996600;">'cucumber-rails'</span>, <span style="color:#ff3333; font-weight:bold;">:git</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> <span style="color:#996600;">"https://github.com/cucumber/cucumber-rails.git"</span>
  gem <span style="color:#996600;">'database_cleaner'</span>
  gem <span style="color:#996600;">'rspec-rails'</span>
  gem <span style="color:#996600;">'autotest'</span>
  gem <span style="color:#996600;">'spork'</span>
  gem <span style="color:#996600;">'launchy'</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

Now, I understand why the commit message is like this: *I EAT YAML AND RUBYGEMS FOR toot&#8230;*

 [1]: https://github.com/cucumber/cucumber/issues/136