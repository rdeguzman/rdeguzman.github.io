---
title: Debugging Ruby and Rails on Pry
author: rupert
layout: post
permalink: /2013/07/debugging-ruby-and-rails-on-pry/
categories:
  - rails
  - ruby
tags:
  - debugging
  - pry
  - rails
  - ruby
---
Railscasts has a very good screencast regarding <http://railscasts.com/episodes/280-pry-with-rails>. The [Pry screencast from Joshua Cheek][1] is also very useful as an introduction to Pry, going inside a class, inspecting it, showing instance variables, etc.

1. In your Gemfile, you can add the pry gems in the development group

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">group <span style="color:#ff3333; font-weight:bold;">:development</span>, <span style="color:#ff3333; font-weight:bold;">:test</span> <span style="color:#9966CC; font-weight:bold;">do</span>
  . . .
  <span style="color:#9900CC;">gem</span> <span style="color:#996600;">'better_errors'</span>
  gem <span style="color:#996600;">'binding_of_caller'</span>
  gem <span style="color:#996600;">'meta_request'</span>
&nbsp;
  <span style="color:#008000; font-style:italic;"># Pry gems related to debugging. Move this outside the development group</span>
  <span style="color:#008000; font-style:italic;"># in case production debugging is necessary. Note, pry-debugger works</span>
  <span style="color:#008000; font-style:italic;"># in production and conflicts locally with RubyMine, use pry-nav + ~/.pryrc instead.</span>
  <span style="color:#008000; font-style:italic;"># Unfortunately pry-nav does not work in production, so you are left with</span>
  <span style="color:#008000; font-style:italic;"># pry-debugger.</span>
  <span style="color:#008000; font-style:italic;">#</span>
  <span style="color:#008000; font-style:italic;"># Locally where RubyMine exists:</span>
  <span style="color:#008000; font-style:italic;"># group :development, :test do</span>
  <span style="color:#008000; font-style:italic;">#   gem 'pry'</span>
  <span style="color:#008000; font-style:italic;">#   gem 'pry-remote'</span>
  <span style="color:#008000; font-style:italic;">#   gem 'pry-nav'</span>
  <span style="color:#008000; font-style:italic;"># end</span>
  <span style="color:#008000; font-style:italic;">#</span>
  <span style="color:#008000; font-style:italic;"># Production Debugging: See config/environments/production.rb</span>
  <span style="color:#008000; font-style:italic;"># gem 'pry'</span>
  <span style="color:#008000; font-style:italic;"># gem 'pry-remote'</span>
  <span style="color:#008000; font-style:italic;"># gem 'pry-debugger'</span>
&nbsp;
  gem <span style="color:#996600;">'pry'</span>
  gem <span style="color:#996600;">'pry-remote'</span>
  gem <span style="color:#996600;">'pry-nav'</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Create a ~/.pryrc

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">Pry.<span style="color:#9900CC;">config</span>.<span style="color:#9900CC;">correct_indent</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
Pry.<span style="color:#9900CC;">config</span>.<span style="color:#9900CC;">auto_indent</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
Pry.<span style="color:#9900CC;">commands</span>.<span style="color:#9900CC;">alias_command</span> <span style="color:#996600;">'c'</span>, <span style="color:#996600;">'continue'</span>
Pry.<span style="color:#9900CC;">commands</span>.<span style="color:#9900CC;">alias_command</span> <span style="color:#996600;">'s'</span>, <span style="color:#996600;">'step'</span>
Pry.<span style="color:#9900CC;">commands</span>.<span style="color:#9900CC;">alias_command</span> <span style="color:#996600;">'n'</span>, <span style="color:#996600;">'next'</span>
Pry.<span style="color:#9900CC;">commands</span>.<span style="color:#9900CC;">alias_command</span> <span style="color:#996600;">'f'</span>, <span style="color:#996600;">'finish'</span> <span style="color:#008000; font-style:italic;"># Only works in pry-debugger gem</span></pre>
      </td>
    </tr>
  </table>
</div>

3. To debug, add binding.pry. Execution will stop where you specify **binding.pry**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">     <span style="color:#006666;">5</span>: <span style="color:#9966CC; font-weight:bold;">def</span> index
     <span style="color:#006666;">6</span>:   poller
     <span style="color:#006666;">7</span>:   <span style="color:#CC0066; font-weight:bold;">binding</span>.<span style="color:#9900CC;">pry</span>
     <span style="color:#006666;">8</span>: 
     <span style="color:#006666;">9</span>:   <span style="color:#9966CC; font-weight:bold;">if</span> current_user.<span style="color:#9900CC;">admin</span>?
    <span style="color:#006666;">10</span>:     <span style="color:#0066ff; font-weight:bold;">@notices</span> = Notice.<span style="color:#9900CC;">updated_descending</span>
    <span style="color:#006666;">11</span>:   <span style="color:#9966CC; font-weight:bold;">else</span>
    <span style="color:#006666;">12</span>:     <span style="color:#0066ff; font-weight:bold;">@notices</span> = current_user.<span style="color:#9900CC;">client</span>.<span style="color:#9900CC;">notices</span>.<span style="color:#9900CC;">approved</span>.<span style="color:#9900CC;">updated_descending</span>
    <span style="color:#006666;">13</span>:   <span style="color:#9966CC; font-weight:bold;">end</span>
    <span style="color:#006666;">14</span>: 
    <span style="color:#006666;">15</span>: <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

4. To navigate, you can use the navigation aliases on **step 2**

5. To use pry instead of the rails console

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">pry <span style="color:#006600; font-weight:bold;">-</span>r .<span style="color:#006600; font-weight:bold;">/</span>config<span style="color:#006600; font-weight:bold;">/</span>environment</pre>
      </td>
    </tr>
  </table>
</div>

6. To remotely debug a rails application you can use `pry-remote`. Instead of using `binding.pry` we use `binding.remote_pry`. From there, you can use pry normally and navigate using our navigation aliases (step 2). See also <http://blog.bignerdranch.com/1629-debugging-remote-processes-with-pry-remote/>

On the server:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">     <span style="color:#006666;">5</span>: <span style="color:#9966CC; font-weight:bold;">def</span> index
     <span style="color:#006666;">6</span>:   poller
     <span style="color:#006666;">7</span>:   <span style="color:#CC0066; font-weight:bold;">binding</span>.<span style="color:#9900CC;">remote_pry</span>
     <span style="color:#006666;">8</span>: 
     <span style="color:#006666;">9</span>:   <span style="color:#9966CC; font-weight:bold;">if</span> current_user.<span style="color:#9900CC;">admin</span>?
    <span style="color:#006666;">10</span>:     <span style="color:#0066ff; font-weight:bold;">@notices</span> = Notice.<span style="color:#9900CC;">updated_descending</span>
    <span style="color:#006666;">11</span>:   <span style="color:#9966CC; font-weight:bold;">else</span>
    <span style="color:#006666;">12</span>:     <span style="color:#0066ff; font-weight:bold;">@notices</span> = current_user.<span style="color:#9900CC;">client</span>.<span style="color:#9900CC;">notices</span>.<span style="color:#9900CC;">approved</span>.<span style="color:#9900CC;">updated_descending</span>
    <span style="color:#006666;">13</span>:   <span style="color:#9966CC; font-weight:bold;">end</span>
    <span style="color:#006666;">14</span>: 
    <span style="color:#006666;">15</span>: <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

On the client:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># pry-remote -h 127.0.0.1 -p 9876
     5: def index
     6:   poller
   =&gt;7:   binding.remote_pry
     8: 
     9:   if current_user.admin?
    10:     @notices = Notice.updated_descending
    11:   else
    12:     @notices = current_user.client.notices.approved.updated_descending
    13:   end
    14: 
    15: end</pre>
      </td>
    </tr>
  </table>
</div>

Note: If you experience issues with pry unable to exit or continue. You might need to specify the proper `Pry.config` settings. Since, we have a `rails app + apache passenger` and having `.pryrc` doesn&#8217;t seem to work, I specified the Pry.config settings in my `config/environments/production.rb` and moved the gems out of development (irk!). From there, it works as expected.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#6666ff; font-weight:bold;">MyApp::Application</span>.<span style="color:#9900CC;">configure</span> <span style="color:#9966CC; font-weight:bold;">do</span>
   . . .
&nbsp;
   <span style="color:#008000; font-style:italic;"># Settings for PRY debugging in production. Yes, it is enabled, use with caution</span>
   <span style="color:#008000; font-style:italic;"># as you really need to know what you are doing. If you are uncommenting the lines below</span>
   <span style="color:#008000; font-style:italic;"># then you should have a very good reason why. If you are doing this in production too often,</span>
   <span style="color:#008000; font-style:italic;"># then you are not writing more tests! When you are finished debugging, please</span>
   <span style="color:#008000; font-style:italic;"># do comment the lines below.</span>
   Pry.<span style="color:#9900CC;">config</span>.<span style="color:#9900CC;">correct_indent</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
   Pry.<span style="color:#9900CC;">config</span>.<span style="color:#9900CC;">auto_indent</span> = <span style="color:#0000FF; font-weight:bold;">false</span>
   Pry.<span style="color:#9900CC;">config</span>.<span style="color:#9900CC;">history</span>.<span style="color:#9900CC;">file</span> = <span style="color:#996600;">"#{Rails.root}/log/pry_history.log"</span>
   Pry.<span style="color:#9900CC;">commands</span>.<span style="color:#9900CC;">alias_command</span> <span style="color:#996600;">'c'</span>, <span style="color:#996600;">'continue'</span>
   Pry.<span style="color:#9900CC;">commands</span>.<span style="color:#9900CC;">alias_command</span> <span style="color:#996600;">'s'</span>, <span style="color:#996600;">'step'</span>
   Pry.<span style="color:#9900CC;">commands</span>.<span style="color:#9900CC;">alias_command</span> <span style="color:#996600;">'n'</span>, <span style="color:#996600;">'next'</span>
   Pry.<span style="color:#9900CC;">commands</span>.<span style="color:#9900CC;">alias_command</span> <span style="color:#996600;">'f'</span>, <span style="color:#996600;">'finish'</span>
&nbsp;
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<s>One thing that broke is debugging with RubyMine after I used pry. I&#8217;ll take a stab on this another day.</s>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">RuntimeError - Debugger.start is not called yet.:
  debugger (1.6.1) lib/ruby-debug/processor.rb:144:in `at_breakpoint'
  (eval):5:in `block in at_breakpoint'
  &lt;internal:prelude&gt;:10:in `synchronize'
  (eval):3:in `at_breakpoint'
  debugger (1.6.1) lib/ruby-debug-base.rb:41:in `at_breakpoint'</pre>
      </td>
    </tr>
  </table>
</div>

**Update 1**: **`pry-debugger`** has a gem dependency with **`debugger`** which conflicts with RubyMine&#8217;s debugging gems. See **step 1** which now has updated gems. To uninstall pry-debugger and debugger, simply do:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># gem uninstall pry-debugger
# gem uninstall debugger</pre>
      </td>
    </tr>
  </table>
</div>

References:

<http://railscasts.com/episodes/280-pry-with-rails>  
[Pry screencast from Joshua Cheek][1]  
<https://github.com/pry/pry/wiki/Remote-sessions>  
<https://github.com/pry/pry/wiki>

 [1]: http://vimeo.com/26391171